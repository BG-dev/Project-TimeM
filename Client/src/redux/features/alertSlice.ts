import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAlertState {
    text: string;
    type: 'success' | 'info' | 'warning' | 'error' | undefined;
    visible?: boolean;
}

const initialState: IAlertState = { text: '', type: 'info', visible: false };

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<IAlertState>) => ({
            ...state,
            ...action.payload,
            visible: true,
        }),
        setVisible: (state, action: PayloadAction<boolean>) => ({
            ...state,
            visible: action.payload,
        }),
    },
});

export const { setAlert, setVisible } = alertSlice.actions;

export default alertSlice.reducer;
