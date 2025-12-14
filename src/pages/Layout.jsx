import React from 'react'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="flex">
            <Sidebar />

            <main className="flex-1 p-5">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout