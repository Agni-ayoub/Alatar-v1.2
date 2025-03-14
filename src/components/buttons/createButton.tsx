import React from "react";
import Buttons from "./buttons";

type ButtonProps = React.HtmlHTMLAttributes<HTMLButtonElement>

const CreateButton : React.FC<ButtonProps> = ({ ...props }) => {

    return(
        <div className="w-8 h-8">
            <Buttons {...props} withTransform={false} icon="create" placeHolderClassName="hidden" className="h-full bg-[var(--text-secondary)]/60 w-full active:scale-95" />
        </div>
    )
};

export default CreateButton;