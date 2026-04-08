import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Box,
  Snackbar,
  Alert,
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
  Button,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../../services/book/bookService";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const BookList = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const limit = 5;
  const navigate = useNavigate();

  //FETCH
  const fetchBooks = async () => {
  try {
    const res = await getBooks({ page, limit, search, status });

    console.log("API SUCCESS:", res);

    setBooks(res.data);       // ✅ correct
    setTotal(res.meta.total); // ✅ correct

  } catch (err: any) {
    console.log("API ERROR:", err);

    setSnackbar({
      open: true,
      message: "Failed to fetch books",
      severity: "error",
    });
  }
};

  useEffect(() => {
    fetchBooks();
  }, [page, search, status]);

  //DELETE
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteBook(deleteId);
      fetchBooks();

      setSnackbar({
        open: true,
        message: "Book deleted successfully",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Delete failed",
        severity: "error",
      });
    }

    setDeleteId(null);
  };

  //COLUMNS
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
          <TextField
            label="Search (Title / Author)"
            value={search}
            size="small"
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
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

          <Button
            variant="contained"
            onClick={() => navigate("/books/create")}
          >
            + Create Book
          </Button>
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

  sx={{
    borderRadius: 2,
    border: "none",
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#f8f9fb",
      fontWeight: "600",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#f5f7ff",
    },
  }}
/>
        </Box>
      </Paper>

      {/* DELETE */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this book?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
      >
        <Alert severity={snackbar.severity as any}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookList;