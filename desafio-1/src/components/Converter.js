import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const Converter = () => {
  const [state, setState] = useState({
    valor: '',
    moeda: '',
    resultado: '',
    dataHora: '',
    erro: '',
  });

  const moedas = [
    { value: 'EUR', label: 'Euro', symbol: '€' },
    { value: 'USD', label: 'Dólar', symbol: '$' },
    { value: 'GBP', label: 'Libras Esterlinas', symbol: '£' },
  ];

  const converter = async () => {
    try {
      const resposta = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      if (!resposta.data) {
        throw new Error('Erro ao consultar a API');
      }
      const cotacao = Number.parseFloat(resposta.data.bpi[state.moeda].rate.replace(',', ''));
      const valorNumero = Number.parseFloat(state.valor);
      const resultado = valorNumero * cotacao;
      setState({
        ...state,
        resultado: resultado.toFixed(2),
        dataHora: new Date(resposta.data.time.updated).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      });
    } catch (erro) {
      setState({ ...state, erro: 'Erro ao consultar a API' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    converter();
  };

  let resultadoFormatado = '';
  if (state.resultado) {
    const moedaSelecionada = moedas.find((moeda) => moeda.value === state.moeda);
    if (moedaSelecionada) {
      resultadoFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: state.moeda,
        minimumFractionDigits: 2,
      }).format(parseFloat(state.resultado));
      resultadoFormatado = `${moedaSelecionada.symbol} ${resultadoFormatado}`;
    }
  }

  return (
    <div id='container'>
      <form onSubmit={handleSubmit}>
        <div id='valor_real'>
          <label>Bitcoin:</label>
          <input
            type="number"
            value={state.valor}
            onChange={(e) => setState({ ...state, valor: e.target.value })}
          />
        </div>
        <div id='moeda'>
          <label>Moeda:</label>
          <select
            value={state.moeda}
            onChange={(e) => setState({ ...state, moeda: e.target.value })}
          >
            {moedas.map((moeda, index) => (
              <option key={index} value={moeda.value}>{moeda.label}</option>
            ))}
          </select>
        </div>
        <button type="submit">Converter</button>
        <div id='resultado'>
          <label>Resultado:</label>
          <input type="text" value={resultadoFormatado} disabled />
        </div>
        <div id='data'>
          <label>Data/hora:</label>
          <input type="text" value={state.dataHora} disabled />
        </div>
        {
          state.erro && <p>{state.erro}</p>
        }
      </form>
    </div>
  );
};

export default Converter;