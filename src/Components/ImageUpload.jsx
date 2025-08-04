import { useState } from 'react';
import { Button, Form, Spinner, Image } from 'react-bootstrap';
import { uploadImage } from '../Services/ImageUploadService';

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImage = async (e) => {
    const uploadFile = e.target.files[0];
    if (uploadFile) {
      setPreviewUrl(URL.createObjectURL(uploadFile));
      setLoading(true);
      setError('');
      
      try {
        // Use our ImageUploadService to upload the image
        const imageUrl = await uploadImage(uploadFile);
        
        // Pass the secure URL back to the parent component
        onImageUpload(imageUrl);
        setLoading(false);
      } catch (error) {
        console.error('Upload error:', error);
        setError('Failed to upload image: ' + (error.message || 'Please try again'));
        setLoading(false);
      }
    }
  };

  return (
    <div className="mb-3">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Movie Poster</Form.Label>
        <Form.Control 
          type="file" 
          accept="image/*"
          onChange={handleImage} 
        />
        {loading && (
          <div className="d-flex align-items-center mt-2">
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className="ms-2">Uploading...</span>
          </div>
        )}
      </Form.Group>
      
      {previewUrl && (
        <div className="text-center mb-3">
          <Image 
            src={previewUrl} 
            alt="Preview" 
            style={{ maxHeight: '200px', objectFit: 'contain' }} 
            thumbnail 
          />
        </div>
      )}
      
      {error && <div className="text-danger mb-2">{error}</div>}
    </div>
  );
};

export default ImageUpload;