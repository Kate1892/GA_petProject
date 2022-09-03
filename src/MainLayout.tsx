import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, NavBar } from './components'

const MainLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout
