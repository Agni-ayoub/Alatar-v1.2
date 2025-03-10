import React, { JSX, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import useModal from "../../../hooks/useModal";
import useModifiedFormData from "../../../hooks/useChangedData";
import Form from "../../../components/form/main/form";
import AlatarLoader from "../../../components/animated/alatarLoader";

import { useEditCompanyMutation } from "../../../features/api/editMethodSlice";
import { useGetCompanyByIdQuery } from "../../../features/api/getMethodSlice";
import { EditCompanyFormData } from "../../../features/sliceTypes";
import { FormProps } from "../../../components/form/main/formTypes";
import { companySchema } from "../../../utils/zodSechams";

/**
 * Props for the EditCompany component.
 * @typedef {Object} EditCompanyTypes
 * @property {() => void} refetch - Function to refresh company data after an edit.
 */
interface EditCompanyTypes {
    refetch: () => void;
}

/**
 * EditCompany Component
 *
 * Allows users to edit a company's details.
 *
 * Fetches the current company data and updates it using a modal form.
 * @component
 * @param {EditCompanyTypes} props - Component props.
 * @returns {JSX.Element}
 */
const EditCompany: React.FC<EditCompanyTypes> = ({ refetch }: EditCompanyTypes): JSX.Element => {
    // Initial form state
    const formDataInitialState = useMemo<EditCompanyFormData>(() => ({
        name: "",
        phone: "",
        email: "",
        address: "",
        website: "",
        long: "",
        lat: "",
        status: "",
    }), []);

    // State for form data, errors, and original data
    const [formData, setFormData] = useState<EditCompanyFormData>(formDataInitialState);
    const [originalData, setOriginalData] = useState<EditCompanyFormData>(formDataInitialState);
    const [formErrors, setFormErrors] = useState<Partial<EditCompanyFormData>>({});

    // Get company ID from URL parameters
    const [searchParams] = useSearchParams();
    const currentCompanyId = searchParams.get("id") || "";

    // Hooks for modal management
    const { ModalComponent, closeModal, isOpen } = useModal("edit");

    // API queries for fetching and editing company data
    const { data, isFetching } = useGetCompanyByIdQuery(currentCompanyId, {
        skip: !currentCompanyId,
        refetchOnMountOrArgChange: true,
    });
    const [editMutation] = useEditCompanyMutation();

    // Custom hook to track modified fields
    const modifiedData = useModifiedFormData(formData, originalData);

    /**
     * Handles form input changes.
     * Updates state and clears previous errors.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
     */
    const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Form field configurations
    const formInputs: FormProps["inputsData"] = [
        {
            inputProps: {
                label: "Company Name",
                name: "name",
                placeholder: "Enter company name",
                type: "text",
                value: formData.name,
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.name,
            },
        },
        {
            inputProps: {
                label: "Phone Number",
                name: "phone",
                placeholder: "Enter phone number",
                type: "tel",
                value: formData.phone || "",
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.phone,
            },
        },
        {
            inputProps: {
                label: "Email Address",
                name: "email",
                placeholder: "Enter email address",
                type: "email",
                required: true,
                value: formData.email,
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.email,
            },
        },
        {
            inputProps: {
                label: "Website URL",
                name: "website",
                placeholder: "Enter website URL",
                type: "url",
                value: formData.website,
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.website,
            },
        },
    ];

    // Set form data when fetching completes
    useEffect(() => {
        if (data?.status === "success") {
            setOriginalData(data.company);
            setFormData(data.company);
        }
    }, [data, currentCompanyId]);

    // Check if undo button should be enabled
    const isUndoButton = !modifiedData?.isModified || isFetching;

    /**
     * Handles form submission.
     * Validates input using Zod and updates the company if changes exist.
     * @param {React.FormEvent<HTMLFormElement>} e - Form submission event.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = companySchema.safeParse(formData);
        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach(({ path, message }) => {
                errors[path[0]] = message;
            });
            setFormErrors(errors);
            return;
        }

        if (!modifiedData?.isModified || !currentCompanyId) return;

        try {
            const response = await editMutation({ id: currentCompanyId, formData: modifiedData.modifiedValues }).unwrap();
            if (response.status === "success") {
                toast.success("Company has been updated successfully.");
                closeModal();
                refetch();
            }
        } catch (error) {
            console.error("Error editing company", error);
        }
    };

    // Reset form errors when modal closes
    useEffect(() => {
        if (!isOpen) setFormErrors({});
    }, [isOpen]);

    return (
        <ModalComponent className="w-[22rem] h-[32rem] sm:w-[28rem]">
            {isFetching ? (
                <div className="flex items-center h-full w-full">
                    <AlatarLoader />
                </div>
            ) : (
                <Form
                    formAction="Edit Company"
                    originalData={originalData}
                    setData={setFormData}
                    inputsData={formInputs}
                    handleSubmit={handleSubmit}
                    isUndoButton={isUndoButton}
                />
            )}
        </ModalComponent>
    );
};

export default EditCompany;
