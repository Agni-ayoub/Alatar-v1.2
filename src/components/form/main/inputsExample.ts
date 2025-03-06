import { FormProps } from "./formTypes";

/**
 * Example input configurations for form fields.
 * These demonstrate different input types and validation rules.
 */
export const inputExample: FormProps["inputsData"] = [
  {
    inputProps: {
      type: "text",
      placeholder: "Enter your name",
      required: true,
      label: "Label 1",
    },
  },
  {
    inputProps: {
      type: "email",
      placeholder: "Enter your email",
      required: true,
      label: "Label 2",
      isError: true,
      ErrorMessage: "Error example @Form provided this error",
    },
  },
  {
    inputProps: {
      type: "password",
      placeholder: "Enter your password",
      minLength: 6,
      required: true,
      label: "Label 3",
    },
  },
  {
    inputProps: {
      type: "text",
      placeholder: "Enter your address",
      maxLength: 50,
      label: "Label 4",
    },
  },
];
