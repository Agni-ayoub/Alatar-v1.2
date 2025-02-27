import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

import { useGetUserQuery } from '../features/api/apiSlice';
import { byChoiseSet, userSet } from '../features/api/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}
type RootState = {
    auth: {
        token: string | null;
        byChoice: boolean;
    };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const byChoice = useSelector((state: RootState) => state.auth.byChoice);
    const { data } = useGetUserQuery(token, { skip: !token });

    useEffect(() => {
        if (data && data.status === "success") {
            dispatch(userSet(data.user));
        }
    }, [dispatch, data]);

    if (!token) {
        if (!byChoice) {
            toast.warning("Authentication required.");
            dispatch(byChoiseSet(true));
        }
        return <Navigate to="/access" replace />;
    }

    if (!children) {
        return null;
    }

    return children;
};

export default ProtectedRoute;