import classNames from "classnames";
import React, { JSX } from "react";
import { twMerge } from "tailwind-merge";
import { icons } from "../../utils/icons";

type ButtonsProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    placeHolder?: string; 
    isLoading?: boolean; 
    className?: string; 
    placeHolderClassName?: string; 
    iconClassName?: string; 
    icon?: string; 
    withTransform?: boolean;
};

/**
 * Buttons Component
 * ---------------------
 * A reusable button component with optional icons, loading state, and accessibility support.
 * 
 * @prop {string} [icon] - The name of the icon (must match a key in the `icons` object).
 * @prop {boolean} [isLoading=false] - If true, the button shows a loading state.
 * @prop {string} [className] - Additional classes for the button.
 * @prop {string} [placeHolder="Buttons"] - The text or element displayed inside the button.
 * @prop {string} [placeHolderClassName] - Additional classes for the placeholder text.
 * @prop {string} [iconClassName="text-2xl"] - Additional classes for the icon.
 * @prop {boolean} [withTransform="true"] - Adds translate-x effect.
 * @prop {React.ButtonHTMLAttributes<HTMLButtonElement>} props - Standard button attributes.
 * 
 * @returns {JSX.Element} The button component.
 * 
 * @example
 * // Basic usage:
 * <Buttons placeHolder="Click Me" />
 * 
 * @example
 * // With an icon:
 * <Buttons placeHolder="Save" icon="save" />
 * 
 * @example
 * // In a loading state:
 * <Buttons placeHolder="Loading..." isLoading={true} />
 * 
 * @example
 * // Custom styles:
 * <Buttons className="bg-blue-500 text-white" placeHolder="Custom Button" />
 * 
 * @example
 * // Without the transleate-x effect:
 * <Buttons withTransform={false} />
 */

const Buttons = ({ 
    iconClassName = "text-2xl", 
    placeHolderClassName, 
    icon, 
    isLoading = false, 
    placeHolder = "Buttons", 
    className, 
    withTransform = true,
    ...props 
} : ButtonsProps) : JSX.Element => {

    return (
        <button
            className={twMerge(classNames(
                'flex px-2 py-1 rounded-md hover:opacity-80 active:opacity-50 cursor-pointer items-center transition-colors justify-center w-full group disabled:pointer-events-none disabled:bg-[var(--text-tertiary)]/20 bg-slate-500',
                className,
            ))}
            aria-busy={isLoading} 
            aria-label={placeHolder} 
            type={props.type || 'button'}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <span className="button-loader" aria-live="polite" />
            ) : (
                <div className={classNames('flex items-center gap-1 transition-transform duration-200',
                    {
                        'group-hover:translate-x-2' : withTransform
                    }
                )}>
                    {icon && <span className={twMerge("text-2xl", iconClassName)}>{icons[icon]}</span>}
                    <span className={twMerge("text-base", placeHolderClassName)}>
                        {placeHolder}
                    </span>
                </div>
            )}
        </button>
    );
};

export default Buttons;