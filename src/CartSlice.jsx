import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    decrementQuantity: (state,action) => {
        const item= state(action.payload)
        if (item && item.quantity > 0){
            item.quantity--;
        }
        }
    incrementQuantity: (state,action) => {//funcion añadida el 28/01
            const item= state(action.payload)
            //if (item && item.quantity > 0){
                item.quantity--;
            //}
            }    

    },
  },
});

export const { addItem, removeItem, updateQuantity,decrementQuantity } = CartSlice.actions;

export default CartSlice.reducer;
