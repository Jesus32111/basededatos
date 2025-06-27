import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Agregar nueva categoría
router.post('/', async (req, res) => {
  const { nombre, description } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [nombre, description]
    );
    res.status(201).json({ id: result.insertId, nombre, description });
  } catch (error) {
    console.error('Error al agregar categoría:', error);
    res.status(500).json({ error: 'Error al agregar categoría' });
  }
});

export default router;

