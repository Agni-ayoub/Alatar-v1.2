import React, { JSX, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import classNames from "classnames";
import Inputs from "../../../../../../../components/inputs/main/inputs";
import DataCard from "../../../../../../../components/cards/dataCard/main/dataCard";
import { Paginator, User } from "../../../../../../../features/sliceTypes";
import AlatarLoader from "../../../../../../../components/animated/alatarLoader";
import DeleteModal from "../../../../../../../components/deleteModal/deleteModal";
import CreateButton from "../../../../../../../components/buttons/createButton";
import FilterButton from "../../../../../../../components/buttons/filterButton";
import Pagination from "../../../../../../../components/pagination/main/pagination";
import MySelect from "../../../../../../../components/mySelect/mySelect";
import { searchUserOptions } from "../../../../../../../components/inputs/main/searchSelectOptions";
import { ExpectedObj, HandleMySelectChange } from "../../../../../../../utils/handleMySelectChnage";
import { statusOptions } from "./../../../../filters";
import { OptionType } from "../../../../../../../components/inputs/main/inputsTypes";
import {
    handleAddData,
    onPageChange,
    handleSearchInputChange,
    handleSearchFilterChange,
    handleShowFilter
} from "../../../../../../../utils/handlers";
import { useGetUsersQuery } from "../../../../../../../features/api/getMethodSlice";
import EditUser from "../fragments/fragments/editUser";
import AddUserModal from "../fragments/fragments/addUser";
import { useDeleteUserMutation } from "../../../../../../../features/api/deleteMethod";

/**
 * Users Component - Displays a list of users with search, filter, and pagination features.
 * 
 * @returns {JSX.Element} The rendered Users component.
 */
const Users: React.FC = (): JSX.Element => {
    const { id } = useParams();
    const [selected, setSelected] = useState<OptionType[]>([]);
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchFromParam = searchParams.get("search");
    const [searchValue, setSearchValue] = useState<string>(searchFromParam || "");
    const [searchType, setSearchType] = useState<OptionType | null>(searchUserOptions[0]);
    const [filters, setFilters] = useState<ExpectedObj>({ status: [] });

    const [paginator, setPaginator] = useState<Paginator>({
        currentPage: Number(searchParams.get("page")) || 1,
        lastPage: 1,
        total: 1
    });

    const [users, setUsers] = useState<User[]>([]);

    const { data, isFetching, refetch } = useGetUsersQuery(
        { id, page: paginator.currentPage, searchType: searchType?.value, searchValue, filters },
        { skip: !id }
    );

    const [deleteData, {isLoading : deleteDataLoding}] = useDeleteUserMutation();

    /**
     * Updates users and pagination when new data is fetched.
     */
    useEffect(() => {
        if (data?.status === "success") {
            setUsers(data.users);
            setPaginator(data.paginator);
        }
    }, [data]);

    /**
     * Updates search params when the search value changes.
     */
    useEffect(() => {
        if (!searchValue) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.delete("search");
                return newParams;
            });
        } else {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set("search", searchValue);
                return newParams;
            });
        }
    }, [searchFromParam, searchValue, setSearchParams]);

    /**
     * Syncs selected filter options with search params.
     */
    useEffect(() => {
        const selectedOptions = statusOptions.filter(option =>
            searchParams.get("status")?.split(",").includes(option.value)
        );
        setSelected(selectedOptions);
    }, [searchParams]);

    return (
        <div className="flex h-full flex-col gap-2 bg-[var(--sideNav-background)]/50 rounded-xl w-full px-2 py-2">
            {/* Modals for CRUD operations */}
            <div>
                <EditUser refetch={refetch} />
                <DeleteModal refetch={refetch} type="User" action={deleteData} isLoading={deleteDataLoding} />
                <AddUserModal refetch={refetch} />
            </div>
            
            {/* Search and action buttons */}
            <div className="flex items-center gap-4 w-full px-2 py-2">
                <div className="w-full">
                    <Inputs.search 
                        selectValue={searchType} 
                        onSelectChange={(newValue) => handleSearchFilterChange(newValue, setSearchType)} 
                        onChange={(e) => handleSearchInputChange(e, setSearchValue, setPaginator)} 
                        value={searchValue} 
                        placeholder={`Search by ${searchType?.label}...`} 
                        aria-label="Search users"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FilterButton isFilter={isFilter} onClick={() => handleShowFilter(setIsFilter)} />
                    <CreateButton onClick={() => handleAddData(searchParams, setSearchParams)} />
                </div>
            </div>

            {/* Filters section */}
            <div className={classNames("transition-all rounded-md duration-200 flex flex-wrap gap-2 px-2", {
                "opacity-100 h-[2rem] mb-4": isFilter,
                "opacity-0 h-0 pointer-events-none": !isFilter,
            })}>
                <MySelect
                    containerClassName="max-w-1/2"
                    onChange={HandleMySelectChange({ selectName: "status", setData: setFilters })}
                    isMulti={false}
                    options={statusOptions}
                    placeHolder="Filter by Status"
                    value={selected}
                />
            </div>

            {/* Pagination */}
            <Pagination 
                setFilters={setFilters}
                paginator={paginator} 
                onPageChange={(newPage) => onPageChange(newPage, setSearchParams, setPaginator)}
            />

            {/* Loading state */}
            {isFetching ? (
                <div className="relative w-full h-full" aria-live="polite">
                    <AlatarLoader />
                </div>
            ) : (
                <div className="grid px-2 sm:grid-cols-2 gap-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 overflow-auto mb-18">
                    {users.map((user) => (
                        <DataCard 
                            key={user.id}
                            title={user.username}
                            avatar={user.avatar}
                            email={user.email}
                            phone={user.phone}
                            id={user.id}
                            activity={user.status}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;