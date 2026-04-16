"use client";

import {
  DataGrid,
  GridColDef,//type for columns
  GridRenderCellParams, //gives row data inside custom cell
} from "@mui/x-data-grid";

import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useRouter } from "next/navigation";

export default function BooksTable({
  rows,
  rowCount,
  loading,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onDelete,
}: any) {
  const router = useRouter();

  // TABLE COLUMNS
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },

    { field: "title", headerName: "Title", flex: 1 },

    { field: "author", headerName: "Author", flex: 1 },

    { field: "totalCopies", headerName: "Copies", width: 120 },

    { field: "status", headerName: "Status", width: 120 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,

      renderCell: (params: GridRenderCellParams) => (
        <>
          {/* VIEW */}
          <Tooltip title="View">
            <IconButton
              onClick={() =>
                router.push(`/books/view/${params.row.id}`)
              }
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          {/*  EDIT */}
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                router.push(`/books/edit/${params.row.id}`)
              }
            >
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>

          {/* DELETE */}
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(params.row.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}

        // SERVER SIDE PAGINATION
        paginationMode="server"

        //  NEW MUI v6 MODEL
        paginationModel={{ page, pageSize }}

        onPaginationModelChange={(model) => {
          onPageChange(model.page);
          onPageSizeChange(model.pageSize);
        }}

        //  OPTIONS
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
}