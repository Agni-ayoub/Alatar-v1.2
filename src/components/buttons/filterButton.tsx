import React from "react";
import Buttons from "./buttons";
import classNames from "classnames";

type ButtonProps = React.HtmlHTMLAttributes<HTMLButtonElement> & {
    isFilter : boolean;
}

const FilterButton : React.FC<ButtonProps> = ({ isFilter, ...props }) => {

    return(
        <div className="w-8 h-8">
            <Buttons iconClassName={classNames("text-sm transition-transform duration-300",
                {
                    '-rotate-90 text-lg' : isFilter,
                }
            )} withTransform={false} icon={isFilter? "close" : "filter"} placeHolderClassName="hidden" className="h-full bg-[var(--text-secondary)]/60 w-full active:scale-95" { ...props }/>
        </div>
    )
};

export default FilterButton;