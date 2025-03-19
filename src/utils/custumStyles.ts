/**
 * @typedef {Object} OptionType
 * @property {string} value - The value of the option.
 * @property {string} label - The label of the option.
 */

import { GroupBase, StylesConfig } from "react-select";
import { OptionType } from "../components/inputs/main/inputsTypes";

/**
 * Custom styles for the search input select component.
 * @type {StylesConfig<OptionType, false>}
 */
export const searchInputStyles : StylesConfig<OptionType, false> = {
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
    minHeight: "0",
    outline: "none",
    boxShadow: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, opacity 0.2s",
    "&:hover": {
      opacity: "0.8",
      transform: "scale(0.95)",
    },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isFocused ? "var(--text-secondary)" : "transparent",
    fontSize: "0.875rem",
    fontWeight: isSelected ? "bold" : "normal",
    color: "var(--text-primary)",
    fontStyle: isSelected ? "oblique" : "normal",
    cursor: "pointer",
    padding: "0.4rem",
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
    border: "1px solid var(--text-secondary)",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    color: "var(--text-primary)",
    display: "none",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "var(--text-secondary)",
    width: "1.4rem",
    padding: "0 0.2rem",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out, opacity 0.2s",
    "&:hover": {
      opacity: "0.8",
      color: "var(--text-secondary)",
    },
  }),
};

/**
 * Custom styles for the multi-select component.
 * @type {StylesConfig<OptionType, true>}
 */
export const MySelectStyles : StylesConfig<OptionType, boolean, GroupBase<OptionType>> = {
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "var(--text-secondary)",
    fontSize: "0.8rem",
    padding: "0",
    height: "2.25rem",
    minHeight: "0",
    outline: "none",
    boxShadow: "none",
    cursor: "pointer",
    transition: "opacity 0.2s",
    "&:hover": {
      opacity: "0.8",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
  }),
  multiValue: (base) => ({
    ...base,
    background: "var(--text-secondary)",
    display: "flex",
    minWidth: "0",
    flexWrap: "nowrap",
    overflow: "hidden",
    flexShrink: 0,
  }),
  multiValueLabel: (base) => ({
    ...base,
    minWidth: "0",
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "var(--text-primary)",
    padding: "2px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--text-primary)",
    },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isFocused ? "var(--text-secondary)" : "transparent",
    fontSize: "0.8rem",
    fontWeight: isSelected ? "bold" : "normal",
    color: "var(--text-primary)",
    fontStyle: isSelected ? "oblique" : "normal",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    borderRadius : "2px",
    background: "var(--text-secondary)",
    fontSize : "0.7rem",
    display: "flex",
    padding : "0.15rem",
    paddingRight : "0.8rem",
    paddingLeft : "0.8rem",
    minWidth: "0",
    flexWrap: "nowrap",
    overflow: "hidden",
    flexShrink: 0,
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--background)",
    borderRadius: "4px",
    border: "1px solid var(--text-secondary)",
    width: "100%",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    color: "var(--text-secondary)",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "var(--text-secondary)",
    width: "1.4rem",
    padding: "0 0.2rem",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out, opacity 0.2s",
    "&:hover": {
      opacity: "0.8",
      color: "var(--text-secondary)",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: "0 0.2rem",
    color: "var(--negative)",
    "&:hover": {
      color: "var(--text-primary)",
    },
  }),
};
