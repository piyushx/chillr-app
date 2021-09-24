import { useRef , useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import ContextAPI from "../contextAPI/ContextAPI"

function Navbar() {

    
 

    return (
        <div>
             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">ChillR - Your Fun social Network</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/posts">Homefeed</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create"></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/edit">Your Profile</Link>
                            </li>

                        </ul>
                    </div>

                  <div className="btnwrap">
                    <button type="submit" class="btn btn-success mx-2">Login</button>
                    <button type="submit" class="btn btn-primary mx-2" >Signup</button></div> :
                    <button type="submit" class="btn btn-warning mx-2" >Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
