import { Box, Typography, Paper } from "@mui/material";
import { useState, useContext } from "react";
import { loginApi } from "../../services/auth/authService";
import { AuthContext } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../components/ui/CustomTextField";
import CustomButton from "../../components/ui/CustomButton";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await loginApi(form);

    login(res.data.data.token, {
      email: res.data.data.email,
      role: res.data.data.role,
    });

    navigate("/books");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h4">Login</Typography>

        <CustomTextField
          label="Email"
          onChange={(e: any) => setForm({ ...form, email: e.target.value })}
        />

        <CustomTextField
          label="Password"
          type="password"
          onChange={(e: any) => setForm({ ...form, password: e.target.value })}
        />

        <CustomButton fullWidth onClick={handleSubmit}>
          Login
        </CustomButton>
      </Paper>
    </Box>
  );
};

export default Login;