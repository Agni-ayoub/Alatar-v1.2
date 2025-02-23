import React from "react";

type SideNavTypes = React.HTMLAttributes<HTMLDivElement> & {

}

const SideNav : React.FC<SideNavTypes> = ({
    ...props
})=>{

    return(
        <div {...props}>

        </div>
    )
}

export default SideNav;