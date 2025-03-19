import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SingleValue } from "react-select";
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

/**
 * Companies Component - Displays a list of companies with search and filter functionality.
 * @returns {JSX.Element} The Companies component.
 */
const Companies: React.FC = () => {
    // State variables
    const [selected, setSelected] = useState<OptionType[]>([]);
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchFromParam = searchParams.get("search");
    const [searchValue, setSearchValue] = useState<string>(searchFromParam || "");
    const [searchType, setSearchType] = useState<OptionType | null>(searchCompanyOptions[0]);
    const [filters, setFilters] = useState<ExpectedObj>({ status: [] });
    const [paginator, setPaginator] = useState<Paginator>({
        currentPage: Number(searchParams.get("page")) || 1,
        lastPage: 1,
        total: 1
    });
    const [companies, setCompanies] = useState<Company[]>([]);

    // Fetch companies data
    const { data, isFetching, refetch } = useGetCompaniesQuery({
        page: paginator.currentPage,
        searchType: searchType?.value,
        searchValue: searchValue,
        filters
    });

    // Update companies list when data changes
    useEffect(() => {
        if (data?.status === "success") {
            setCompanies(data.companies);
            setPaginator(data.paginator);
        }
    }, [data]);

    /** Handle opening the Add Company modal */
    const handleAddCompany = () => {
        if (searchParams.get("action")) return;
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("action", "create");
            return newParams;
        });
    };

    /** Handle pagination change */
    const onPageChange = (newPage: number) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", newPage.toString());
            return newParams;
        });
        setPaginator((prev) => ({ ...prev, currentPage: newPage }));
    };

    /** Handle search input change */
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setPaginator((prev) => ({ ...prev, currentPage: 1 }));
    };

    /** Sync search value with URL parameters */
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

    /** Handle search filter change */
    const handleSearchFilterChange = (newValue: SingleValue<OptionType>) => {
        setSearchType(newValue);
    };

    /** Toggle filter visibility */
    const handleShowFilter = () => {
        setIsFilter((prev) => !prev);
    };

    /** Sync selected filters with URL parameters */
    useEffect(() => {
        const selectedOptions = statusOptions.filter(option =>
            searchParams.get("status")?.split(",").includes(option.value)
        );
        setSelected(selectedOptions);
    }, [searchParams]);

    return (
        <div className="flex h-full flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full px-2 py-2">
            {/* Modals */}
            <div>
                <EditCompany refetch={refetch} />
                <DeleteModal refetch={refetch} type="Company" />
                <AddCompanyModal refetch={refetch} />
            </div>
            
            {/* Search and Filter Section */}
            <div className="flex items-center gap-4 w-full px-2 py-2">
                <div className="w-full">
                    <Inputs.search 
                        selectValue={searchType} 
                        onSelectChange={handleSearchFilterChange} 
                        onChange={handleSearchInputChange} 
                        value={searchValue} 
                        placeholder={`Search by ${searchType?.label}...`} 
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FilterButton isFilter={isFilter} onClick={handleShowFilter} />
                    <CreateButton onClick={handleAddCompany} />
                </div>
            </div>

            {/* Filter Dropdown */}
            <div className={classNames("transition-all rounded-md duration-200 flex flex-wrap gap-2", {
                "opacity-100 h-[2rem] mb-4": isFilter,
                "opacity-0 h-0": !isFilter,
            })}>
                <MySelect
                    containerClassName="max-w-1/2"
                    onChange={HandleMySelectChange({ selectName: "status", setFilters })}
                    isMulti={false}
                    options={statusOptions}
                    placeHolder="Filter by Status"
                    value={selected}
                />
            </div>

            {/* Pagination */}
            <Pagination paginator={paginator} onPageChange={onPageChange} />

            {/* Companies List */}
            {isFetching ? (
                <div className="relative w-full h-full">
                    <AlatarLoader />
                </div>
            ) : (
                <div className="grid px-2 sm:grid-cols-2 gap-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 overflow-auto mb-18">
                    {companies.map((company, idx) => (
                        <DataCard key={idx} {...company} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Companies;
