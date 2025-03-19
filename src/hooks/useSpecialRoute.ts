import { useParams } from "react-router-dom";
import { Route } from "../components/sideNav/main/sideNavTypes";
import { useMemo } from "react";

const useSpecialRoute = () => {
    const { id } = useParams();
    const memoizedId = useMemo( () => id, [id]);

    const specialRoutes : Route[] = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "dashboard"
        },
        {
            name: "Companies",
            path: "/companies",
            icon: "companies",
            subRoute: [
                {
                    name: "Users",
                    path: `/companies/company/${id}/users`,
                    icon: "users"
                },
                {
                    name: "vehicle",
                    path: `/companies/company/${id}/vehicles`,
                    icon: "vehicles"
                },
                {
                    name: "Plan",
                    path: `/companies/company/${id}/plan`,
                    icon: "plans"
                },
            ]
        },
        {
            name: "Plan",
            path: "/plans",
            icon: "plans"
        },
        {
            name: "Billing",
            path: "/billing",
            icon: "billing"
        }
    ];

    return { id : memoizedId, specialRoutes };
};

export default useSpecialRoute;
