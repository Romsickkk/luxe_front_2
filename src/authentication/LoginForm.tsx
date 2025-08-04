import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/apiAuth";
import { useEffect, useState } from "react";

import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import styled from "styled-components";
import FormRowVertical from "../ui/FormRowVertical";
import { fetchCsrfCookie } from "../services/srf";

const ErrorWarning = styled.p`
  color: red;
`;

function LoginForm() {
  const [name, setName] = useState<string>("Super Admin");
  const [password, setPassword] = useState<string>("123123");

  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetchCsrfCookie();
    const res = await login({ name, password });

    if ("error" in res) {
      console.error("Login error:", res.error);
    } else {
      navigate("/dashboard");
      toast.success("Login success");
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
        <Button $size="large" $variations="primary" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
