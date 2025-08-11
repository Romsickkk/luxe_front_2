import { useNavigate } from "react-router-dom";
import { useCurrentUserQuery } from "../authentication/apiAuth";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
export const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUserQuery(undefined);
  console.log(user);

  useEffect(() => {
    if (!user && !isLoading) {
      toast.error("You are not authenticated");
      navigate("/login");
    }
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

  return null;
}

export default ProtectedRoute;
