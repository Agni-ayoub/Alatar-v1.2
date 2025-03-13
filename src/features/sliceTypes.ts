/**
 * Represents the permissions available for different entities in the system.
 * Each entity has an array of `PermissionTypes` defining the allowed actions.
 */
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

/**
 * Represents the request payload for user login.
 */
export type LoginRequest = {
    email: string;
    password: string;
};

/**
 * Represents a user in the system.
 */
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

/**
 * Represents a company entity.
 */
export type Company = {
    id: string;
    name: string;
    phone: string;
    email: string;
    status: string;
    avatar: string;
};

/**
 * Represents pagination details.
 */
interface Paginator {
    total: number;
    lastPage: number;
    currentPage: number;
}

/**
 * API response structure for fetching a list of companies.
 */
export interface CompaniesResponse {
    status: "success" | "error";
    companies: Company[];
    paginator: Paginator;
}

/**
 * Represents a successful login response.
 */
type LoginResponse = {
    status: "success";
    token: string;
    user: User;
};

/**
 * Represents an error response from an API.
 */
type ErrorResponse = {
    status: "error";
    message: string;
    code: string;
};

/**
 * Represents the possible responses from the login API.
 */
export type LoginApiResponse = LoginResponse | ErrorResponse;

/**
 * Represents an authentication token.
 */
export type token = string | null;

/**
 * Represents the response when fetching the current user.
 */
export type getUserResponse = {
    status: string;
    user: User;
};

/**
 * Represents the response from a logout request.
 */
export type LogoutResponse = {
    status: "success" | "error";
    message: string;
};

/**
 * Represents the structure of an edited company entity.
 */
type EditedCompanyResponse = {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    website?: string;
    long?: string;
    lat?: string;
    status?: "ACTIVE" | "INACTIVE" | "";
    avatar?: string;
};

/**
 * Represents the API response when editing a company.
 */
export type EditCompanyResponse = {
    status: "success" | "error";
    company: EditedCompanyResponse;
};

/**
 * Represents the API response when retrieving a company by its ID.
 */
export type GetCompanyByIdResponse = {
    status: "success" | "error";
    company: EditedCompanyResponse;
};

/**
 * Represents the form data structure for editing a company.
 */
export type EditCompanyFormData = EditedCompanyResponse;

/**
 * Represents the request payload for updating company data.
 */
export type EditDataRequest = {
    id: string;
    formData: EditCompanyFormData;
};

/**
 * Represents the API response for a delete request.
 */
export type DeleteMethodResponse = {
    status: "success" | "error";
};

/**
 * Represents the request payload for a delete operation.
 */
export type DeleteMethodRequest = {
    id: string;
    type: "company" | "user" | "vehicle";
};
