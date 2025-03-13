import React, { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import { useSearchParams } from "react-router-dom";
import Inputs from "../inputs/inputs";
import Buttons from "../buttons/buttons";
import { useDeleteCompanyMutation } from "../../features/api/deleteMethod";
import { toast } from "react-toastify";

/**
 * Props for DeleteModal Component
 */
interface DeleteModalProps {
    type: "Company" | "Vehicle" | "User";
    refetch: () => void;
}

/**
 * DeleteModal Component
 * @param {DeleteModalProps} props - Component props
 */
const DeleteModal: React.FC<DeleteModalProps> = ({ type, refetch } : DeleteModalProps) => {
    const [validation, setValidation] = useState<string>(""); // Stores user input for validation
    const [searchParams] = useSearchParams();
    const { ModalComponent, closeModal, isOpen } = useModal('delete');
    const id = searchParams.get("id"); // Retrieves the entity ID from the URL
    const isValidationGranted = !(id === validation);
    const [action, {isLoading}] = useDeleteCompanyMutation();

    /**
     * Handles validation input change
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
     */
    const handleValidationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidation(e.target.value);
    };

    /**
     * Handles form submission to delete the entity
     * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const modifiedId: string = id || "";

        try {
            const response = await action({ id: modifiedId, type: 'company' }).unwrap();

            if (response.status === "success") {
                refetch();
                closeModal();
                toast.success(`${type} deleted successfully.`);
            }
        } catch (error) {
            console.error(error);
            const apiError = error as {status: number, data: object};
            if(apiError.status) {
                toast.error("Outdated, The item provided was already deleted.");
                refetch();
                closeModal();
            }else{
                toast.error("Something went wrong, can't delete the item provided.");
            }
        }
    };

    useEffect(()=>{
        if(!isOpen){
            setValidation(""); //Reset inputs value
        };
    },[isOpen]);

    return (
        <ModalComponent className="w-10/12 flex flex-col sm:w-[28rem] h-[16rem]">
            <div className="bg-[var(--negative)] px-2 py-1 rounded-md">
                <span className="sm:text-xl font-semibold tracking-widest">
                    Confirm Deletion of {type}
                </span>
            </div>
            <form onSubmit={handleSubmit} className="flex h-full flex-col justify-around">
                <span>
                    This action is <strong className="text-[var(--negative)]">permanent</strong> and cannot be undone.
                </span>
                <span>
                    Key: <strong className="select-text" aria-label="Validation Key">{id}</strong>
                </span>
                <Inputs
                    onChange={handleValidationChange}
                    value={validation}
                    placeholder="Enter the validation key above"
                    withoutLabel
                    className="h-9"
                    aria-label="Validation input field"
                />
                <div className="w-full flex justify-end">
                    <Buttons
                        disabled={isValidationGranted || isLoading}
                        type="submit"
                        placeHolder={`${isLoading?"Deleting...": "Delete"}`}
                        className="font-semibold bg-[var(--negative)] w-max px-4"
                        aria-label="Delete button"
                    />
                </div>
            </form>
        </ModalComponent>
    );
};

export default DeleteModal;
