import React from 'react'
import UserTable from './UserTable'

export default function AdminDashboard() {
    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            <div className='flex flex-col w-3/4 h-3/5 max-w-8xl items-start'>
                <p className='text-4xl font-bold mb-8 text-left'>Admin Dashboard</p>
                <UserTable />
            </div>
        </div>
    )
}
