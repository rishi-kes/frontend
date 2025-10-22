import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Dashboard/Sidebar";
import styles from "../styles/pages/Products.module.css";

export default function Products() {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    slogan: "",
    sku: "",
    mrp: "",
    price: "",
    description: "",
    categoryId: "",
    imageBase64: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // ✅ auth token

  // ✅ Fetch products & categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success && Array.isArray(res.data.categories)) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
    }
  };

  // 📤 Handle input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼️ Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result as string);
        setForm({ ...form, imageBase64: reader.result as string });
      };
    }
  };

  // 💾 Save or Update Product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.categoryId || !form.sku) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    try {
      let res;
      if (editMode && selectedId) {
        // ✏️ Edit
        res = await axios.put(
          `http://localhost:5000/api/products/edit/${selectedId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // ➕ Add
        res = await axios.post("http://localhost:5000/api/products/add", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (res.data.success) {
        alert(editMode ? "✅ Product updated!" : "✅ Product added!");
        fetchProducts();
        closePopup();
      } else {
        alert(res.data.message || "❌ Something went wrong!");
      }
    } catch (err) {
      console.error("Save product error:", err);
      alert("❌ Unauthorized or server error!");
    }
  };

  // 🗑️ Delete Product
  const handleDelete = async (id: string) => {
    if (!window.confirm("🗑️ Delete this product?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/products/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert("🗑️ Product deleted!");
        fetchProducts();
      } else {
        alert(res.data.message || "Error deleting product!");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Unauthorized or server error!");
    }
  };

  // ✏️ Edit Product
  const handleEdit = (p: any) => {
    setForm({
      name: p.name,
      slogan: p.slogan || "",
      sku: p.sku || "",
      mrp: p.mrp || "",
      price: p.price,
      description: p.description || "",
      categoryId: p.categoryId || "",
      imageBase64: p.imageUrl || "",
    });
    setPreview(p.imageUrl || null);
    setSelectedId(p._id);
    setEditMode(true);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setEditMode(false);
    setPreview(null);
    setSelectedId(null);
    setForm({
      name: "",
      slogan: "",
      sku: "",
      mrp: "",
      price: "",
      description: "",
      categoryId: "",
      imageBase64: "",
    });
  };

  // 🧮 Discount %
  const getDiscount = (mrp: number, price: number) => {
    if (!mrp || !price || mrp <= price) return null;
    return Math.round(((mrp - price) / mrp) * 100);
  };

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>🧸 Products</h1>
          <button
            className={styles.addBtn}
            onClick={() => {
              setShowPopup(true);
              setEditMode(false);
              setForm({
                name: "",
                slogan: "",
                sku: "",
                mrp: "",
                price: "",
                description: "",
                categoryId: "",
                imageBase64: "",
              });
              setPreview(null);
            }}
          >
            + Add Product
          </button>
        </header>

        {/* Product Grid */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No products found</p>
            <button
              className={styles.primaryBtn}
              onClick={() => setShowPopup(true)}
            >
              ➕ Add Your First Product
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((p) => {
              const discount = getDiscount(p.mrp, p.price);
              return (
                <div key={p._id} className={styles.card}>
                  {p.imageUrl && <img src={p.imageUrl} alt={p.name} />}
                  <h3>{p.name}</h3>
                  {p.slogan && <p className={styles.slogan}>“{p.slogan}”</p>}
                  <p>
                    <span className={styles.price}>₹{p.price}</span>
                    {p.mrp && <span className={styles.mrp}>₹{p.mrp}</span>}
                  </p>
                  {discount && (
                    <span className={styles.discountBadge}>
                      {discount}% OFF
                    </span>
                  )}
                  <small>SKU: {p.sku || "—"}</small>
                  <br />
                  <small>
                    Category:{" "}
                    {categories.find((c) => c._id === p.categoryId)?.name || "—"}
                  </small>

                  <div className={styles.cardActions}>
                    <button
                      onClick={() => handleEdit(p)}
                      className={styles.editBtn}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className={styles.deleteBtn}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 🪟 Popup Form */}
      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popupLarge}>
            <h2>{editMode ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder="Product name"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={form.sku}
                  placeholder="SKU code"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Slogan / Tagline</label>
                <input
                  type="text"
                  name="slogan"
                  value={form.slogan}
                  placeholder="Short tagline"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>MRP (₹)</label>
                <input
                  type="number"
                  name="mrp"
                  value={form.mrp}
                  placeholder="Enter MRP"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Discounted Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  placeholder="Selling price"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Category</label>
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fullWidth}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  placeholder="Product description..."
                  onChange={handleChange}
                />
              </div>

              <div className={`${styles.imageUploadBox} ${styles.fullWidth}`}>
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className={styles.previewImg}
                  />
                ) : (
                  <span>Click to upload image</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                />
              </div>

              <div className={`${styles.actions} ${styles.fullWidth}`}>
                <button type="submit" className={styles.saveBtn}>
                  {editMode ? "Update Product" : "Save Product"}
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={closePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
