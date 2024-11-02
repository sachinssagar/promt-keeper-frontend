import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiCalls from '../api';
import Pagination from '../utils/Pagination';

function CardList() {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
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

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
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
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{truncateText(item?.promt, 75)}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
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
