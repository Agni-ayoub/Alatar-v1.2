import React from "react";
import { searchInputStyles } from "../../../utils/custumStyles";
import { icons } from "../../../utils/icons";
import { searchCompanyOptions } from "../main/searchSelectOptions";
import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";
import { InputsProps } from "../main/inputsTypes";

/**
 * Extended interface for input properties, adding password visibility toggle and search select handling.
 * @interface InputsPropsExtanded
 * @extends {InputsProps}
 * @property {string} [currentType] - The current type of the input (e.g., "password").
 * @property {() => void} switchEyes - Function to toggle password visibility.
 */
interface InputsPropsExtanded extends InputsProps {
    currentType?: string;
    switchEyes: () => void;
};

/**
 * Component for handling different input types with additional UI elements.
 * Supports password visibility toggle, search input, and select dropdown.
 *
 * @component
 * @param {InputsPropsExtanded} props - The properties of the component.
 * @param {string} props.type - The type of the input (e.g., "password", "search").
 * @param {string} [props.currentType] - The current type of the input (used for password visibility toggle).
 * @param {() => void} props.switchEyes - Function to toggle password visibility.
 * @param {(value: any) => void} [props.onSelectChange] - Function to handle select input change.
 * @param {any} [props.selectValue] - The current value of the select input.
 * @returns {JSX.Element} The rendered input component with additional UI elements.
 */
const InputsAdi: React.FC<InputsPropsExtanded> = ({
    type,
    currentType,
    switchEyes,
    onSelectChange,
    selectValue
}) => {
    return (
        <>
            {type === "password" && (
                <span 
                    onClick={() => switchEyes()} 
                    className="absolute right-0 top-0 flex items-center justify-center bg-transparent w-8 h-full text-xs hover:text-[var(--text-secondary)] active:text-[var(--text-tertiary)] cursor-pointer"
                >
                    {currentType === "password" ? <span>{icons["eye"]}</span> : <span>{icons["eyeOff"]}</span>} 
                </span>
            )}
            {type === "search" && (
                <span className="absolute right-0 top-0 flex items-center justify-center bg-transparent w-9 h-full text-xs hover:text-[var(--text-secondary)] active:text-[var(--text-tertiary)] cursor-pointer">
                    <IoSearchOutline className="text-lg" /> 
                </span>
            )}
            {type === "search" && (
                <div className="absolute top-0 right-9">
                    <Select 
                        styles={searchInputStyles}
                        options={searchCompanyOptions}
                        onChange={onSelectChange}
                        value={selectValue}
                        placeholder="Select..."
                    /> 
                </div>
            )}
        </>
    );
};

export default InputsAdi;