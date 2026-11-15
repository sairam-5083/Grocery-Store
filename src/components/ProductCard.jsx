import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <span className="category">{product.category}</span>

        <h3>{product.name}</h3>

        <p className="rating">⭐ {product.rating}</p>

        <div className="product-bottom">
          <div>
            <h3>₹{product.price}</h3>
            <small>{product.unit}</small>
          </div>

          <button onClick={() => dispatch(addToCart(product))}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;