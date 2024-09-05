const BlogDetails = () => {
    return ( 
        <div>
            <div className="blogbackground-container">
                    <div className="content-container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                        <h2 className="shopeoneH">Home &gt; Blog &gt; Details</h2>
                    </div>
                    </div>
                    <div className="container mt-5 mb-5">
            <div className="row">
            <div className="col-lg-8 ">

            <div className="row mt-3">
                <div className="col-12">
                    <div className="card" >
                        <img className="card-img-top blogimg" src="picture\blog1.jpeg" alt="Card image cap"/>
                    </div>              
                </div>
                <div className="col-12">
                    <p className="blogpa mt-3">By Smith | June 20,2023 | 2 Comments</p>
                    <h1 className="blogph">Summer Collection for woman’s 2023</h1>
                    <p className="blog-details-gender">Women</p>
                    <p className="blogpb">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                    <p className="blogpb">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                </div>
            </div>

        


            </div>
            <div className="col-lg-4 mt-5">
                <div >
                    <h1 className="blog-card-h">Search</h1>
                    <form className="form-inline my-2 my-lg-0">
                        <div className="input-group">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-search"></i>
                            </span>
                        </div>
                        </div>
                    </form>
                    <div  className="d-flex mb-2 justify-content-between mt-5">
                        <span className="shoptogglerH font-weight-bold">Categories</span>
                        <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list" aria-expanded="true" aria-controls="categories-list" id="toggle-button">
                            <i className="fa fa-chevron-down"></i>
                        </button>
                    </div>
                    <div id="categories-list mt-3" className="collapse show">
                        <ul className="category-list list-unstyled">
                            <li className="category-item row">
                                <div className="col-md-6">
                                    <label for="dresses" className="shotitem">Dresses</label>
                                </div>
                                <div className="col-md-6 text-right"><span>+</span></div>
                            </li>
                            <li className="category-item row">
                            <div className="col-md-6">
                                <label for="dresses">Dresses</label>
                            </div>
                            <div className="col-md-6 text-right"><span>+</span></div>
                            </li>
                            <li className="category-item row">
                            <div className="col-md-6">
                                <label for="dresses">Dresses</label>
                            </div>
                            <div className="col-md-6 text-right"><span>+</span></div>
                        </li>
                        <li className="category-item row">
                        <div className="col-md-6">
                            <label for="dresses">Dresses</label>
                        </div>
                        <div className="col-md-6 text-right"><span>+</span></div>
                    </li>
                    <li className="category-item row">
                        <div className="col-md-6">
                            <label for="dresses">Dresses</label>
                        </div>
                        <div className="col-md-6 text-right"><span>+</span></div>
                    </li>
                    <li className="category-item row">
                    <div className="col-md-6">
                        <label for="dresses">Dresses</label>
                    </div>
                    <div className="col-md-6 text-right"><span>+</span></div>
                </li>

                        </ul>
                    </div>
                    <div>
                    <h1 className="blogrecent">Recent Post</h1>
                    <div className="row mt-3">
                        <div className="col-md-2">
                        <img className="blogrecentimg" src="picture\blogRecent1.jpeg" alt="Italian Trulli"/>
                        </div>
                        <div className="col-md-10">
                        <h1 className="blogrecenth">Winter collection for man's 2023</h1>
                        <p className="blogrecentt">June 20,2023</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-2">
                        <img className="blogrecentimg" src="picture\blogRecent1.jpeg" alt="Italian Trulli"/>
                        </div>
                        <div className="col-md-10">
                        <h1 className="blogrecenth">Winter collection for man's 2023</h1>
                        <p className="blogrecentt">June 20,2023</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col-md-2">
                    <img className="blogrecentimg" src="picture\blogRecent1.jpeg" alt="Italian Trulli"/>
                    </div>
                    <div className="col-md-10">
                        <h1 className="blogrecenth">Winter collection for man's 2023</h1>
                        <p className="blogrecentt">June 20,2023</p>
                    </div>
                </div>
                    </div>
                    <div>
                    <h1 className="blogbrowseh">Browse Tags</h1>
                    <div className="row">
                        <div className="col-md-4">
                        <button type="button" className="btn btn-outline-dark blogbrowseb mt-2">ecommerce</button>
                        </div>
                        <div className="col-md-4">
                        <button type="button" className="btn btn-outline-dark mt-2">fashion</button>
                        </div>
                        <div className="col-md-4">
                        <button type="button" className="btn btn-outline-dark mt-2">Man’s</button>
                        </div>
                        <div className="col-md-4">
                        <button type="button" className="btn btn-outline-dark mt-2">Women’s</button>
                        </div>
                        <div className="col-md-4">
                        <button type="button" className="btn btn-outline-dark mt-2">Dresses</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
     );
}
 
export default BlogDetails;