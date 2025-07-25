import { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Carousel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  deleteMoviesAsync,
  getAllMoviesAsync,
} from "../Services/Actions/MovieAction";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";

const Home = () => {
  const { movies, isLoading, errMSG } = useSelector((state) => state.movieReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-movie/${id}`);
  };
  const handleDelete = (id) => {
    dispatch(deleteMoviesAsync(id));
  };
  const handleView = (id) => {
    navigate(`/single-movie/${id}`);
  };

  useEffect(() => {
    dispatch(getAllMoviesAsync());
  }, []);

  return (
    <>
    {/* carousel */}
      <Carousel fade interval={3000} className="carousel-section mt-3">
        <Carousel.Item>
          <img
            className="d-block w-80 h-70 carousel-img"
            src="https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1744877848242_revplaycard1240x300.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-80 h-70 carousel-img"
            src="https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1751871230107_karatekiddesktop.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>

      {/* Movie List Section */}
      <h2 className="text-start mt-5 ms-4">Recommended Movies</h2>
      {errMSG && <p className="text-center text-danger">{errMSG}</p>}

      {isLoading ? (
        <div className="text-center mt-5">
          <h2>Loading...</h2>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="movie-list">
        <Container className="mt-4 mb-5">
          {movies.length === 0 ? (
            <h2 className="text-center mt-5">No Movies Found...</h2>
          ) : (
            <Row className="g-4">
              {movies.map((movie) => (
                <Col key={movie.id} sm={6} md={4} lg={3}>
                  <div className="movie-card">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="movie-image"
                    />
                    <div className="movie-card-body">
                      <div className="movie-title text-center">{movie.title}</div>

                      <div className="movie-info text-center">
                        <strong>Category:</strong> {movie.category}
                      </div>

                      {movie.director && (
                        <div className="movie-info text-center">
                          <strong>Director:</strong> {movie.director}
                        </div>
                      )}
                      <div className="movie-actions">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(movie.id)}
                        >
                          <FaEdit />Edit
                        </Button>
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => handleView(movie.id)}
                        >
                          <FaEye /> View
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(movie.id)}
                        >
                          <FaRegTrashAlt />Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
        </div>
      )}
      {/* { style css} */}
      <style>
        {`
          .movie-list {
          background-color: #f5f5f5;
        }
          .carousel-section {
            max-height: 450px;
            overflow: hidden;
          }

          .carousel-img {
            object-fit: cover;
            margin:0 auto;
            border-radius: 12px;
          }

          .movie-card {
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: transform 0.3s ease-in-out;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .movie-card:hover {
            transform: scale(1.03);
          }

          .movie-image {
            width: 100%;
            height: 320px;
            object-fit: cover;
            border-bottom: 1px solid #eee;
          }

          .movie-card-body {
            padding: 15px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .movie-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #222;
            margin-bottom: 10px;
          }

          .movie-info {
            font-size: 0.92rem;
            color: #555;
            margin-bottom: 6px;
          }

          .movie-actions {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
          }
          .btn-sm svg {
            margin-right: 3px;
          }
        `}
      </style>
    </>
  );
};

export default Home;
