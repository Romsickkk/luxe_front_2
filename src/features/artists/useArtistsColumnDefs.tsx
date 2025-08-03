import { useMemo } from "react";
import { ColDef } from "ag-grid-community";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { ICellRendererParams } from "ag-grid-community";

import { type ArtistData } from "./apiArtists";

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
const socialNetworks: (keyof ArtistData)[] = ["facebook", "vk", "spotify", "soundcloud", "instagram", "twitter"];

export const useArtistsColumnDefs = () => {
  return useMemo<ColDef<ArtistData>[]>(
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
              changeCurrentData={params.context.changeCurrentData}
            />
            <AgEditButton
              name="Edit"
              icon={<FaPen />}
              params={params}
              modalChange={params.context.openModal}
              changeCurrentData={params.context.changeCurrentData}
            />
          </EditingButtonsDiv>
        ),
        width: 10,
        minWidth: 80,
        filter: false,
        floatingFilter: false,
      },
      {
        headerName: "Avatar",
        field: "avatar" as keyof ArtistData,
        sortable: false,
        cellRenderer: (params: ICellRendererParams) => (
          <RoundAvatar src={params.value ? params.value : DefaultAvatar} alt={`${params.data.name} Avatar`} />
        ),
        width: 100,
        minWidth: 80,
        filter: false,
        floatingFilter: false,
      },
      {
        headerName: "Name",
        field: "name" as keyof ArtistData,
        flex: 1,
        minWidth: 80,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        filterParams: getFilterParams,
      },
      ...socialNetworks.map(
        (network, index, array) =>
          ({
            headerName: network.length > 3 ? network.charAt(0).toUpperCase() + network.slice(1) : network.toUpperCase(),
            field: network as keyof ArtistData,
            cellRenderer: (params: ICellRendererParams) => <AgLink value={params.value} />,
            flex: 1,
            minWidth: 80,
            floatingFilter: false,
            resizable: index !== array.length - 1,
            filter: "agTextColumnFilter",
            filterParams: getFilterParams,
          } as ColDef<ArtistData>)
      ),
    ],
    []
  );
};
