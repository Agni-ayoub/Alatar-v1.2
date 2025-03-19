import React, { useEffect, useState } from "react";
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

const Companies: React.FC = () => {
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

    const { data, isFetching, refetch } = useGetCompaniesQuery({
        page: paginator.currentPage,
        searchType: searchType?.value,
        searchValue: searchValue,
        filters
    });

    useEffect(() => {
        if (data?.status === "success") {
            setCompanies(data.companies);
            setPaginator(data.paginator);
        }
    }, [data]);

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

    useEffect(() => {
        const selectedOptions = statusOptions.filter(option =>
            searchParams.get("status")?.split(",").includes(option.value)
        );
        setSelected(selectedOptions);
    }, [searchParams]);

    return (
        <div className="flex h-full flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full px-2 py-2">
            <div>
                <EditCompany refetch={refetch} />
                <DeleteModal refetch={refetch} type="Company" />
                <AddCompanyModal refetch={refetch} />
            </div>
            
            <div className="flex items-center gap-4 w-full px-2 py-2">
                <div className="w-full">
                    <Inputs.search 
                        selectValue={searchType} 
                        onSelectChange={(newValue) => handleSearchFilterChange(newValue, setSearchType)} 
                        onChange={(e) => handleSearchInputChange(e, setSearchValue, setPaginator)} 
                        value={searchValue} 
                        placeholder={`Search by ${searchType?.label}...`} 
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FilterButton isFilter={isFilter} onClick={() => handleShowFilter(setIsFilter)} />
                    <CreateButton onClick={() => handleAddData(searchParams, setSearchParams)} />
                </div>
            </div>

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

            <Pagination paginator={paginator} onPageChange={(newPage) => onPageChange(newPage, setSearchParams, setPaginator)} />

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