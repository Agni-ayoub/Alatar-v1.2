import { Dispatch } from "react";

/**
 * Defines properties for an individual input field.
 */
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Label for the input field (optional) */
  label?: string;
  /** Indicates whether the input has an error state */
  isError?: boolean;
  /** Error message to display when validation fails */
  ErrorMessage?: string;
};

/**
 * Represents the structure of an input field configuration.
 */
type InputData = {
  /** Label text for the input field (optional) */
  label?: string;
  /** The type of input (e.g., text, password, email) */
  type?: string;
  /** Additional class names for styling the input */
  className?: string;
  /** Determines if the input should be displayed without a label */
  withoutLabel?: boolean;
  /** Enables a wobble animation effect */
  withWobble?: boolean;
  /** Additional class names for styling the input wrapper */
  wrapperClassName?: string;
  /** Props passed directly to the input element */
  inputProps?: InputProps;
};

/**
 * Defines the structure of props for a form component.
 */
export interface FormProps {
  /** Text displayed as the form action title (optional) */
  formAction?: string;
  /** Determines if the form action title should be displayed */
  withFormAction?: boolean;
  /** Additional class names for styling the form action title */
  formActionClassName?: string;
  /** Additional class names for styling the input container */
  inputsContainerClassName?: string;
  /** Additional class names for styling the form */
  formClassName?: string;
  /** Array of input field configurations */
  inputsData?: InputData[];
  /** The data object that the form is working with */
  data?: object;
  /** Function to update the `data` state */
  setData?: Dispatch<React.SetStateAction<object>>;
  /** Original data object before modifications */
  originalData?: object;
  /** Function triggered when the form is submitted */
  handleSubmit?: () => void;
}
