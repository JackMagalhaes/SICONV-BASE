import express from 'express';
import { exec } from 'child_process';

const router = express.Router();

router.post('/run', (req, res) => {
  exec('node src/etl/runEtl.js', { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: stderr || error.message });
    res.json({ message: 'ETL iniciado', output: stdout });
  });
});

export default router;
