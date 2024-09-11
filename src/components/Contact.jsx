import React, { useState } from "react";
import "../css/contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API or email service)
    console.log("Form submitted:", formData);
    // Optionally, reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            className="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
