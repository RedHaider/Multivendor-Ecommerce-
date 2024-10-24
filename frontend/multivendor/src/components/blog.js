const Blog = () => {
    return ( 
        <div>
        <div className="row  no-gutters justify-content-center mb-2">
          <div className="col text-center">
          <div className="heading">
              <h1>Blog</h1>
              <hr className="underline-hr"/>
          </div>
          </div>
        </div>
   <div className="container mt-5 mb-5">
    <div className="row">
      <div className="col-lg-8">
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card" style={{width: "100%;"}}>
              <img className="card-img-top blogimg" src="picture/blog1.jpeg" alt="Card image cap"/>
            </div>
          </div>
          <div className="col-md-6">
            <p className="blogpa mt-3">By Smith | June 20, 2023 | 2 Comments</p>
            <h1 className="blogph h4">Summer Collection for Women’s 2023</h1>
            <p className="blogpb">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus sollicitudin lectus tincidunt.</p>
            <p className="blogpc " onclick="window.location.href='blogDetails.html'">Read more..</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card" style={{width: "100%;"}}>
              <img className="card-img-top " src="picture/blog1.jpeg" alt="Card image cap"/>
            </div>
          </div>
          <div className="col-md-6">
            <p className="blogpa mt-3">By Smith | June 20, 2023 | 2 Comments</p>
            <h1 className="blogph h4">Summer Collection for Women’s 2023</h1>
            <p className="blogpb">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus sollicitudin lectus tincidunt.</p>
            <p className="blogpc " onclick="window.location.href='blogDetails.html'">Read more..</p>
          </div>
        </div>
  
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card" style={{width: "100%;"}}>
              <img className="card-img-top blogimg" src="picture/blog1.jpeg" alt="Card image cap"/>
            </div>
          </div>
          <div className="col-md-6">
            <p className="blogpa mt-3">By Smith | June 20, 2023 | 2 Comments</p>
            <h1 className="blogph h4">Summer Collection for Women’s 2023</h1>
            <p className="blogpb">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus sollicitudin lectus tincidunt.</p>
            <p className="blogpc " onclick="window.location.href='blogDetails.html'">Read more..</p>
          </div>
        </div>
  
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card" style={{width: "100%;"}}>
              <img className="card-img-top blogimg" src="picture/blog1.jpeg" alt="Card image cap"/>
            </div>
          </div>
          <div className="col-md-6">
            <p className="blogpa mt-3">By Smith | June 20, 2023 | 2 Comments</p>
            <h1 className="blogph h4">Summer Collection for Women’s 2023</h1>
            <p className="blogpb">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibus. Pellentesque habitant morbi tristique senectus sollicitudin lectus tincidunt.</p>
            <p className="blogpc " onclick="window.location.href='blogDetails.html'">Read more..</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 text-center">
            <nav aria-label="...">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active">
                  <span className="page-link">
                    2
                    <span className="sr-only">(current)</span>
                  </span>
                </li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="col-lg-4 mt-5">
        <div>
          <h1 className="blog-card-h h4">Search</h1>
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
          <h5 className="d-flex justify-content-between mt-5">
            <span className="shoptogglerH font-weight-bold">Categories</span>
            <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list" aria-expanded="true" aria-controls="categories-list" id="toggle-button">
              <i className="fa fa-chevron-down"></i>
            </button>
          </h5>
          <div id="categories-list" className="collapse show">
            <ul className="category-list list-unstyled">
              <li className="category-item row">
                <div className="col-6">
                  <label for="dresses" className="shotitem">Dresses</label>
                </div>
                <div className="col-6 text-right"><span>+</span></div>
              </li>
              <li className="category-item row">
                <div className="col-6">
                  <label for="dresses">Dresses</label>
                </div>
                <div className="col-6 text-right"><span>+</span></div>
              </li>
              <li className="category-item row">
                <div className="col-6">
                  <label for="dresses">Dresses</label>
                </div>
                <div className="col-6 text-right"><span>+</span></div>
              </li>
              <li className="category-item row">
                <div className="col-6">
                  <label for="dresses">Dresses</label>
                </div>
                <div className="col-6 text-right"><span>+</span></div>
              </li>
              <li className="category-item row">
                <div className="col-6">
                  <label for="dresses">Dresses</label>
                </div>
                <div className="col-6 text-right"><span>+</span></div>
              </li>
              <li className="category-item row">
                <div className="col-6">
                  <label for="dresses">Dresses</label>
                </div>
                <div className="col-6 text-right"><span>+</span></div>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="blogrecent h4">Recent Posts</h1>
            <div className="row mt-3">
              <div className="col-2">
                <img className="blogrecentimg" src="picture/blogRecent1.jpeg" alt="Recent Post"/>
              </div>
              <div className="col-10">
                <h1 className="blogrecenth h6">Winter Collection for Men's 2023</h1>
                <p className="blogrecentt">June 20, 2023</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-2">
                <img className="blogrecentimg" src="picture/blogRecent1.jpeg" alt="Recent Post"/>
              </div>
              <div className="col-10">
                <h1 className="blogrecenth h6">Winter Collection for Men's 2023</h1>
                <p className="blogrecentt">June 20, 2023</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-2">
                <img className="blogrecentimg" src="picture/blogRecent1.jpeg" alt="Recent Post"/>
              </div>
              <div className="col-10">
                <h1 className="blogrecenth h6">Winter Collection for Men's 2023</h1>
                <p className="blogrecentt">June 20, 2023</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="blogbrowseh h4">Browse Tags</h1>
            <div className="row">
              <div className="col-4">
                <button type="button" className="btn btn-outline-dark blogbrowseb mt-2">ecommerce</button>
              </div>
              <div className="col-4">
                <button type="button" className="btn btn-outline-dark mt-2">fashion</button>
              </div>
              <div className="col-4">
                <button type="button" className="btn btn-outline-dark mt-2">Man’s</button>
              </div>
              <div className="col-4">
                <button type="button" className="btn btn-outline-dark mt-2">Women’s</button>
              </div>
              <div className="col-4">
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
 
export default Blog;