import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) { exists.qty += 1; }
      else { state.items.push({ ...action.payload, qty: 1 }); }
      state.total = state.items.reduce((s, i) => s + i.price * i.qty, 0);
    },
    removeItem: (state, action) => {
      const exists = state.items.find(i => i.id === action.payload);
      if (exists && exists.qty > 1) { exists.qty -= 1; }
      else { state.items = state.items.filter(i => i.id !== action.payload); }
      state.total = state.items.reduce((s, i) => s + i.price * i.qty, 0);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      state.total = state.items.reduce((s, i) => s + i.price * i.qty, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;