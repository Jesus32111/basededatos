import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY updated_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo producto
router.post('/', async (req, res) => {
  const { name, description, category, price, stock, min_stock } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO products (name, description, category, price, stock, min_stock) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, category, price, stock, min_stock]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, stock, min_stock } = req.body;
  try {
    await pool.query(
      `UPDATE products SET name=?, description=?, category=?, price=?, stock=?, min_stock=?, updated_at=NOW() WHERE id=?`,
      [name, description, category, price, stock, min_stock, id]
    );
    res.json({ message: 'Producto actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM products WHERE id = ?`, [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
