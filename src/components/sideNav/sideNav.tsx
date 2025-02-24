import classNames from "classnames";
import React from "react";
import logo from "../../assets/logo/favicon.svg"
import SideNavHeader from "./fragments/sideNavHeader";

// Types for roots of the main route
interface RootRoute {
    name?: string;
    path?: string;
    icon?: string;
}

//Types for the main root
interface Route {
    name: string;
    path: string;
    icon: string;
    roots?: RootRoute[];
}

type SideNavProps = React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    isLocked: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    routes?: Route[];
};
  
const SideNav : React.FC<SideNavProps> = ({
    isOpen = false,
    isLocked = false,
    setIsOpen,
    ...props
})=>{
    
    return(
        <div 
            onMouseEnter={()=> setIsOpen(true)}
            onMouseLeave={()=> setIsOpen(false)}
            className={classNames('flex flex-col h-[calc(100%-2rem)] transition-all duration-200 rounded-lg fixed top-4 left-4 bg-[var(--sideNav-background)] shadow-[2px_2px_20px_var(--sideNav-shadow)] z-30 py-2 px-2 overflow-hidden',
                {
                    'w-72' : isOpen || isLocked,
                    'w-12' : !(isOpen || isLocked),
                }
            )}
        {...props}>
            {/* Header */}
            <SideNavHeader 
                isOpen={isOpen}
                isLocked={isLocked} 
                placeHolder="Alatar"
                icon={<img src={logo} />} 
                placeHolderColor="secondary"
                placeHolderSize="logo"             
            />
            {/* Horizontal line */}
            <div className="px-2">
                <hr className="my-2 text-secondary" />
            </div>
            {/* Body */}
            <div className="flex-1">
                
            </div>
        </div>
    )
}

export default SideNav;