import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login";
import BookList from "../pages/book/bookList";
import CreateBook from "../pages/book/createBook";
import ViewBook from "../pages/book/viewBook";
import MainLayout from "../components/layout/mainLayout";
import ProtectedRoute from "./protectedRoutes";
import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

const AppRoutes = () => {
  const { token }: any = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={token ? <Navigate to="/books" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/books" element={
          <ProtectedRoute>
            <MainLayout><BookList /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/books/create" element={
          <ProtectedRoute>
            <MainLayout><CreateBook /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/books/view/:id" element={
          <ProtectedRoute>
            <MainLayout><ViewBook /></MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/books/create/:id" element={
  <ProtectedRoute>
    <MainLayout><CreateBook /></MainLayout>
  </ProtectedRoute>
} />

        

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;