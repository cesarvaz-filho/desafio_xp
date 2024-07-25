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

/*
1 - Considerando que essa chamada realmente fosse para uma API real, o trecho 
'fetch('https://api.example.com/data [api.example.com]')' tem um espaço desnecessário antes do colchete. 
Essa notação é usada quando se quer pegar um item de um array pela posição.
2 - Os itens 'item.id [item.id]' e 'item.name [item.name]' não precisam buscar pela posição usando a notação de colchete.
Para chegar a esta conclusão eu criei um array dados fake que continha os pares de chave-valor 'id' e 'name'.

const dadosFake = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
];

Em seguida, passei o array como valor da variável 'informação' para verificar se a lista seria atualizada.
Como a API de exemplo não retorna dados, será lançado erro na função fetch e a variável 'informação' ficará vazia.

const fetchDataAsync = async () => {
  try {
    const informacao = dadosFake;
    setInformacao(dadosFake);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

Para melhorar legibilidade e manutenção do código, fiz as ações abaixo:

1 - Todo o código precisou ser indentado para ficar explícito a relação de hierarquia do código.
2 - Separei a lógica do fetch em uma função chamada fetchData que realiza a chamada a API e retorna uma promessa. 
Isso torna o código mais legível e fácil de manter.
3 - A função fetchData foi chamada no useEffect, que é responsável por chamar a função.
4 - Usei async/await em vez de then/catch. O uso de async/await torna o código mais legível e fácil de entender. 
5 - Usei o bloco try/catch para lidar com erros de forma mais explícita.
6 - Usei a constante API_URL para armazenar o link da API. Definir constantes para URLs e outros valores que não mudam, 
torna o código mais legível e fácil de manter.
7 - Usei JSX mais conciso para tornar o código mais legível.
8 - Usei o padrão de naming convention camelCase para variáveis e mantive o PascalCase para o componente App. 
Se fosse criar mais componentes manteria o PascalCase para estes elementos.
9 - Adicionei comentarios para explicar o que o código faz e como funciona. Isso tornará o código mais legível e fácil de manter.
10 - Usei o ESLint para garantir que o código siga um padrão consistente e esteja formatado corretamente.
*/