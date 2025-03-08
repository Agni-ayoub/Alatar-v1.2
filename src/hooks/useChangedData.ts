import { useMemo } from "react";

/**
 * A React hook to detect changes between form data and its original values.
 *
 * @template T - The type of the form data.
 * @param formData - The latest form data entered by the user.
 * @param originalData - The initial data before modifications.
 * @returns An object containing:
 *  - `isModified` (boolean): Whether any field has changed.
 *  - `modifiedKeys` (Array<keyof T>): List of keys that have changed.
 *  - `modifiedValues` (Partial<T>): Object containing only modified key-value pairs.
 *  Returns `null` if no changes are detected.
 */
const useModifiedFormData = <T extends Record<string, unknown>>(formData: T, originalData: T) => {
    return useMemo(() => {
        // Get all keys and force TypeScript to treat them as keyof T
        const keys = Object.keys(formData) as (keyof T)[];

        // Identify which fields have changed
        const modifiedKeys: (keyof T)[] = keys.filter((key) => !Object.is(formData[key], originalData[key]));

        // If no changes are detected, return null
        if (modifiedKeys.length === 0) return null;

        // Extract only modified values into a new object
        const modifiedValues: Partial<T> = Object.fromEntries(
            modifiedKeys.map((key) => [key, formData[key]])
        ) as Partial<T>;

        return {
            isModified: true,
            modifiedKeys,
            modifiedValues,
        };
    }, [formData, originalData]);
};

export default useModifiedFormData;
