import classNames from 'classnames';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';

type Type = 'edit' | 'delete' | 'more';
type ID = string;

interface ModalProps {
    children?: ReactNode;
    wrapperClassName?: string;
}

/**
 * Custom hook to manage modal state and behavior using URL search parameters.
 * This hook enables opening and closing a modal while synchronizing its state with the URL.
 *
 * @param {Type} type - The type of modal ('edit', 'delete', or 'more') to be managed.
 * @returns {object} Modal control utilities and a Modal component:
 * - `ModalComponent`: A memoized component that renders the modal.
 * - `openModal`: Function to open the modal with optional `id`.
 * - `closeModal`: Function to close the modal and clear search parameters.
 * - `isOpen`: Boolean indicating whether the modal is open.
 */
const useModal = (type: Type) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Determine if the modal is open based on the 'action' search parameter
    const isOpen = searchParams.get('action') === type;

    /**
     * Closes the modal by removing related search parameters.
     * 
     * @param {ID} [id] - The optional ID to remove from search params when closing.
     */
    const closeModal = useCallback((id?: ID) => {
        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            newParams.delete('action');
            if (id) newParams.delete('id');
            return newParams;
        });
    }, [setSearchParams]);

    /**
     * Opens the modal by setting the 'action' search parameter to the given type.
     * Optionally sets an 'id' parameter.
     * 
     * @param {OpenModalParams} params - The parameters to open the modal.
     * @param {ID} [params.id] - The optional ID associated with the modal.
     */
    const openModal = useCallback(( id : ID ) => {
        setSearchParams((prev: URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('action', type);
            if (id) newParams.set('id', id);
            return newParams;
        });
    }, [setSearchParams, type]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                const id = searchParams.get('id') || ""; 
                closeModal(id);
            }
        };

        window.addEventListener("keydown", handleEscape);
    
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [closeModal, searchParams]);
    
    /**
     * Modal component that renders its children inside a styled modal container.
     * The modal is removed from the DOM when `isOpen` is false.
     */
    const ModalComponent = useMemo(() => ({ children, wrapperClassName }: ModalProps) => {
        if (!isOpen) return null;

        return createPortal(
            <div className={classNames("z-[99999] select-none inset-0 m-auto fixed w-full h-full modal-show", wrapperClassName)}>
                <div onClick={() => closeModal(searchParams.get('id') || "")} className="w-full h-full backdrop-blur-lg" />
                <div className={classNames(
                    "bg-[var(--background)] rounded-xl p-4 fixed inset-0 m-auto h-[32rem] w-[28rem] border border-[var(--text-secondary)]",
                    wrapperClassName
                )}>
                    {children}
                </div>
            </div>,
            document.body
        );
    }, [isOpen, closeModal, searchParams]);

    return {
        ModalComponent,
        openModal,
        closeModal,
        isOpen
    };
};

export default useModal;
