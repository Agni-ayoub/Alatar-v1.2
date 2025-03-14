import Inputs from "../../../components/inputs/inputs";
import DataCard from "../../../components/cards/dataCard/main/dataCard";
import { useGetCompaniesQuery } from "../../../features/api/getMethodSlice";
import React, { useEffect, useState } from "react";
import { Company } from "../../../features/sliceTypes";
import AlatarLoader from "../../../components/animated/alatarLoader";
import EditCompany from "../fragments/editCompany";
import DeleteModal from "../../../components/deleteModal/deleteModal";
import CreateButton from "../../../components/buttons/createButton";
import FilterButton from "../../../components/buttons/filterButton";
import AddCompanyModal from "../fragments/addCompany";
import { useSearchParams } from "react-router-dom";

const Companies : React.FC = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isFetching, refetch } = useGetCompaniesQuery();
    const [Companies, setCompanies] = useState<Company[]>([]);

    useEffect(()=>{
        if(data?.status === 'success'){
            setCompanies(data.companies);
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
                    <Inputs.search />
                </div>
                <div className="flex gap-2">
                    <FilterButton />
                    <CreateButton onClick={() => handleAddCompany()} />
                </div>
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