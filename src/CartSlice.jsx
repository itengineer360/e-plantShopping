import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    count: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name );
        if(existingItem){
            existingItem.quantity++;
        } else {
            state.items.push({name, image, cost, quantity: 1});
            state.count++;
        }
    },
    removeItem: (state, action) => {
        const itemToRemove = state.items.find(item=>item.name === action.payload);
        state.items = state.items.filter(item => item.name !== action.payload);
        if (itemToRemove){
            state.count -= itemToRemove.quantity;
        }
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const itemToUpdate = state.items.find(item=>item.name === name);
        if(itemToUpdate){
            let q = itemToUpdate.quantity > quantity;
            itemToUpdate.quantity = quantity;
            if(q){
                state.count--;
            } else {
                state.count++;
            }
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
