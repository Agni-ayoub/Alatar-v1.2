import { Dispatch, SetStateAction } from "react";
import { SingleValue } from "react-select";
import { OptionType } from "../components/inputs/main/inputsTypes";
import { Paginator } from "../features/sliceTypes";

/** Handle opening the Add Company modal */
export const handleAddData = (searchParams: URLSearchParams, setSearchParams: Dispatch<SetStateAction<URLSearchParams>>) => {
    if (searchParams.get("action")) return;
    setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("action", "create");
        return newParams;
    });
};

/** Handle pagination change */
export const onPageChange = (
    newPage: number,
    setSearchParams: Dispatch<SetStateAction<URLSearchParams>>,
    setPaginator: Dispatch<SetStateAction<Paginator>>
) => {
    setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("page", newPage.toString());
        return newParams;
    });
    setPaginator((prev) => ({ ...prev, currentPage: newPage }));
};

/** Handle search input change */
export const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setSearchValue: Dispatch<SetStateAction<string>>,
    setPaginator: Dispatch<SetStateAction<Paginator>>
) => {
    setSearchValue(e.target.value);
    setPaginator((prev) => ({ ...prev, currentPage: 1 }));
};

/** Handle search filter change */
export const handleSearchFilterChange = (
    newValue: SingleValue<OptionType>,
    setSearchType: Dispatch<SetStateAction<OptionType | null>>
) => {
    setSearchType(newValue);
};

/** Toggle filter visibility */
export const handleShowFilter = (setIsFilter: Dispatch<SetStateAction<boolean>>) => {
    setIsFilter((prev) => !prev);
};
