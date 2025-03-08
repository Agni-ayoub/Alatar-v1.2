import classNames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";
import { FormProps } from "../main/formTypes";

/**
 * FormHeader component that displays a form action title if enabled.
 * The text can be styled dynamically based on provided props.
 *
 * @component
 * @example
 * ```tsx
 * <FormHeader withFormAction={true} formAction="Edit User" />
 * ```
 * @param {FormProps} props - The properties for the FormHeader component.
 * @param {boolean} [props.withFormAction] - Determines whether to display the form action text.
 * @param {string} [props.formAction] - The text content of the form header.
 * @param {string} [props.formActionClassName] - Additional class names for styling the header.
 * @returns {JSX.Element | null} The rendered FormHeader component.
 */
const FormHeader: React.FC<FormProps> = ({ 
  withFormAction, 
  formActionClassName, 
  formAction 
}) => {
  return withFormAction ? (
    <span
      className={twMerge(
        classNames(
          "text-xl text-secondary w-full py-2 border-b border-[var(--text-secondary)] px-2 rounded-md font-semibold tracking-[.3rem]",
          formActionClassName
        )
      )}
      role="heading" 
      aria-level={2}
    >
      {formAction}.
    </span>
  ) : null; // Returns null if `withFormAction` is false (prevents rendering an empty span)
};

export default FormHeader;
