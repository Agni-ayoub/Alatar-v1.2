import CardData from "../../components/cardData/cardData";

const Dashboard = ()=>{

    return(
        <div className="flex shrink-0 overflow-auto flex-wrap w-full h-full">
            <div className="h-full flex flex-wrap w-full">
                <div className="flex shrink-0 flex-col h-full w-full lg:w-8/12">
                    <div className="flex flex-1 w-full flex-wrap">
                        <div className="bg-red-90 items-center justify-center flex md:min-w-0 min-w-full flex-1 min-h-[15rem]">
                            <CardData 
                                label="Companies"
                                number={5241}
                                progress={{type: "positive", number: 12.66}}
                                icon="companies2"
                            />
                        </div>
                        <div className="items-center justify-center flex md:min-w-0 min-w-full flex-1 min-h-[15rem]">
                            <CardData 
                                label="Vehicles"
                                number={614984}
                                progress={{type: "positive", number: 28.06}}
                                icon="vehicles2"
                            />
                        </div>
                    </div>
                    <div className="flex-1 bg-green-400">
                                         
                    </div>
                </div>
                <div className="flex lg:w-4/12 bg-blue-800 sm:min-w-0 w-full min-w-full lg:h-full">
                    data 2
                </div>
            </div>
        </div>
    );
};

export default Dashboard;