import { Box, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { layoutStyles } from "../../constants/styles";

const MainLayout = ({ children }: any) => {
  const navigate = useNavigate();

  return (
    <Box sx={layoutStyles.page}>
      <Navbar />

      <Container maxWidth="lg" sx={layoutStyles.container}>
        {children}
      </Container>

      <Button
        variant="contained"
        sx={{ position: "fixed", bottom: 20, left: 20 }}
        onClick={() => navigate(-1)}
      >
        ← Back
      </Button>
    </Box>
  );
};

export default MainLayout;