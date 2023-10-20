import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

export const routers = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                Component: lazy(() => import("layouts"))
            },
            {
                path: "/calendario",
                Component: lazy(() => import("components/Admin"))
            },
            {
                path: "/calendario2",
                Component: lazy(() => import("components/Admin/Calendario2"))
            },
            {
                path: "/terms-and-conditions",
                Component: lazy(
                    () => import("components/Main/TermsAndConditions")
                )
            },
            {
                path: "/privacy-and-policy",
                Component: lazy(
                    () => import("components/Main/PrivacyAndPolicy")
                )
            }
        ]
    }
]);
