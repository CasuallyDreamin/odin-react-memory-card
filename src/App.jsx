import './App.css'
import { Header } from './components/Header'
import { Body } from './components/Body'
import { useState } from 'react'

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <Body 
        score={score} 
        setScore={setScore} 
        bestScore={bestScore} 
        setBestScore={setBestScore} 
      />
    </>
  )
}

export default App;
