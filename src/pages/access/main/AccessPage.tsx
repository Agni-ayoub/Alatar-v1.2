import { JSX } from "react";
import logo from "../../../assets/logo/logo.svg"
import Buttons from "../../../components/buttons/buttons";

const AccessPage = () : JSX.Element => {

    return(
        <div className="flex flex-col items-center gap-2 justify-center h-screen w-screen">
            <div className="flex items-center animate-pulse justify-center gap-2 w-full">
                <img className="h-16" src={logo} alt="Alatar"/>
                <span className="text-3xl font-semibold tracking-[.3rem]">
                    Alatar
                </span>
            </div>
            <div className="bg-[var(--background-secondary)]/50 backdrop-blur-sm sm:mb-0 mb-[6rem] relative w-[20rem] h-[24rem] sm:w-[35rem] sm:h-[22rem] p-6 rounded-md">
                <div className="w-[calc(100%-.8rem)] bg-[var(--background)]/75 h-[calc(100%-.8rem)] m-auto inset-0 border text-secondary absolute rounded-md animate-pulse shadow-[0_0_12px]" />
                <div className="flex flex-col gap-4 relative w-full h-full">
                    <span className="flex items-center gap-2">
                        <span className="text-2xl font-semibold">
                            Welcome back
                        </span> {""} 
                        <span className="px-2 py-1 rounded-lg bg-[var(--background-secondary)]">
                            Admin
                        </span>
                    </span>
                    <form className="flex flex-col justify-between p-4 items-center w-full h-full">
                        <div className="flex flex-col gap-4 w-full">
                            <label htmlFor="access-username" className="flex flex-col gap-3">
                                <span>
                                    User name
                                </span>
                                <input id="access-username" className="border-[var(--background-secondary)] placeholder:text-sm border-2 outline-0 rounded-md focus-within:border-[var(--text-secondary)]/70 h-10 w-full animate-wobble px-4" type="text" placeholder="Enter your user name" />
                            </label>
                            <label htmlFor="access-password" className="flex flex-col gap-3">
                                <span>
                                    Password
                                </span>
                                <input id="access-password" className="outline-0 border-[var(--background-secondary)] focus-within:border-[var(--text-secondary)]/70 placeholder:text-sm border-2 rounded-md h-10 animate-wobble w-full px-4" type="text" placeholder="Enter your password" />
                            </label>
                        </div>

                        {/* Login Button */}
                        <Buttons type="submit" icon="login" className="bg-[var(--background-secondary)] max-w-[18rem] h-10" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccessPage;
