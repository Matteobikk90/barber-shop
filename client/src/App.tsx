import { BarberShopionContextProvider } from "context/barberShop";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "routes";

const App = () => (
    <BarberShopionContextProvider>
        <Suspense fallback={<>Caricando...</>}>
            <RouterProvider router={routers} />
        </Suspense>
    </BarberShopionContextProvider>
);

export default App;
