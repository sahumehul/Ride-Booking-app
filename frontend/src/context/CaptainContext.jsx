import React, { createContext, useState } from 'react'


export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {
    const [captain,setCaptain] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const value={
        captain,
        setCaptain,
        isLoading,
        setIsloading,
    }

  return (
    <CaptainDataContext.Provider value={value} >
        {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext