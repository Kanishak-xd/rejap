import { useEffect, useState } from 'react';
import ProfilePicture from './ProfilePicture';
import { useAuth } from '../../context/AuthContext';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

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

    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading || !user?.uid) return;

        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/users/${user.uid}`);
                if (!res.ok) throw new Error("User fetch failed");
                const data = await res.json();

                setUid(user.uid);
                setUsername(data.username || "Unnamed");
                setEmail(data.email || user.email || "No email");
                setProfilePic(data.profilePic || '');
                setResetEmail(data.email || user.email || '');
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

            await fetch("http://localhost:3001/api/users/upsert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uid,
                    email,
                    username,
                    profilePic: imageUrl,
                }),
            });

            setProfilePic(imageUrl);
            setSelectedFile(null);
            setPreviewUrl(null);
            alert("Profile picture updated!");
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
            await signOut(auth);
            window.location.href = '/';
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white font-outfit flex flex-col items-center pt-24">
            <ProfilePicture
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setPreviewUrl={setPreviewUrl}
                previewUrl={previewUrl || profilePic}
            />

            <div className="text-center mt-6">
                <h2 className="text-3xl font-semibold">{username || "Unnamed"}</h2>
                <p className="text-gray-400">{email || "No email"}</p>
            </div>

            <button
                className="mt-6 bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => setShowResetPopup(true)}
            >
                Change Password
            </button>

            <button
                onClick={handleLogout}
                className="mt-3 text-red-500 hover:underline"
            >
                Log Out
            </button>

            {selectedFile && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 px-6 py-3 rounded shadow-lg text-white z-50 animate-toast-slide-in">
                    <button onClick={handleSave}>Save Changes</button>
                </div>
            )}

            {showResetPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-[#1e1e1e] p-6 rounded-lg w-[90%] max-w-sm text-white shadow-xl">
                        <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
                        <input
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full mb-3 px-4 py-2 rounded bg-[#2a2a2a] text-white focus:outline-none"
                        />
                        <div className="flex justify-between">
                            <button
                                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                                onClick={handleReset}
                            >
                                Send Link
                            </button>
                            <button
                                className="text-red-400 hover:underline"
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
    );
}
