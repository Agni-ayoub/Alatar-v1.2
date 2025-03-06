import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import Inputs from "../../inputs/inputs";
import Buttons from "../../buttons/buttons";
import React from "react";
import { FormProps } from "../main/formTypes";
import { inputExample } from "../main/inputsExample";

/**
 * FormBody component that dynamically renders input fields and action buttons.
 * It accepts an array of input configurations and applies accessibility features.
 *
 * @component
 * @example
 * ```tsx
 * <FormBody inputsData={customInputs} inputsContainerClassName="custom-class" />
 * ```
 * @param {FormProps} props - The props for the form body.
 * @param {string} [props.inputsContainerClassName] - Additional classes for styling the input container.
 * @param {Array} [props.inputsData=inputExample] - Array of input field configurations.
 * @returns {JSX.Element} The rendered FormBody component.
 */

const FormBody: React.FC<FormProps> = ({
  inputsContainerClassName,
  inputsData = inputExample,
}) => {
  return (
    <div className="overflow-scroll">
      {/* Container for input fields, allowing flexible and responsive layout */}
      <div
        className={twMerge(
          classNames("flex w-full px-3 flex-wrap gap-5", inputsContainerClassName)
        )}
        aria-live="polite" // Announce dynamic input changes for screen readers
      >
        {inputsData?.map((input, idx) => (
          <Inputs
            key={idx}
            withWobble={false}
            {...input.inputProps}
            className="h-10 w-full border-1"
            wrapperClassName="min-w-[17.5rem] flex-1"
            ErrorMessage="Error example @formError .example"
            aria-label={input.inputProps?.placeholder || "Input field"}
          />
        ))}
      </div>

      {/* Action buttons section */}
      <div className="flex justify-end gap-2 w-full py-2 px-4">
        {/* Undo button - allows the user to revert changes */}
        <Buttons
          type="button"
          icon="undo"
          placeHolderClassName="hidden"
          className="w-max bg-[var(--text-secondary)]/60"
          iconClassName="text-md"
          withTransform={false}
          aria-label="Undo changes"
        />

        {/* Submit button - saves form changes */}
        <Buttons
          type="submit"
          placeHolder="Save"
          className="w-max px-6 bg-[var(--text-secondary)]/60"
          aria-label="Save changes"
        />
      </div>
    </div>
  );
};

export default FormBody;
