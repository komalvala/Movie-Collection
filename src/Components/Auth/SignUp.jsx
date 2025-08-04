import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      console.log('Attempting to sign up with:', email);
      
      const result = await signup(email, password);
      console.log('Signup successful, user:', result.user ? 'Created' : 'Not created');
      
      // Update profile with display name
      if (result.user) {
        await updateUserProfile(result.user, {
          displayName: displayName
        });
        console.log('Profile updated with name:', displayName);
        navigate('/');
      } else {
        throw new Error('User object not returned from signup');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to create an account: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }
  
  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      console.log('Attempting to sign up with Google');
      
      await signInWithGoogle();
      console.log('Google signup successful');
      navigate('/');
    } catch (error) {
      console.error('Google signup error:', error);
      setError('Failed to sign up with Google: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className="shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required 
                />
              </Form.Group>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control 
                  type="password" 
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required 
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit" variant="danger">
                Sign Up with Email
              </Button>
            </Form>
            
            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1 border-bottom"></div>
              <div className="mx-3 text-muted">OR</div>
              <div className="flex-grow-1 border-bottom"></div>
            </div>
            
            <Button 
              variant="outline-secondary" 
              className="w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <FcGoogle size={20} />
              <span>Continue with Google</span>
            </Button>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;