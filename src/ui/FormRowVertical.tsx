import React, { type ReactNode } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
  margin: 0 20px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowVerticalType = {
  label?: string;
  error?: string;
  children: ReactNode;
};

function FormRowVertical({ label, error, children }: FormRowVerticalType) {
  const child = React.Children.only(children);
  const childId = React.isValidElement<{ id?: string }>(child)
    ? child.props.id
    : undefined;
  return (
    <StyledFormRow>
      {label && <Label htmlFor={childId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
