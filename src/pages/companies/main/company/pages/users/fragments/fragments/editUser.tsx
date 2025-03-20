import React, { JSX, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useModal from "../../../../../../../../hooks/useModal";
import useModifiedFormData from "../../../../../../../../hooks/useChangedData";
import Form from "../../../../../../../../components/form/main/form";
import AlatarLoader from "../../../../../../../../components/animated/alatarLoader";
import { useEditUserMutation } from "../../../../../../../../features/api/editMethodSlice";
import { useGetUserByIdQuery } from "../../../../../../../../features/api/getMethodSlice";
import { EditUserFormData } from "../../../../../../../../features/sliceTypes";
import { FormProps } from "../../../../../../../../components/form/main/formTypes";
import { userSchema } from "../../../../../../../../utils/zodSechams";
import { convertToBase64 } from "../../../../../../../../utils/converToBase64";

/**
 * Props for EditUser component
 */
interface EditUserProps {
    refetch: () => void;
}

/**
 * EditUser Component - Handles user editing functionality.
 *
 * @param {EditUserProps} props - Component properties.
 * @returns {JSX.Element} - EditUser component.
 */
const EditUser: React.FC<EditUserProps> = ({ refetch }: EditUserProps): JSX.Element => {
    /** Initial form state */
    const formDataInitialState = useMemo<EditUserFormData>(() => ({
        username: "",
        phone: "",
        email: "",
        status: "",
        avatar: "",
        password: "",
    }), []);

    /** State for form data and original data */
    const [formData, setFormData] = useState<EditUserFormData>(formDataInitialState);
    const [originalData, setOriginalData] = useState<EditUserFormData>(formDataInitialState);
    const [formErrors, setFormErrors] = useState<Partial<EditUserFormData>>({});
    const [file, setFile] = useState<string | null>(null);

    /** Get the current user ID from search params */
    const [searchParams] = useSearchParams();
    const currentUserId = searchParams.get("id") || "";

    /** Modal handling */
    const { ModalComponent, closeModal, isOpen } = useModal("edit");

    /** Fetch user data */
    const { data, isFetching, refetch: refetchData } = useGetUserByIdQuery(currentUserId, {
        skip: !currentUserId,
        refetchOnMountOrArgChange: true,
    });

    /** Mutation for editing a user */
    const [editMutation, { isLoading }] = useEditUserMutation();

    /** Get modified form data */
    const modifiedData = useModifiedFormData(formData, originalData);

    /**
     * Handles input change in form fields.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    /**
     * Handles file input change for avatar upload.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event.
     */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            convertToBase64(selectedFile, setFile, setFormData);
        }
    };

    /** Form input fields */
    const formInputs: FormProps["inputsData"] = [
        {
            inputProps: {
                label: "User Avatar",
                name: "avatar",
                id: "user-avatar-edit",
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
                label: "Username",
                name: "username",
                id: "user-username-edit",
                placeholder: "Enter username",
                type: "text",
                value: formData.username || "",
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.username,
            },
        },
        {
            inputProps: {
                label: "First Name",
                name: "first_name",
                id: "user-first_name-edit",
                placeholder: "Enter first name",
                type: "text",
                value: formData.first_name || "",
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.first_name,
            },
        },
        {
            inputProps: {
                label: "Last Name",
                name: "last_name",
                id: "user-last_name-edit",
                placeholder: "Enter last name",
                type: "text",
                value: formData.last_name || "",
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.last_name,
            },
        },
        {
            inputProps: {
                label: "Phone Number",
                name: "phone",
                id: "user-phone-edit",
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
                id: "user-email-edit",
                placeholder: "Enter email address",
                type: "email",
                value: formData.email || "",
                onChange: handleFormInputChange,
                ErrorMessage: formErrors.email,
            },
        },
    ];

    /** Fetch user data on modal open */
    useEffect(() => {
        if (isOpen) {
            setFormErrors({});
            setFile(null);
            setFormData(formDataInitialState);
            setOriginalData(formDataInitialState);
            refetchData();
        }
    }, [isOpen, refetchData, formDataInitialState]);

    /** Update state when user data is fetched */
    useEffect(() => {
        if (data?.status === "success") {
            setOriginalData(data.user);
            setFormData(data.user);
        }
    }, [data]);

    const isUndoButton = !modifiedData?.isModified || isFetching || isLoading;

    /**
     * Handles form submission for updating a user.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = userSchema.safeParse(formData);
        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach(({ path, message }) => {
                errors[path[0]] = message;
            });
            setFormErrors(errors);
            return;
        }

        if (!modifiedData?.isModified || !currentUserId) return;

        try {
            const response = await editMutation({ id: currentUserId, formData: modifiedData.modifiedValues }).unwrap();
            if (response.status === "success") {
                toast.success("User has been updated successfully.");
                closeModal();
                refetch();
            }
        } catch (error) {
            console.error("Error editing user", error);
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
                    formAction="Edit User"
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

export default EditUser;