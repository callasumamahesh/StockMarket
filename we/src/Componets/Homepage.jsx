import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'
import { useNavigate } from 'react-router-dom'

function Homepage({setEmail}) {

  const navigate = useNavigate()
  const [details,setDetails] = useState({
    Email:'',
    Password:''
  })

  const handleChange = (e) => {
    const {name,value} = e.target;
    setDetails((prev) => ({
      ...prev,
      [name] : value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.get(`http://localhost:5000/user`,{
        params: {
          Email: details.Email,
          Password: details.Password
        }
      })
      if(res.data.message === 'User Exict'){
        // setEmail(details.Email)
        localStorage.setItem('userEmail',details.Email)
        localStorage.setItem('user',true)
        navigate('/coins')
      }
      else{
        alert(res.data.message)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='LoginPage'>
      <div className="login">
        <h1>Login</h1>
        <input type="text" className='inputtext' placeholder='Enter Email' name ="Email" onChange={(e) => handleChange(e)}/>
        <input type="password" placeholder='Enter Password' className='inputtext' name='Password' onChange={(e) => handleChange(e)}/>
        <button className='primarybutton' onClick={(e) => handleSubmit(e)}>Login</button>
        <span>No account <span className = "link" onClick={() => navigate('/signup')}>Sign up</span></span>
      </div>
    </div>
  )
}

export default Homepage