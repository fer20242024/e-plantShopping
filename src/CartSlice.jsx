import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, //AÑADIDO
},
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++
        //totalQuantity=totalQuantity+quantity;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity++; //AÑAD
    },

    removeItem: (state, action) => {
        const itemToRemove = state.items.find((item) => item.name === action.payload);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity; // AÑAD:Deduct quantity from totalQuantity
        state.items = state.items.filter((item) => item.name !== action.payload);
         
    }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        state.totalQuantity += quantity - itemToUpdate.quantity; //AÑADIDO: AJUSTA TOTALQUANTITY BASADO EN EL CAMBIO
        itemToUpdate.quantity = quantity;
      }
    

    },
  },
});

export const { addItem, removeItem, updateQuantity,decrementQuantity } = CartSlice.actions;

export default CartSlice.reducer;
