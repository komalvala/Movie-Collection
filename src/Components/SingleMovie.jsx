import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMovieAsync, deleteMoviesAsync } from "../Services/Actions/MovieAction";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const SingleMovie = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { movie, errMSG } = useSelector((state) => state.movieReducer);
  
  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    seats: 1,
    totalPrice: 0
  });
  
  // Confirmation modal state
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getSingleMovieAsync(id));
  }, [dispatch, id]);
  
  // Handle edit button click
  const handleEdit = () => {
    navigate(`/edit-movie/${id}`);
  };
  
  // Handle delete button click
  const handleDelete = () => {
    setShowDeleteModal(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    dispatch(deleteMoviesAsync(id));
    setShowDeleteModal(false);
    navigate('/');
  };
  
  // Handle booking form changes
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    const updatedDetails = { ...bookingDetails, [name]: value };
    
    // Calculate total price based on number of seats
    if (name === "seats") {
      updatedDetails.totalPrice = movie.price * value;
    }
    
    setBookingDetails(updatedDetails);
  };
  
  // Initialize booking when modal opens
  const openBookingModal = () => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    
    setBookingDetails({
      date: formattedDate,
      time: "18:00", // Default to 6 PM
      seats: 1,
      totalPrice: movie.price
    });
    
    setShowBookingModal(true);
  };
  
  // Handle booking submission
  const handleBookSubmit = (e) => {
    e.preventDefault();
    setShowBookingModal(false);
    setShowConfirmation(true);
  };

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
            {movie.releaseDate && <p><strong>Release Date:</strong> {movie.releaseDate}</p>}
            {movie.language && <p><strong>Language:</strong> {movie.language}</p>}
            {movie.duration && <p><strong>Duration:</strong> {movie.duration}</p>}

            <div className="d-flex flex-wrap gap-2 mt-4">
              <Button 
                variant="danger" 
                className="px-4" 
                onClick={openBookingModal}
              >
                Book Movie
              </Button>
              
              <Link to="/" className="btn btn-outline-secondary">← Back to Home</Link>
              
              {currentUser && (
                <>
                  <Button 
                    variant="outline-primary" 
                    onClick={handleEdit}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    onClick={handleDelete}
                  >
                    <FaRegTrashAlt /> Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Tickets for {movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBookSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Date</Form.Label>
              <Form.Control 
                type="date" 
                name="date" 
                value={bookingDetails.date}
                onChange={handleBookingChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Select Show Time</Form.Label>
              <Form.Select 
                name="time" 
                value={bookingDetails.time}
                onChange={handleBookingChange}
                required
              >
                <option value="10:00">10:00 AM</option>
                <option value="13:00">1:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="21:00">9:00 PM</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Number of Seats</Form.Label>
              <Form.Control 
                type="number" 
                name="seats" 
                value={bookingDetails.seats}
                onChange={handleBookingChange}
                min="1"
                max="10"
                required
              />
            </Form.Group>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Total Price:</h5>
              <h5 className="mb-0">₹{bookingDetails.totalPrice || movie.price}</h5>
            </div>
            
            <div className="d-grid gap-2">
              <Button variant="danger" type="submit">
                Confirm Booking
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      
      {/* Booking Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <div className="mb-3" style={{ fontSize: '3rem' }}>🎉</div>
            <h4>Thank you for your booking!</h4>
            <p className="text-muted">Your tickets have been booked successfully.</p>
          </div>
          
          <div className="booking-details p-3 bg-light rounded">
            <Row className="mb-2">
              <Col xs={4}><strong>Movie:</strong></Col>
              <Col>{movie.title}</Col>
            </Row>
            <Row className="mb-2">
              <Col xs={4}><strong>Date:</strong></Col>
              <Col>{bookingDetails.date}</Col>
            </Row>
            <Row className="mb-2">
              <Col xs={4}><strong>Time:</strong></Col>
              <Col>{bookingDetails.time}</Col>
            </Row>
            <Row className="mb-2">
              <Col xs={4}><strong>Seats:</strong></Col>
              <Col>{bookingDetails.seats}</Col>
            </Row>
            <Row className="mb-2">
              <Col xs={4}><strong>Total:</strong></Col>
              <Col>₹{bookingDetails.totalPrice}</Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{movie.title}</strong>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleMovie;
