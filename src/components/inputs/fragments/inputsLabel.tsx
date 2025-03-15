import React from "react";
import { InputsProps } from "../main/inputsTypes";

/**
 * Extended interface for input properties, including optional ID and required flag.
 * @interface InputsPropsExtanded
 * @extends {InputsProps}
 * @property {string} [id] - The unique identifier for the input.
 * @property {boolean} [required] - Indicates whether the input is required.
 */
interface InputsPropsExtanded extends InputsProps {
    id?: string;
    required?: boolean;
};

/**
 * Component for rendering a label associated with an input.
 * Supports optional hiding of the label and a required indicator.
 *
 * @component
 * @param {InputsPropsExtanded} props - The properties of the component.
 * @param {boolean} props.withoutLabel - If true, hides the label.
 * @param {string} [props.id] - The ID of the associated input.
 * @param {string} props.label - The text of the label.
 * @param {boolean} [props.required] - If true, displays a required indicator.
 * @returns {JSX.Element} The rendered label component.
 */
const InputsLabel: React.FC<InputsPropsExtanded> = ({
    withoutLabel,
    id,
    label,
    required
}) => {
    return (
        <>
            {!withoutLabel && (
                /* Label for input accessibility */
                <label htmlFor={id} aria-label={label} className="font-semibold">
                    {label}
                    {required && (
                        <span 
                            data-tooltip-id="inputs-tooltip" 
                            data-tooltip-content="Required"
                            data-tooltip-place="top" 
                            className="text-red-300 pl-1"
                        >
                            *
                        </span>
                    )}
                </label>
            )}
        </>
    );
};

export default InputsLabel;
