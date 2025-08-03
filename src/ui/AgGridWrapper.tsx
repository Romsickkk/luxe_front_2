import styled from "styled-components";

const AgGridWrapper = styled.div`
  height: 513px;
  width: 100%;
  background-color: var(--color-grey-100);
  color: #ffffff;

  --ag-background-color: var(--color-grey-200);
  --ag-foreground-color: var(--color-grey-800);

  --ag-header-background-color: var(--color-grey-100);
  --ag-header-foreground-color: #00ff00;
  --ag-row-hover-color: var(--color-grey-100);
  --ag-border-color: #333333;
  --ag-secondary-border-color: #333333;

  --ag-cell-background-color: #006aff;
  --ag-alpine-active-color: #550000;
  --ag-odd-row-background-color: var(--color-grey-300);
`;

export default AgGridWrapper;
