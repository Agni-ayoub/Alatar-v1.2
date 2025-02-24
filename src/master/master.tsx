import React, { useState } from "react";
import SideNav from "../components/sideNav/sideNav";
import { Outlet } from "react-router-dom";

type MasterProps = object;

const Master: React.FC<MasterProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLocked] = useState(false);

    return(
        <div className="h-screen min-h-screen flex p-4">
            {/* SideNav */}
            <SideNav 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isLocked={isLocked}
            />

            {/* Outlet Container with header */}
            <div className="bg-[var(--outletcontainer-background)] rounded-2xl ml-[4rem] h-full w-full backdrop-blur-lg py-2 px-1 overflow-hidden flex gap-2 flex-col">
               <div className="bg-[var(--outletheader-background)] rounded-2xl w-full h-12">

               </div>
               <div className="flex-1 py-2 px-1 rounded-2xl">
                    <Outlet />
               </div>
            </div>
        </div>
    );
};

export default Master