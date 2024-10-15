import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCalls from '../api';

function CardList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiCalls.getAllItems();
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <div className="container list-container mt-4">
      <h2 className="my-4 text-center">Prompt List</h2>
      <div className="row">
        {items?.map((item) => (
          <div className="col-md-4 mb-4" key={item?._id}>
            <div
              className="card h-100"
              onClick={() => handleCardClick(item?._id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={item.image.url}
                alt={item.promt}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item?.promt}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
