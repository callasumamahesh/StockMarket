import React, { useEffect, useState } from 'react'
import Homepage from './Componets/Homepage'
import {Route,Routes, useNavigate, useSearchParams} from 'react-router-dom'
import Signup from './Componets/Signup'
import CoinsPage from './Componets/CoinsPage'
import Watchlist from './Componets/Watchlist'
function App() {
  const navigate = useNavigate()
  const [email,setEmail] =useState(null)
  const user = localStorage.getItem('user')
  return (
    <>
    <header className='header'>
      <h1>Stock Market Coins</h1>
      {
        user ? (
        <div className='buttons'>
          <button className="primarybutton" onClick={() => (navigate('/watchlist'))}>Watch List</button>
          <div className='primarybutton' onClick={() => {localStorage.removeItem('user'),localStorage.removeItem('userEmail'),navigate('/')}}>Log Out</div>
        </div>
        
        ) : (
      <div className="buttons">
        <button className="primarybutton" onClick={() => navigate('/')}>Login</button>
        <button className="primarybutton" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
        )
      }
    </header>
    <Routes>
      <Route path="/" element={<Homepage setEmail={setEmail}/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/coins' element={<CoinsPage email={email}/>}></Route>
      <Route path='/watchlist' element={<Watchlist email={email}/>}></Route>
    </Routes>
    </>
  )
}

export default App