import { ActionMeta, PropsValue, SingleValue } from "react-select";

export type OptionType = { value: string; label: string };

export type InputsProps = React.InputHTMLAttributes<HTMLInputElement> & {   
    label?: string;
    type?: string;
    className?: string;
    withoutLabel?: boolean;
    withWobble?: boolean;
    wrapperClassName?: string;
    isError?: boolean;
    ErrorMessage?: string;
    containerClassName?: string;
    fileImageSrc? : string;
    onSelectChange?: (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
    selectValue?: PropsValue<OptionType> | undefined;
};
