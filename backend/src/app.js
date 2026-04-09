const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/uploads", express.static("src/uploads"));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;