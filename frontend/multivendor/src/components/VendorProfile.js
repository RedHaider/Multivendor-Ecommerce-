import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import config from "../config";
import axios from "axios";
import HomeProduct from "./HomeComponenets.js/HomeProduct";

const VendorProfile = () => {
  const { id } = useParams();
  const [vendorInfo, setVendorInfo] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

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

    fetchVendorDetails();
  }, [id]);

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
                    <th>Total Products</th>
                    <td>{vendorInfo.total_products || "N/A"}</td>  
                  </tr>
                  <tr>
                    <th>Total Sale</th>
                    <td>{vendorInfo.total_sales || "N/A"}</td>
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
                <p>{vendorInfo.user ? vendorInfo.user.email : "N/A"}  {vendorInfo.contact_number || "N/A"}</p>
                <p>Address: {vendorInfo.address || "N/A"}</p>
                <p>Division: {vendorInfo.division || "N/A"}</p>
                <p>District: {vendorInfo.district || "N/A"}</p>
                <p>State: {vendorInfo.state || "N/A"}</p>
                <p>
                  {vendorInfo.facebook ? (
                    <a href={vendorInfo.facebook} target="_blank" rel="noopener noreferrer">
                      Facebook |
                    </a>
                  ) : (
                    "N/A"
                  )}

                  {vendorInfo.instagram ? (
                    <a href={vendorInfo.instagram} target="_blank" rel="noopener noreferrer">
                     | Instagram
                    </a>
                  ) : (
                    "N/A"
                  )}
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
    </div>
  );
};

export default VendorProfile;
