import Inputs from "../../components/inputs/inputs";
import DataCard from "../../components/cards/dataCard/main/dataCard";
import { useGetCompaniesQuery } from "../../features/api/getMethodSlice";
import { useEffect, useState } from "react";
import { Company } from "../../features/sliceTypes";
import AlatarLoader from "../../components/animated/alatarLoader";

const Companies = ()=>{
    const [Companies, setCompanies] = useState<Company[]>([]);
    const { data, isLoading } = useGetCompaniesQuery();

    useEffect(()=>{
        if(data?.status === 'success'){
            setCompanies(data.companies);
        }
    },[data]);

    return(
        <div className="overflow-scroll flex flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full h-full p-5">
            <div className="w-full py-2">
                <div className="w-full">
                    <Inputs.search />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                {
                isLoading?
                    <AlatarLoader /> :
                    Companies.map((company, idx) => {
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
                    })
                }
            </div>
        </div>
    );
};

export default Companies;