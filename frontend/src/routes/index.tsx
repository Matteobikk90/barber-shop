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
                path: "/calendario3",
                Component: lazy(() => import("components/Admin/Calendario3"))
            }
        ]
    }
]);
