/**
 * Request payload for logging in a user.
 */
export type LoginRequest = {
    /** The username of the user */
    email: string;
    /** The password of the user */
    password: string;
};

/**
 * The available permission types for users.
 * Each permission defines the actions a user can perform.
 */
type PermissionTypes = "VIEW" | "CREATE" | "UPDATE" | "DELETE";

/**
 * The permissions for different entities that a user can have.
 */
type Permissions = {
    /** Permissions for the company entity */
    company: PermissionTypes[];
    /** Permissions for the vehicle entity */
    vehicle: PermissionTypes[];
    /** Permissions for the user entity */
    user: PermissionTypes[];
    /** Permissions for the plan entity */
    plan: PermissionTypes[];
    /** Permissions for the payment history entity */
    paymentHistory: PermissionTypes[];
    /** Permissions for the period entity */
    period: PermissionTypes[];
    /** Permissions for the alert entity */
    alert: PermissionTypes[];
    /** Permissions for the driver entity */
    driver: PermissionTypes[];
};

/**
 * User information after successful login.
 */
export type User = {
    /** Unique identifier for the user */
    id: string;
    /** The email address of the user */
    email: string;
    /** The username chosen by the user */
    username: string;
    /** The first name of the user (nullable) */
    first_name: string | null;
    /** The last name of the user (nullable) */
    last_name: string | null;
    /** The phone number of the user (nullable) */
    phone: string | null;
    /** Boolean indicating if the user has full access */
    full_access: boolean;
    /** The user's permissions for various entities */
    permissions: Permissions;
    /** The avatar URL for the user */
    avatar: string;
};

/**
 * Successful login response containing the user data and token.
 */
type LoginResponse = {
    /** Status indicating a successful login */
    status: "success";
    /** The authentication token returned after login */
    token: string;
    /** The user details of the logged-in user */
    user: User;
};

/**
 * Error response when login fails.
 */
type ErrorResponse = {
    /** Status indicating an error occurred */
    status: "error";
    /** The error message describing the issue */
    message: string;
    /** A code associated with the error (e.g., 'CREDENTIALS_INVALID') */
    code: string;
};

/**
 * The response from the login API, which can either be a successful response or an error response.
 */
export type LoginApiResponse = LoginResponse | ErrorResponse;

/**
 * Type representing an authentication token, which can be a string or null.
 */
export type token = string | null;

/**
 * Response type for fetching user details.
 * Contains the status of the request and the user details.
 */
export type getUserResponse = {
    /** Status of the request (e.g., 'success', 'error') */
    status: string;
    /** The user details */
    user: User;
};

/**
 * Response type for logging out a user.
 * Contains the status of the logout request and a message.
 */
export type LogoutResponse = {
    /** Status of the logout request ('success' or 'error') */
    status: "success" | "error";
    /** Message describing the result of the logout request */
    message: string;
};
