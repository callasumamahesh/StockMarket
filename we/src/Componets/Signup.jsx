import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
function Signup() {
    const navigate = useNavigate()
    const [details,setDetails] = useState({
        Name:'',
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
      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          let res = await axios.post('http://localhost:5000/userstorage',details)
          const data = res.data.message;
          alert(data)
          navigate('/')
        } catch (error) {
          console.log(error);
        }
      }    
    return (
        <div className='LoginPage'>
            <form className="login">
                <h1>Sign Up</h1>
                <input type="text" className='inputtext' placeholder='Enter Your Name' name="Name" onChange={(e) => handleChange(e)} required/>
                <input type="text" className='inputtext' placeholder='Enter Email' name="Email" onChange={(e) => handleChange(e)} required/>
                <input type="password" placeholder='Enter Password' className='inputtext' name='Password' onChange={(e) => handleChange(e)} required/>
                <button className='primarybutton' onClick={(e) => handleSubmit(e)}>Sign Up</button>
                <span>Already a User <span className = "link" onClick={() => navigate('/')}>Sign In</span></span>
            </form>
        </div>
    )
}

export default Signup