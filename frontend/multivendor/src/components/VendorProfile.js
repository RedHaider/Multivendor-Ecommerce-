import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import config from "../config";
import axios from "axios";
import HomeProduct from "./HomeComponenets.js/HomeProduct";
import VendorReviews from "./vendorreviews";

const VendorProfile = () => {
  const { id } = useParams();
  const [vendorInfo, setVendorInfo] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(null);
  const [reviewError, setReviewError] = useState(null);
  const [canPostReview, setCanPostReview] = useState(false);
  

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/vendors/${id}/`);
        setVendorInfo(response.data);
      } catch (error) {
        setError("Error fetching vendor data");
      } finally {
        setLoading(false);
      }
    };
    const checkCanPostReview = async () => {
      try {
        const token = localStorage.getItem('accessToken');  
        const response = await axios.get(`${config.API_BASE_URL}/order-management/api/can_post_review/${id}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCanPostReview(response.data.can_post_review);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("You need to be logged in to check review permission.");
        } else {
          setError("Error checking review permission");
        }
      }
    };
    checkCanPostReview();
    fetchVendorDetails();
  }, [id]);



  const handleReviewSubmit = async(event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${config.API_BASE_URL}/product-management/api/vendor-reviews/`,
        {
          vendor: id,
          rating,
          comment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Show success message
      setReviewSuccess("Review submitted successfully!");
      setReviewError(null);
      setRating(1); // Reset rating after submit
      setComment(""); // Reset comment
    } catch(error){
      setReviewError("Failed to submit review. Please try again.");
      setReviewSuccess(null);
    }

  };



  if (loading) return <p>Loading vendor details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <div className="row no-gutters justify-content-center mb-2">
        <div className="col text-center">
          <div className="heading">
            <h1>Vendor Profile</h1>
            <hr className="underline-hr"/>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-4">
          <img
            src={vendorInfo.logo || "https://via.placeholder.com/150"}
            alt="Vendor Profile"
            className="img-fluid rounded-circle mb-3"
          />
          <h4>Description</h4>
          <p>{vendorInfo.store_description || "No description available."}</p>
        </div>

        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <h4>{vendorInfo.business_name}</h4>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Seller Name</th>
                    <td>{vendorInfo.business_name}</td>
                  </tr>
                  <tr>
                    <th>Facebook</th>
                    <td>
                    {vendorInfo.facebook ? (
                    <a href={vendorInfo.facebook} target="_blank" rel="noopener noreferrer">
                        Facebook 
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>  
                  </tr>
                  <tr>
                    <th>Total Sale</th>
                    <td>                  
                      {vendorInfo.instagram ? (
                        <a href={vendorInfo.instagram} target="_blank" rel="noopener noreferrer">
                         Instagram
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Join Date</th>
                    <td>{new Date(vendorInfo.created_at).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <div className="mt-4">
                <h5>Contact</h5>
                <p>Address: {vendorInfo.address || "N/A"}</p>
                <p>Division: {vendorInfo.division || "N/A"}</p>
                <p>District: {vendorInfo.district || "N/A"}</p>
                <p>State: {vendorInfo.state || "N/A"}</p>
                <p>


                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      {/* Render HomeProduct component only if vendorInfo is loaded */}
      <div className="row mt-4">
        <div className="col-12">
          {vendorInfo && <HomeProduct vendorId={id} />} {/* Pass vendorId to HomeProduct */}
        </div>
      </div>
      {/* Vendor Reviews */}
      <div className="row mt-4">
        <div className="col-12">
          <VendorReviews vendorId={id} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row mt-4">
        {canPostReview ? (
        <div className="col-md-12">
          <h3>Post a Review</h3>
          {reviewSuccess && <div className="alert alert-success">{reviewSuccess}</div>}
          {reviewError && <div className="alert alert-danger">{reviewError}</div>}
          
          <form onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <select
                id="rating"
                className="form-control"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              >
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                className="form-control"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        </div>
        ):(
          <div className="col-12">
            <p>You must purchase a product from this vendor to post a review.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default VendorProfile;
