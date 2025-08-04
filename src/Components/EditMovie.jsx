import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleMovieAsync,
  updateMovieAsync,
} from "../Services/Actions/MovieAction";
import { useNavigate, useParams } from "react-router";
import ImageUpload from "./ImageUpload";

const EditMovie = () => {
  const { id } = useParams();

  const initialState = {
    id: "",
    title: "",
    desc: "",
    price: "",
    image: "",
    category: "",
    director: "",
    durationHours: "",
    durationMinutes: "",
    language: "",
    releaseDate: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movie, isUpdate, errMSG } = useSelector((state) => state.movieReducer);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleImageUpload = (imageUrl) => {
    setInputForm((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };

  const validate = () => {
    const formError = {};
    if (!inputForm.title.trim()) formError.title = "Title is required!";
    if (!inputForm.desc.trim()) formError.desc = "Description is required!";
    if (!inputForm.category.trim()) formError.category = "Category is required!";
    if (!inputForm.image.trim()) formError.image = "Image URL is required!";
    if (!inputForm.price.trim()) formError.price = "Price is required!";
    if (!inputForm.director.trim()) formError.director = "Director is required!";
    if (!inputForm.durationHours.trim() && !inputForm.durationMinutes.trim())
      formError.duration = "Duration is required!";
    if (!inputForm.language.trim()) formError.language = "Language is required!";
    if (!inputForm.releaseDate.trim()) formError.releaseDate = "Release Date is required!";
    setErrors(formError);
    return Object.keys(formError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const totalDuration = `${inputForm.durationHours || 0}h ${inputForm.durationMinutes || 0}m`;

    const updatedData = {
      ...inputForm,
      duration: totalDuration,
    };

    dispatch(updateMovieAsync(updatedData));
    setInputForm(initialState);
  };

  useEffect(() => {
    dispatch(getSingleMovieAsync(id));
  }, [id]);

  useEffect(() => {
    if (movie) {
      // Extract hours and minutes from duration string like "2h 15m"
      const durationMatch = movie.duration?.match(/(\d+)h\s*(\d+)?m?/i);
      const durationHours = durationMatch?.[1] || "";
      const durationMinutes = durationMatch?.[2] || "";

      setInputForm({
        ...movie,
        durationHours,
        durationMinutes,
      });
    }
  }, [movie]);

  useEffect(() => {
    if (isUpdate) navigate("/");
  }, [isUpdate]);

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ width: "100%", maxWidth: "700px", boxShadow: "0 0 20px rgba(0,0,0,0.1)", borderRadius: "20px" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4">✏️ Edit Movie</h3>
          {errMSG && <p className="text-danger text-center">{errMSG}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                placeholder="Enter movie title"
              />
              {errors.title && <div className="text-danger">{errors.title}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
                placeholder="Enter movie description"
              />
              {errors.desc && <div className="text-danger">{errors.desc}</div>}
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={inputForm.price}
                    onChange={handleChanged}
                    placeholder="Enter ticket price"
                  />
                  {errors.price && <div className="text-danger">{errors.price}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <ImageUpload 
                  onImageUpload={handleImageUpload} 
                  currentImage={inputForm.image} 
                />
                {errors.image && <div className="text-danger">{errors.image}</div>}
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={inputForm.category}
                    onChange={handleChanged}
                  >
                    <option value="">Select Category</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Horror">Horror</option>
                    <option value="Romantic">Romantic</option>
                  </Form.Select>
                  {errors.category && <div className="text-danger">{errors.category}</div>}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    name="language"
                    value={inputForm.language}
                    onChange={handleChanged}
                    placeholder="e.g. Hindi, English"
                  />
                  {errors.language && <div className="text-danger">{errors.language}</div>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Release Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="releaseDate"
                    value={inputForm.releaseDate}
                    onChange={handleChanged}
                  />
                  {errors.releaseDate && <div className="text-danger">{errors.releaseDate}</div>}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <Row>
                    <Col xs={6}>
                      <Form.Control
                        type="number"
                        name="durationHours"
                        value={inputForm.durationHours}
                        onChange={handleChanged}
                        placeholder="Hours"
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type="number"
                        name="durationMinutes"
                        value={inputForm.durationMinutes}
                        onChange={handleChanged}
                        placeholder="Minutes"
                      />
                    </Col>
                  </Row>
                  {errors.duration && <div className="text-danger">{errors.duration}</div>}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                name="director"
                value={inputForm.director}
                onChange={handleChanged}
                placeholder="Enter Director's Name"
              />
              {errors.director && <div className="text-danger">{errors.director}</div>}
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="danger" size="lg" style={{ padding: "10px 40px", borderRadius: "30px" }}>
                Update Movie
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditMovie;
