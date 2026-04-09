const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const loggerMiddleware = require("./middlewares/loggerMiddleware"); 

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//parses form data

// LOGGER (before routes)
app.use(loggerMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/uploads", express.static("src/uploads"));//serves uploaded images -accessed via url

app.use(notFoundMiddleware);//fallback middleware
app.use(errorMiddleware);//catches all errors

module.exports = app;