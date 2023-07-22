import {IClient} from "../../models/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchClients} from "./ClientsCreators";

interface ClientState {
    clients: IClient[];
    isLoading: boolean;
    error: string;
}

const initialState: ClientState = {
    clients: [],
    isLoading: false,
    error: '',
}

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchClients.fulfilled.type]: (state, action: PayloadAction<IClient[]>) => {
            state.isLoading = false;
            state.error = '';
            state.clients = action.payload
        },
        [fetchClients.pending.type]: (state) => {
            state.isLoading = true;

        },
        [fetchClients.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }

})

export default clientSlice.reducer;