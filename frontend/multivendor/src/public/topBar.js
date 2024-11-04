import { Link } from 'react-router-dom';
import Logout from '../utils/signout';

const TopBar = () => {
    return ( 
        <div className="topdiv">
            <div className="mr-5 ml-5 p-0 d-flex justify-content-between">
                {/* Wrap the image with Link */}
                <Link to="/">
                    <img src="picture/logo.svg" alt="Logo" className="logo" />
                </Link>
                <Logout />
            </div>
        </div>
     );
}
 
export default TopBar;
