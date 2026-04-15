import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

import errorMiddleware from './middlewares/errorMiddleware.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';

const app = express(); 

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use('/uploads', express.static('src/uploads'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;