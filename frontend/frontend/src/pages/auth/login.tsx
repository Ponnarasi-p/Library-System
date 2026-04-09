import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useState, useContext } from "react";
import { loginApi } from "../../services/auth/authService";
import { AuthContext } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});

  const { login }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newErrors: any = {};

    // 🔥 FIELD VALIDATION
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await loginApi(form);

      console.log("LOGIN RESPONSE:", res.data.data);

      login(res.data.data.token, {
        email: res.data.data.email,
        role: res.data.data.role,
      });

      navigate("/books");
    } catch (err: any) {
      setErrors({
        api: err?.response?.data?.description || "Login failed",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa, #e4e8f0)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 400,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          
          {/*  TITLE */}
          <Typography variant="h4" fontWeight={600}>
            Welcome Back 
          </Typography>

          <Typography color="text.secondary">
            Login to your admin dashboard
          </Typography>

          {/*  API ERROR */}
          {errors.api && (
            <Typography color="error" fontSize={14}>
              {errors.api}
            </Typography>
          )}

          {/*  EMAIL */}
          <TextField
            label="Email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });

              // CLEAR EMAIL + API ERROR
              setErrors({ ...errors, email: "", api: "" });
            }}
          />

          {/* PASSWORD */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });

              // CLEAR PASSWORD + API ERROR
              setErrors({ ...errors, password: "", api: "" });
            }}
          />

          {/* LOGIN BUTTON */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 1,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;