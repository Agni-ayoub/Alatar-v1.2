import { JSX } from "react";
import logo from "../../../assets/logo/logo.svg";
import Buttons from "../../../components/buttons/buttons";
import Inputs from "../../../components/inputs/inputs";

/**
 * Access Page
 * ---------------------
 * This component renders a login screen with username and password inputs,
 * an animated logo, and a login button.
 * 
 * @returns {JSX.Element} The login page UI.
 */
const AccessPage = () : JSX.Element => {


    return (
        <div className="flex flex-col items-center gap-2 justify-center h-screen w-screen">
            {/* Logo Section with Animation */}
            <div className="flex items-center animate-pulse justify-center gap-2 w-full">
                <img className="h-16" src={logo} alt="Alatar"/>
                <span className="text-3xl font-semibold tracking-[.3rem]">
                    Alatar
                </span>
            </div>
            {/* Login Card */}
            <div className="bg-[var(--background-secondary)]/50 backdrop-blur-sm sm:mb-0 mb-[6rem] relative w-[20rem] h-[24rem] sm:w-[35rem] sm:h-[22rem] p-6 rounded-md">
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
                    <form className="flex flex-col justify-around px-4 items-center w-full h-full" aria-labelledby="access-form-title">
                        {/* Form Inputs */}
                        <div className="flex flex-col gap-4 w-full">
                            <Inputs required type="text" label="User name" id="access-username" placeholder="Enter your user name" aria-required="true" />
                            <Inputs required label="Password" id="access-password" placeholder="Enter your password" type="password" aria-required="true" />
                        </div>
                        {/* Login Button */}
                        <Buttons type="submit" icon="login" className="bg-[var(--background-secondary)] max-w-[18rem] h-10" aria-label="Login" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccessPage;