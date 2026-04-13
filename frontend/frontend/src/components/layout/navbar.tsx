import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user }: any = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/books")}
        >
          📚 Library
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          {user && <Typography>{user.role}</Typography>}

          <Avatar>
            {user?.email?.[0]?.toUpperCase()}
          </Avatar>

          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;