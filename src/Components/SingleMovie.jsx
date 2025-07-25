import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMovieAsync } from "../Services/Actions/MovieAction";

const SingleMovie = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  const { movie, errMSG } = useSelector((state) => state.movieReducer);

  useEffect(() => {
    dispatch(getSingleMovieAsync(id));
  }, [dispatch, id]);

  if (errMSG) {
    return <h2 className="text-center mt-5">{errMSG}</h2>;
  }

  if (!movie) {
    return (
      <div className="text-center mt-5">
        <h2>Movie Not Found</h2>
        <Link to="/" className="btn btn-danger mt-3">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={movie.image}
              alt={movie.title}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-6">
            <h2>{movie.title}</h2>
            <p><strong>Category:</strong> {movie.category}</p>
            <p><strong>Description:</strong> {movie.desc}</p>
            <p><strong>Price:</strong> ₹{movie.price}</p>
            {movie.director && <p><strong>Director:</strong> {movie.director}</p>}
            {movie.releaseYear && <p><strong>Release Year:</strong> {movie.releaseYear}</p>}
            {movie.rating && <p><strong>Rating:</strong> {movie.rating}⭐</p>}
            {movie.language && <p><strong>Language:</strong> {movie.language}</p>}
            {movie.duration && <p><strong>Duration:</strong> {movie.duration}</p>}

            <Link to="/" className="btn btn-danger mt-3">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
