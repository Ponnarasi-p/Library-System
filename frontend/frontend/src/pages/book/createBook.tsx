import {
  Container,
  Typography,
  Box,
  MenuItem,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import { useEffect, useState, useContext } from "react";
import {
  upsertBook,
  getBookById,
} from "../../services/book/bookService";
import { useNavigate, useParams } from "react-router-dom";

import CustomTextField from "../../components/ui/customTextField";
import CustomButton from "../../components/ui/customButton";
import { SnackbarContext } from "../../context/snackbarProvider";

const CreateBook = () => {
  const [form, setForm] = useState<any>({
    book_title: "",
    author_name: "",
    total_copies: "",
    status: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [file, setFile] = useState<any>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (isEdit) fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const book = await getBookById(Number(id));

      setForm({
        book_title: book.title,
        author_name: book.author,
        total_copies: book.totalCopies,
        status: book.status || "",
      });

      setExistingImage(book.coverUrl);
    } catch {
      showSnackbar("Failed to fetch book", "error");
    }
  };

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });

    setErrors((prev: any) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    let temp: any = {};

    if (!form.book_title) temp.book_title = "Title is required";
    if (!form.author_name) temp.author_name = "Author is required";

    if (!form.total_copies) {
      temp.total_copies = "Total copies is required";
    } else if (Number(form.total_copies) <= 0) {
      temp.total_copies = "Must be greater than 0";
    }

    if (!form.status) {
      temp.status = "Please select status";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value as any)
      );

      // IMPORTANT FOR UPDATE
      if (isEdit) {
        formData.append("id", id as string);
      }

      if (file) formData.append("cover_file", file);

      await upsertBook(formData);

      showSnackbar(
        isEdit ? "Book updated successfully" : "Book created successfully",
        "success"
      );

      setTimeout(() => navigate("/books"), 1200);

    } catch (err: any) {
      showSnackbar(
        err?.response?.data?.description || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={600} mb={3}>
          {isEdit ? "Edit Book" : "Create Book"}
        </Typography>

        <Stack spacing={2}>

          <CustomTextField
            label="Book Title"
            value={form.book_title}
            onChange={(e: any) =>
              handleChange("book_title", e.target.value)
            }
            error={!!errors.book_title}
            helperText={errors.book_title}
          />

          <CustomTextField
            label="Author Name"
            value={form.author_name}
            onChange={(e: any) =>
              handleChange("author_name", e.target.value)
            }
            error={!!errors.author_name}
            helperText={errors.author_name}
          />

          <CustomTextField
            label="Total Copies"
            type="number"
            value={form.total_copies}
            onChange={(e: any) =>
              handleChange("total_copies", e.target.value)
            }
            error={!!errors.total_copies}
            helperText={errors.total_copies}
          />

          <FormControl fullWidth error={!!errors.status}>
            <InputLabel>Status</InputLabel>

            <Select
              value={form.status}
              label="Status"
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
            >
              <MenuItem value="">
                <em>Select Status</em>
              </MenuItem>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>

            {errors.status && (
              <Typography variant="caption" color="error">
                {errors.status}
              </Typography>
            )}
          </FormControl>

          {existingImage && (
            <Box>
              <Typography variant="body2" mb={1}>
                Current Cover
              </Typography>

              <Box
                component="img"
                src={existingImage}
                sx={{
                  width: 120,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            </Box>
          )}

          <CustomButton component="label">
            Upload Cover
            <input
              type="file"
              hidden
              onChange={(e: any) => {
                setFile(e.target.files[0]);
                setExistingImage(null);
              }}
            />
          </CustomButton>

          <CustomButton onClick={handleSubmit}>
            {isEdit ? "Update Book" : "Create Book"}
          </CustomButton>

        </Stack>
      </Paper>
    </Container>
  );
};

export default CreateBook;