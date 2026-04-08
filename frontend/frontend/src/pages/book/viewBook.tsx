import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../services/book/bookService";

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    const res = await getBookById(Number(id));
    setBook(res.data.data[0]);
  };

  if (!book) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        
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

          {/* IMAGE */}
          {book.coverUrl && (
            <Box>
              <Typography variant="subtitle2">Cover</Typography>
              <img
                src={book.coverUrl}
                alt="cover"
                style={{
                  width: "200px",
                  marginTop: "10px",
                  borderRadius: "10px",
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