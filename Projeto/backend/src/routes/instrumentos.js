import express from 'express';
import { findPropostas, insertProposta } from '../models/instrumentoModel.js';

const router = express.Router();

router.get('/propostas', async (req, res) => {
  const { offset = 0, limit = 100 } = req.query;
  const result = await findPropostas({ offset: Number(offset), limit: Number(limit) });
  res.json(result);
});

router.post('/proposta', async (req, res) => {
  try {
    await insertProposta(req.body);
    res.status(201).json({ message: 'Proposta gravada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

export default router;
