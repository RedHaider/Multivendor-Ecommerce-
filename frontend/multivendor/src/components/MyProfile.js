const MyProfile = () => {
    return ( 
        <div className="container mt-5 mb-5">
                     <div>
        <div className="row justify-content-center mb-2">
        <div className="col text-center">
        <div className="heading">
           <h1>My Profile</h1>
          <hr className="underline-hr"/>
        </div>
        </div>
        </div>
        </div>
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-md-3 justify-content-center">
            <div className="text-center mb-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="card" style={{ width: "18rem", backgroundColor: "#f8f9fa" }}>
                <div className="card-body">
                    <div className="card-text mb-3">Orders</div>
                    <div className="card-text mb-3">Address</div>
                    <div className="card-text mb-3">Payment</div>
                    <div className="card-text mb-3">Wishlist</div>
                    <div className="card-text text-danger">Sign out</div>
                </div>
            </div>
          </div>
  
          {/* Profile Info */}
          <div className="col-md-9">
            <div className="row mb-4">
              <div className="col-md-6">
                <p><strong>Full Name:</strong> Isaac Newton</p>
                <p><strong>Birthday:</strong> 2002-08-31</p>
              </div>
              <div className="col-md-6">
                <p><strong>Email Address:</strong> isaacnewton@gmail.com</p>
                <p><strong>Phone Number:</strong> +01946476726</p>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <p><strong>Gender:</strong> Female</p>
              </div>
            </div>
  
            {/* Edit Profile and Change Password Buttons */}
            <div className="row justify-content-center">
              <div className="col-md-4">
                <button className="btn btn-warning w-100 mb-3">Edit Profile</button>
              </div>
              <div className="col-md-4">
                <button className="btn btn-warning w-100">Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default MyProfile;



