import { StylesConfig } from "react-select";

type OptionType = { value: string; label: string };

export const searchInputStyles: StylesConfig<OptionType, false> = {
    control: (base) => ({
      ...base,
      backgroundColor: "transparent",
      display: "flex",
      border: "none",
      borderColor: "var(--text-secondary)",
      width: "max-content",
      fontSize: "0.875rem",
      padding: "0rem",
      height: "2.25rem",
      minHeight : "0",
      outline: "none",
      boxShadow : "none",
      cursor : "pointer",
      transition: "transform 0.2s ease-in-out, opacity 0.2s",
      "&:hover": {
        opacity: "0.8",
        transform : "scale(0.95)"
      },
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused ? "var(--text-secondary)" : "transparent",
      fontSize: "0.875rem",
      fontWeight: isSelected ? "bold" : "normal",
      color: isSelected ? "var(--text-primary)" : "var(--text-primary)",
      fontStyle: isSelected ? "oblique" : "",
      cursor: "pointer",
      padding : "0.4rem"
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--text-secondary)",
      fontSize: "0.6rem",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--background)",
      borderRadius: "8px",
      width: "max-content",
      border: "1px solid var(--text-secondary)"
    }),
    indicatorsContainer: (base) => ({
      ...base,
      color: "var(--text-primary)",
      display : "none"
    }),
    dropdownIndicator: (base, state: { isFocused: boolean; selectProps: { menuIsOpen: boolean } }) => ({
      ...base,
      color: "var(--text-secondary)",
      width: "1.4rem",
      padding: "0",
      paddingLeft: ".2rem",
      paddingRight: "0.2rem",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease-in-out, opacity 0.2s",
      "&:hover": {
        opacity: "0.8",
        color: "var(--text-secondary)",
      },
    }),
};