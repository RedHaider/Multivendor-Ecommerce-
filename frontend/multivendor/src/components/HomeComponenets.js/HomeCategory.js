import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';  // Import config with base URL

const HomeCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8)

  // Fetch categories from the API
  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/product-management/api/category/`)
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch categories');
        setLoading(false);
      });
  }, []);

  //load more product
  const loadMore = () => {
    setVisibleCount((prevCount)=> prevCount+4);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="fixed-container">
      <div className="c mt-5 justify-content-center">
        <div className="row justify-content-center">
          <div className="col text-center">
            <div className="heading">
              <h1>Category</h1>
              <hr className="underline-hr" />
            </div>
          </div>
        </div>

        <div className=" mt-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {categories.slice(0, visibleCount).map((category) => (
              <div className="col" key={category.id}>
                <div className="card h-100">
                  <img
                    src={`${config.API_BASE_URL}${category.category_image}`}
                    className="card-img-top"
                    alt={category.category_name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{category.category_name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* show the load more */}
      {visibleCount < categories.length && (
      <button className="load-more-btn" onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default HomeCategory;
