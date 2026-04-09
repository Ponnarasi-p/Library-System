import {
  Container,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState, useContext } from "react";
import { getBooks, deleteBook } from "../../services/book/bookService";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import CustomTextField from "../../components/ui/customTextField";
import CustomButton from "../../components/ui/customButton";
import { SnackbarContext } from "../../context/snackbarProvider";
import { MenuItem } from "@mui/material";

const BookList = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const limit = 5;
  const navigate = useNavigate();

  const { showSnackbar } = useContext(SnackbarContext);

  // FETCH
  const fetchBooks = async () => {
    try {
      const res = await getBooks({ page, limit, search, status });

      setBooks(res.data);
      setTotal(res.meta.total);
    } catch (err: any) {
      showSnackbar("Failed to fetch books", "error");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search, status]);

  // DELETE
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteBook(deleteId);
      showSnackbar("Book deleted successfully", "success");
      fetchBooks();
    } catch {
      showSnackbar("Delete failed", "error");
    }

    setDeleteId(null);
  };

  // COLUMNS
  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    { field: "totalCopies", headerName: "Copies", width: 120 },

    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          color={params.value === "ACTIVE" ? "success" : "default"}
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Tooltip title="View">
            <IconButton
              color="primary"
              onClick={() =>
                navigate(`/books/view/${params.row.id}`)
              }
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              color="info"
              onClick={() =>
                navigate(`/books/edit/${params.row.id}`)
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => setDeleteId(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
        
        <Typography variant="h4" mb={2} fontWeight={600}>
          Books
        </Typography>

        {/* FILTER */}
        <Stack direction="row" spacing={2} mb={2} alignItems="center">
          
          <CustomTextField
  label="Search"
  size="small"
  sx={{ width: 250 }}
  value={search}
  onChange={(e: any) => setSearch(e.target.value)}
/>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>

          <Box flexGrow={1} />

          <CustomButton
  onClick={() => navigate("/books/create")}
  sx={{ width: 180 }}
>
  + Create Book
</CustomButton>
        </Stack>

        {/* GRID */}
        <Box sx={{ height: 450 }}>
          <DataGrid
            rows={books}
            columns={columns}
            getRowId={(row) => row.id}
            rowCount={total}
            pagination
            paginationMode="server"
            pageSizeOptions={[5]}
            paginationModel={{
              page: page - 1,
              pageSize: limit,
            }}
            onPaginationModelChange={(model) => {
              setPage(model.page + 1);
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>

      {/* DELETE DIALOG */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this book?
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setDeleteId(null)}>
            Cancel
          </CustomButton>
          <CustomButton color="error" onClick={handleDelete}>
            Delete
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookList;