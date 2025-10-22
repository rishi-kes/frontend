import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Dashboard/Sidebar";
import styles from "../styles/pages/Categories.module.css";

export default function Categories() {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    imageBase64: "",
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const token = localStorage.getItem("token"); // ✅ Fetch token once

  // 📦 Fetch all categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCategories(res.data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // 📤 Handle text input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼️ Handle image upload
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

  // 💾 Submit (Add/Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return alert("Category name is required!");

    try {
      let res;
      if (editMode && selectedId) {
        // ✏️ Update
        res = await axios.put(
          `http://localhost:5000/api/categories/edit/${selectedId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // ➕ Add
        res = await axios.post(
          "http://localhost:5000/api/categories/add",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (res.data.success) {
        alert(editMode ? "✅ Category updated!" : "✅ Category added!");
        fetchCategories();
        closePopup();
      } else {
        alert(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Category save error:", err);
      alert("❌ Unauthorized or server error!");
    }
  };

  // 🗑️ Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("🗑️ Delete this category?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/categories/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("🗑️ Category deleted!");
        fetchCategories();
      } else {
        alert(res.data.message || "Error deleting category!");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Unauthorized or server error!");
    }
  };

  // ✏️ Edit
  const handleEdit = (c: any) => {
    setForm({ name: c.name, imageBase64: c.imageUrl || "" });
    setPreview(c.imageUrl || null);
    setEditMode(true);
    setSelectedId(c._id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setEditMode(false);
    setPreview(null);
    setSelectedId(null);
    setForm({ name: "", imageBase64: "" });
  };

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>📂 Categories</h1>
          <button
            className={styles.addBtn}
            onClick={() => {
              setShowPopup(true);
              setEditMode(false);
              setForm({ name: "", imageBase64: "" });
              setPreview(null);
            }}
          >
            + Add Category
          </button>
        </header>

        {/* Category Grid */}
        {categories.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No categories found</p>
            <button
              className={styles.primaryBtn}
              onClick={() => setShowPopup(true)}
            >
              ➕ Add Your First Category
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {categories.map((c) => (
              <div key={c._id} className={styles.card}>
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.name} />
                ) : (
                  <div className={styles.placeholderIcon}>📁</div>
                )}
                <h3>{c.name}</h3>

                <div className={styles.cardActions}>
                  <button
                    onClick={() => handleEdit(c)}
                    className={styles.editBtn}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className={styles.deleteBtn}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🪟 Popup Form */}
      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>{editMode ? "Edit Category" : "Add New Category"}</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <label>Category Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter category name"
                value={form.name}
                onChange={handleChange}
              />

              <label>Upload Image (Optional)</label>
              <div className={styles.imageUploadBox}>
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

              <div className={styles.actions}>
                <button type="submit" className={styles.saveBtn}>
                  {editMode ? "Update Category" : "Save Category"}
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
