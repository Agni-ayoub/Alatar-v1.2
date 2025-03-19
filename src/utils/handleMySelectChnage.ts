import React, { SetStateAction } from "react";
import { OptionType } from "../components/inputs/main/inputsTypes";
import { MultiValue, SingleValue } from "react-select";
import { useSearchParams } from "react-router-dom";

/**
 * Represents an object where keys are strings and values are arrays of strings.
 */
export type ExpectedObj = Record<string, string[]>; 

/**
 * Props for handling the filter change function.
 */
interface HandleFilterChangeProps {
    /** The name of the select input (e.g., "status"). */
    selectName: "status";

    /** Function to update the filters state. */
    setFilters: React.Dispatch<SetStateAction<ExpectedObj>>;
}

/**
 * Custom hook to handle changes in a React Select component, update the filters state,
 * and sync them with the URL search params using `useSearchParams`.
 * 
 * @param {HandleFilterChangeProps} props - The properties containing the select name and state setter.
 * @returns A function that processes the selected value, updates the filters state, and modifies the URL search params.
 */
export const HandleMySelectChange = ({ selectName, setFilters }: HandleFilterChangeProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (newValue: SingleValue<OptionType> | MultiValue<OptionType>) => {
        /**
         * Extracts selected values into an array of strings.
         */
        const values = Array.isArray(newValue)
            ? newValue.map((option) => option.value)
            : newValue
            ? [(newValue as OptionType).value]
            : [];

        // Update state
        setFilters((prevState) => ({
            ...prevState,
            [selectName]: values,
        }));

        // Update URL search params
        const newSearchParams = new URLSearchParams(searchParams);

        if (values.length > 0) {
            newSearchParams.set(selectName, values.join(",")); // Convert array to comma-separated string
        } else {
            newSearchParams.delete(selectName); // Remove filter if empty
        }

        setSearchParams(newSearchParams);
    };
};
