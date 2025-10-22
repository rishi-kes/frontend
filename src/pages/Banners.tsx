import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Dashboard/Sidebar";
import styles from "../styles/pages/Banners.module.css";

interface Banner {
  _id: string;
  title: string;
  link: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BannerForm {
  title: string;
  link: string;
  imageBase64: string;
}

export default function Banners() {
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<BannerForm>({
    title: "",
    link: "",
    imageBase64: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [banners, setBanners] = useState<Banner[]>([]);

  const token = localStorage.getItem("token");

  // Fetch all banners
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/api/banners", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setBanners(res.data.banners);
      }
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError("Failed to load banners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Input Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setForm(prev => ({ ...prev, imageBase64: result }));
    };
  };

  // Add / Edit Banner
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.imageBase64) {
      setError("Please upload an image!");
      return;
    }

    if (!form.title.trim()) {
      setError("Please enter a banner title!");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      let res;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editMode && selectedId) {
        res = await axios.put(
          `http://localhost:5000/api/banners/edit/${selectedId}`,
          form,
          config
        );
      } else {
        res = await axios.post(
          "http://localhost:5000/api/banners/add", 
          form,
          config
        );
      }

      if (res.data.success) {
        fetchBanners();
        closePopup();
      } else {
        setError(res.data.message || "Something went wrong!");
      }
    } catch (err: any) {
      console.error("Banner save error:", err);
      setError(
        err.response?.data?.message || 
        "Unauthorized action or server error. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Banner
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/banners/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        fetchBanners();
      } else {
        setError(res.data.message || "Error deleting banner!");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete banner. Please try again.");
    }
  };

  // Edit Banner
  const handleEdit = (banner: Banner) => {
    setForm({
      title: banner.title || "",
      link: banner.link || "",
      imageBase64: banner.imageUrl || "",
    });
    setPreview(banner.imageUrl || null);
    setEditMode(true);
    setSelectedId(banner._id);
    setShowPopup(true);
    setError(null);
  };

  const closePopup = () => {
    setShowPopup(false);
    setEditMode(false);
    setPreview(null);
    setSelectedId(null);
    setForm({ title: "", link: "", imageBase64: "" });
    setError(null);
  };

  const openCreatePopup = () => {
    setShowPopup(true);
    setEditMode(false);
    setForm({ title: "", link: "", imageBase64: "" });
    setPreview(null);
    setError(null);
  };

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Banner Management</h1>
            <p className={styles.subtitle}>Manage your promotional banners and hero images</p>
          </div>
          <button
            className={styles.primaryButton}
            onClick={openCreatePopup}
          >
            <span className={styles.buttonIcon}>+</span>
            Add New Banner
          </button>
        </header>

        {/* Error Alert */}
        {error && (
          <div className={styles.alertError}>
            <span className={styles.alertIcon}>⚠️</span>
            {error}
            <button 
              className={styles.alertClose}
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        )}

        {/* Banner Grid */}
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading banners...</p>
          </div>
        ) : banners.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🖼️</div>
            <h3>No Banners Found</h3>
            <p>Get started by creating your first promotional banner</p>
            <button 
              className={styles.primaryButton}
              onClick={openCreatePopup}
            >
              Create First Banner
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {banners.map((banner) => (
              <div key={banner._id} className={styles.card}>
                <div className={styles.cardImageContainer}>
                  <img 
                    src={banner.imageUrl} 
                    alt={banner.title} 
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay}>
                    <button 
                      onClick={() => handleEdit(banner)} 
                      className={styles.iconButton}
                      title="Edit banner"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDelete(banner._id)} 
                      className={styles.iconButtonDanger}
                      title="Delete banner"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    {banner.title || "Untitled Banner"}
                  </h3>
                  {banner.link && (
                    <a 
                      href={banner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.cardLink}
                    >
                      🔗 View Link
                    </a>
                  )}
                  <div className={styles.cardActions}>
                    <button 
                      onClick={() => handleEdit(banner)} 
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(banner._id)} 
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Popup Form */}
      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editMode ? "Edit Banner" : "Create New Banner"}</h2>
              <button 
                className={styles.closeButton}
                onClick={closePopup}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Banner Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter banner title"
                  value={form.title}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Destination Link
                </label>
                <input
                  type="url"
                  name="link"
                  placeholder="https://example.com or /shop"
                  value={form.link}
                  onChange={handleChange}
                  className={styles.formInput}
                />
                <small className={styles.helperText}>
                  Optional: Where users will be redirected when clicking the banner
                </small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Banner Image *
                </label>
                <div className={styles.uploadContainer}>
                  <div className={styles.uploadArea}>
                    {preview ? (
                      <div className={styles.imagePreview}>
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className={styles.previewImage}
                        />
                        <div className={styles.previewOverlay}>
                          <span className={styles.uploadText}>
                            Click to change image
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.uploadPlaceholder}>
                        <span className={styles.uploadIcon}>📁</span>
                        <span className={styles.uploadText}>
                          Click to upload image
                        </span>
                        <span className={styles.uploadHint}>
                          PNG, JPG, WebP up to 5MB
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={styles.fileInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={closePopup}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={submitting || !form.imageBase64 || !form.title.trim()}
                >
                  {submitting ? (
                    <>
                      <div className={styles.buttonSpinner}></div>
                      {editMode ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    editMode ? "Update Banner" : "Create Banner"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}