"use client";

import { useState } from "react";

export default function ContactForm({ formCategories }) {
  const apiurl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "booking",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    // if (!formData.category) {
    //   setError("Please select a category.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(`${apiurl}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        message: "",
      });
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        {/* Name */}
        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
          <div className="form-clt">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
          <div className="form-clt">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".2s">
          <div className="form-clt">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Category */}
        <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
          <div className="form-clt">
            <select
              name="category"
              className="single-select w-100"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {formCategories.map((cat, idx) => (
                <option key={idx} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".6s">
          <div className="form-clt">
            <textarea
              name="message"
              placeholder="Message Here*"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".2s">
          <button className="theme-btn" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>

        {/* Success */}
        {success && (
          <div className="col-lg-12">
            <p style={{ color: "green" }}>Message sent successfully!</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="col-lg-12">
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}
      </div>
    </form>
  );
}
