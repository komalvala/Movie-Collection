const TrendingGenres = () => {
  const genres = ["Action", "Drama", "Comedy", "Thriller", "Romantic", "Horror"];
  return (
    <div className="mb-2" style={{ padding: "40px 20px", backgroundColor: "#fff", color: "#000" ,borderTop: "2px solid #ff3c6f", borderBottom: "2px solid #ff3c6f" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>🎬 Trending Genres</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {genres.map((genre, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#ff3c6f",
              color: "#fff",
              padding: "15px 30px",
              borderRadius: "25px",
              fontWeight: "bold",
              fontSize: "18px",
              transition: "0.3s",
              cursor: "pointer",
            }}
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingGenres;
