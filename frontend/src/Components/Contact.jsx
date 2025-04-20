import React, { useState } from "react";
import "../Styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwjwmlh0MlIp-e4YdkDq-Zx3rQycGHWXE93YxBXAHgPtjqEiVa7XotxsfWRmI3u2mRm1A/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([formData.name, formData.email, formData.query]),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.result === "success") {
        alert("Query submitted successfully!");
        setFormData({ name: "", email: "", query: "" });
      } else {
        alert(`Failed to submit: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        `An error occurred: ${error.message}. Check the console for details.`
      );
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-info">
        <h2>Contact Us / Have Any Query?</h2>
        <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/facebook.png"
              alt="Facebook"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png"
              alt="Twitter"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/instagram.png"
              alt="Instagram"
            />
          </a>
        </div>
      </div>
      <div className="contact-form">
        <h3>Send Us Your Query</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Your Query"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
