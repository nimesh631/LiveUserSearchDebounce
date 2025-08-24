import { useState } from 'react'
import LiveAPISearch from './components/LiveAPISearch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LiveAPISearch/>
    </>
  )
}

export default App
