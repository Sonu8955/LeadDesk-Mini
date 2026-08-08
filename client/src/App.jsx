import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
  "https://leaddesk-mini-6ufe.onrender.com/api/leads",
  form
);

      alert("🎉 Lead Submitted Successfully!");

      setForm({
        name: "",
        email: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit lead!");
    }
  };

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <h1>🚀 LeadDesk Mini</h1>

        <p>
          Collect, Manage and Track your business leads
          with a beautiful and powerful dashboard.
        </p>

        <div className="features">
          <div className="feature">
            <div>⚡</div>
            <h3>Fast</h3>
            <span>Quick Lead Capture</span>
          </div>

          <div className="feature">
            <div>🔒</div>
            <h3>Secure</h3>
            <span>MongoDB Storage</span>
          </div>

          <div className="feature">
            <div>📊</div>
            <h3>Smart</h3>
            <span>Easy Lead Tracking</span>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="form-section">
        <div className="form-card">
          <h2>Contact Us</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="budget"
              placeholder="Budget"
              value={form.budget}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Project Details"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Submit Lead 🚀
            </button>
          </form>
        </div>
      </section>

      <footer>
  © 2026 LeadDesk Mini • Built by <b>Sonu Kumari</b>
  <br />

  <a
    href="https://digitalheroesco.com"
    target="_blank"
    rel="noreferrer"
    style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}
  >
    Built for Digital Heroes Training Task
  </a>
</footer>
    </div>
  );
}

export default App;