import React from 'react';
import Buttons from '../../../buttons/buttons';
import { Actions } from '../main/DataCardType';
import { useSearchParams } from 'react-router-dom';

interface ActionsExtanded extends Actions {
    id : string;
};

/**
 * A component that renders action buttons for a data card, allowing users to perform edit, delete, or more actions.
 *
 * @component
 * @param {ExtendedActions} props - The props for the component.
 * @param {boolean} [props.editAction] - Whether the edit action is enabled.
 * @param {boolean} [props.deleteAction] - Whether the delete action is enabled.
 * @param {boolean} [props.moreAction] - Whether the more action is enabled.
 * @param {string} [props.id] - Card id.
 * @returns {JSX.Element} The rendered action buttons.
 */
const DataCardActionButtons: React.FC<ActionsExtanded> = ({ editAction, deleteAction, moreAction, id }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    /**
     * Opens a modal by updating search parameters.
     *
     * @param {'edit' | 'delete' | 'more'} type - The type of action modal to open.
     */
    const openModal = (type: 'edit' | 'delete' | 'more') => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('action', type);
            newParams.set('id', id)
            return newParams;
        });
    };

    return (
        <>
            {moreAction && (
                <Buttons
                    className="bg-[var(--text-secondary)]/60"
                    placeHolder="More"
                    aria-label="More options"
                />
            )}
            {editAction && (
                <Buttons
                    onClick={() => openModal('edit')}
                    className="bg-[var(--positive)]/60"
                    placeHolder="Edit"
                    aria-label="Edit"
                />
            )}
            {deleteAction && (
                <Buttons
                    onClick={() => openModal('delete')}
                    className="bg-[var(--negative)]/60"
                    placeHolder="Delete"
                    aria-label="Delete"
                />
            )}
        </>
    );
};

export default DataCardActionButtons;
