import { useState } from "react";
import axios from "axios";

const RaiseComplaint = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Technical",
    priority: "Medium",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/complaints", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Complaint raised successfully!");
      setTimeout(() => {
        setActiveTab("myComplaints");
      }, 2000);
    } catch (error) {
      setMessage("❌ Failed to raise complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Raise a Complaint</h1>
      {message && <div style={styles.message}>{message}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Brief summary of your issue"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
          >
            <option>Technical</option>
            <option>Billing</option>
            <option>Service</option>
            <option>Product</option>
            <option>Other</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={styles.input}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ ...styles.input, minHeight: "150px", resize: "vertical" }}
            placeholder="Describe your issue in detail..."
          />
        </div>

        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "850px",
    margin: "0 auto",
  },
  title: {
    marginBottom: "35px",
    color: "#1e3a8a", // Dark Royal Blue
    fontSize: "36px",
    fontWeight: "800",
    textShadow: "0 4px 8px rgba(30, 58, 138, 0.2)",
    letterSpacing: "-0.5px",
    textAlign: 'center'
  },
  message: {
    padding: "18px",
    borderRadius: "12px",
    marginBottom: "25px",
    background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
    color: "#166534",
    border: "2px solid rgba(134, 239, 172, 0.6)",
    boxShadow: "0 4px 12px rgba(22, 101, 52, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
    fontWeight: "600",
  },
  form: {
    background: "#ffffff", // Pure white background for the card
    padding: "45px",
    borderRadius: "20px",
    boxShadow: "0 12px 48px rgba(30, 58, 138, 0.15), 0 6px 16px rgba(0,0,0,0.1)",
    border: "2px solid #e2e8f0",
    borderTop: "5px solid #3b82f6", // 3D top border effect
    position: "relative",
  },
  formGroup: {
    marginBottom: "28px",
    position: "relative",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#1e3a8a", // Dark Royal Blue for labels (High contrast)
    fontSize: "16px",
    letterSpacing: "0.3px",
  },
  input: {
    width: "100%",
    padding: "16px 18px",
    border: "2px solid #cbd5e1", // Visible gray border
    borderRadius: "12px",
    fontSize: "15px",
    boxSizing: "border-box",
    background: "#f8fafc", // Very light gray background for inputs
    color: "#0f172a", // Dark text inside the input box
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.03)",
  },
  submitButton: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
    marginTop: "10px",
  },
};

export default RaiseComplaint;