const Testimonials = () => {
  return (
    <div style={{ padding: "40px 20px", backgroundColor: "#f5f5f5" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#222" }}>🌟 What Our Users Say</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { name: "Komal Shah", review: "Loved the seamless ticket booking!", location: "Mumbai" },
          { name: "Amit Verma", review: "Amazing offers on blockbuster movies!", location: "Delhi" },
          { name: "Sara Khan", review: "UI is clean & fast! Booked in seconds.", location: "Pune" },
        ].map((t, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              maxWidth: "300px",
              flex: "1",
            }}
          >
            <p style={{ fontStyle: "italic", color: "#444" }}>"{t.review}"</p>
            <h5 style={{ marginTop: "10px", fontWeight: "bold" }}>{t.name}</h5>
            <p style={{ fontSize: "14px", color: "#888" }}>{t.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
