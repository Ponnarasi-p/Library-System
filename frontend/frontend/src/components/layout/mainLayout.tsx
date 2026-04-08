import { Box, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const MainLayout = ({ children }: any) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      
      {/*NAVBAR COMPONENT */}
      <Navbar />

      {/* paGE CONTENT */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>

      {/* BACK BUTTON */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
        }}
      >
        <Button variant="contained" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Box>
    </Box>
  );
};

export default MainLayout;