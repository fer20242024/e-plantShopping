import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const handleCheckoutShopping = (e) => {
    alert(
      "Functionality to be added for future reference relationated with the pago"
    );
  };

  // Calculate total amount for all products in the cart
  //?
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * parseFloat(item.cost.substring(1));
    });

    return total;
  };

  const handleContinueShopping = (e) => {
    //introduje este algoritmo:
    onContinueShopping(e); //Call the parent function
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    //funcion que permite eliminar por completo
    // una planta y es llamada desde abajo
    dispatch(removeItem(item.name));
    //removeItem() q es un reducor llama a CartSlice.jsx para que ejecute
    // la eliminacion y le devuelva su valor por intermedio de esta misma funcion
  };
  /* Calculate total cost based on quantity for an item//Calcula el costoTotal(Total Cart Amount: ${calculateTotalAmount())
   de todas las plantas elegidas
  const calculateTotalCost = (cart) => {
    let TotalCost = 0;
    cart.map((item) => {
      TotalCost += item.quantity * parseFloat(item.cost.substring(1));
    });
    return TotalCost;};*/

  const calculateTotalCost = (item) => {
    return item.quantity * parseFloat(item.cost.substring(1));
  };
  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                .
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
export default CartItem;
