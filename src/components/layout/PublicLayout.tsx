import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export default function PublicLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='grow flex flex-col'>
        <Outlet />
        </main>
        <Footer />
    </div>
  )
}
