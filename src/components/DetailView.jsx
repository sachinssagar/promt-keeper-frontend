import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiCalls from '../api';
import LoaderSpinner from '../utils/Loader';

function DetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await apiCalls.getItem(id);
        setItem(response);
      } catch (error) {
        console.error('Error fetching item:', error);
        toast.error('Failed to load item details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await apiCalls.deleteItem(id); // Call your delete API
        toast.success('Item deleted successfully');
        navigate('/'); // Navigate back to the main list after deletion
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error('Error deleting item');
      }
    }
  };

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!item) return <div>Item not found</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={item.image.url}
            alt={item.title}
            className="img-fluid rounded"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <h2>{item.title}</h2>
          <Link to={`/edit/${id}`} className="btn btn-secondary mt-3 me-2">
            Edit Item
          </Link>
          <button className="btn btn-danger mt-3" onClick={handleDelete}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailView;
