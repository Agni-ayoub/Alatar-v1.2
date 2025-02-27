import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { byChoiseSet, tokenClear } from '../features/api/auth'
import { useLogOutMutation } from '../features/api/apiSlice';
import { toast } from 'react-toastify';

const useLogOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logOut, {isLoading}] = useLogOutMutation({});

    const handleLogOut = async () => {
        try {
            const response = await logOut({}).unwrap();

            if (response.status === 'success') {
                dispatch(byChoiseSet(true));
                dispatch(tokenClear());
                toast.success('Logged out successfully', { autoClose: 1000 });
            }
        } catch (error) {
            console.error(error);
        }

        navigate('/access');
    };

    return { handleLogOut, isLoading };
};

export default useLogOut;