import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [propostas, setPropostas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/instrumentos/propostas').then((resp) => {
      setPropostas(resp.data);
      setLoading(false);
    }).catch((err) => {
      setErro(err.message);
      setLoading(false);
    });
  }, []);

  return (
    <div className="app">
      <h1>Transferegov Gerenciador</h1>
      {loading && <p>Carregando propostas...</p>}
      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
      <table>
        <thead>
          <tr>
            <th>ID Proposta</th>
            <th>UF</th>
            <th>Município</th>
            <th>Número</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {propostas.map((p) => (
            <tr key={p.id_proposta}>
              <td>{p.id_proposta}</td>
              <td>{p.uf_proponente}</td>
              <td>{p.municip_proponente}</td>
              <td>{p.numero_proposta}</td>
              <td>{p.nome_proposta}</td>
              <td>{p.valor_total}</td>
              <td>{p.situacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
