import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../services/book/bookService";
import { SnackbarContext } from "../../context/snackbarProvider";

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const data = await getBookById(Number(id));
      setBook(data);
    } catch (err: any) {
      showSnackbar("Failed to fetch book", "error");
    } finally {
      setLoading(false);
    }
  };

  // LOADING UI
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Typography textAlign="center" mt={5}>
        No book found
      </Typography>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600} mb={3}>
          Book Details
        </Typography>

        <Stack spacing={2}>

          <Box>
            <Typography variant="subtitle2">Title</Typography>
            <Typography variant="h6">{book.title}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Author</Typography>
            <Typography variant="h6">{book.author}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Total Copies</Typography>
            <Typography variant="h6">{book.totalCopies}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Available Copies</Typography>
            <Typography variant="h6">{book.availableCopies}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2">Status</Typography>
            <Chip
              label={book.status}
              color={book.status === "ACTIVE" ? "success" : "default"}
            />
          </Box>

          
          {book.coverUrl && (
            <Box>
              <Typography variant="subtitle2">Cover</Typography>

              <Box
                component="img"
                src={book.coverUrl}
                alt="cover"
                sx={{
                  width: 200,
                  mt: 1,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Box>
          )}

        </Stack>
      </Paper>
    </Container>
  );
};

export default ViewBook;