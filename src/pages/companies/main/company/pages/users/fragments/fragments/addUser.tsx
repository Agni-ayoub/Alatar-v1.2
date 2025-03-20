import React, { JSX, useEffect, useMemo, useState } from "react";
import Form from "../../../../../../../../components/form/main/form";
import { FormProps } from "../../../../../../../../components/form/main/formTypes";
import useModal from "../../../../../../../../hooks/useModal";
import { EditCompanyFormData } from "../../../../../../../../features/sliceTypes";
import { convertToBase64 } from "../../../../../../../../utils/converToBase64";
import useModifiedFormData from "../../../../../../../../hooks/useChangedData";
import { useCreateMuMutation } from "../../../../../../../../features/api/createMethod";
import { toast } from "react-toastify";
import { companySchema } from "../../../../../../../../utils/zodSechams";

/**
 * Props for the AddCompanyModal component.
 * @typedef {Object} AddCompanyProps
 * @property {Function} refetch - Function to refetch company data after creation.
 */
interface AddCompanyProps {
    refetch: () => void;
};

/**
 * Modal component for adding a new company.
 * Handles form state, validation, and API request.
 * 
 * @param {AddCompanyProps} props - Component props.
 * @returns {JSX.Element} The AddCompanyModal component.
 */
const AddUserModal: React.FC<AddCompanyProps> = ({ refetch }: AddCompanyProps): JSX.Element => {
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
        avatar: "",
    }), []);

    // Form state
    const [formData, setFormData] = useState<EditCompanyFormData>(formDataInitialState);
    const [formErrors, setFormErrors] = useState<Partial<EditCompanyFormData>>(formDataInitialState);
    const [file, setFile] = useState<string | null>(null);
    const { ModalComponent, isOpen, closeModal } = useModal("create");
    const modifiedData = useModifiedFormData(formData, formDataInitialState);
    const [action, { isLoading }] = useCreateMuMutation();

    /**
     * Handles input changes in the form.
     * Updates the form state and clears previous errors.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
     */
    const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    /**
     * Handles file selection and converts it to Base64.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - File input change event.
     */
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
                type: "file",
                ErrorMessage: formErrors.avatar,
                accept: "image/*",
                className: "hidden",
                onChange: handleFileChange
            },
            containerClassName: "border border-[var(--background-secondary)] h-[14rem] rounded-md after:bg-[var(--text-primary)]/10 p-2 hover:after:opacity-100 after:opacity-0 after:transition-opacity after:content-['Select_Avatar'] after:backdrop-blur after:top-0 after:left-0 after:w-full after:h-full after:flex after:items-center after:justify-center after:text-white cursor-pointer after:font-semibold after:text-xl after:tracking-widest",
            fileImageSrc: file || formData.avatar
        },
        {
            inputProps: {
                label: "Company Name",
                name: "name",
                placeholder: "Enter company name",
                type: "text",
                value: formData.name || "",
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.name
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
                value: formData.email || "",
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
                value: formData.website || "",
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.website,
            },
        },
    ];

    // Reset form errors & Base64 file when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFormErrors({});
            setFormData(formDataInitialState)
            setFile("");
        }
    }, [formDataInitialState, isOpen]);

    // Check if the undo button should be enabled
    const isUndoButton = !modifiedData?.isModified || isLoading;

    /**
     * Handles form submission.
     * Validates data using Zod schema before sending a request.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - Form submit event.
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

        if (!modifiedData?.isModified) return;

        try {
            const response = await action({ type: 'company', formData : modifiedData.modifiedValues }).unwrap();

            if (response.status === "success") {
                toast.success("Company has been created successfully.");
                closeModal();
                refetch();
            }
        } catch (error) {
            toast.error('Something went wrong, try again later');
            console.log(error);
        }
    };

    return (
        <ModalComponent className="w-[22rem] h-[38rem] sm:w-[32rem]">
            <Form 
                handleSubmit={handleSubmit} 
                formAction="Create Company" 
                setBase64={setFile} 
                originalData={formDataInitialState} 
                setData={setFormData} 
                inputsData={formInputs} 
                isUndoButton={isUndoButton} 
                isLoading={isLoading}
            />
        </ModalComponent>
    );
};

export default AddUserModal;
