import { useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

function ProtectedLogin({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return children;
  }
}

export default ProtectedLogin;
