import { BarberShopionContextProvider } from "context/barberShop";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "routes";

const App = () => {
    return (
        <BarberShopionContextProvider>
            <Suspense fallback={<>...</>}>
                <RouterProvider router={routers} />
            </Suspense>
        </BarberShopionContextProvider>
    );
};

export default App;
