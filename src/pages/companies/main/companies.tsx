import Inputs from "../../../components/inputs/inputs";
import DataCard from "../../../components/cards/dataCard/main/dataCard";
import { useGetCompaniesQuery } from "../../../features/api/getMethodSlice";
import React, { useEffect, useState } from "react";
import { Company } from "../../../features/sliceTypes";
import AlatarLoader from "../../../components/animated/alatarLoader";
import EditCompany from "../fragments/editCompany";
import DeleteModal from "../../../components/deleteModal/deleteModal";

const Companies : React.FC = ()=>{
    const { data, isFetching, refetch } = useGetCompaniesQuery();
    const [Companies, setCompanies] = useState<Company[]>([]);

    useEffect(()=>{
        if(data?.status === 'success'){
            setCompanies(data.companies);
        }
    },[data]);
    
    return(
        <div className="flex h-full flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full px-2 py-2">
            {/* Modals */}
            <div>
                <EditCompany refetch={refetch} />
                <DeleteModal type="Company" />
            </div>
            {/* Body */}
            <div className="w-full px-2 py-2">
                <div className="w-full">
                    <Inputs.search />
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