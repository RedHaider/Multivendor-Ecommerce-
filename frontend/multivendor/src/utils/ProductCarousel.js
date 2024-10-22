import React, { useState, useRef } from 'react';
import '../style/ProductCarousel.css';

const ProductCarousel = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]); // Set the first image as the default
  const trackRef = useRef(null); // To control the carousel scroll

  // Change main image
  const changeMainImage = (imageSrc) => {
    setMainImage(imageSrc);
  };

  // Carousel scrolling logic
  const scrollLeft = () => {
    trackRef.current.scrollBy({
      top: 0,
      left: -100, // Scroll by 100 pixels to the left
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    trackRef.current.scrollBy({
      top: 0,
      left: 100, // Scroll by 100 pixels to the right
      behavior: 'smooth',
    });
  };

  return (
    <div className="product-carousel">
      {/* Main Image */}
      <div className="main-product-image-container">
        <img
          id="main-product-image"
          className="product-details-image"
          src={mainImage}
          alt="product details"
        />
      </div>

      {/* Thumbnail Images Carousel */}
      <div className="thumbnail-carousel-container">
        <div className="carousel-track" ref={trackRef}>
          {images.map((imageSrc, index) => (
            <img
              key={index}
              className="product-details-image-list"
              src={imageSrc}
              alt="product thumbnail"
              onClick={() => changeMainImage(imageSrc)}
            />
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <button className="carousel-button left-button" onClick={scrollLeft}>
        &lt;
      </button>
      <button className="carousel-button right-button" onClick={scrollRight}>
        &gt;
      </button>
    </div>
  );
};

export default ProductCarousel;
