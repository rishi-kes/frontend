import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Shop/Header";
import Footer from "../components/Shop/Footer";
import "../styles/ShopFront.css";

export default function ShopFront() {
  const [storeName, setStoreName] = useState("Loading...");
  const [domain, setDomain] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const host = window.location.hostname;
    const subdomain = host.split(".")[0];
    setDomain(subdomain);

    async function loadData() {
      try {
        const storeRes = await fetch(`http://localhost:5000/api/store/domain/${subdomain}`);
        const storeData = await storeRes.json();
        setStoreName(storeData?.store?.name || "My Online Store");

        const [productRes, categoryRes, bannerRes] = await Promise.all([
          fetch(`http://localhost:5000/api/products/store/${subdomain}`),
          fetch(`http://localhost:5000/api/categories/store/${subdomain}`),
          fetch(`http://localhost:5000/api/banners/store/${subdomain}`),
        ]);
        const productsData = await productRes.json();
        const categoriesData = await categoryRes.json();
        const bannersData = await bannerRes.json();

        if (productsData.success) setProducts(productsData.products);
        if (categoriesData.success) setCategories(categoriesData.categories);
        if (bannersData.success) setBanners(bannersData.banners);
      } catch (err) {
        console.error(err);
        setStoreName("Demo Store");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      <Header />
      <main className="premium-shopfront">
        <section className="hero-section premium-hero">
          {banners.length > 0 && (
            <div className="hero-carousel premium-carousel">
              {banners.map((b) => (
                <a
                  href={b.link || "#"}
                  key={b._id}
                  className="hero-slide premium-slide"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="banner-overlay" />
                  <img
                    src={b.imageUrl}
                    alt={b.title || "Banner"}
                    className="banner-image"
                    width={500}
                    height={300}
                  />
                  <div className="hero-text premium-hero-text">
                    <h1>{b.title}</h1>
                    <p>{b.subtitle}</p>
                    <button className="btn-premium">Shop Now</button>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="category-section premium-category-section container">
          <h2 className="section-title">Explore Categories</h2>
          <div className="categories-wrapper">
            {categories.map((cat) => (
              <div className="category-card premium-category-card" key={cat._id}>
                <img
                  src={cat.imageUrl || "/no-category.png"}
                  alt={cat.name}
                  className="category-image"
                />
                <h3>{cat.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="products-section premium-products-section container">
          <h2 className="section-title">Our Handpicked Products</h2>
          {loading ? (
            <p className="loading">Loading products…</p>
          ) : products.length === 0 ? (
            <p className="no-products">No products available.</p>
          ) : (
            <div className="products-grid-premium">
              {products.map((p) => (
                <div className="product-card premium-product-card" key={p._id}>
                  <Link to={`/product/${p._id}`}>
                    <div className="product-image-wrapper">
                      <img src={p.imageUrl || "/no-image.png"} alt={p.name} />
                    </div>
                    <div className="product-details">
                      <h3>{p.name}</h3>
                      <p className="price">₹{p.price}</p>
                    </div>
                  </Link>
                  <button className="btn-secondary">Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
