export default function ProfilePicture({ selectedFile, setSelectedFile, previewUrl, setPreviewUrl }) {
    const defaultPic = "/default-avatar.webp";

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative group w-40 h-40 rounded-full overflow-hidden">
            <img
                src={previewUrl || defaultPic}
                alt="Profile"
                className="object-cover w-full h-full"
            />

            {/* Overlay */}
            <label className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-sm text-white font-medium">
                Edit Profile Picture
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>
        </div>
    );
}
