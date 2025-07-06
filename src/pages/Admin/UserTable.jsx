import { useEffect, useState } from 'react';

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [roleFilter, setRoleFilter] = useState([]);
    const [minLessons, setMinLessons] = useState('');
    const [maxLessons, setMaxLessons] = useState('');
    const [sortAZ, setSortAZ] = useState(false);
    const [sortZA, setSortZA] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/users/all");
                const data = await res.json();
                setUsers(data);
                setFilteredUsers(data);
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

    // Apply Filters
    useEffect(() => {
        let filtered = [...users];

        // Filter by role
        if (roleFilter.length > 0) {
            filtered = filtered.filter(u => roleFilter.includes(u.role));
        }

        // Filter by lessons completed
        filtered = filtered.filter(u => {
            const completed = countCompleted(u.progress);
            const min = parseInt(minLessons) || 0;
            const max = parseInt(maxLessons) || Infinity;
            return completed >= min && completed <= max;
        });

        // Filter by search term (username)
        if (searchTerm.trim()) {
            filtered = filtered.filter(u =>
                (u.username || "").toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort A-Z & Z-A
        if (sortAZ) {
            filtered.sort((a, b) => (a.username || "").localeCompare(b.username || ""));
        } else if (sortZA) {
            filtered.sort((a, b) => (b.username || "").localeCompare(a.username || ""));
        }

        setFilteredUsers(filtered);
    }, [roleFilter, minLessons, maxLessons, sortAZ, sortZA, searchTerm, users]);

    const toggleRole = (role) => {
        setRoleFilter(prev =>
            prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
        );
    };

    const resetFilters = () => {
        setRoleFilter([]);
        setMinLessons('');
        setMaxLessons('');
        setSortAZ(false);
        setSearchTerm('');
    };

    const handleSortAZ = () => {
        setSortAZ(true);
        setSortZA(false);
    };

    const handleSortZA = () => {
        setSortAZ(false);
        setSortZA(true);
    };

    return (
        <div className="bg-neutral-950 w-full rounded-lg max-w-8xl max-h-118 overflow-y-auto">
            {/* Filters */}
            <div className="flex gap-4 sm:gap-6 p-4">
                <p className='font-bold'>FILTERS</p>
                {/* Role Filter */}
                <details className="group relative">
                    <summary className="flex items-center gap-2 border-b border-gray-300 pb-1 text-gray-300 cursor-pointer">
                        <span className="text-sm font-medium">Role</span>
                        <span className="transition-transform group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </summary>
                    <div className="z-10 w-64 divide-y divide-neutral-800 rounded border border-neutral-800 bg-neutral-900 shadow-sm group-open:absolute group-open:start-0 group-open:top-8">
                        <div className="flex justify-between px-3 py-2">
                            <span className="text-sm text-gray-200">
                                {roleFilter.length || 0} Selected
                            </span>
                            <button onClick={() => setRoleFilter([])} className="text-sm underline text-gray-400 hover:text-white">
                                Reset
                            </button>
                        </div>
                        <fieldset className="p-3">
                            <div className="flex flex-col gap-3">
                                {["Admin", "User"].map(role => (
                                    <label key={role} className="inline-flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={roleFilter.includes(role)}
                                            onChange={() => toggleRole(role)}
                                            className="checkbox checkbox-sm"
                                        />
                                        <span className="text-sm text-white">{role}</span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </details>

                {/* Lessons Filter */}
                <details className="group relative">
                    <summary className="flex items-center gap-2 border-b border-gray-300 pb-1 text-gray-300 cursor-pointer">
                        <span className="text-sm font-medium">Lessons Completed</span>
                        <span className="transition-transform group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </summary>
                    <div className="z-10 w-64 rounded border border-neutral-800 bg-neutral-900 shadow-sm group-open:absolute group-open:start-0 group-open:top-8 p-3">
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-white">
                                Min
                                <input
                                    type="number"
                                    value={minLessons}
                                    onChange={(e) => setMinLessons(e.target.value)}
                                    className="w-full mt-1 rounded bg-neutral-800 text-white p-1 border border-neutral-700"
                                />
                            </label>
                            <label className="text-sm text-white">
                                Max
                                <input
                                    type="number"
                                    value={maxLessons}
                                    onChange={(e) => setMaxLessons(e.target.value)}
                                    className="w-full mt-1 rounded bg-neutral-800 text-white p-1 border border-neutral-700"
                                />
                            </label>
                        </div>
                        <button
                            className="mt-3 text-sm underline text-neutral-400 hover:text-white"
                            onClick={() => {
                                setMinLessons('');
                                setMaxLessons('');
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </details>

                {/* Sort A-Z / Z-A */}
                <details className="group relative">
                    <summary className="flex items-center gap-2 border-b border-gray-300 pb-1 text-gray-300 cursor-pointer">
                        <span className="text-sm font-medium">Sort</span>
                        <span className="transition-transform group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </summary>
                    <div className="z-10 w-48 rounded border border-neutral-800 bg-neutral-900 shadow-sm group-open:absolute group-open:start-0 group-open:top-8 p-3 flex flex-col gap-3">
                        <label className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={sortAZ}
                                onChange={handleSortAZ}
                            />
                            <span className="text-sm text-white">Username A–Z</span>
                        </label>
                        <label className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={sortZA}
                                onChange={handleSortZA}
                            />
                            <span className="text-sm text-white">Username Z–A</span>
                        </label>

                        <button onClick={() => {
                            setSortAZ(false);
                            setSortZA(false);
                        }} className="text-sm underline text-left text-neutral-400 hover:text-white">
                            Reset
                        </button>
                    </div>
                </details>

                {/* Search Bar */}
                <div>
                    <label htmlFor="Search">
                        <div className="relative w-60">
                            <input
                                type="text"
                                id="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by username..."
                                className="w-full h-7 pl-4 rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-neutral-900 dark:text-white"
                            />

                            <span className="absolute inset-y-0 right-2 grid w-8 place-content-center">
                                <button
                                    type="button"
                                    aria-label="Submit"
                                    className="rounded-sm p-1.5 text-gray-700 transition-colors dark:text-gray-200"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Table */}
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
                    {filteredUsers.map(user => (
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
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className={`badge badge-soft cursor-pointer ${user.role === 'Admin' ? 'badge-error' : 'badge-accent'}`}
                                    >
                                        {user.role}
                                        <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
