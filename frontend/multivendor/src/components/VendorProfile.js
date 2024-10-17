import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const VendorProfile = () => {
  return (
    <div className="container mt-5">
        <div className="row justify-content-center mb-2">
        <div className="col text-center">
        <div className="heading">
            <h1>Vendor Profile</h1>
            <hr className="underline-hr"/>
        </div>
        </div>
        </div>
      <div className="row">
        {/* Left Column for Profile and Description */}
        <div className="col-md-4">
          <img
            src="https://via.placeholder.com/150" // Replace with actual image URL
            alt="Vendor Profile"
            className="img-fluid rounded-circle mb-3"
          />
          <h4>Description</h4>
          <p>
            When an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
        </div>

        {/* Right Column for Seller Information and Products */}
        <div className="col-md-8">
        <div className="row">
            <div className="col-md-6">
          <h4>ShopY</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Seller Name</th>
                <td>sellerY</td>
              </tr>
              <tr>
                <th>Total Products</th>
                <td>03</td>
              </tr>
              <tr>
                <th>Total Sale</th>
                <td>23</td>
              </tr>
              <tr>
                <th>Join Date</th>
                <td>January 20, 2021</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className="col-md-6">
          <div className="mt-4">
            <h5>Contact</h5>
            <p>sellerY@shopy.com</p>
            <p>0000111111</p>
          </div>
          </div>
          </div>

          <h4 className="mt-4">Seller Products</h4>
          <div className="row">
            {/* Product 1 */}
            <div className="col-md-4">
              <div className="card">
                <img
                  src="https://via.placeholder.com/150" // Replace with product image URL
                  className="card-img-top"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Shoe</h5>
                  <p className="card-text">$1200</p>
                  <button className="btn btn-warning">Add To Cart</button>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="col-md-4">
              <div className="card">
                <img
                  src="https://via.placeholder.com/150" // Replace with product image URL
                  className="card-img-top"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Bag</h5>
                  <p className="card-text">$1200</p>
                  <button className="btn btn-warning">Add To Cart</button>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="col-md-4">
              <div className="card">
                <img
                  src="https://via.placeholder.com/150" // Replace with product image URL
                  className="card-img-top"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">Jacket</h5>
                  <p className="card-text">$1200</p>
                  <button className="btn btn-warning">Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
