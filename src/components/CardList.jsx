import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiCalls from '../api';
import Pagination from '../utils/Pagination';

function CardList() {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 32;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchItems = async (page) => {
      try {
        const response = await apiCalls.getAllItems({ page, limit: itemsPerPage });
        setItems(response.data);
        setTotalItems(response.total);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
    window.scrollTo(0, 0, 'smooth');
  };

  const handleCardClick = (id) => {
    navigate(`/view/${id}`);
  };

  const handleAddClick = () => {
    navigate('/add');
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="container list-container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">My Prompts</h2>
        <button className="btn btn-primary" onClick={handleAddClick}>
          Add
        </button>
      </div>
      {totalItems === 0 ? (
        <div className="no-items-message text-center">
          <h5>No items found.</h5>
        </div>
      ) : (
        <div className="row">
          {items?.map((item) => (
            <div className="col-md-4 col-lg-3 mb-4" key={item?._id}>
              <div
                className="card h-100"
                onClick={() => handleCardClick(item?._id)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={item.image.url}
                  alt={item.promt}
                  className="card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{truncateText(item?.promt, 75)}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        productsPerPage={itemsPerPage}
        totalProducts={totalItems}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default CardList;
