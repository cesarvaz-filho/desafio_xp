import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Converter from './Converter';

jest.mock('axios');

describe('Converter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário com os campos necessários', () => {
    const { getByText, getByPlaceholderText } = render(<Converter />);
    expect(getByText('Bitcoin:')).toBeInTheDocument();
    expect(getByText('Moeda:')).toBeInTheDocument();
    expect(getByText('Converter')).toBeInTheDocument();
    expect(getByPlaceholderText('')).toBeInTheDocument();
  });

  it('deve chamar a API ao clicar no botão Converter', async () => {
    const { getByText } = render(<Converter />);
    const buttonConverter = getByText('Converter');
    fireEvent.click(buttonConverter);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  it('deve atualizar o estado com o resultado da conversão', async () => {
    const { getByText, getByPlaceholderText } = render(<Converter />);
    const inputValor = getByPlaceholderText('');
    const selectMoeda = getByText('Euro');
    const buttonConverter = getByText('Converter');
    fireEvent.change(inputValor, { target: { value: '100' } });
    fireEvent.change(selectMoeda, { target: { value: 'EUR' } });
    fireEvent.click(buttonConverter);
    await waitFor(() => {
      expect(getByPlaceholderText('')).toHaveValue('€ 100,00');
    });
  });

  it('deve exibir uma mensagem de erro se a API falhar', async () => {
    axios.get.mockRejectedValue(new Error('Erro ao consultar a API'));
    const { getByText } = render(<Converter />);
    const buttonConverter = getByText('Converter');
    fireEvent.click(buttonConverter);
    await waitFor(() => {
      expect(getByText('Erro ao consultar a API')).toBeInTheDocument();
    });
  });
});