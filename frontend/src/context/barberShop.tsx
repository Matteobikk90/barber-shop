import {
    createContext,
    useContext,
    useReducer,
    useState,
    useEffect
} from "react";
import { db } from "db/firebase";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    getDocs
} from "firebase/firestore";
import { globalStateReducer } from "reducers/globalState";
import {
    ActiveFiltersDispatchProps,
    ChildrenProps,
    GlobalState
} from "types/barber-shop.types";

const initialState: GlobalState = {
    setActiveFilter: () => {}
};

const BarberShopionContext = createContext(initialState);

export const BarberShopionContextProvider = ({ children }: ChildrenProps) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);

    /* function to get all bookings from firestore in realtime */
    // useEffect(() => {
    //     const q = query(collection(db, "bookings"), orderBy("created", "desc"));
    //     onSnapshot(q, (querySnapshot) => {
    //         // service: string;
    //         // name: string;
    //         // surname: string;
    //         // email: string;
    //         // phone: string;
    //         // message?: string;
    //         // start_time: string;
    //         // end_time: string;
    //         setBookings(
    //             querySnapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 data: doc.data()
    //             }))
    //         );
    //     });
    // }, []);

    const setActiveFilter = ({ name, value }: ActiveFiltersDispatchProps) =>
        dispatch({
            payload: { name, value },
            type: "SET_ACTIVE_FILTERS"
        });

    const value = {
        setActiveFilter
    };

    return (
        <BarberShopionContext.Provider value={value}>
            {children}
        </BarberShopionContext.Provider>
    );
};

export const useBarberShop = () => {
    const context = useContext(BarberShopionContext);
    if (context === undefined)
        throw new Error("barberShop needs to be within the BarberShopContext");

    return context;
};
