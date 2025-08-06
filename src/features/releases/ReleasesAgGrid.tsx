import { useState } from "react";
import useReleasesColumnDefs from "./useReleasesColumnDefs";
import { AgGridReact } from "ag-grid-react";
import { type ReleasesData, useGetTableDataQuery } from "./apiReleases";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  PaginationModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";

import Spinner from "../../ui/Spinner";
import ReleasesFormModal from "./ReleasesFormModal";
import AgGridWrapper from "../../ui/AgGridWrapper";
import AddButton from "../../ui/AddButton";

export type ModalType = "Edit" | "Delete" | "Add" | null;

function ReleasesAgGrid() {
  const { data, error, isLoading } = useGetTableDataQuery();
  const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
  const [currentRelease, setCurrentRelease] = useState<ReleasesData | null>(null);
  const releasesColumnDefs = useReleasesColumnDefs();

  function openModal(modalName: ModalType) {
    setCurrentModal(modalName);
  }

  function closeModal() {
    setCurrentModal(null);
    setCurrentRelease(null);
  }

  if (isLoading) return <Spinner />;

  if (error) {
    const errorMessage = (error as { message: string }).message || "An unknown error occurred";
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <AddButton changeModal={openModal} name="Release" />
      </div>

      <AgGridWrapper className="ag-theme-alpine-dark">
        <AgGridReact
          columnDefs={releasesColumnDefs}
          defaultColDef={{
            filter: true,
            floatingFilter: true,
          }}
          rowData={data}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={false}
          context={{
            openModal,
            changeCurrentReleases: (releases: ReleasesData) => setCurrentRelease(releases),
          }}
          modules={[PaginationModule, CellStyleModule, ClientSideRowModelModule, ValidationModule, TextFilterModule]}
        />
      </AgGridWrapper>

      <ReleasesFormModal modalName={currentModal} onRequestClose={closeModal} currentRelease={currentRelease} />
    </div>
  );
}

export default ReleasesAgGrid;
