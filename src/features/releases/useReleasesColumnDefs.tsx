import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { ICellRendererParams } from "ag-grid-community";

import { type ReleasesData } from "./apiReleases";

import DefaultAvatar from "../../assets/default-avatar.png";
import AgEditButton from "../../ui/AgEditButton";
import AgLink from "../../ui/AgLink";
import styled from "styled-components";
import RoundAvatar from "../../ui/RoundAvatar";

const EditingButtonsDiv = styled.div`
  display: flex;
  gap: 3px;
  padding: 0;
  align-items: center;
  height: 100%;
`;

const getFilterParams = {
  filterOptions: ["contains"],
  defaultOption: "contains",
  suppressFilterButton: true,
  maxNumConditions: 1,
  suppressAndOrCondition: true,
};
const socialNetworks: (keyof ReleasesData)[] = ["cygnus"];

const useReleasessColumnDefs = () => {
  return useMemo<ColDef<ReleasesData>[]>(
    () => [
      {
        headerName: "Actions",
        sortable: false,
        cellStyle: { padding: 0 },
        cellRenderer: (params: ICellRendererParams) => (
          <EditingButtonsDiv>
            <AgEditButton
              name="Delete"
              icon={<FaTrashAlt />}
              params={params}
              modalChange={params.context.openModal}
              changeCurrentData={params.context.changeCurrentReleases}
            />
            <AgEditButton
              name="Edit"
              icon={<FaPen />}
              params={params}
              modalChange={params.context.openModal}
              changeCurrentData={params.context.changeCurrentReleases}
            />
          </EditingButtonsDiv>
        ),
        width: 10,
        minWidth: 80,
        filter: false,
        floatingFilter: false,
      },
      {
        headerName: "Poster",
        field: "poster" as keyof ReleasesData,
        sortable: false,
        cellRenderer: (params: ICellRendererParams) => (
          <RoundAvatar src={params.value ? params.value : DefaultAvatar} alt={`${params.data.name} Poster`} />
        ),
        width: 100,
        minWidth: 80,
        filter: false,
        floatingFilter: false,
      },
      {
        headerName: "Name",
        field: "name" as keyof ReleasesData,
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: getFilterParams,
      },
      {
        headerName: "Owners",
        field: "owners" as keyof ReleasesData,
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: getFilterParams,
        cellRenderer: (params: ICellRendererParams) =>
          Array.isArray(params.value) ? params.value.join(" & ") : params.value,
        valueFormatter: (params) => {
          if (Array.isArray(params.value)) {
            return params.value.join(" & ");
          }

          if (typeof params.value === "object") {
            return JSON.stringify(params.value);
          }
          return params.value;
        },
      },

      ...socialNetworks.map(
        (network, index, array) =>
          ({
            headerName: network.charAt(0).toUpperCase() + network.slice(1),
            field: network as keyof ReleasesData,
            cellRenderer: (params: ICellRendererParams) => <AgLink value={params.value} />,
            flex: 1,
            minWidth: 80,
            floatingFilter: false,
            resizable: index !== array.length - 1,
            filter: "agTextColumnFilter",
            filterParams: getFilterParams,
          } as ColDef<ReleasesData>)
      ),
    ],
    []
  );
};
export default useReleasessColumnDefs;
