import styled from "styled-components";

import Logo from "../ui/Logo";
import LoginForm from "../authentication/LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Heading = styled.h4`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading>Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
