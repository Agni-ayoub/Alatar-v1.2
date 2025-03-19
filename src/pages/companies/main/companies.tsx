import React, { JSX, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";
import Inputs from "../../../components/inputs/main/inputs";
import DataCard from "../../../components/cards/dataCard/main/dataCard";
import { useGetCompaniesQuery } from "../../../features/api/getMethodSlice";
import { Company, Paginator } from "../../../features/sliceTypes";
import AlatarLoader from "../../../components/animated/alatarLoader";
import EditCompany from "../fragments/editCompany";
import DeleteModal from "../../../components/deleteModal/deleteModal";
import CreateButton from "../../../components/buttons/createButton";
import FilterButton from "../../../components/buttons/filterButton";
import AddCompanyModal from "../fragments/addCompany";
import Pagination from "../../../components/pagination/main/pagination";
import MySelect from "../../../components/mySelect/mySelect";
import { searchCompanyOptions } from "../../../components/inputs/main/searchSelectOptions";
import { ExpectedObj, HandleMySelectChange } from "../../../utils/handleMySelectChnage";
import { statusOptions } from "./filters";
import { OptionType } from "../../../components/inputs/main/inputsTypes";
import {
    handleAddData,
    onPageChange,
    handleSearchInputChange,
    handleSearchFilterChange,
    handleShowFilter
} from "../../../utils/handlers";

/**
 * Companies component - Displays a list of companies with search, filters, and pagination.
 *
 * @component
 * @returns {JSX.Element} The Companies component.
 */
const Companies: React.FC = (): JSX.Element => {
    /** State for selected filter options */
    const [selected, setSelected] = useState<OptionType[]>([]);
    
    /** State to track filter visibility */
    const [isFilter, setIsFilter] = useState<boolean>(false);

    /** React Router hook for managing search parameters in URL */
    const [searchParams, setSearchParams] = useSearchParams();
    const searchFromParam = searchParams.get("search");

    /** State for search input value */
    const [searchValue, setSearchValue] = useState<string>(searchFromParam || "");
    
    /** State for selected search type */
    const [searchType, setSearchType] = useState<OptionType | null>(searchCompanyOptions[0]);

    /** State for applied filters */
    const [filters, setFilters] = useState<ExpectedObj>({ status: [], size : [] });

    /** State for pagination information */
    const [paginator, setPaginator] = useState<Paginator>({
        currentPage: Number(searchParams.get("page")) || 1,
        lastPage: 1,
        total: 1
    });

    /** State for storing fetched companies data */
    const [companies, setCompanies] = useState<Company[]>([]);

    /** Fetch companies data based on current page, search filters, and query parameters */
    const { data, isFetching, refetch } = useGetCompaniesQuery({
        page: paginator.currentPage,
        searchType: searchType?.value,
        searchValue: searchValue,
        filters
    });

    /**
     * Updates state when new data is received from API.
     * Runs whenever `data` changes.
     */
    useEffect(() => {
        if (data?.status === "success") {
            setCompanies(data.companies);
            setPaginator(data.paginator);
        }
    }, [data]);

    /**
     * Syncs search input with URL parameters.
     * Runs whenever `searchValue` or `searchParams` change.
     */
    useEffect(() => {
        if (!searchValue) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.delete("search");
                return newParams;
            });
        } else {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set("search", searchValue);
                return newParams;
            });
        }
    }, [searchFromParam, searchValue, setSearchParams]);

    /**
     * Syncs selected filters with URL parameters.
     * Runs whenever `searchParams` change.
     */
    useEffect(() => {
        const selectedOptions = statusOptions.filter(option =>
            searchParams.get("status")?.split(",").includes(option.value)
        );
        setSelected(selectedOptions);
    }, [searchParams]);

    return (
        <div className="flex h-full flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full px-2 py-2">
            {/* Modals for CRUD operations */}
            <div>
                <EditCompany refetch={refetch} />
                <DeleteModal refetch={refetch} type="Company" />
                <AddCompanyModal refetch={refetch} />
            </div>
            
            {/* Search and action buttons */}
            <div className="flex items-center gap-4 w-full px-2 py-2">
                <div className="w-full">
                    <Inputs.search 
                        selectValue={searchType} 
                        onSelectChange={(newValue) => handleSearchFilterChange(newValue, setSearchType)} 
                        onChange={(e) => handleSearchInputChange(e, setSearchValue, setPaginator)} 
                        value={searchValue} 
                        placeholder={`Search by ${searchType?.label}...`} 
                        aria-label="Search companies"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FilterButton 
                        isFilter={isFilter} 
                        onClick={() => handleShowFilter(setIsFilter)} 
                        aria-label="Toggle filter options"
                    />
                    <CreateButton 
                        onClick={() => handleAddData(searchParams, setSearchParams)} 
                        aria-label="Create a new company"
                    />
                </div>
            </div>

            {/* Filters section */}
            <div className={classNames("transition-all rounded-md duration-200 flex flex-wrap gap-2 px-2", {
                "opacity-100 h-[2rem] mb-4": isFilter,
                "opacity-0 h-0 pointer-events-none": !isFilter,
            })}>
                <MySelect
                    containerClassName="max-w-1/2"
                    onChange={HandleMySelectChange({ selectName: "status", setData : setFilters })}
                    isMulti={false}
                    options={statusOptions}
                    placeHolder="Filter by Status"
                    value={selected}
                    aria-label="Filter by status"
                />
            </div>

            {/* Pagination */}
            <Pagination 
                setFilters={setFilters}
                paginator={paginator} 
                onPageChange={(newPage) => onPageChange(newPage, setSearchParams, setPaginator)} 
                aria-label="Pagination controls"
            />

            {/* Loading state */}
            {isFetching ? (
                <div className="relative w-full h-full" aria-live="polite">
                    <AlatarLoader />
                </div>
            ) : (
                // Displaying fetched company data
                <div className="grid px-2 sm:grid-cols-2 gap-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 overflow-auto mb-18" aria-live="polite">
                    {companies.map((company, idx) => (
                        <DataCard key={idx} {...company} aria-label={`Company ${company.name}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Companies;