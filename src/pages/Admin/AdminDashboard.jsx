import React from 'react'
import UserTable from './UserTable'
import AuditLogs from './AuditLogs'

export default function AdminDashboard() {
    return (
        <div className='flex items-center flex-col w-full bg-neutral-950'>
            <div className='flex flex-col w-full sm:w-11/12 md:w-3/4 max-w-8xl items-start px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 md:pt-35'>
                <p className='text-2xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8 md:mb-10 font-outfit text-left'>Admin Dashboard</p>
                <p className='text-xl sm:text-2xl md:text-3xl font-medium mb-4 sm:mb-6 md:mb-8 font-outfit text-left'>All Users</p>
                <div className="w-full overflow-x-auto">
                    <UserTable />
                </div>
                <div className="divider mt-10 sm:mt-12 md:mt-15 mb-10 sm:mb-12 md:mb-15"></div>
                <p className='text-xl sm:text-2xl md:text-3xl font-medium mb-4 sm:mb-6 md:mb-8 font-outfit text-left'>Audit Logs</p>
                <div className="w-full overflow-x-auto">
                    <AuditLogs />
                </div>
                <div className='w-full pt-16 sm:pt-24 md:pt-30'>
                </div>
            </div>
        </div>
    )
}
