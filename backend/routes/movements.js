import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Obtener todos los movimientos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.id, m.tipo, m.cantidad, m.fecha, m.observaciones,
             p.name AS producto, u.nombre AS usuario
      FROM movimientos m
      JOIN products p ON m.producto_id = p.id
      JOIN usuarios u ON m.usuario_id = u.id
      ORDER BY m.fecha DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registrar un nuevo movimiento
router.post('/', async (req, res) => {
  const { producto_id, tipo, cantidad, usuario_id, observaciones } = req.body;

  const mult = tipo === 'entrada' ? 1 : -1;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // Insertar movimiento
    await conn.query(
      `INSERT INTO movimientos (producto_id, tipo, cantidad, usuario_id, observaciones)
       VALUES (?, ?, ?, ?, ?)`,
      [producto_id, tipo, cantidad, usuario_id, observaciones]
    );

    // Actualizar stock del producto
    await conn.query(
      `UPDATE products SET stock = stock + (?) WHERE id = ?`,
      [cantidad * mult, producto_id]
    );

    await conn.commit();
    res.status(201).json({ message: 'Movimiento registrado' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

export default router;
