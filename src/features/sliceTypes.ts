/**
 * Represents the types of permissions available for different entities in the system.
 */
type PermissionTypes = "VIEW" | "CREATE" | "UPDATE" | "DELETE";

/**
 * Represents the permissions for each entity in the system.
 * Each entity has an array of `PermissionTypes` defining the allowed actions.
 */
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
    phone: string | undefined;
    full_access: boolean;
    permissions: Permissions;
    avatar: string;
    status: 'ACTIVE' | 'INACTIVE';
};

/**
 * Represents a company entity.
 */
export type Company = {
    id: string;
    name: string;
    phone: string;
    email: string;
    status: 'ACTIVE' | 'INACTIVE';
    avatar: string;
};

/**
 * Represents pagination details for API responses.
 */
export interface Paginator {
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
export type Token = string | null;

/**
 * Represents the response when fetching the current user.
 */
export type GetUserResponse = {
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
 * Represents the API response for a create request.
 */
export type CreateMethodResponse = {
    status: "success" | "error";
    company?: object;
};

/**
 * Represents the request payload for creating an entity (company, user, vehicle).
 */
export type CreateMethodRequest = {
    type: "company" | "user" | "vehicle";
    formData: object;
};

/**
 * API response structure for fetching a list of users.
 */
export interface UsersResponse {
    status: "success" | "error";
    users: User[];
    paginator: Paginator;
}

/**
 * Represents an edited user entity.
 */
type EditedUserResponse = {
    id? : string;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    status?: "ACTIVE" | "INACTIVE" | "";
    avatar?: string;
    full_access?: boolean;
    permissions?: Permissions;
};

/**
 * Represents the form data structure for editing a user.
 */
export type EditUserFormData = EditedUserResponse;

/**
 * Represents the API response when editing a user.
 */
export type EditUserResponse = {
    status: "success" | "error";
    user: EditedUserResponse;
};

/**
 * Represents the API response when retrieving a user by its ID.
 */
export type GetUserByIdResponse = {
    status: "success" | "error";
    user: EditedUserResponse;
};
