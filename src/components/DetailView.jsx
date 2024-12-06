import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import apiCalls from "../api";
import LoaderSpinner from "../utils/Loader";

function DetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await apiCalls.getItem(id);
        setItem(response);
      } catch (error) {
        console.error("Error fetching item:", error);
        toast.error("Failed to load item details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await apiCalls.deleteItem(id);
      toast.success("Item deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (item && item.promt) {
      navigator.clipboard
        .writeText(item.promt)
        .then(() => {
          toast.success("Prompt copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying prompt:", error);
          toast.error("Failed to copy prompt");
        });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!item) return <div>Prompt not found</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Image Thumbnail */}
        <div className="col-sm-6 col-md-4 mb-3">
          <img
            src={item.image.url}
            alt={item.promt}
            className="img-fluid rounded"
            style={{ cursor: "pointer" }}
            onClick={openModal}
          />
        </div>
        {/* Right Information Section */}
        <div className="col-sm-6 col-md-8">
          <h6>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              {item.url}
            </a>
          </h6>
          <h6>{item.promt}</h6>
          <button className="btn btn-info mt-2 me-2" onClick={handleCopy}>
            Copy Prompt
          </button>
          <Link to={`/edit/${id}`} className="btn btn-secondary mt-2 me-2">
            Edit Prompt
          </Link>
          <button className="btn btn-danger mt-2" onClick={handleDelete}>
            Delete Prompt
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" onClick={closeModal}>
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxWidth: "40%", maxHeight: "95%" }}
          >
            <div className="modal-content" style={{ maxHeight: "95%", overflow: "auto" }}>
              <div className="modal-header">
                <h5 className="modal-title">Preview Image</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body text-center">
                {/* Set image to a very large size */}
                <img
                  src={item.image.url}
                  alt={item.promt}
                  className="img-fluid"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    height: "700px", // Force these explicit sizes
                    width: "700px",
                  }}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailView;
