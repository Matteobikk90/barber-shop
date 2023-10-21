import { Actions } from "types/global-state.types";
import { GlobalState } from "types/barber-shop.types";

export const globalStateReducer = (
    state: GlobalState,
    { type, payload }: Actions
) => {
    switch (type) {
        case "SET_ACTIVE_FILTERS":
            return {
                ...state,
                [payload.name]: payload.value
            };
        default:
            throw new Error();
    }
};
