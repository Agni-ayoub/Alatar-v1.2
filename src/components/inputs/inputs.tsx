import classNames from "classnames";
import { JSX, useState } from "react";
import { twMerge } from "tailwind-merge";
import { icons } from "../../utils/icons";

/**
 * Inputs Component
 * ---------------------
 * A reusable input component with an optional label and accessibility support.
 * 
 * @prop {string} [label="Label"] - The label text for the input field.
 * @prop {string} [className] - Additional classes for styling the input field.
 * @prop {string} [type] - Input type.
 * @prop {React.InputHTMLAttributes<HTMLInputElement>} props - Standard input attributes.
 * 
 * @returns {JSX.Element} The input component with a label.
 * 
 * @example
 * // Basic usage:
 * <Inputs id="username" label="Username" placeholder="Enter your username" />
 * 
 * @example
 * // Without a label:
 * <Inputs id="password" type="password" placeholder="Enter password" aria-label="Password" />
 * 
 * @example
 * // Custom styles:
 * <Inputs className="border-red-500" label="Email" placeholder="Enter email" />
 */

type InputsProps = React.InputHTMLAttributes<HTMLInputElement> & {   
    label?: string;
    type?: string;
    className?: string;
};

const Inputs = ({ 
    className,
    label = "Label",
    type = "text",
    ...props 
} : InputsProps) : JSX.Element => {
    const [currentType, setCurrentType] = useState<string>(type);

    const switchEyes = () => {
        setCurrentType(currentType === "password" ? "text" : "password");
    };

    return (
        <label htmlFor={props.id} className="flex flex-col gap-3">
            {/* Label for input accessibility */}
            <span aria-label={label} className="text-sm font-medium">
                {label}{props.required && <span className="text-red-300">*</span>}
            </span>
            <div className="relative">
                {/* Input field with styles and accessibility */}
                <input
                    type={currentType}
                    className={twMerge(classNames(
                        "border-[var(--background-secondary)] text-sm border-2 outline-0 rounded-md focus-within:border-[var(--text-secondary)]/70 h-12 w-full px-4 disabled:bg-[var(--text-tertiary)]/40 disabled:line-through disabled:text-[var(--text-tertiary)] disabled:placeholder:line-through",
                            {'pr-6' : type === "password"},
                        className
                    ))}
                    aria-label={label} 
                    {...props}
                />
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
            </div>
        </label>
    );
};

export default Inputs;
