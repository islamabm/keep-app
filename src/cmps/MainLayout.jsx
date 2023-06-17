import React from 'react'
import { AppHeader } from '../cmps/AppHeader'
import { AppNav } from '../cmps/AppNav'
import { Outlet } from 'react-router-dom'

export function MainLayout({ children }) {
  return (
    <div>
      <AppHeader />
      <div className="main-layout">
        <AppNav />
        <Outlet />
      </div>
    </div>
  )
}
