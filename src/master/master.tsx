import React from "react";
import SideNav from "../components/sideNav";

type MasterProps = object;

const Master: React.FC<MasterProps> = () => {

    return(
        <div className="flex">
            <SideNav />
        </div>
    );
};

export default Master