import React from "react";
import Buttons from "./buttons";
import classNames from "classnames";

type ButtonProps = React.HtmlHTMLAttributes<HTMLButtonElement>

const CreateButton : React.FC<ButtonProps> = ({ ...props }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const active = searchParams.get('action') === 'create';

    return(
        <div className="w-8 h-8">
            <Buttons {...props} withTransform={false} icon="create" placeHolderClassName="hidden" className="h-full bg-[var(--text-secondary)]/60 w-full active:scale-95 transition-transform duration-300" iconClassName={classNames("transition-transform",
                {
                    "-rotate-45" : active
                }
            )}/>
        </div>
    )
};

export default CreateButton;