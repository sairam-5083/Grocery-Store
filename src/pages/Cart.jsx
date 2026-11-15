import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Shopping Cart 🛒</h1>
      <Link to="/" className="continue-shopping">
  ← Continue Shopping
</Link>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price} / {item.unit}</p>

                <button
                  onClick={() =>
                    dispatch(updateQuantity({
                      id: item.id,
                      quantity: item.quantity - 1,
                    }))
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </button>

                <span> {item.quantity} </span>

                <button
                  onClick={() =>
                    dispatch(updateQuantity({
                      id: item.id,
                      quantity: item.quantity + 1,
                    }))
                  }
                >
                  +
                </button>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>
          <Link to="/checkout" className="checkout-button">
  Proceed to Checkout →
</Link>

          <button onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;