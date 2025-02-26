/**
 * Represents a nested (sub) route under a main route.
 */
export interface RootRoute {
    /**
     * The display name of the sub-route.
     */
    name: string;

    /**
     * The URL path of the sub-route.
     */
    path: string;

    /**
     * The icon name used for dynamic imports or rendering.
     */
    icon: string;
}

/**
 * Represents a main route in the sidebar navigation.
 */
export interface Route {
    /**
     * The display name of the route.
     */
    name: string;

    /**
     * The URL path of the route.
     */
    path: string;

    /**
     * The icon name used for dynamic imports or rendering.
     */
    icon: string;

    /**
     * An optional array of sub-routes under this main route.
     * Each sub-route is an object with:
     * - {name: string, path: string, icon: string}
     */
    roots?: RootRoute[];
}

