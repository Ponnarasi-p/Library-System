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
import { upsertBook, getBookById } from "../../services/book/bookService";
import { useNavigate, useParams } from "react-router-dom";

import CustomTextField from "../../components/ui/CustomTextField";
import CustomButton from "../../components/ui/CustomButton";
import { SnackbarContext } from "../../context/snackbarProvider";
import { cardStyles, imageStyles } from "../../constants/styles";

const CreateBook = () => {
  const [form, setForm] = useState<any>({
    book_title: "",
    author_name: "",
    total_copies: "",
    status: "ACTIVE",
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
        status: book.status || "ACTIVE",
      });
      setExistingImage(book.coverUrl);
    } catch {
      showSnackbar("Failed to fetch book", "error");
    }
  };

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    let temp: any = {};

    if (!form.book_title) temp.book_title = "Required";
    if (!form.author_name) temp.author_name = "Required";
    if (!form.total_copies || Number(form.total_copies) <= 0)
      temp.total_copies = "Invalid";
    if (!form.status) temp.status = "Required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) =>
      formData.append(k, v as any)
    );

    if (isEdit) formData.append("id", id as string);
    if (file) formData.append("cover_file", file);

    try {
      console.log("FORM DATA:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await upsertBook(formData);

      showSnackbar(isEdit ? "Updated" : "Created", "success");
      navigate("/books");

    } catch (err: any) {
      console.log("ERROR:", err.response?.data);
      showSnackbar(err.response?.data?.description || "Failed", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={cardStyles.paper}>
        <Typography variant="h4" mb={3}>
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
            label="Author"
            value={form.author_name}
            onChange={(e: any) =>
              handleChange("author_name", e.target.value)
            }
            error={!!errors.author_name}
            helperText={errors.author_name}
          />

          <CustomTextField
            label="Copies"
            type="number"
            value={form.total_copies}
            onChange={(e: any) =>
              handleChange("total_copies", e.target.value)
            }
            error={!!errors.total_copies}
            helperText={errors.total_copies}
          />

          <FormControl error={!!errors.status}>
            <InputLabel>Status</InputLabel>
            <Select
              value={form.status}
              label="Status"
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>

          {existingImage && (
            <Box
              component="img"
              src={existingImage}
              sx={imageStyles.bookCover}
            />
          )}

          <CustomButton component="label">
            Upload Cover
            <input
              hidden
              type="file"
              onChange={(e: any) => setFile(e.target.files[0])}
            />
          </CustomButton>

          <CustomButton onClick={handleSubmit}>
            {isEdit ? "Update" : "Create"}
          </CustomButton>
        </Stack>
      </Paper>
    </Container>
  );
};

export default CreateBook;