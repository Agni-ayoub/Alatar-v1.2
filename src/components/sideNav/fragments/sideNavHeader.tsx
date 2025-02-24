import classNames from "classnames";
import React, { JSX } from "react";

interface SideNavHeaderProps {
    isOpen : boolean;
    isLocked : boolean;
    placeHolder: string;
    icon?: string | React.ReactNode | JSX.Element;
    placeHolderSize?: 'smaller' | 'small' | 'fit' | 'gros' | 'logo' ;
    placeHolderColor?: 'primary' | 'secondary' | 'tertiary';
}
const tailwindSafeList = {
    'primary' : 'text-primary',
    'secondary' : 'text-secondary',
    'tertiary' : 'text-tertiary',
    'smaller' : 'text-xs',
    'small' : 'text-sm',
    'fit' : 'text-md',
    'gros' : 'text-xl',
    'logo' : 'text-2xl font-semibold',
}

const SideNavHeader : React.FC<SideNavHeaderProps> = ({
    isOpen,
    isLocked,
    placeHolder,
    icon,
    placeHolderColor = "primary",
    placeHolderSize = "fit",
}) => {
    
    return(
        <div className="flex gap-4 w-full h-10">
            <div className="flex items-center justify-center shrink-0 w-8 min-w-8 h-full">
                {icon}
            </div>
            <div className={classNames("transition-all duration-300 flex-1 h-full overflow-hidden",
                {
                    'max-w-0' : !(isOpen || isLocked),
                    'max-w-3xs' : isOpen || isLocked,
                }
            )}>
                <span className={classNames('whitespace-nowrap duration-500 transition-all h-full flex tracking-widest items-center',
                    {
                        'invisible translate-x-10' : !(isOpen || isLocked),
                        'translate-x-0 visible' : isOpen || isLocked,
                        [tailwindSafeList[placeHolderColor]] : placeHolderColor,
                        [tailwindSafeList[placeHolderSize]] : placeHolderSize,
                    }
                )}>
                     {placeHolder}
                </span>
            </div>
        </div>
    );
};

export default SideNavHeader;