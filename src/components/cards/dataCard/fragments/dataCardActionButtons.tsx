import React from 'react';
import Buttons from '../../../buttons/buttons';
import { Actions } from '../main/DataCardType';

const DataCardActionButtons: React.FC<Actions> = ({ editAction, deleteAction, moreAction }) => {
    return (
        <>
            {
                moreAction && 
                    <Buttons className="bg-[var(--text-secondary)]/80" placeHolder='More' aria-label="More options" />
            }
            {
                editAction && 
                    <Buttons className="bg-[var(--positive)]/80" placeHolder='Edit' aria-label="Edit" />
            }
            {
                deleteAction && 
                <Buttons className="bg-[var(--negative)]/80" placeHolder='Delete' aria-label="Delete" />
            }
        </>
    );
};

export default DataCardActionButtons;