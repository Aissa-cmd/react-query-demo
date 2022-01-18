import { useState } from 'react'
import { useQuery } from 'react-query'

import './App.css'

function App() {
  const [page, setPage] = useState(1)

  const fetchData = async ({ queryKey }) => {
    const result = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
    return result.json()
  }

  const { data, status, isPreviousData } = useQuery(['characters', page], fetchData, {
    keepPreviousData: true,
  })

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  if(status === 'error') {
    return <div>Error</div>
  }

  return (
    <div className="App">
      {data.results.map(character => <div key={character.id}>{character.name}</div>)}
      <div style={{
        marginTop: 10
      }}>
        <button 
          disabled={page <= 1}
          onClick={() => setPage(pg => pg - 1)}
        >Previout</button>
        <button
          disabled={isPreviousData || !data.info.next}
          onClick={() => setPage(pg => pg + 1)}
        >Next</button>
      </div>
    </div>
  )
}

export default App
