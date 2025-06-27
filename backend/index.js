import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import userRoutes from './routes/users.js'; // si aún no lo tienes aquí
import viewRoutes from './routes/views.js'; // si aún no lo tienes aquí
import movementRoutes from './routes/movements.js'; // NUEVO

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/views', viewRoutes);
app.use('/api/movements', movementRoutes); // NUEVO

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
