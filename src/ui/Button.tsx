import styled, { css } from "styled-components";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariation = "primary" | "secondary" | "danger";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: #ff6e1b;

    &:hover {
      background-color: #c54800;
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

type ButtonProps = {
  $size: ButtonSize;
  $variations: ButtonVariation;
};

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  &:hover {
    color: #ff6e1b;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #ff6e1b;
  }

  ${(props) => sizes[props.$size]}
  ${(props) => variations[props.$variations]}
  
  &:disabled {
    background-color: var(--color-grey-300);
    color: var(--color-grey-500);
    cursor: not-allowed;
    border: none;
  }
`;

Button.defaultProps = {
  $variations: "primary",
  $size: "medium",
};

export default Button;
