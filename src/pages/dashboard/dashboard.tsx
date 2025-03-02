import CardData from "../../components/cardData/cardData";

const Dashboard = ()=>{

    return(
        <div className="flex shrink-0 flex-wrap h-full w-full">
            <div className="h-full gap-2 flex flex-wrap w-full">
                <div className="flex shrink-0 flex-col h-full w-full lg:w-8/12">
                    <div className="flex w-full flex-wrap">
                        <div className="bg-red-90 items-center justify-center flex md:min-w-0 min-w-full flex-1 min-h-[12rem]">
                            <CardData 
                                label="Companies"
                                number={5241}
                                progress={{type: "negative", number: 12.66}}
                                icon="companies2"
                            />
                        </div>
                        <div className="items-center justify-center flex md:min-w-0 min-w-full flex-1 min-h-[12rem]">
                            <CardData 
                                label="Vehicles"
                                number={614984}
                                progress={{type: "positive", number: 28.06}}
                                icon="vehicles2"
                            />
                        </div>
                        <div className="items-center justify-center flex flex-1 min-h-[12rem]">
                            <CardData 
                                label="Vehicles"
                                number={614984}
                                progress={{type: "positive", number: 28.06}}
                                icon="vehicles2"
                            />
                        </div>
                    </div>
                    <div className="w-full px-4 py-2 border border-[var(--text-secondary)] rounded-md bg-[var(--sideNav-background)] h-full">
                        data 3
                    </div>
                </div>
                <div className="flex-1 px-4 py-2 border border-[var(--text-secondary)] bg-[var(--sideNav-background)] rounded-md">
                    data 2
                </div>
            </div>
        </div>
    );
};

export default Dashboard;