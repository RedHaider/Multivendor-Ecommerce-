import Logout from "../utils/signout";

const TopBar = () => {
    return ( 
        <div className="topdiv ">
            <div className="container p-0 d-flex justify-content-between">
                <img src="picture/logo.svg" alt="Logo" className="logo"/>
                <Logout />
            </div>
     </div>
     );
}
 
export default TopBar;