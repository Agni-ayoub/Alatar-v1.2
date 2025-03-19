import React, { useEffect, useMemo, useState } from "react";
import { Paginator } from "../../../features/sliceTypes";
import { icons } from "../../../utils/icons";
import MySelect from "../../mySelect/mySelect";
import { OptionType } from "../../inputs/main/inputsTypes";
import { ExpectedObj, HandleMySelectChange } from "../../../utils/handleMySelectChnage";
import { useSearchParams } from "react-router-dom";
import { sizeOptions } from "../../../pages/companies/main/filters";

/**
 * Pagination component that allows users to navigate through paged content.
 * It includes functionality for changing the page and selecting the number of items per page.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {Paginator} props.paginator - The pagination data, including the current page, last page, and total items.
 * @param {Function} props.onPageChange - Function to call when a new page is selected.
 * @param {Function} props.setFilters - Function to update the filters, including the selected page size.
 * 
 * @returns {JSX.Element} The rendered pagination component.
 */
interface PaginationProps {
    paginator: Paginator;
    onPageChange: (newPage: number) => void;
    setFilters: React.Dispatch<React.SetStateAction<ExpectedObj>>;
}

const Pagination: React.FC<PaginationProps> = ({ paginator, onPageChange, setFilters }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selected, setSelected] = useState<OptionType[]>([]);
    const { currentPage, lastPage, total } = paginator;
    const value : OptionType[] = useMemo(() => (
        selected.length === 0 ? [sizeOptions[0]] : selected
    ),[selected]);

    /**
     * Syncs the selected filters (such as page size) with the URL parameters.
     * This effect runs whenever `searchParams` change, ensuring the selected options are up-to-date.
     */
    useEffect(() => {
        const selectedOptions = sizeOptions.filter(option =>
            searchParams.get("size")?.split(',').includes(option.value)
        );
        setSelected(selectedOptions);
    }, [searchParams]);

    useEffect(()=>{
        setSearchParams((prev : URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('size', value[0].value);

            return newParams
        })
    },[setSearchParams, value])

    return (
        <div className="flex flex-col px-2 gap-1 sm:flex-row justify-between" aria-label="Pagination Navigation">
            {/* Page Info: Displaying the number of items being shown and the total */}
            <div className="flex items-center space-x-2 text-xs">      
                <MySelect 
                    placeHolder="Select size"
                    containerClassName="w-[7rem] min-w-0 flex-none"
                    options={sizeOptions}
                    isMulti={false}
                    value={value}
                    onChange={HandleMySelectChange({ selectName: "size", setData: setFilters})}
                />     
                <span>
                    Showing <strong> {value[0].value} </strong> of <strong> { total } </strong> entries
                </span>
            </div>    

            {/* Pagination Controls: Includes buttons for navigating between pages */}
            <nav aria-label="Pagination" className="flex justify-center items-center text-[var(--text-tertiary)]">
                {/* Previous Button: Navigates to the previous page */}
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => onPageChange(currentPage - 1)} 
                    className="p-2 mr-2 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity disabled:opacity-40 cursor-pointer"
                    aria-label="Previous page"
                >        
                    {icons["arrowBack"]}      
                </button>

                {/* Jump to first page when there is a gap of 2 or more pages */}
                {currentPage >= 4 && (
                    <>
                        <button 
                            onClick={() => onPageChange(1)} 
                            className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                            aria-label={`Go to page 1`}
                        > 
                            1
                        </button>
                        <span className="mr-2 text-xs px-2 py-0.5 rounded" aria-hidden="true"> 
                            ...
                        </span>
                    </>
                )}

                {/* Show the page before the current one if applicable */}
                {currentPage > 2 && (
                    <button 
                        onClick={() => onPageChange(currentPage - 2)} 
                        className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                        aria-label={`Go to page ${currentPage - 2}`}
                    > 
                        {currentPage - 2}
                    </button>
                )}

                {/* Show the previous page */}
                {currentPage >= 2 && (
                    <button 
                        onClick={() => onPageChange(currentPage - 1)} 
                        className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                        aria-label={`Go to page ${currentPage - 1}`}
                    > 
                        {currentPage - 1}
                    </button>
                )}

                {/* Highlight the current page */}
                <span className="border-b mr-2 text-xs px-2 py-0.5 rounded bg-[var(--text-tertiary)]/20" aria-current="page"> 
                    {currentPage}
                </span>

                {/* Show the next page */}
                {currentPage < lastPage && (
                    <button 
                        onClick={() => onPageChange(currentPage + 1)} 
                        className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                        aria-label={`Go to page ${currentPage + 1}`}
                    > 
                        {currentPage + 1}
                    </button>
                )}

                {/* Show the page after the current one if applicable */}
                {currentPage < lastPage - 1 && (
                    <button 
                        onClick={() => onPageChange(currentPage + 2)} 
                        className="mr-2 text-xs px-2 py-0.5 rounded hover:bg-[var(--text-tertiary)]/50 active:opacity-55 transition-opacity"
                        aria-label={`Go to page ${currentPage + 2}`}
                    > 
                        {currentPage + 2}
                    </button>
                )}

                {/* Ellipsis for large gaps in pages */}
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

                {/* Next Button: Navigates to the next page */}
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
