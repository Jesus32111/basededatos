import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Endpoint para vista
router.get('/inventario', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT p.name, c.name AS categoria, p.stock
    FROM products p JOIN categories c ON p.category_id = c.id
  `);
  res.json(rows);
});

// Endpoint para función total_stock
router.get('/total-stock', async (req, res) => {
  const [rows] = await pool.query(`SELECT SUM(stock) AS total FROM products`);
  res.json(rows[0]);
});

export default router;
