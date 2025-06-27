import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import productsRoutes from './routes/products.js';
import categoriesRoutes from './routes/categories.js';
import usersRoutes from './routes/users.js';
import movementsRoutes from './routes/movements.js'; // ✅ Importar ruta de movimientos

const app = express();

app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/movements', movementsRoutes); // ✅ Usar ruta

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});
