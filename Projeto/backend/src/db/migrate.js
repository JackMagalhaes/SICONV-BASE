import { query } from './index.js';

async function migrate() {
  await query(`
    CREATE TABLE IF NOT EXISTS proposta (
      id_proposta TEXT PRIMARY KEY,
      uf_proponente TEXT,
      municip_proponente TEXT,
      cod_munic_ibge TEXT,
      numero_proposta TEXT,
      nome_proposta TEXT,
      valor_total NUMERIC,
      situacao TEXT,
      data_aprovacao DATE
    );

    CREATE TABLE IF NOT EXISTS convenio (
      nr_convenio TEXT PRIMARY KEY,
      id_proposta TEXT REFERENCES proposta(id_proposta) ON DELETE RESTRICT,
      valor_convenio NUMERIC,
      data_assinatura DATE,
      situacao_convenio TEXT
    );

    CREATE TABLE IF NOT EXISTS empenho (
      id_empenho TEXT PRIMARY KEY,
      nr_convenio TEXT REFERENCES convenio(nr_convenio) ON DELETE RESTRICT,
      nr_empenho TEXT,
      tipo_nota TEXT,
      data_emissao DATE,
      valor_empenho NUMERIC,
      situacao_empenho TEXT
    );

    CREATE TABLE IF NOT EXISTS empenho_desembolso (
      id_empenho_desembolso SERIAL PRIMARY KEY,
      id_empenho TEXT REFERENCES empenho(id_empenho) ON DELETE RESTRICT,
      valor_desembolso NUMERIC,
      data_desembolso DATE
    );
  `);

  console.log('Migrations aplicadas.');
  process.exit(0);
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
