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
import { convertToBase64 } from "../../../utils/converToBase64";

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
        avatar : "",
    }), []);

    // State for form data, errors, and original data
    const [formData, setFormData] = useState<EditCompanyFormData>(formDataInitialState);
    const [originalData, setOriginalData] = useState<EditCompanyFormData>(formDataInitialState);
    const [formErrors, setFormErrors] = useState<Partial<EditCompanyFormData>>({});
    
    // Get company ID from URL parameters
    const [searchParams] = useSearchParams();
    const currentCompanyId = searchParams.get("id") || "";
    
    // State for file data (base64)
    const [file, setFile] = useState<string | null>(null);

    // Hooks for modal management
    const { ModalComponent, closeModal, isOpen } = useModal("edit");

    // API queries for fetching and editing company data
    const { data, isFetching } = useGetCompanyByIdQuery(currentCompanyId, {
        skip: !currentCompanyId,
        refetchOnMountOrArgChange: true,
    });
    const [editMutation, {isLoading}] = useEditCompanyMutation();

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            convertToBase64(selectedFile, setFile, setFormData);
        }
    };

    // Form field configurations
    const formInputs: FormProps["inputsData"] = [
        {
            inputProps: {
                label: "Company Avatar",
                name: "avatar",
                id: "company-avatar-edit",
                type: "file",
                ErrorMessage: formErrors.avatar,
                accept : "image/*",
                className: "hidden",
                onChange : handleFileChange
            },
            containerClassName : "border border-[var(--background-secondary)] h-[14rem] rounded-md after:bg-[var(--text-primary)]/10 p-2 hover:after:opacity-100 after:opacity-0 after:transition-opacity after:content-['Select_Avatar'] after:backdrop-blur after:top-0 after:left-0 after:w-full after:h-full after:flex after:items-center after:justify-center after:text-white cursor-pointer after:font-semibold after:text-xl after:tracking-widest",
            fileImageSrc: file || formData.avatar
        },
        {
            inputProps: {
                label: "Company Name",
                name: "name",
                id: "company-name-edit",
                placeholder: "Enter company name",
                type: "text",
                value: formData.name || "",
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.name,
                required : true
            },
        },
        {
            inputProps: {
                label: "Phone Number",
                name: "phone",
                id: "company-phone-edit",
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
                id: "company-email-edit",
                placeholder: "Enter email address",
                type: "email",
                value: formData.email || "",
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.email,
            },
        },
        {
            inputProps: {
                label: "Website URL",
                name: "website",
                id: "company-website-edit",
                placeholder: "Enter website URL",
                type: "url",
                value: formData.website || "",
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
    
    // Reset form errors & base64 file when modal closes
    useEffect(() => {
        if (!isOpen){
            setFormErrors({});
            setFile("");
        }
    }, [isOpen]);

    // Check if undo button should be enabled
    const isUndoButton = !modifiedData?.isModified || isFetching || isLoading;

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

    return (
        <ModalComponent className="w-[22rem] h-[38rem] sm:w-[32rem]">
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
                    isLoading={isLoading}
                    setBase64={setFile}
                />
            )}
        </ModalComponent>
    );
};

export default EditCompany;
