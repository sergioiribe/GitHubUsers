import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GitHub } from './components/GitHub'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-[100vh] w-[100vw] flex'>
      <GitHub/>
    </div>
  )
}

export default App
