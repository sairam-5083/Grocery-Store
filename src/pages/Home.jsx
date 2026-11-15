import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await API.get("/products");
        setProducts(response.data);
      } catch (err) {
        setError("Unable to load products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = ["All", "Fruits", "Vegetables", "Dairy"];

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="home">
      <nav className="navbar">
        <h2>GroceryGo<span>.</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <Link to="/orders">My Orders</Link>
          <a href="#about">About</a>
        </div>

        <Link to="/cart" className="cart">
          🛒 Cart ({cartCount})
        </Link>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-tag">FRESHNESS EVERY DAY</span>

          <h1>
            Live Better with <span>Fresh</span> Groceries.
          </h1>

          <p>
            Fresh fruits, vegetables and daily essentials
            delivered straight to your doorstep.
          </p>

          <button
            onClick={() =>
              document.getElementById("products")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Shop Now →
          </button>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
            alt="Fresh groceries"
          />
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <span>OUR COLLECTION</span>
          <h2>Fresh Picks For You</h2>
          <p>Choose your daily essentials.</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search groceries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading fresh products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <p className="no-products">
                No products found. Try another search!
              </p>
            )}
          </div>
        )}
      </section>

      <footer id="about">
        <h2>GroceryGo.</h2>
        <p>Fresh choices. Better living.</p>
      </footer>
    </div>
  );
}

export default Home;