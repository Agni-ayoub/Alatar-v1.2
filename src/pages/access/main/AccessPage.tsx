import { JSX, useEffect } from "react";
import { useState } from "react";
import { useGetUserQuery, useLogInMutation } from "../../../features/api/apiSlice";
import logo from "../../../assets/logo/logo.svg";
import Buttons from "../../../components/buttons/buttons";
import Inputs from "../../../components/inputs/inputs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { tokenClear, tokenSet, userSet } from "../../../features/api/auth";
import { User } from "../../../features/sliceTypes";
import { useNavigate } from "react-router-dom";

interface Credentials {
    email: string;
    password: string;
}

/**
 * AccessPage Component
 * ---------------------
 * This component renders a login screen with email and password inputs,
 * an animated logo, and a login button. It handles user authentication
 * and redirects to the dashboard upon successful login.
 * 
 * @component
 * @example
 * return (
 *   <AccessPage />
 * )
 * 
 * @returns {JSX.Element} The login page UI.
 */

const AccessPage = () : JSX.Element => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("ayoub@access.com");
    const [password, setPassword] = useState("password");
    const token = useSelector((state: { auth: { token: string | null, user: User | null } }) => state.auth.token);
    const [logIn, { isLoading }] = useLogInMutation();
    const { data } = useGetUserQuery(token, {skip: !token});

    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        if(data?.status === "success"){
            dispatch(userSet(data.user));
            navigate("/dashboard", {replace: true});
        };
    }, [dispatch, data, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const credentials : Credentials = { email, password };

        try {
            const responce = await logIn(credentials).unwrap();

            if(responce?.status === "success"){
                dispatch(tokenSet(responce.token));
                toast(`Welcome back ${responce.user.username.toUpperCase()}`, 
                {position : "top-center"});
            };
            
        } catch (error) {
            dispatch(tokenClear());
            console.error("Failed to log in:", error);
        };
    };

    return (
        <div className="flex flex-col items-center gap-2 justify-center h-screen w-screen">
            {/* Logo Section with Animation */}
            <div className="flex items-center justify-center gap-2 w-full">
                <img className="h-24" src={logo} alt="Alatar"/>
                <span className="text-3xl font-semibold tracking-[.3rem]">
                    Alatar
                </span>
            </div>
            {/* Login Card */}
            <div className="bg-[var(--background-secondary)]/50 backdrop-blur-sm sm:mb-0 mb-[6rem] relative w-[85%] h-[24rem] sm:w-[35rem] sm:h-[22rem] p-6 rounded-md">
                <div className="w-[calc(100%-.8rem)] bg-[var(--background)]/75 h-[calc(100%-.8rem)] m-auto inset-0 border text-secondary absolute rounded-md animate-pulse shadow-[0_0_12px]" />
                <div className="flex flex-col gap-4 relative w-full h-full">
                    {/* Welcome Message */}
                    <span className="flex items-center gap-2" aria-live="polite">
                        <span className="text-2xl font-semibold">
                            Welcome back
                        </span> {""} 
                        <span className="px-2 py-1 rounded-lg bg-[var(--background-secondary)]">
                            Admin
                        </span>
                    </span>
                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="flex flex-col min-h-[15rem] justify-around px-4 items-center w-full h-full" aria-labelledby="access-form-title">
                        {/* Form Inputs */}
                        <div className="flex flex-col gap-4 w-full">
                            <Inputs required type="text" label="Email" id="access-email" placeholder="Enter your email" aria-required="true" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Inputs required label="Password" id="access-password" placeholder="Enter your password" type="password" aria-required="true" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {/* Login Button */}
                        <Buttons isLoading={isLoading} type="submit" icon="login" className="bg-[var(--background-secondary)] max-w-[18rem] h-10" aria-label="Login" disabled={isLoading} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccessPage;