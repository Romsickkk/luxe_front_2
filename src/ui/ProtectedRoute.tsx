import { useNavigate } from "react-router-dom";
import { useCurrentUserQuery } from "../services/apiAuth";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUserQuery(undefined);

  useEffect(() => {
    if (!user && !isLoading) navigate("/login");
  }, [user, isLoading, error, navigate]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (user) {
    return children;
  }

  return toast.error("You are not authenticated");
}

export default ProtectedRoute;
