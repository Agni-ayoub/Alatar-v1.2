import Inputs from "../../../components/inputs/main/inputs";
import DataCard from "../../../components/cards/dataCard/main/dataCard";
import { useGetCompaniesQuery } from "../../../features/api/getMethodSlice";
import React, { useEffect, useState } from "react";
import { Company, Paginator } from "../../../features/sliceTypes";
import AlatarLoader from "../../../components/animated/alatarLoader";
import EditCompany from "../fragments/editCompany";
import DeleteModal from "../../../components/deleteModal/deleteModal";
import CreateButton from "../../../components/buttons/createButton";
import FilterButton from "../../../components/buttons/filterButton";
import AddCompanyModal from "../fragments/addCompany";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/pagination/main/pagination";
import { SingleValue } from "react-select";
import { OptionType } from "../../../components/inputs/main/inputsTypes";
import { searchCompanyOptions } from "../../../components/inputs/main/searchSelectOptions";

const Companies : React.FC = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const searchFromParam = searchParams.get('search');
    const [searchValue, setSearchValue] = useState<string>(searchFromParam || "");
    const [searchType, setSearchType] = useState<OptionType | null>(searchCompanyOptions[0]);
    const [paginator, setPaginator] = useState<Paginator>({
        currentPage : Number(searchParams.get('page')) || 1,
        lastPage : 1,
        total : 1
    });
    const currentPage : number = paginator.currentPage; 
    const { data, isFetching, refetch } = useGetCompaniesQuery({
        page : currentPage,
        searchType : searchType?.value,
        searchValue : searchValue
    });
    const [Companies, setCompanies] = useState<Company[]>([]);

    useEffect(()=>{
        if(data?.status === 'success'){
            setCompanies(data.companies);
            setPaginator(data.paginator);
        }
    },[data]);

    const handleAddCompany = () => {
        if(searchParams.get('action')) return;
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('action', 'create');
            return newParams;
        });
    };

    const onPageChange = (newPage : number) => {
        setSearchParams((prev : URLSearchParams) => {
            const newParams = new URLSearchParams(prev);
            const page = JSON.stringify(newPage);
            newParams.set('page', page);
            return newParams;
        });
        setPaginator((prev : Paginator) => ({...prev, currentPage : newPage}));
    };

    const handleSearchInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchValue(value);
        setPaginator((prev : Paginator) => ({...prev, currentPage : 1}));
    };

    useEffect((() => {
        if(!searchValue){
            setSearchParams((prev : URLSearchParams) => {
                const newParams = new URLSearchParams(prev);
                newParams.delete('search');
                return newParams;
            });
        }else setSearchParams((prev : URLSearchParams) => {
                const newParams = new URLSearchParams(prev);
                newParams.set('search', searchValue);
                return newParams;
            });
    }),[searchFromParam, searchValue, setSearchParams]);

    const handleChange = (newValue: SingleValue<OptionType>) => {
        setSearchType(newValue);
    };

    return(
        <div className="flex h-full flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full px-2 py-2">
            {/* Modals */}
            <div>
                <EditCompany refetch={refetch} />
                <DeleteModal refetch={refetch} type="Company" />
                <AddCompanyModal refetch={refetch} />
            </div>
            {/* Body */}
            <div className="flex items-center gap-4 w-full px-2 py-2">
                <div className="w-full">
                    <Inputs.search selectValue={searchType} onSelectChange={handleChange} onChange={handleSearchInputChange} value={searchValue} placeholder={`Search by ${searchType?.label}...`} />
                </div>
                <div className="flex items-center gap-2">
                    <FilterButton />
                    <CreateButton onClick={() => handleAddCompany()} />
                </div>
            </div>
            <div className="px-2">
                <Pagination 
                    paginator={paginator}
                    onPageChange={onPageChange} 
                />
            </div>
            {
                isFetching?
                <div className="relative w-full h-full">
                    <AlatarLoader />
                </div>:
                <div className="grid px-2 sm:grid-cols-2 gap-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 overflow-auto mb-18">
                    {Companies.map((company, idx) => {
                        return(
                            <DataCard 
                                key={idx}
                                avatar={company?.avatar}
                                title={company?.name}
                                id={company?.id}
                                phone={company?.phone}
                                email={company?.email}
                                activity={company?.status}
                            />
                        )
                    })}
                </div>
            }
        </div>
    );
};

export default Companies;