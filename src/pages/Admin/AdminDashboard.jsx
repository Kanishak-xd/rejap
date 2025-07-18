import React from 'react'
import UserTable from './UserTable'
import AuditLogs from './AuditLogs'

export default function AdminDashboard() {
    return (
        <div className='w-full flex items-center flex-col pb-20'>
            <div className='flex flex-col w-3/4 h-3/5 max-w-8xl pt-35 items-start'>
                <p className='text-5xl font-semibold mb-10 font-outfit text-left'>Admin Dashboard</p>
                <p className='text-3xl font-medium mb-8 font-outfit text-left'>All Users</p>
                <UserTable />
                <div className="divider mt-15 mb-15"></div>
                <p className='text-3xl font-medium mb-8 font-outfit text-left'>Audit Logs</p>
                <AuditLogs />
            </div>
        </div>
    )
}
