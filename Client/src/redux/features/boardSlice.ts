import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import IBoard from '../../types/board';

interface IBoardState {
    value: IBoard | null;
}

const initialState: IBoardState = { value: null };

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard: (state, action: PayloadAction<IBoard>) => {
            return { ...state, value: action.payload };
        },
    },
});

export const { setBoard } = boardSlice.actions;

export default boardSlice.reducer;
