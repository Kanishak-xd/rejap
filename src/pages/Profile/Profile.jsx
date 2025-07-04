import { useEffect, useState } from 'react';
import ProfilePicture from './ProfilePicture';
import { auth } from '../../firebase';

export default function Profile() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [uid, setUid] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const user = auth.currentUser;
            if (!user) return;

            setUid(user.uid);

            try {
                const res = await fetch(`http://localhost:3001/api/users/${user.uid}`);
                const data = await res.json();
                setUsername(data.username);
                setEmail(data.email);
                setProfilePic(data.profilePic || '');
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUser();
    }, []);

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

            console.log("Uploaded to Cloudinary:", imageUrl);

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

    return (
        <div className="min-h-screen bg-[#121212] text-white font-outfit flex flex-col items-center pt-24">
            <ProfilePicture
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setPreviewUrl={setPreviewUrl}
                previewUrl={previewUrl || profilePic}
            />

            <div className="text-center mt-6">
                <h2 className="text-3xl font-semibold">{username}</h2>
                <p className="text-gray-400">{email}</p>
            </div>

            <button className="mt-6 bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition">
                Change Password
            </button>

            <button className="mt-3 text-red-500 hover:underline">
                Log Out
            </button>

            {selectedFile && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 px-6 py-3 rounded shadow-lg text-white z-50 animate-toast-slide-in">
                    <button onClick={handleSave}>Save Changes</button>
                </div>
            )}
        </div>
    );
}
