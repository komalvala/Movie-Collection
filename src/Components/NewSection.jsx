// src/components/NewSection.jsx
import React from "react";

const NewSection = () => {
  return (
    <div
      style={{
        background: "#f8f9fa",
        padding: "40px 0",
        textAlign: "center",
        borderTop: "2px solid #ddd",
        borderBottom: "2px solid #ddd",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#dc3545" }}>
        🎉 Exclusive Offers Just for You!
      </h2>
      <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "18px" }}>
        Get flat 50% off on your first movie booking. Use code:
        <strong style={{ color: "#007bff" }}> FIRST50</strong>
      </p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 30px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        Book Now
      </button>
    </div>
  );
};

export default NewSection;
