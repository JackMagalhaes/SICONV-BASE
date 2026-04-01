import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import instrumentosRoutes from './routes/instrumentos.js';
import etlRoutes from './routes/etl.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/instrumentos', instrumentosRoutes);
app.use('/api/etl', etlRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'Transferegov Gerenciador API' }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
