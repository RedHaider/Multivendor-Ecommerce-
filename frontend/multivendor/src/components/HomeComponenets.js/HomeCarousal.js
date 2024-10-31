import React from 'react';

const HomeCarousel = () => {
    return (
        <div className="container-fluid p-0">
            <div className="row justify-content-center">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    
                    {/* Carousel Indicators */}
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
                    </ol>

                    {/* Carousel Inner */}
                    <div className="carousel-inner">
                        
                        {/* Slide 1 */}
                        <div className="carousel-item active">
                            <img src="picture/daraz/daraz_1.jpg" className="d-block w-100" alt="Product 1" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Product 1</h5>
                                <p>Description of Product 1.</p>
                            </div>
                        </div>
                        
                        {/* Slide 2 */}
                        <div className="carousel-item">
                            <img src="picture/daraz/daraz_2.jpg" className="d-block w-100" alt="Product 2" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Product 2</h5>
                                <p>Description of Product 2.</p>
                            </div>
                        </div>
                        
                        {/* Slide 3 */}
                        <div className="carousel-item">
                            <img src="picture/daraz/daraz_3.jpg" className="d-block w-100" alt="Product 3" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Product 3</h5>
                                <p>Description of Product 3.</p>
                            </div>
                        </div>

                        {/* Slide 4 */}
                        <div className="carousel-item">
                            <img src="picture/daraz/daraz_4.jpg" className="d-block w-100" alt="Product 4" />
                            <div className="carousel-caption d-md-block">
                                <h5>Product 4</h5>
                                <p>Description of Product 4.</p>
                            </div>
                        </div>

                        {/* Slide 5 */}
                        <div className="carousel-item">
                            <img src="picture/daraz/daraz_5.jpg" className="d-block w-100" alt="Product 5" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Product 5</h5>
                                <p>Description of Product 5.</p>
                            </div>
                        </div>

                        {/* Slide 6 */}
                        <div className="carousel-item">
                            <img src="picture/daraz/daraz_6.jpg" className="d-block w-100" alt="Product 6" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Product 6</h5>
                                <p>Description of Product 6.</p>
                            </div>
                        </div>
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
        </div>
    );
};

export default HomeCarousel;
