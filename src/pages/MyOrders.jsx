import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import API from "../services/api";
import { setOrders } from "../redux/ordersSlice";

function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await API.get("/orders");
        dispatch(setOrders(response.data));
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }

    fetchOrders();
  }, [dispatch]);

  return (
    <div className="checkout-page">
      <h1>My Orders 📦</h1>

      <Link to="/" className="continue-shopping">
        ← Continue Shopping
      </Link>

      {orders.length === 0 ? (
        <div className="order-summary">
          <h2>No Orders Yet</h2>
          <p>Your placed orders will appear here.</p>
          <Link to="/">Start Shopping →</Link>
        </div>
      ) : (
        <div className="my-orders-list">
          {orders.map((order) => (
            <div className="order-summary" key={order.id}>
              <h2>Order #{order.id}</h2>
              <p><strong>Date:</strong> {order.date}</p>

              <h3>Delivery Details</h3>
              <p>{order.customer.name}</p>
              <p>{order.customer.phone}</p>
              <p>{order.customer.address}</p>
              <p>
                {order.customer.city} - {order.customer.pincode}
              </p>

              <h3>Products</h3>
              {order.items.map((item) => (
                <p key={item.id}>
                  {item.name} × {item.quantity}
                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>
                </p>
              ))}

              <h3>Total: ₹{order.total}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;