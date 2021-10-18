import { createSlice } from '@reduxjs/toolkit';

const uiInitialState = {
  showCart: false,
  showNotification: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers: {
    showCart(state) {
      state.showCart = !state.showCart
    },
    showNotification(state, action) {
      const { title, message, status } = action.payload;

      state.showNotification = {
        title,
        message,
        status
      };
    }
  }
});

export const uiActions = uiSlice.actions;