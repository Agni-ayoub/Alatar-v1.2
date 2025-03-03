import React from 'react';
import Buttons from '../../../buttons/buttons';
import { Actions } from '../main/DataCardType';

const DataCardActionButtons: React.FC<Actions> = ({ editAction, deleteAction, moreAction }) => {
    return (
        <>
            {
                moreAction && 
                    <Buttons className="bg-[var(--text-secondary)]/60" placeHolder='More' aria-label="More options" />
            }
            {
                editAction && 
                    <Buttons className="bg-[var(--positive)]/60" placeHolder='Edit' aria-label="Edit" />
            }
            {
                deleteAction && 
                <Buttons className="bg-[var(--negative)]/60" placeHolder='Delete' aria-label="Delete" />
            }
        </>
    );
};

export default DataCardActionButtons;