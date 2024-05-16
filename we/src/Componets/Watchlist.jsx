import axios from 'axios';
import React, { useEffect } from 'react'

function Watchlist() {
    const userEmail = localStorage.getItem('userEmail');
    useEffect(() => {
        const fetchdata = async() => {
            try {
                const response = await axios.get('http://localhost:5000/watchlistdata',{
                    params :{
                        Email : userEmail
                    }
                })
                console.log(response.data);
            } catch (error) {
                alert(error);
            }
        }
        fetchdata()
    },[])
  return (
    <div>

    </div>
  )
}

export default Watchlist