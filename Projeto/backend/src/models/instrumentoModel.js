import { query } from '../db/index.js';

export async function findPropostas({ offset = 0, limit = 100 } = {}) {
  const res = await query('SELECT * FROM proposta ORDER BY id_proposta LIMIT $1 OFFSET $2', [limit, offset]);
  return res.rows;
}

export async function insertProposta(data) {
  const sql = `INSERT INTO proposta (id_proposta, uf_proponente, municip_proponente, cod_munic_ibge, numero_proposta, nome_proposta, valor_total, situacao, data_aprovacao)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id_proposta) DO UPDATE SET
      uf_proponente=EXCLUDED.uf_proponente,
      municip_proponente=EXCLUDED.municip_proponente,
      cod_munic_ibge=EXCLUDED.cod_munic_ibge,
      numero_proposta=EXCLUDED.numero_proposta,
      nome_proposta=EXCLUDED.nome_proposta,
      valor_total=EXCLUDED.valor_total,
      situacao=EXCLUDED.situacao,
      data_aprovacao=EXCLUDED.data_aprovacao
  `;
  const params = [
    data.id_proposta,
    data.uf_proponente,
    data.municip_proponente,
    data.cod_munic_ibge,
    data.numero_proposta,
    data.nome_proposta,
    data.valor_total,
    data.situacao,
    data.data_aprovacao
  ];

  await query(sql, params);
}
