import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./apiAuth";
import { useEffect, useState } from "react";

import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import styled from "styled-components";
import FormRowVertical from "../ui/FormRowVertical";
import { fetchCsrfCookie } from "./srf";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setUser } from "./authSlice";

const ErrorWarning = styled.p`
  color: red;
`;

function LoginForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("Super Admin");
  const [password, setPassword] = useState<string>("123123");

  const [login, { isLoading, error }] = useLoginMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetchCsrfCookie();
      const response = await login({ name, password }).unwrap();
      console.log(response);

      dispatch(setUser(response.admin));
      navigate("/dashboard");
      toast.success("Login success");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  useEffect(() => {
    if (error && "status" in error && typeof error.data === "string") {
      toast.error("Login error: " + (error?.data || "unknown error"));
    }
  }, [error]);

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormRowVertical label="Name">
        <Input
          type="text"
          id="name"
          autoComplete="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          $error={error && "status" in error && typeof error.data === "string"}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          $error={error && "status" in error && typeof error.data === "string"}
        />
      </FormRowVertical>

      {error && "status" in error && typeof error.data === "string" && <ErrorWarning>{error.data}</ErrorWarning>}

      <FormRowVertical>
        <Button $size="large" $variations="primary" disabled={isLoading || isSubmitting}>
          {isLoading || isSubmitting ? "Loading..." : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
