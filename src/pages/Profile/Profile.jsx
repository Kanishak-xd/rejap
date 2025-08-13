import React, { useState, useEffect } from 'react';
import ProfilePicture from './ProfilePicture';
import { useAuth } from '../../context/AuthContext.jsx';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth } from '../../firebase.jsx';
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [uid, setUid] = useState('');
    const [showResetPopup, setShowResetPopup] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [status, setStatus] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [progress, setProgress] = useState({});
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const HIRAGANA_TOTAL_LEVELS = 10;
    const KATAKANA_TOTAL_LEVELS = 10;
    const KANJI_TOTAL_LEVELS = 18;
    const TIME_TOTAL_LEVELS = 16;

    const getChapterProgress = (chapterKey, totalLevels) => {
        const chapterLevels = progress[chapterKey] || [];
        const completed = Array.isArray(chapterLevels) ? chapterLevels.length : 0;
        const percentage = Math.min((completed / totalLevels) * 100, 100);
        return { completed, percentage };
    };

    const { completed: hDone, percentage: hWidth } = getChapterProgress("hiragana", HIRAGANA_TOTAL_LEVELS);
    const { completed: kDone, percentage: kWidth } = getChapterProgress("katakana", KATAKANA_TOTAL_LEVELS);
    const { completed: kjDone, percentage: kjWidth } = getChapterProgress("kanji", KANJI_TOTAL_LEVELS);
    const { completed: tDone, percentage: tWidth } = getChapterProgress("time", TIME_TOTAL_LEVELS);

    useEffect(() => {
        if (loading || !user?.uid) return;

        const fetchUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user.uid}`);
                if (!res.ok) throw new Error("User fetch failed");
                const data = await res.json();

                setUid(user.uid);
                setUsername(data.username || "Unnamed");
                setEmail(data.email || user.email || "No email");
                setProfilePic(data.profilePic || '');
                setResetEmail(data.email || user.email || '');
                setCreatedAt(data.createdAt);
                setProgress(data.progress || {});
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        };

        fetchUser();
    }, [user, loading]);

    if (loading) {
        return <div className="text-white text-center pt-24">Loading profile...</div>;
    }

    const handleSave = async () => {
        if (!selectedFile || !uid) return;

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", "unsigned_upload");

            const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dykzzd9sy/upload", {
                method: "POST",
                body: formData,
            });

            const data = await cloudRes.json();
            const imageUrl = data.secure_url;

            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/upsert`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uid,
                    email,
                    username,
                    profilePic: imageUrl,
                }),
            });

            // Update logs
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uid,
                    username,
                    action: "changed profile picture"
                }),
            });

            setProfilePic(imageUrl);
            setSelectedFile(null);
            setPreviewUrl(null);
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false);
            }, 3000);
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Failed to upload image.");
        }
    };

    const handleReset = async () => {
        if (!resetEmail) {
            setStatus("Please enter your email.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setStatus("Reset link sent to your email.");
        } catch (err) {
            setStatus(err.message);
        }
    };

    const handleLogout = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await signOut(auth);
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logs`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        uid: user.uid,
                        username,
                        action: "logged out"
                    }),
                });
            }
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-outfit flex flex-col items-center pt-16 sm:pt-20 px-4 sm:px-6">
            <div className='w-full max-w-4xl flex flex-col'>
                <p className='font-bold text-3xl sm:text-4xl md:text-5xl pb-6 sm:pb-7'>PROFILE</p>
                <div className='flex bg-[#171717] items-center w-full min-h-24 sm:min-h-40 md:min-h-49 h-auto rounded-lg sm:flex-row gap-4 sm:gap-0'>
                    <ProfilePicture
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        setPreviewUrl={setPreviewUrl}
                        previewUrl={previewUrl || profilePic}
                    />
                    <div className="text-left flex flex-col gap-0 sm:gap-3 pl-0 sm:pl-5">
                        <p className="text-neutral-200 text-xl sm:text-4xl md:text-5xl font-semibold">{username || "Unnamed"}</p>
                        <p className="text-neutral-300 text-lg sm:text-2xl md:text-3xl font-medium">
                            Joined {createdAt ? new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A'}
                        </p>
                        <p className="text-neutral-400 text-[0.7rem] sm:text-lg md:text-2xl">{email || "No email"}</p>
                    </div>
                </div>
                <div className="divider w-full pt-8 sm:pt-10 pb-7 sm:pb-9"></div>
                <p className='font-bold text-3xl sm:text-4xl md:text-5xl pb-6 sm:pb-7'>PROGRESS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 w-full">
                    <div className="bg-neutral-900 rounded-lg flex flex-row gap-2 h-24 sm:h-auto items-center justify-start">
                        <div className="flex justify-center items-center py-3 pl-4">
                            <div className='w-17 h-17 sm:w-16 sm:h-16 md:w-18 md:h-18 flex justify-center items-center rounded-md bg-[#BFECFF]'>
                                <img src='https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/torii_sbc71f.webp' className='bg-cover w-11 h-11' alt='Torii gate' />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center py-3 pl-4 flex-1">
                            <p className='font-semibold text-base sm:text-xl'>Chapter 1: Hiragana</p>
                            <p className='font-regular text-sm sm:text-lg'>Levels completed: {hDone}</p>
                            <div className="w-5/6 sm:w-5/7 mt-1 sm:mt-2 rounded-xs bg-black flex justify-start items-center h-2 sm:h-3">
                                <div className="bg-[#BFECFF] h-[70%] p-0.5 leading-none mx-0.5 rounded-xs" style={{ width: `${hWidth}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-neutral-900 rounded-lg flex flex-row gap-2 h-24 sm:h-auto items-center justify-start">
                        <div className="flex justify-center items-center py-3 pl-4">
                            <div className='w-17 h-17 sm:w-16 sm:h-16 md:w-18 md:h-18 flex justify-center items-center rounded-md bg-[#CDC1FF]'>
                                <img src='https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/sushi_ss7txh.webp' className='bg-cover w-11 h-11' alt='Sushi' />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center py-3 pl-4 flex-1">
                            <p className='font-semibold text-base sm:text-xl'>Chapter 2: Katakana</p>
                            <p className='font-regular text-sm sm:text-lg'>Levels completed: {kDone}</p>
                            <div className="w-5/6 sm:w-5/7 mt-1 sm:mt-2 rounded-xs bg-black flex justify-start items-center h-2 sm:h-3">
                                <div className="bg-[#CDC1FF] h-[70%] p-0.5 leading-none mx-0.5 rounded-xs" style={{ width: `${kWidth}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-neutral-900 rounded-lg flex flex-row gap-2 h-24 sm:h-auto items-center justify-start">
                        <div className="flex justify-center items-center py-3 pl-4">
                            <div className='w-17 h-17 sm:w-16 sm:h-16 md:w-18 md:h-18 flex justify-center items-center rounded-md bg-[#FFF6E3]'>
                                <img src='https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/sensu_iusuf7.webp' className='bg-cover w-11 h-11' alt='Sensu fan' />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center py-3 pl-4 flex-1">
                            <p className='font-semibold text-base sm:text-xl'>Chapter 3: Kanji</p>
                            <p className='font-regular text-sm sm:text-lg'>Levels completed: {kjDone}</p>
                            <div className="w-5/6 sm:w-5/7 mt-1 sm:mt-2 rounded-xs bg-black flex justify-start items-center h-2 sm:h-3">
                                <div className="bg-[#FFF6E3] h-[70%] p-0.5 leading-none mx-0.5 rounded-xs" style={{ width: `${kjWidth}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-neutral-900 rounded-lg flex flex-row gap-2 h-24 sm:h-auto items-center justify-start">
                        <div className="flex justify-center items-center py-3 pl-4">
                            <div className='w-17 h-17 sm:w-16 sm:h-16 md:w-18 md:h-18 flex justify-center items-center rounded-md bg-[#FFCCEA]'>
                                <img src='https://res.cloudinary.com/dykzzd9sy/image/upload/v1751840508/maneki-neko_cugqw9.webp' className='bg-cover w-11 h-11' alt='Maneki-neko' />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center py-3 pl-4 flex-1">
                            <p className='font-semibold text-base sm:text-xl'>Chapter 4: Time</p>
                            <p className='font-regular text-sm sm:text-lg'>Levels completed: {tDone}</p>
                            <div className="w-5/6 sm:w-5/7 mt-1 sm:mt-2 rounded-xs bg-black flex justify-start items-center h-2 sm:h-3">
                                <div className="bg-[#FFCCEA] h-[70%] p-0.5 leading-none mx-0.5 rounded-xs" style={{ width: `${tWidth}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider w-full pt-8 sm:pt-10 pb-7 sm:pb-9"></div>
                <p className='font-bold text-3xl sm:text-4xl md:text-5xl pb-6 sm:pb-7'>ACCOUNT</p>
                <button
                    className="flex flex-row gap-2 w-48 text-neutral-500 text-base sm:text-xl text-left hover:text-neutral-300 cursor-pointer transition"
                    onClick={() => setShowResetPopup(true)}
                >
                    Change password
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 sm:mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                    </svg>
                </button>
                <button
                    onClick={handleLogout}
                    className="mt-3 pb-16 flex flex-row gap-2 w-26 text-[#c13d4a] text-base sm:text-xl text-left hover:text-red-500 cursor-pointer transition"
                >
                    Log out
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5 sm:mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                    </svg>
                </button>

                {selectedFile && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-neutral-800 px-3 py-2 rounded shadow-lg text-white z-50 flex gap-4 sm:gap-6 items-center">
                        <button
                            onClick={handleSave}
                            className="font-semibold bg-white h-7 sm:h-8 px-2 text-black hover:cursor-pointer hover:scale-105 rounded-sm text-sm sm:text-base transition"
                        >
                            Save changes
                        </button>
                        <button
                            onClick={() => {
                                setSelectedFile(null);
                                setPreviewUrl(null);
                            }}
                            className="font-semibold text-white hover:underline hover:cursor-pointer text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {showSuccessToast && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                        <div className="bg-neutral-900 text-white flex gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded shadow-lg animate-fade-in-down text-sm sm:text-base">
                            Updated successfully
                            <svg className="w-5 sm:w-6 h-5 sm:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                            </svg>
                        </div>
                    </div>
                )}

                {showResetPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                        <div className="bg-[#1e1e1e] p-5 sm:p-6 rounded-lg w-[90%] max-w-sm text-white shadow-xl">
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Reset Password</h3>
                            <input
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-[#2a2a2a] text-white focus:outline-none text-sm sm:text-base"
                            />
                            <div className="flex justify-between">
                                <button
                                    className="bg-white font-bold px-3 sm:px-4 py-1 sm:py-1 rounded hover:bg-neutral-400 text-black transition hover:cursor-pointer text-sm sm:text-base"
                                    onClick={handleReset}
                                >
                                    Send Link
                                </button>
                                <button
                                    className="text-red-400 hover:underline hover:cursor-pointer text-sm sm:text-base"
                                    onClick={() => {
                                        setShowResetPopup(false);
                                        setStatus('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                            {status && (
                                <p className="mt-3 text-sm text-green-400">{status}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
