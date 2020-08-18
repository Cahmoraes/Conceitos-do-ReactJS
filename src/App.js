import React from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = React.useState([])

  React.useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response)
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Desafio React ${Date.now()}`,
      "url": "https://github.com/Cahmoraes/Modulo-1-Conceitos-Node",
      "techs": ["node", "javascript", "2"]
    })
    const repo = response.data
    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    if (response.status === 204) {
      setRepositories(repositories.filter(repo => repo.id !== id))
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
               </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
