import HomeCategory from "./HomeComponenets.js/HomeCategory";
import HomeLatest from "./HomeComponenets.js/HomeLatest";
import HomeProduct from "./HomeComponenets.js/HomeProduct";

const Home = () => {
    return ( 
        <div>
    {/* sedond phase */}
    <div class="container-fluid p-0"> 
        <div class="row no-gutters">
            <div class="col-12 mb-4">
            <div class="card bg-dark text-white">
                <img src="picture/home-page-hero-1.png" class="card-img img-fluid w-100" alt="Product 1" />

                <div class="card-img-overlay card-img-overlay-hero d-flex flex-column justify-content-end">
                <h6 class="card-title dherekete text-left">10.10 Mega Brand Sale</h6>
                <h3 class="card-text text-left fw-bold">HOT DEALS</h3>
                <p class="card-text text-left">Shop best products on best prices</p>
                <button class="btn add-to-cart-btn m-2">Shop Now</button>
                </div>
            </div>
            </div>
        </div>
    </div>

    {/* 3rd phase */}

            <div class="fixed-container ">
                <div class="row row justify-content-between">
                    <div class="col-md-6 promo-section justify-content-center ">
                        <img src="picture\promo-picture.png" alt="Promo Image"/>
                    </div>
                    <div class="col-md-6 promo-section ">
                        <img src="picture\promo-picture.png" alt="Promo Image"/>
                    </div>
                </div>
            </div>         

    {/* 5rth phase */}
  
            <HomeCategory/>

            <HomeProduct/>


    {/* 6th phase */}
            <div className="background-container">
                <div className="content-container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                    <div className="fthphasei d-flex flex-column align-items-center justify-content-center">
                        <i className="fa fa-solid fa-play fa-3x "></i>
                    </div>
                    <h2 className="fthphaseh">Get Up to -50% from Trending Collection</h2>
                    <button type="button" className="btn btn-outline-light mt-3">Explore Now</button>
                </div>
            </div>

            {/* 7th phase */}
            <HomeLatest/>

        </div>
     );
}
 
export default Home;