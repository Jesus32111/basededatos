import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

// GET usuarios
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT id, nombre, email, rol, created_at FROM usuarios');
  res.json(rows);
});

// POST usuario
router.post('/', async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  await pool.query(
    'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
    [nombre, email, password, rol || 'usuario']
  );
  res.json({ message: 'Usuario creado correctamente' });
});

export default router;
