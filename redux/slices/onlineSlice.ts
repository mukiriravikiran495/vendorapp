// redux/slices/onlineSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isOnline: false,
};

const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setOnlineStatus } = onlineSlice.actions;
export default onlineSlice.reducer; // 👈 This is important!
