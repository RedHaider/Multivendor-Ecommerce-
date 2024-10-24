import Logout from '../utils/signout';


const TopBar = () => {
    return ( 
        <div className="topdiv" style={{ backgroundColor: '#eb6626' }}>
            <div className=" mr-5 ml-5 p-0 d-flex justify-content-between">
                <img src="picture/logo.svg" alt="Logo" className="logo"/>
                <Logout />
            </div>
     </div>
     );
}
 
export default TopBar;