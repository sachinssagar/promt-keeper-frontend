import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiCalls from '../api';

function AddItem() {
  const [promt, setPromt] = useState('');
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [imagePrevURL, setImagePrevURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    const _url = URL.createObjectURL(file);
    setImagePrevURL(_url);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiCalls.addItem({ promt, image: image });
      if (response) {
        const newItemId = response._id;
        toast.success('Item added successfully');
        navigate(`/view/${newItemId}`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Error adding item');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-12">
            <label className="form-label">Promt</label>
            <input
              type="text"
              className="form-control"
              value={promt}
              onChange={(e) => setPromt(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImage}
              required
            />
          </div>
        </div>

        {imagePrevURL && (
          <div className="row mb-3">
            <div className="col-12">
              <img
                src={imagePrevURL}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxHeight: '200px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Adding Promt...' : 'Add Promt'}
        </button>
      </form>
    </div>
  );
}

export default AddItem;
