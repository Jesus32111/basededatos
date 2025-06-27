import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Obtener todos los productos con el nombre de la categoría
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id, 
        p.nombre, 
        p.description, 
        p.category AS category_id, 
        c.nombre AS category, 
        p.price, 
        p.stock, 
        p.min_stock, 
        p.created_at, 
        p.updated_at
      FROM products p
      LEFT JOIN categories c ON p.category = c.id
      ORDER BY p.updated_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo producto
router.post('/', async (req, res) => {
  console.log('📦 Producto recibido:', req.body);
  const { nombre, description, category, price, stock, min_stock } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO products (nombre, description, category, price, stock, min_stock) VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, description, category, price, stock, min_stock]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('❌ Error en la creación del producto:', err);
    res.status(500).json({ error: err.message });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, description, category, price, stock, min_stock } = req.body;
  try {
    await pool.query(
      `UPDATE products SET nombre=?, description=?, category=?, price=?, stock=?, min_stock=?, updated_at=NOW() WHERE id=?`,
      [nombre, description, category, price, stock, min_stock, id]
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
