/**
 * Represents the permissions for various entities within the system.
 * Each property is an array of `PermissionTypes` indicating the permissions
 * associated with that entity.
 * 
 * @property {PermissionTypes[]} company - Permissions related to companies.
 * @property {PermissionTypes[]} vehicle - Permissions related to vehicles.
 * @property {PermissionTypes[]} user - Permissions related to users.
 * @property {PermissionTypes[]} plan - Permissions related to plans.
 * @property {PermissionTypes[]} paymentHistory - Permissions related to payment history.
 * @property {PermissionTypes[]} period - Permissions related to periods.
 * @property {PermissionTypes[]} alert - Permissions related to alerts.
 * @property {PermissionTypes[]} driver - Permissions related to drivers.
 */


export type LoginRequest = {
    email: string;
    password: string;
};

type PermissionTypes = "VIEW" | "CREATE" | "UPDATE" | "DELETE";

type Permissions = {
    company: PermissionTypes[];
    vehicle: PermissionTypes[];
    user: PermissionTypes[];
    plan: PermissionTypes[];
    paymentHistory: PermissionTypes[];
    period: PermissionTypes[];
    alert: PermissionTypes[];
    driver: PermissionTypes[];
};

export type User = {
    id: string;
    email: string;
    username: string;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    full_access: boolean;
    permissions: Permissions;
    avatar: string;
};

export type Company = {
    id: string;
    name: string;
    phone: string;
    email: string;
    status: string;
    avatar: string;
}

interface Paginator {
    total: number;
    lastPage: number;
    currentPage: number;
}

export interface CompaniesResponse {
    status: 'success' | 'error';
    companies: Company[];
    paginator: Paginator;
}

type LoginResponse = {
    status: "success";
    token: string;
    user: User;
};

type ErrorResponse = {
    status: "error";
    message: string;
    code: string;
};

export type LoginApiResponse = LoginResponse | ErrorResponse;

export type token = string | null;

export type getUserResponse = {
    status: string;
    user: User;
};

export type LogoutResponse = {
    status: "success" | "error";
    message: string;
};

type EditedCompanyResponce = {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    website?: string;
    long?: string;
    lat?: string;
    status?: "ACTIVE" | "INACTIVE";
};

export type EditCompanyResponce = {
    status : 'success' | 'error';
    company : EditedCompanyResponce;
};

export type GetCompanyByIdResponce = {
    status : 'success' | 'error';
    company: EditedCompanyResponce;
}

export type EditCompanyFormData = EditedCompanyResponce;

export type EditDataRequest = {
    id: string;
    formData: EditCompanyFormData;
}