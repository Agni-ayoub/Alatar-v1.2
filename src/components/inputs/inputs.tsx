import classNames from "classnames";
import { JSX, useState } from "react";
import { twMerge } from "tailwind-merge";
import { icons } from "../../utils/icons";
import { IoSearchOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";

type InputsProps = React.InputHTMLAttributes<HTMLInputElement> & {   
    label?: string;
    type?: string;
    className?: string;
    withoutLabel?: boolean;
    withWobble?: boolean;
    wrapperClassName?: string;
    isError?: boolean;
    ErrorMessage?: string;
    containerClassName?: string;
    fileImageSrc? : string;
};

/**
 * Inputs Component
 * ---------------------
 * A reusable input component with an optional label and accessibility support.
 * 
 * @prop {string} [label="Label"] - The label text for the input field.
 * @prop {string} [className] - Additional classes for styling the input field.
 * @prop {string} [type] - Input type.
 * @prop {React.InputHTMLAttributes<HTMLInputElement>} props - Standard input attributes.
 * @prop {boolean} [withoutLabel = false] - Remove the label.
 * @prop {boolean} [withWobble = true] - Adds the wobble effect.
 * @prop {string} [wrapperclassName = string] - Wrapper/Container classname.
 * @prop {string} [ErrorMessage = string] - error message to diplay.
 * 
 * @returns {JSX.Element} The input component with a label.
 */

const Inputs = ({ 
    className,
    label = "Label",
    type = "text",
    withoutLabel = false,
    withWobble = true,
    wrapperClassName,
    containerClassName,
    ErrorMessage,
    fileImageSrc,
    ...props 
} : InputsProps) : JSX.Element => {
    const [currentType, setCurrentType] = useState<string>(type);

    const switchEyes = () => {
        setCurrentType(currentType === "password" ? "text" : "password");
    };

    return (
        <label htmlFor={props.id} className={twMerge(classNames("flex flex-col gap-3",
            wrapperClassName
        ))}>
            {
                !withoutLabel && 
                /* Label for input accessibility */
                <span aria-label={label} className="font-semibold">
                    {label}{props.required && 
                    <span data-tooltip-id="inputs-tooltip" data-tooltip-content="Required"
                    data-tooltip-place="top" className="text-red-300 pl-1">*</span>}
                </span>
            }
            <div className={classNames("relative focus-within-animate-wobble",
                {
                    'animate-wobble' : withWobble
                }, containerClassName
            )}>
                {
                    type === 'file' && 
                        <img className="object-contain h-[85%] w-fit -z-1 absolute inset-0 m-auto rounded-md" src={fileImageSrc || undefined} />
                }

                {/* Input field with styles and accessibility */}
                <input
                    type={currentType}
                    className={twMerge(classNames(
                        "border-[var(--background-secondary)] text-sm border-2 outline-0 rounded-md focus-within:border-[var(--text-secondary)]/70 w-full px-4 disabled:bg-[var(--text-tertiary)]/40 disabled:line-through disabled:text-[var(--text-tertiary)] disabled:placeholder:line-through",
                            {
                                'pr-6' : type === "password",
                                'animate-error focus-within:border-[var(--negative)]' : ErrorMessage,
                            },
                        className
                    ))}
                    aria-label={label} 
                    {...props}
                />
                <span className="text-xs transition-all font-semibold text-[var(--negative)]">
                    {ErrorMessage && ErrorMessage}
                </span>
                {
                    type === "password" && 
                        <span onClick={() => switchEyes()} className="absolute right-0 top-0 flex items-center justify-center bg-transparent w-8 h-full text-xs hover:text-[var(--text-secondary)] active:text-[var(--text-tertiary)] cursor-pointer">
                            {
                                currentType === "password" ? 
                                    <span>
                                        {icons["eye"]}
                                    </span>:   
                                    <span>
                                        {icons["eyeOff"]}
                                    </span>   
                            } 
                        </span>   
                }
                {
                    type === "search" &&
                    <span className="absolute right-0 top-0 flex items-center justify-center bg-transparent w-9 h-full text-xs hover:text-[var(--text-secondary)] active:text-[var(--text-tertiary)] cursor-pointer">
                        <IoSearchOutline className="text-lg" /> 
                    </span> 
                }
            </div>
            {/* Tooltip */}
            <Tooltip 
                opacity={8}
                id="inputs-tooltip" 
                style={{ backgroundColor: "var(--tooltip-background)", color: "var(--text-primary)", "zIndex" : 10, padding: "0.6rem",paddingTop: "0.2rem", paddingBottom: "0.2rem"}}
                delayHide={200}
                place="right"
                className='p-0'
            />
        </label>
    );
};

Inputs.search = ({ ...props } : InputsProps) => {
    return(
        <div>
            <Inputs {...props} type="search" className="h-9 shadow-[0_5px_12px_var(--shadow)] border-1 bg-[var(--sideNav-background)] border-[var(--text-secondary)] pr-8" placeholder="Seach a vehicle ..." withoutLabel />
        </div>
    );
}

export default Inputs;
