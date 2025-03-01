import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { byChoiseSet, tokenClear } from '../features/api/auth';
import { useLogOutMutation } from '../features/api/apiSlice';
import { toast } from 'react-toastify';
import { AppDispatch } from '../app/store';

/**
 * Custom hook that handles user logout functionality.
 *
 * @returns {Object} An object containing the `handleLogOut` function and `isLoading` state.
 *
 * @property {Function} handleLogOut - Function to log out the user. If the `soft` parameter is true, it logs out the user without displaying a warning. It also dispatches actions to clear the user token.
 * sets a choice flag, shows a success toast message, and navigates to the access page.
 * @property {boolean} isLoading - Boolean indicating whether the logout process is currently loading.
 */
const useLogOut = (): { handleLogOut: (soft: boolean) => Promise<void>; isLoading: boolean } => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [logOut, { isLoading }] = useLogOutMutation();

    const handleLogOut = async (soft: boolean): Promise<void> => {
        try {
            const response = await logOut().unwrap();

            if (response.status === 'success') {
                dispatch(byChoiseSet(soft));
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