import React from "react"
import {useNavigate} from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center"> 
        <img className="h-8 items-center" src="/logo512.png" alt="Logo" />
        <span className="text-1xl font-bold pl-4 sm:text-2xl">Expense Tracker</span>
        </a>
        <div className="items-center space-x-4">
          <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
           onClick={()=>{navigate("/")}}>Home</button>
          <button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          onClick={()=>{navigate('/profile')}}>Profile</button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg" onClick={()=>{
            navigate("/Login")
          }}>Login</button>
          </div>
      </nav>
    </div>

  )
}


export default Navbar;