import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Editor from './pages/Editor';
import User from './pages/User';
import UserBlogs from './pages/UserBlogs';
import Settings from './components/Settings';

function App() {
    const isloggedIn = localStorage.token !== undefined && localStorage.token !== null;
    return (
        <BrowserRouter>
            <Routes>
                {!isloggedIn ? (
                    <>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/*" element={<Navigate to="/signin" />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Blogs />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/write" element={<Editor edit={false} />} />
                        <Route path="/your-blogs" element={<UserBlogs />} />
                        <Route path="/edit/:id" element={<Editor edit={true} />} />
                        <Route path="/blog/:id" element={<Blog />} />
                        <Route path="/user/:id" element={<User />} />
                        <Route path="/*" element={<Navigate to="/blogs" />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}

export default App;