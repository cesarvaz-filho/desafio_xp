import React, { useState, useEffect } from 'react';

const API_URL = 'https://api.example.com/data[api.example.com]';

//Função que controla a chamada da API e retorna um JSON de resposta ou log
//de erro se a requisição falhar.
const fetchData = () => {
  return fetch(API_URL)
    .then(response => response.json())
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
};

function App() {
  const [informacao, setInformacao] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Função executada ao carregar a página.
  useEffect(() => {
    //Função assíncrona para chamar API e alterar o estado das variáveis que 
    //controlam o array da dados e a flag de loading. Faz tratamento de erros.
    const fetchDataAsync = async () => {
      try {
        const informacao = await fetchData();
        setInformacao(informacao);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchDataAsync();
  }, []);


  //JSX condicional. Exibe mensagem de loading apenas quando isLoading for true.
  if (isLoading) {
    return <p>Loading...</p>;
  }

  //Exibe lista com os dados da API.
  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {informacao.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );

}

export default App;
