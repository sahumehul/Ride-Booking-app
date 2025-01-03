import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    // const [isLoading, setIsloading] = useState(true)
    const {user, setUser} = useContext(UserDataContext)
    const navigate = useNavigate()
    useEffect(()=>{
      if(!token){
        navigate("/login")
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    }).then((response)=>{
      setUser(response.data.user)
      // setIsloading(false)
    }).catch(err=>{
      localStorage.removeItem('token')
      navigate('/login')
    })

    },[token])

    
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectWrapper