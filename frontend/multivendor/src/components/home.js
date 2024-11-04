import HomeCategory from "./HomeComponenets.js/HomeCategory";
import HomeLatest from "./HomeComponenets.js/HomeLatest";
import HomeProduct from "./HomeComponenets.js/HomeProduct";
import HomeCarousel from "./HomeComponenets.js/HomeCarousal";

const Home = () => {
    return ( 
        <div>
    {/* sedond phase */}
     <HomeCarousel/>

    {/* 3rd phase */}

    <div class="container-fixed">
    <div class="row justify-content-between">
        <div class="col promo-section">
        <img src="picture/daraz/demo.webp"  alt="Promo Image" />
        </div>
        <div class="col promo-section">
        <img src="picture/daraz/demo2.webp"  alt="Promo Image" />
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