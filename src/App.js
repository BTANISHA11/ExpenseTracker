import React from 'react'
import ExpenseTracker from './pages/ExpenseTracker.js'
import Header from "./components/Header"
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<ExpenseTracker/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App