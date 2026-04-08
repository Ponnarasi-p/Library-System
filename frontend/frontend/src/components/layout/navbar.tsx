import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user }: any = useContext(AuthContext);
  console.log("USER IN NAVBAR:", user);

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>

          {/* LEFT */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={() => navigate("/books")}
          >
            📚 Library Management
          </Typography>

          {/* RIGHT PROFILE */}
          <Stack direction="row" spacing={2} alignItems="center">

            {user && (
  <Box textAlign="right">
    <Typography
      variant="body2"
      fontWeight={700}
      sx={{ letterSpacing: 1 }}
    >
      {user.role}
    </Typography>
  </Box>
)}

            <Avatar sx={{ bgcolor: "#fff", color: "#6c3fc5" }}>
              {user?.email?.[0]?.toUpperCase()}
            </Avatar>

            <Button color="inherit" onClick={() => setOpenDialog(true)}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* LOGOUT DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>

        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>

          <Button
            color="error"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;