import { useEffect, useState } from 'react';

export default function UserTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/users/all");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };

        fetchAllUsers();
    }, []);

    const countCompleted = (progress = {}) => {
        return Object.values(progress).reduce((acc, chapterLevels) => acc + chapterLevels.length, 0);
    };

    const handleRoleChange = async (uid, newRole) => {
        try {
            const res = await fetch("http://localhost:3001/api/users/change-role", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, role: newRole }),
            });

            if (res.ok) {
                setUsers(prev =>
                    prev.map(u => (u._id === uid ? { ...u, role: newRole } : u))
                );
            } else {
                console.error("Role change failed");
            }
        } catch (err) {
            console.error("Error updating role:", err);
        }
    };


    return (
        <div className="bg-neutral-950 w-full overflow-y-scroll rounded-lg max-w-8xl">
            <table className="table w-full rounded shadow">
                <thead className="text-white bg-neutral-900">
                    <tr>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className='text-center'>Lessons Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="hover:bg-neutral-900">
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src={user.profilePic || "https://ui-avatars.com/api/?name=U"}
                                            alt="User Avatar"
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="font-semibolds">{user.username || "Anonymous"}</td>
                            <td>{user.email || "N/A"}</td>
                            <td>
                                <div className="dropdown dropdown-right dropdown-center">
                                    <div tabIndex={0} role="button" className={`badge badge-soft cursor-pointer ${user.role === 'Admin' ? 'badge-error' : 'badge-accent'}`}>
                                        {user.role}
                                        <svg width="16" height="16" fill="none" stroke="white" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d='m6 9 6 6 6-6' />
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu ml-2 bg-[#121212] rounded-sm z-10 w-36 shadow-md mt-2">
                                        <li>
                                            <button
                                                onClick={() => handleRoleChange(user._id, 'User')}
                                                className="w-full bg-neutral-900 text-neutral-400 hover:bg-neutral-800 mb-2 hover:text-white"
                                            >
                                                <span>User</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleRoleChange(user._id, 'Admin')}
                                                className="w-full bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                            >
                                                <span>Admin</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td className='text-center'>{countCompleted(user.progress)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
