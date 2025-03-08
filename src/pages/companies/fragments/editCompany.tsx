import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import Form from "../../../components/form/main/form";
import { FormProps } from "../../../components/form/main/formTypes";
import { useEditCompanyMutation } from "../../../features/api/editMethodSlice";
import { useSearchParams } from "react-router-dom";
import { EditCompanyFormData } from "../../../features/sliceTypes";
import { toast } from "react-toastify";
import { useGetCompanyByIdQuery } from "../../../features/api/getMethodSlice";
import AlatarLoader from "../../../components/animated/alatarLoader";
import useModifiedFormData from "../../../hooks/useChangedData";

// Types for the EditCompany component
interface EditCompanyTypes {
    refetch: () => void;  // Function to refresh the company data after an edit.
}

const EditCompany: React.FC<EditCompanyTypes> = ({ refetch }) => {
    // State to store form data and original data from the backend
    const [formData, setFormData] = useState<EditCompanyFormData>({
        name: "",
        phone: "",
        email: "",
        website: "",
    });
    const [originalData, setOriginalData] = useState<EditCompanyFormData>({
        name: "",
        phone: "",
        email: "",
        website: "",
    });

    // API call hooks for editing and getting company data
    const [editMutation] = useEditCompanyMutation();
    const [searchParams] = useSearchParams();
    const currentCompanyId = searchParams.get("id") || "";  // Get the company id from the URL parameters
    const { ModalComponent, closeModal } = useModal("edit");
    const { data, isFetching } = useGetCompanyByIdQuery(currentCompanyId, {
        skip: !currentCompanyId, // Skip the query if no company id is available
        refetchOnMountOrArgChange: true, // Refetch when the component mounts or the company id changes
    });

    // Custom hook to track modified data
    const modifiedData = useModifiedFormData(formData, originalData);

    // Handle form input changes by updating form data
    const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData((prev: EditCompanyFormData) => ({ ...prev, [name]: value }));
    };

    // Configuration for the form inputs
    const formInputs: FormProps["inputsData"] = [
        {
            inputProps: {
                label: "Company Name",
                name: "name",
                placeholder: "Enter company name",
                type: "text",
                required: true,
                value: formData.name,
                onChange: handleFormInputChange,
            },
        },
        {
            inputProps: {
                label: "Phone Number",
                name: "phone",
                placeholder: "Enter phone number",
                type: "tel",
                required: true,
                value: formData.phone,
                onChange: handleFormInputChange,
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
            },
        },
        {
            inputProps: {
                label: "Website URL",
                name: "website",
                placeholder: "Enter website URL",
                type: "url",
                required: false,
                value: formData.website,
                onChange: handleFormInputChange,
            },
        },
    ];

    // Effect hook to set the initial data when the component is mounted or when the data changes
    useEffect(() => {
        if (data?.status === "success") {
            setOriginalData(data.company);  // Set the original data (unchanged)
            setFormData(data.company);  // Set the form data with current values
        }
    }, [data, currentCompanyId]);

    // Condition to check if the undo button should be enabled
    const isUndoButton = !modifiedData?.isModified || isFetching; // Disable undo if no changes or fetching

    // Form submission handler to update the company data
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // If no changes were made, prevent submission
        if (!modifiedData?.isModified) return;

        // Check for valid company id
        if (!currentCompanyId) {
            console.error("Current company id is 'undefined'! Error in <EditCompany />.");
            return;
        }

        try {
            // Execute the mutation to edit the company
            const response = await editMutation({ id: currentCompanyId, formData: modifiedData?.modifiedValues }).unwrap();

            // If the mutation was successful, show success toast and close the modal
            if (response.status === "success") {
                toast.success("Company has been updated successfully.");
                closeModal(currentCompanyId);  // Close the modal after submission
                refetch();  // Refresh the company data in the parent component
            }
        } catch (error) {
            // Handle any error that occurs during the mutation
            console.error("Something went wrong while trying to edit the company", error);
        }
    };

    return (
        <ModalComponent>
            {isFetching ? (
                <div className="flex items-center h-full w-full">
                    <AlatarLoader /> {/* Show a loader while fetching data */}
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
