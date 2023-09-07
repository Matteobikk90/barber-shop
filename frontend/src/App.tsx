import BarberShop from "layouts";
import { BarberShopionContextProvider } from "context/barberShop";

const App = () => {
    return (
        <BarberShopionContextProvider>
            <BarberShop />
        </BarberShopionContextProvider>
    );
};

export default App;
