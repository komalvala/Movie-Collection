import { useState } from 'react';
import { Card, Button, Alert, Container, Form } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch (error) {
      setError('Failed to log out: ' + error.message);
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await updateUserProfile(currentUser, { displayName });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <Card className="shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            
            {isEditing ? (
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={currentUser.email} 
                    disabled 
                  />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="danger" type="submit" disabled={loading}>
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            ) : (
              <>
                <div className="mb-3">
                  <strong>Name:</strong> {currentUser.displayName || 'Not set'}
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> {currentUser.email}
                </div>
                <Button 
                  className="w-100 mb-3" 
                  variant="outline-danger"
                  onClick={() => setIsEditing(true)}
                >
                  Update Profile
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
        <div className="w-100 text-center mt-2">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </Container>
  );
};

export default Profile;