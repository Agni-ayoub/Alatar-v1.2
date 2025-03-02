import Inputs from "../../components/inputs/inputs";
import DataCard from "../../components/cards/dataCard";

const Companies = ()=>{

    return(
        <div className="overflow-scroll flex flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full h-full p-5">
            <div className="w-full py-2">
                <div className="w-full">
                    <Inputs.search />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
                <DataCard />
            </div>
        </div>
    );
};

export default Companies;