import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { addOrder } from "../redux/ordersSlice";
import API from "../services/api";

function Checkout() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    const newOrder = {
      id: String(Date.now()),
      customer: { ...customer },
      items: [...cartItems],
      total: total,
      date: new Date().toLocaleString(),
    };

    try {
      const response = await API.post("/orders", newOrder);

      dispatch(addOrder(response.data));
      dispatch(clearCart());

      setOrderPlaced(true);
    } catch (err) {
      console.error("Order error:", err);
      setError(
        "Unable to place order. Please check whether the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <h1>Order Placed Successfully! 🎉</h1>

        <p>Your order has been saved to the backend.</p>

        <Link to="/orders" className="checkout-button">
          View My Orders →
        </Link>

        <br />

        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <Link to="/cart" className="continue-shopping">
        ← Back to Cart
      </Link>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Shop Now</Link>
        </p>
      ) : (
        <div className="checkout-layout">
          <form onSubmit={handleSubmit}>
            <h2>Delivery Details</h2>

            <input
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              value={customer.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Full Delivery Address"
              value={customer.address}
              onChange={handleChange}
              required
            />

            <input
              name="city"
              placeholder="City"
              value={customer.city}
              onChange={handleChange}
              required
            />

            <input
              name="pincode"
              placeholder="PIN Code"
              pattern="[0-9]{6}"
              value={customer.pincode}
              onChange={handleChange}
              required
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Placing Order..." : "Place Demo Order"}
            </button>
          </form>

          <div className="order-summary">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity}
                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </p>
            ))}

            <h3>Total: ₹{total}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;