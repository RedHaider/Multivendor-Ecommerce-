import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config'; 

const HomeCarousel = () => {
    const [carousels, setCarousels] = useState([]);
    
    useEffect(() => {
        // Fetch the carousels data from Django API
        axios.get(`${config.API_BASE_URL}/content-management/api/carousels/`)  
            .then(response => {
                setCarousels(response.data);
            })
            .catch(error => {
                console.error('Error fetching carousels:', error);
            });
    }, []);

    return (
        <div className="container-fluid container-fixed p-0">
            <div className="row justify-content-center">
                <div className='col-10 p-0 m-0'>
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    
                        {/* Carousel Indicators */}
                        <ol className="carousel-indicators">
                            {carousels.map((carousel, index) => (
                                <li
                                    key={index}
                                    data-target="#carouselExampleIndicators"
                                    data-slide-to={index}
                                    className={index === 0 ? "active" : ""}
                                ></li>
                            ))}
                        </ol>

                        {/* Carousel Inner */}
                        <div className="carousel-inner">
                            {carousels.length > 0 ? (
                                carousels.map((carousel, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img src={`${config.API_BASE_URL}${carousel.image}`} className="d-block w-100" alt={carousel.title} />
                                        <div className="carousel-caption d-none d-md-block">
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="carousel-item active">
                                    <p>Loading...</p>
                                </div>
                            )}
                        </div>
                    
                        {/* Carousel Controls */}
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className='col-2 p-0 m-0'>
                    <img src="picture/daraz/vednor.jpeg" className="w-100" alt="go" />
                </div>
            </div>
        </div>
    );
};

export default HomeCarousel;
