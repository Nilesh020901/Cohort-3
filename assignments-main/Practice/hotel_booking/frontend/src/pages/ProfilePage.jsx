function ProfilePage() {
    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
            <p>Profile Page Content Goes Here</p>
        </div>
    );
}

export default ProfilePage;

// import { useState, useEffect } from "react";
// import axios from "axios";

// const ProfilePage = () => {
//     const [user, setUser] = useState({ name: "", email: "" });
//     const [password, setPassword] = useState("");
//     const [preview, setPreview] = useState(null);
//     const [file, setFile] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         axios.get("/api/auth", {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//         .then(res => setUser({name: res.data.name, email: res.data.email }))
//         .catch(err => console.log(err));
//     }, [])

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await axios.put("api/upload",
//                 { ...user, password },
//                 { headers: { Authorization: `Bearer ${token}` }}
//             );
//             alert('Profile updated successfully');
//         } catch (error) {
//             alert('Error updating profile');
//         }
//         setLoading(false);
//     };

//     const handleImageUpload = async () => {
//         if (!file) return;

//         const formData = new FormData();
//         formData.append("profile_pic", file);

//         try {
//             await axios.put("/api/upload", formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data"
//                 }
//             });
//             alert('Profile picture updated');
//         } catch (error) {
//             alert('Error uploading profile picture');
//         }
//     };

//     return(
//         <div className="max-w-xl mx-auto p-4">
//             <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

//             <form onSubmit={handleUpdate} className="space-y-4">
//                 <input 
//                     type="text"
//                     placeholder="Name"
//                     className="w-full p-2 border rounded"
//                     value={user.name}
//                     onChange={(e)=>setUser({ ...user, name: e.target.value })} 
//                 />
//                 <input 
//                     type="email"
//                     placeholder="New Email"
//                     className="w-full p-2 border rounded"
//                     value={user.email}
//                     onChange={(e) => setUser({ ...user, email: e.target.value })}
//                 />
//                 <input 
//                     type="password"
//                     placeholder="New Password"
//                     className="w-full p-2 border rounded"
//                     value={password}
//                     onChange={(e)=> setPassword(e.target.value)}
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded">
//                         {loading ? "Updating...": "Update Profile"}
//                     </button>
//             </form>

//             <div className="mt-6">
//                 <h3 className="text-lg font-medium mb-2">Profile Picture</h3>
//                 <input 
//                     type="file"
//                     accept="image/*"
//                     onChange={(e)=> {
//                         setFile(e.target.files[0]);
//                         setPreview(URL.createObjectURL(e.target.files[0]));
//                     }} 
//                 />
//                 {preview && (
//                     <img src={preview} alt="Preview" className="w-32 h-32 mt-3 rounded-full object-cover" />
//                 )}
//                 <button
//                     onClick={handleImageUpload}
//                     className="bg-green-500 text-white mt-3 px-4 py-2 rounded">
//                         Upload Picture
//                     </button>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;