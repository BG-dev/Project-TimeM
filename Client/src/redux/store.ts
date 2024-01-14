import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import boardReducer from './features/boardSlice';
import alertReducer from './features/alertSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    alert: alertReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
