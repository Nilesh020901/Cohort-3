import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRoutes({ children }) {
    const { user } = useAuth();
    if (!user || !user.isAdmin) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default AdminRoutes;