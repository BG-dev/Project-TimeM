import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import IUser from '../../types/user';

interface IUserState {
  value: IUser | null;
}

const initialState: IUserState = { value: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return { ...state, value: action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
