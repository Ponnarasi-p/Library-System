import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login";
import BookList from "../pages/book/bookList";
import CreateBook from "../pages/book/createBook";
import ProtectedRoute from "./protectedRoutes";
import MainLayout from "../components/layout/mainLayout";
import { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import ViewBook from "../pages/book/viewBook";

const AppRoutes = () => {
  const { token }: any = useContext(AuthContext); // USE CONTEXT

  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT ROUTE */}
        <Route
          path="/"
          element={
            token
              ? <Navigate to="/books" />
              : <Navigate to="/login" />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/books" />
              : <Login />
          }
        />

        {/* BOOK LIST */}
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BookList />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* CREATE */}
        <Route
          path="/books/create"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CreateBook />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* EDIT */}
        <Route
          path="/books/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CreateBook />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
  path="/books/view/:id"
  element={
    <ProtectedRoute>
      <MainLayout>
        <ViewBook />
      </MainLayout>
    </ProtectedRoute>
  }
/>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;