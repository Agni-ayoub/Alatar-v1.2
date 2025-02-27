import React, { useEffect } from 'react';
import { User } from '../features/sliceTypes';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((state: { auth: { user: User | null } }) => state.auth.user);

    useEffect(() => {
        if (user === null) {
            navigate('/access', { replace: true });
            toast.warning("Authauntication required.");
        }
    }, [user, navigate]);

    if (user === null) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;