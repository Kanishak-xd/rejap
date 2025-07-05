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
                            <td>{user.role}</td>
                            <td className='text-center'>{countCompleted(user.progress)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
