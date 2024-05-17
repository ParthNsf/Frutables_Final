import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {

  const isAuthenticated = true
  return (
    <>
      {isAuthenticated ? <Outlet /> : <Navigate to="/" replace />}
    </>
  )
}

export default PrivateRoutes
