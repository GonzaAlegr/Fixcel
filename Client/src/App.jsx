import { useState } from 'react'
import Layouts from "./Components/Layouts"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Layouts />
    </>
  )
}

export default App
