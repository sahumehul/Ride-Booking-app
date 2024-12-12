import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({children}) => {
    const {captain, setCaptain} = useContext(CaptainDataContext)
    const [isLoading ,setIsloading] = useState(true)

    const token  = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(()=>{
      if(!token){
        navigate("/captain-login")
      }

      axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      }).then((response)=>{
        setCaptain(response.data.captain)
        setIsloading(false)
      }).catch(err=>{
        localStorage.removeItem('token')
        navigate('/captain-login')
      })
    },[token])


    if(isLoading){
      return <div>Loading...</div>
    }
  return (
    <>{children}</>
  )
}

export default CaptainProtectWrapper