import React from "react";
import { Paginator } from "../../../features/sliceTypes";
import { icons } from "../../../utils/icons";

/**
 * Pagination component for navigating paged content.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Paginator} props.paginator - The pagination data including current and last page.
 * @param {Function} props.onPageChange - Function to call when a new page is selected.
 * @returns {JSX.Element} The rendered pagination component.
 */
interface PaginationProps {
    paginator: Paginator;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ paginator, onPageChange }) => {
    const { currentPage, lastPage, total } = paginator;

    return (
        <div className="flex flex-col gap-1 sm:flex-row justify-between" aria-label="Pagination Navigation">
            {/* Page Info */}
            <div className="flex items-center space-x-2 text-xs">      
                <button 
                    className="gap-1 py-2 px-2 bg-[var(--text-primary)]/20 text-[var(--text-tertiary)] font-medium rounded inline-flex items-center cursor-pointer hover:opacity-80 active:opacity-50 transition-opacity"
                    aria-label="Items per page"
                >        
                    <span className="truncate">15 items</span>
                    <span>{icons["arrowDown"]}</span>         
                </button>      
                <span>
                Showing <strong> 15 </strong> of <strong> { total } </strong> entries</span>    
            </div>    

            {/* Pagination Controls */}
            <nav aria-label="Pagination" className="flex justify-center items-center text-[var(--text-tertiary)]">
                {/* Previous Button */}
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => onPageChange(currentPage - 1)} 
                    className="p-2 mr-2 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity disabled:opacity-40 cursor-pointer"
                    aria-label="Previous page"
                >        
                    {icons["arrowBack"]}      
                </button>

                {/* Previous Pages */}
                {currentPage >= 4 && (
                    <>
                        <button 
                        onClick={() => onPageChange(1)} 
                        className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                        aria-label={`Go to page ${currentPage - 2}`}
                        > 
                            1
                        </button>
                        <span className="mr-2 text-xs px-2 py-0.5 rounded" aria-hidden="true"> 
                            ...
                        </span>
                    </>
                )}

                {/* Previous Pages */}
                {currentPage > 2 && (
                    <button 
                        onClick={() => onPageChange(currentPage - 2)} 
                        className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                        aria-label={`Go to page ${currentPage - 2}`}
                    > 
                        {currentPage - 2}
                    </button>
                )}

                {currentPage >= 2 && (
                    <button 
                        onClick={() => onPageChange(currentPage - 1)} 
                        className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                        aria-label={`Go to page ${currentPage - 1}`}
                    > 
                        {currentPage - 1}
                    </button>
                )}

                {/* Current Page */}
                <span className="border-b mr-2 text-xs px-2 py-0.5 rounded bg-[var(--text-tertiary)]/20" aria-current="page"> 
                    {currentPage}
                </span>

                {/* Next Pages */}
                {currentPage < lastPage && (
                    <button 
                        onClick={() => onPageChange(currentPage + 1)} 
                        className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                        aria-label={`Go to page ${currentPage + 1}`}
                    > 
                        {currentPage + 1}
                    </button>
                )}

                {currentPage < lastPage - 1 && (
                    <button 
                        onClick={() => onPageChange(currentPage + 2)} 
                        className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                        aria-label={`Go to page ${currentPage + 2}`}
                    > 
                        {currentPage + 2}
                    </button>
                )}

                {/* Ellipsis for Large Gaps */}
                {currentPage < lastPage - 2 && (
                    <>
                        <span className="mr-2 text-xs px-2 py-0.5 rounded" aria-hidden="true"> 
                            ...
                        </span>
                        <button 
                            onClick={() => onPageChange(lastPage)} 
                            className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                            aria-label={`Go to last page (${lastPage})`}
                        > 
                            {lastPage}
                        </button>
                    </>
                )}

                {/* Next Button */}
                <button 
                    disabled={currentPage === lastPage || lastPage === 0} 
                    onClick={() => onPageChange(currentPage + 1)} 
                    className="p-2 disabled:opacity-40 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity cursor-pointer"
                    aria-label="Next page"
                >        
                    {icons["arrowForward"]}      
                </button>    
            </nav>  
        </div>
    );
};

export default Pagination;