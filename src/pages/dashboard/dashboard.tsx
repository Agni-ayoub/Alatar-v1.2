
const Dashboard = ()=>{

    return(
        <div className="flex shrink-0 flex-wrap w-full h-full">
            <div className="h-full flex flex-wrap w-full">
                <div className="flex shrink-0 flex-col h-full w-full lg:w-8/12">
                    <div className="flex w-full h-full flex-wrap">
                        <div className="bg-red-900 sm:min-w-0 min-w-full flex-1 min-h-[15rem]">
                            card 1
                        </div>
                        <div className="bg-red-500 sm:min-w-0 min-w-full flex-1  min-h-[15rem]">
                            card 2
                        </div>
                    </div>
                    <div className="flex-1 min-h-[20rem] bg-green-400">
                        data 1                       
                    </div>
                </div>
                <div className="flex lg:w-4/12 bg-blue-800 sm:min-w-0 w-full min-w-full h-full min-h-[20rem] lg:h-full">
                    data 2
                </div>
            </div>
        </div>
    );
};

export default Dashboard;