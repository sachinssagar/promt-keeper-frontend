import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiCalls from '../api';
import LoaderSpinner from '../utils/Loader';

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promt, setPromt] = useState('');
  const [image, setImage] = useState('');
  const [imagePrevURL, setImagePrevURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await apiCalls.getItem(id);
        setPromt(response.promt);
        setImagePrevURL(response.image.url);
      } catch (error) {
        console.error('Error fetching item:', error);
        toast.error('Error fetching item details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const _url = URL.createObjectURL(file);
      setImagePrevURL(_url);
      setFileToBase(file);
    }
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
      const data = { promt };
      if (image) {
        data.image = image;
      }

      await apiCalls.updateItem(id, data);
      toast.success('Item updated successfully');
      navigate(`/view/${id}`);
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Error updating item');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePrevURL && (
              <img
                src={imagePrevURL}
                alt="Preview"
                className="img-fluid mt-2"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            )}
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Promt</label>
              <textarea
                type="text"
                className="form-control"
                value={promt}
                onChange={(e) => setPromt(e.target.value)}
                required
                rows={10}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Promt'}
        </button>
      </form>
    </div>
  );
}

export default EditItem;
