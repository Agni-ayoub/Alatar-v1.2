import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import useUndoShortcut from "../../../hooks/useUndoShortCut";
import { toast } from "react-toastify";
import FormHeader from "../fragments/formHeader";
import FormBody from "../fragments/formBody";
import { FormProps } from "./formTypes";  
import React from "react";

/**
 * A reusable form component with a header, input fields, and undo functionality.
 *
 * @component
 * @example
 * ```tsx
 * <Form
 *   formAction="Edit User"
 *   withFormAction={true}
 *   inputsData={inputExample}
 *   handleSubmit={onSubmit}
 *   originalData={initialData}
 *   setData={setFormData}
 * />
 * ```
 *
 * @param {FormProps} props - Props to configure the form.
 * @param {string} [props.formAction="Action"] - The form's title or action name.
 * @param {boolean} [props.withFormAction=true] - Determines whether the form title is displayed.
 * @param {string} [props.formActionClassName] - Additional classes for styling the form action.
 * @param {string} [props.inputsContainerClassName] - Additional classes for styling the input container.
 * @param {string} [props.formClassName] - Additional classes for styling the form.
 * @param {object} [props.originalData] - The original data before any modifications.
 * @param {Function} [props.handleSubmit] - Function to execute on form submission.
 * @param {boolean} [props.isLoading] - Loading state.
 * @param {Function} [props.setData] - Function to update the form's data.
 * @param {Array} [props.inputsData] - List of input field configurations.
 * @param {Function} [props.setBase64] - State to reset the base64 file.
 * @returns {JSX.Element} The rendered form component.
 */

const Form: React.FC<FormProps> = ({
    formAction = "Action",
    withFormAction = true,
    formActionClassName,
    inputsContainerClassName,
    formClassName,
    originalData,
    handleSubmit,
    setData,
    setBase64,
    isUndoButton,
    inputsData,
    isLoading,
}: FormProps) : React.JSX.Element => {
    const basicOriginalData = {
        name: "",
        phone: "",
        email: "",
        website: "",
    }

    /**
     * Handles the undo functionality by restoring original data.
     * Displays a success toast notification.
     */
    const handleUndo = () => {
        setData?.(originalData || basicOriginalData);
        setBase64?.(null);
        toast.success("Edits undone successfully.");
    };

    // Listen for Ctrl+Z to trigger undo action when isUndoButton is true wich indicates that <UndoButton disabled = {true} />.
    useUndoShortcut(handleUndo, isUndoButton);

    return (
        <form 
            onSubmit={handleSubmit} 
            className={twMerge(
                classNames(
                    "flex realtive items-center gap-4 flex-col w-full h-full overflow-hidden",
                    formClassName
                )
            )}
            aria-label="Form"
        >
            {/* Form header */}
            <FormHeader 
                formAction={formAction}
                formActionClassName={formActionClassName}
                withFormAction={withFormAction}
            />

            {/* Form body with inputs */}
            <FormBody 
                inputsContainerClassName={inputsContainerClassName}
                inputsData={inputsData}
                isUndoButton={isUndoButton}
                handleUndo={handleUndo}
                isLoading={isLoading}
            />
        </form>
    );
};

export default Form;
