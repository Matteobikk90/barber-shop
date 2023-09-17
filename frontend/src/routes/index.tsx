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
            }
        ]
    }
]);
