import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <h1>
        "Menores" Class
      </h1>

      <div>
        <input type="text" placeholder='Kids names...'/>
        <input type="number" placeholder='Kids ages...'/>
        <input type="email" placeholder='Kids Emails...'/>
        <button> Add Kid</button>
      </div>
    </>
  )
}

export default App
