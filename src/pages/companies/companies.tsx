import Inputs from "../../components/inputs/inputs";
import DataCard from "../../components/cards/dataCard/main/dataCard";
import { useGetCompaniesQuery } from "../../features/api/getMethodSlice";
import { useEffect, useState } from "react";
import { Company } from "../../features/sliceTypes";
import AlatarLoader from "../../components/animated/alatarLoader";
import useModal from "../../hooks/useModal";

const Companies = ()=>{
    const [Companies, setCompanies] = useState<Company[]>([]);
    const { data, isLoading } = useGetCompaniesQuery();
    const { ModalComponent : EditModalComponent } = useModal('edit');
    const { ModalComponent : DeleteModalComponent } = useModal('delete');
    
    useEffect(()=>{
        if(data?.status === 'success'){
            setCompanies(data.companies);
        }
    },[data]);

    return(
        <div className="flex h-full flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full px-5 py-2">
            {/* Modals */}
            <div>
                <EditModalComponent>

                </EditModalComponent>
                <DeleteModalComponent>

                </DeleteModalComponent>
            </div>

            <div className="w-full py-2">
                <div className="w-full">
                    <Inputs.search />
                </div>
            </div>
            {
                isLoading?
                <div className="relative w-full h-full">
                    <AlatarLoader />
                </div>:
                <div className="grid sm:grid-cols-2 gap-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 overflow-auto mb-18">
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