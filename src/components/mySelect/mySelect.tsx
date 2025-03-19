import React, { JSX } from "react";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";
import { MySelectStyles } from "../../utils/custumStyles";
import { OptionType } from "../inputs/main/inputsTypes";
import { icons } from "../../utils/icons";
import classNames from "classnames";

/**
 * Props for MySelect component.
 */
interface MySelectProps {
  /** Determines if multiple options can be selected. */
  isMulti?: boolean;
  /** List of selectable options. */
  options: OptionType[];
  /** Placeholder text for the select input. */
  placeHolder?: string;
  /** Additional CSS classes for the container. */
  containerClassName?: string;
  /** Callback for when the selected value changes. */
  onChange?: (newValue: SingleValue<OptionType> | MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
  /** The currently selected value(s). */
  value: OptionType[];
}

const withIcon = (props: OptionType) => {
  const { icon, label } = props;
  return (
    <div className="flex items-center gap-2">
      <div>{icons[icon]}</div>
      <span>{label}</span>
    </div>
  ) as unknown as string;
};

/**
 * Custom select component using react-select with optional multi-selection and icons.
 * @param {MySelectProps} props - Component props.
 * @returns {JSX.Element} - The rendered select component.
 */
const MySelect: React.FC<MySelectProps> = ({
  isMulti = true,
  placeHolder = "Select an option",
  options,
  containerClassName,
  onChange,
  value,
}: MySelectProps): JSX.Element => {
  const animated = makeAnimated();

  return (
    <div className={classNames("h-fit flex flex-col gap-2 min-w-[45%] flex-1", containerClassName)}>
      <Select<OptionType, boolean>
        isMulti={isMulti}
        isClearable
        styles={MySelectStyles}
        options={options}
        placeholder={placeHolder}
        components={animated}
        onChange={onChange}
        value={value}
        getOptionLabel={withIcon}
      />
    </div>
  );
};

export default MySelect;
