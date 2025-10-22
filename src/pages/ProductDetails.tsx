import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Shop/Header";
import Footer from "../components/Shop/Footer";
import "../styles/ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [domain, setDomain] = useState("");

  useEffect(() => {
    const host = window.location.hostname;
    const subdomain = host.split(".")[0];
    setDomain(subdomain);
  }, []);

  useEffect(() => {
    if (id && domain) fetchProduct(id, domain);
  }, [id, domain]);

  const fetchProduct = async (productId: string, storeDomain: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/store/${storeDomain}/${productId}`);
      const data = await res.json();
      if (data?.success) setProduct(data.product);
    } catch (err) {
      console.error("❌ Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <p className="loading-text">Loading product details...</p>;

  if (!product) return <p className="error-text">Product not found 😢</p>;

  return (
    <>
      <Header />

      <div className="product-details-container">
        {/* 🖼️ Product Image */}
        <div className="product-image-section">
          <img
            src={product.imageUrl || "/no-image.png"}
            alt={product.name}
            className="product-main-image"
          />
        </div>

        {/* 📦 Product Info */}
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>

          <p className="product-sku">
            SKU: <span>{product.sku || "N/A"}</span>
          </p>

          <div className="product-price-section">
            {product.mrp && product.mrp > product.price && (
              <span className="product-mrp">₹{product.mrp}</span>
            )}
            <span className="product-price">₹{product.price}</span>
          </div>

          <p className="product-description">{product.description}</p>

          {/* 🔢 Quantity */}
          <div className="quantity-selector">
            <button onClick={decreaseQty}>−</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          {/* 🛒 Add to Cart */}
          <button className="add-to-cart-btn">Add to Cart 🛒</button>

          {/* 💖 Wishlist */}
          <button className="wishlist-btn">♡ Add to Wishlist</button>

          {/* ✅ Tags or Category */}
          {product.categoryId && (
            <p className="product-category">
              Category: <span>{product.categoryId?.name || "Uncategorized"}</span>
            </p>
          )}
        </div>
      </div>

      {/* 📜 Extra Info */}
      <div className="product-extra-section">
        <h2>Product Details</h2>
        <p>
          {product.description ||
            "This product is crafted with the highest quality materials, ensuring comfort, style, and durability."}
        </p>
      </div>

      <Footer />
    </>
  );
}
