import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
    totalCount: 0, //anexo
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
      state.totalCount += 1; // anexo:Incrementar la cantidad total de productos en el carrito
    },

    removeItem: (state, action) => {
      const productName = action.payload; //anexo
      const existingItem = state.items.find(
        //anex
        (item) => item.name === productName //anex
      );
      if (existingItem) {
        //anexo
        state.totalCount -= existingItem.quantity; // anexo:Restar la cantidad del producto que se está eliminando
        state.items = state.items.filter((item) => item.name !== productName); //anexo
      } //anexo
      //state.items = state.items.filter((item) => item.name !== action.payload);//NOANEXE
    },

    /*updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },*/
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        state.totalCount += quantity - existingItem.quantity; // Actualizar la cantidad total de productos
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
