import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { insertProposta } from '../models/instrumentoModel.js';
import dotenv from 'dotenv';

dotenv.config();

const inputDir = process.env.CSV_INPUT_PATH || '../Modelo de Dados/csv';

async function processPropostaCsv(filePath) {
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({ columns: true, delimiter: ',', bom: true, skip_empty_lines: true }));

  for await (const row of parser) {
    const data = {
      id_proposta: row.ID_PROPOSTA || row.id_proposta,
      uf_proponente: row.UF_PROPONENTE || row.uf_proponente,
      municip_proponente: row.MUNIC_PROPONENTE || row.municip_proponente,
      cod_munic_ibge: row.COD_MUNIC_IBGE || row.cod_munic_ibge,
      numero_proposta: row.NUM_PROPOSTA || row.numero_proposta || row.NUMERO_PROPOSTA,
      nome_proposta: row.NOME_PROPONENTE || row.nome_proposta,
      valor_total: parseFloat(row.VALOR_TOTAL || row.valor_total || 0),
      situacao: row.SITUACAO || row.situacao || row.SIT_PROPOSTA,
      data_aprovacao: row.DATA_APROVACAO || row.data_aprovacao || null
    };

    await insertProposta(data);
  }
}

async function run() {
  const pathCsv = path.resolve(inputDir);
  console.log('Iniciando ETL em:', pathCsv);

  const arquivos = fs.readdirSync(pathCsv).filter(f => f.toLowerCase().includes('proposta') && f.endsWith('.csv'));
  for (const arquivo of arquivos) {
    console.log('Processando arquivo', arquivo);
    await processPropostaCsv(path.join(pathCsv, arquivo));
  }

  console.log('ETL finalizado');
  process.exit(0);
}

run().catch(err => {
  console.error('Erro ETL', err);
  process.exit(1);
});
