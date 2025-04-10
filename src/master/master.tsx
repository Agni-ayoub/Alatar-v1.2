import React, { useEffect, useState } from "react";
import SideNav from "../components/sideNav/main/sideNav";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import SideNavButton from "../components/sideNav/fragments/sideNavButton";
import Profile from "../components/profile/profile";
import { useSelector } from "react-redux";
import { User } from "../features/sliceTypes";
import usePreloadedImage from "../hooks/usePreloadedImage";
import AnimatedBackground from "../components/animated/animatedBackground";
import ThemeSwitcher from "../components/inputs/themeSwitcher";

type MasterProps = object;
type RootState = {
    auth: {
        user: User;
    }
}
type LoadingState = {
    loading: {
       isLoading : boolean;
    }
}

const Master: React.FC<MasterProps> = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const user : User = useSelector((state: RootState) => state.auth.user);
    const { imageElement } = usePreloadedImage({ src: user?.avatar, alt: "User's Avatar" });
    const apiLoading = useSelector((state : LoadingState) => state.loading.isLoading);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Shift") {
                setIsLocked((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return(
        <div className="h-screen min-h-screen overflow-hidden flex p-4">
            <div className={classNames("bg-[var(--text-secondary)] animate-loading top-0 left-0 h-0.5 fixed z-[99999] transition-all duration-700",
                {
                    'w-full animate-loading' : apiLoading,
                    'hidden' : !apiLoading
                }
            )}/>
            <div onClick={() => setIsLocked(!isLocked)} className={classNames(
                {
                    'backdrop-blur-sm w-full h-full fixed z-20 inset-0 m-auto sm:hidden' : isLocked
                }
            )} />

            {/* Background (animated: waves) */}
            <AnimatedBackground />

            {/* SideNav */}
            <SideNav 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
            />

            {/* Outlet Container with header */}
            <div className={classNames('bg-[var(--outletcontainer-background)] rounded-2xl h-full w-full backdrop-blur-md py-2 px-1 overflow-hidden flex gap-2 flex-col transition-all duration-200',
                {
                    'sm:ml-[4rem]' : !isLocked,
                    'sm:ml-[16.5rem]': isLocked
                }
            )}>
                {/* Header */}
                <div className="flex justify-between items-center bg-[var(--sideNav-background)] z-50 py-1 px-4 rounded-2xl w-full h-12">

                    {/* Button that locks the sideNav*/}
                    <SideNavButton 
                        isLocked={isLocked}
                        setIsLocked={setIsLocked}
                    />
                    
                    <div className="flex-row-reverse flex items-center gap-2">
                        {/* Profile (username, email, avatar) */}
                        <Profile 
                            username={user?.username}
                            email={user?.email}
                            avatar={imageElement}
                        />
                        {/* Theme mode switcher ("dark" | "light") */}
                        <ThemeSwitcher />
                    </div>
                </div>

                {/* Body */}
                <div className="reltive min-h-full rounded-2xl">
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default Master