import React from "react";
import useModal from "../../hooks/useModal";
import { useSearchParams } from "react-router-dom";
import Inputs from "../inputs/inputs";
import Buttons from "../buttons/buttons";
interface DeleteModalProps {
    type : "Company" | "Vehicle" | "User";
}

const DeleteModal : React.FC<DeleteModalProps> = ({type}) => {
    const [searchParams] = useSearchParams();
    const { ModalComponent } = useModal('delete');
    const id = searchParams.get("id");
   
    return(
        <ModalComponent className="w-10/12 flex flex-col sm:w-[32rem] h-[15rem]">
            <div className="bg-[var(--negative)] px-2 py-1 rounded-md">
                <span className="sm:text-xl font-semibold tracking-widest">
                    Confirm Deletion of {type}
                </span>
            </div>
            <div className="flex h-full flex-col justify-around">
                <span>
                    This action is <strong className="text-[var(--negative)]">permanent</strong> and cannot be undone.
                </span>
                <span>
                    Key: <strong className="select-text">{id}</strong>
                </span>
                <Inputs placeholder="Enter the validation key above" withoutLabel className="h-9" />
                <div className="w-full flex justify-end">
                    <Buttons placeHolder="Delete" className="font-semibold bg-[var(--negative)] w-24" />
                </div>
            </div>
        </ModalComponent>
    )
};

export default DeleteModal;