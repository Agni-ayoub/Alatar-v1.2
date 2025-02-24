import classNames from "classnames";
import React from "react";
import logo from "../../assets/logo/favicon.svg"
import SideNavHeader from "./fragments/sideNavHeader";
import SideNavBody from "./fragments/sideNavBody";
import routes from "../../master/routes.json"
import SideNavBottom from "./fragments/sideNavButton";

type SideNavProps = React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean;
    isLocked: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    placeHolderSize?: 'smaller' | 'small' | 'fit' | 'gros' | 'logo';
    placeHolderColor?: 'primary' | 'secondary' | 'tertiary';
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
            className={classNames('flex flex-col h-[calc(100%-2rem)] transition-all duration-200 rounded-lg fixed top-4 left-4 bg-[var(--sideNav-background)] shadow-[2px_2px_20px_var(--sideNav-shadow)] z-30 py-2 px-2 overflow-hidden select-none',
                {
                    'w-64' : isOpen || isLocked,
                    'w-14' : !(isOpen || isLocked),
                }
            )}
        {...props}>

            {/* Header */}
            <SideNavHeader 
                isOpen={isOpen}
                isLocked={isLocked} 
                placeHolder="Alatar"
                icon={<img className="w-9" src={logo} />} 
                placeHolderColor="secondary"
                placeHolderSize="logo"             
            />

            {/* Horizontal line */}
            <div className="px-2">
                <hr className="my-2 text-secondary" />
            </div>

            {/* Body */}
            <SideNavBody 
                routes={routes}
                isLocked={isLocked}
                isOpen={isOpen}
            />

            {/* Bottom */}
            <SideNavBottom 
                isLocked={isLocked}
                isOpen={isOpen}
            />
        </div>
    )
}

export default SideNav;