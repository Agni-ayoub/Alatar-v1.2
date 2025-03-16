import classNames from "classnames";
import { JSX, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Tooltip } from "react-tooltip";
import { InputsProps } from "./inputsTypes";
import InputsAdi from "../fragments/InputsAdi";
import InputsLabel from "../fragments/inputsLabel";

/**
 * Inputs Component
 * ---------------------
 * A reusable input component with an optional label, accessibility support, and additional UI elements.
 *
 * @component
 * @param {InputsProps} props - The properties of the input component.
 * @param {string} [props.label="Label"] - The label text for the input field.
 * @param {string} [props.className] - Additional classes for styling the input field.
 * @param {string} [props.type="text"] - The type of the input field (e.g., "text", "password", "search").
 * @param {boolean} [props.withoutLabel=false] - Determines whether the label should be hidden.
 * @param {boolean} [props.withWobble=true] - Enables a wobble animation effect when focused.
 * @param {string} [props.wrapperClassName] - Additional classes for the input wrapper.
 * @param {string} [props.containerClassName] - Additional classes for the input container.
 * @param {string} [props.ErrorMessage] - The error message to display.
 * @param {string} [props.fileImageSrc] - The source URL for an image preview (used in file inputs).
 * @param {any} [props.selectValue] - The selected value for the search dropdown.
 * @param {(value: any) => void} [props.onSelectChange] - Callback function for handling dropdown selection.
 * @returns {JSX.Element} The rendered input component.
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
    selectValue,
    onSelectChange,
    ...props 
} : InputsProps) : JSX.Element => {
    const [currentType, setCurrentType] = useState<string>(type);

    /**
     * Toggles the input type between "password" and "text".
     */
    const switchEyes = () => {
        setCurrentType(currentType === "password" ? "text" : "password");
    };
            
    return (
        <div className={twMerge(classNames("flex relative flex-col gap-3", wrapperClassName))}>
            {/* Label for the input field */}
            <InputsLabel 
                withoutLabel={withoutLabel}
                label={label}
                id={props.id}
                required={props.required}
            />

            {/* Input field container with additional styles */}
            <label htmlFor={props.id} className={classNames("relative focus-within-animate-wobble", {
                    'animate-wobble' : withWobble
                }, containerClassName
            )}>
                {/* Image preview for file input */}
                {type === 'file' && (
                    <img 
                        className="object-contain h-[85%] w-fit -z-1 absolute inset-0 m-auto rounded-md" 
                        src={fileImageSrc || undefined}
                    />
                )}

                {/* Main input field with styles and accessibility */}
                <input
                    type={currentType}
                    id={props.id}
                    className={twMerge(classNames(
                        "border-[var(--background-secondary)] text-sm border-2 outline-0 rounded-md focus-within:border-[var(--text-secondary)]/70 w-full px-4 disabled:bg-[var(--text-tertiary)]/40 disabled:line-through disabled:text-[var(--text-tertiary)] disabled:placeholder:line-through placeholder:text-xs",
                        {
                            'pr-6': type === "password", // Adjust padding for password input
                            'animate-error focus-within:border-[var(--negative)]': ErrorMessage,
                        },
                        className
                    ))}
                    aria-label={label} 
                    {...props}
                />

                {/* Error message display */}
                {ErrorMessage && (
                    <span className="text-xs transition-all font-semibold text-[var(--negative)]">
                        {ErrorMessage}
                    </span>
                )}
            </label>
            
            {/* Additional elements (password toggle, search icon, select dropdown) */}
            <InputsAdi 
                currentType={currentType}
                type={type}
                switchEyes={switchEyes}
                onSelectChange={onSelectChange}
                selectValue={selectValue}
            />
            
            {/* Tooltip for additional information */}
            <Tooltip 
                opacity={8}
                id="inputs-tooltip" 
                style={{ backgroundColor: "var(--tooltip-background)", color: "var(--text-primary)", zIndex: 10, padding: "0.6rem", paddingTop: "0.2rem", paddingBottom: "0.2rem" }}
                delayHide={200}
                place="right"
                className='p-0'
            />
        </div>
    );
};

/**
 * A pre-configured search input component.
 * 
 * @param {InputsProps} props - The input properties.
 * @returns {JSX.Element} A search input field with predefined styles.
 */
Inputs.search = ({ ...props } : InputsProps): JSX.Element => {
    return (
        <div>
            <Inputs 
                type="search" 
                className="h-9 shadow-[0_5px_12px_var(--shadow)] border-1 bg-[var(--sideNav-background)] border-[var(--text-secondary)] pr-[8rem]" 
                placeholder="Search an Item..." 
                withoutLabel 
                {...props}
            />
        </div>
    );
};

export default Inputs;
