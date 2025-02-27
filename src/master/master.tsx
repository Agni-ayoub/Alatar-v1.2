import React, { useEffect, useState } from "react";
import SideNav from "../components/sideNav/main/sideNav";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import SideNavButton from "../components/sideNav/fragments/sideNavButton";
import Profile from "../components/profile/profile";
import { useSelector } from "react-redux";
import { User } from "../features/sliceTypes";

type MasterProps = object;
type RootState = {
    auth: {
        user: User;
    }
}

const Master: React.FC<MasterProps> = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const user : User = useSelector((state: RootState) => state.auth.user);

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
        <div className="h-screen min-h-screen flex p-4">
            {/* SideNav */}
            <SideNav 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
            />

            {/* Outlet Container with header */}
            <div className={classNames('bg-[var(--outletcontainer-background)] rounded-2xl h-full w-full backdrop-blur-lg py-2 px-1 overflow-hidden flex gap-2 flex-col transition-all duration-200',
                {
                    'sm:ml-[4rem]' : !isLocked,
                    'sm:ml-[16.5rem]': isLocked
                }
            )}>
                {/* Header */}
                <div className="flex justify-between items-center bg-[var(--outletheader-background)] py-1 px-4 rounded-2xl w-full h-12">

                    {/* Button that locks the sideNav*/}
                    <SideNavButton 
                        isLocked={isLocked}
                        setIsLocked={setIsLocked}
                    />
                    
                    {/* Profile (username, email, avatar) */}
                    <Profile 
                        username={user?.username}
                        email={user?.email}
                        avatar={<img src={user?.avatar} />}
                    />

                </div>

                {/* Body */}
                <div className="flex-1 py-2 px-1 rounded-2xl">
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default Master