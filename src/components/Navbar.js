import { useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ContextAPI from "../contextAPI/ContextAPI"

function Navbar() {


    const history = useHistory()
    const refresh = () => {
        history.push("/homefeed")
    }

    const signupref = useRef(null)
    const loginref = useRef(null)
    const logoutref = useRef(null)
    const logoutrefer = useRef(null)



    const signupModalOpen = async (event) => {
        event.preventDefault();
        signupref.current.click()
    };

    const loginModalOpen = async (event) => {
        event.preventDefault();
        loginref.current.click()
    }

    const logout = async () => {
        localStorage.removeItem("authtoken")
        localStorage.removeItem("id")
        localStorage.removeItem("bio")
        localStorage.removeItem("name")
        history.push("/")
        console.log("Logged out!");
    }

    const [login, setlogin] = useState({ email: "", password: "" })
    const [signup, setsignup] = useState({ name: "", email: "", password: "", bio: "" })

    const onChange = (event) => {
        setlogin({ ...login, [event.target.name]: event.target.value })
    }

    const onChangesignup = (event) => {
        setsignup({ ...signup, [event.target.name]: event.target.value })
    }

    const onLoginButton = () => {
        console.log(login);
        logoutref.current.click()
        loginAPI(login.email, login.password)
    }

    const onSignupButton = () => {
      
        logoutrefer.current.click()
        signupAPI(signup.name, signup.email, signup.password, signup.bio)
        console.log(signup);
    }


    const loginAPI = async (email, password) => {

        const response = await fetch(`http://localhost:5000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const json = await response.json()
        console.log(json);
        console.log(json.sucess, json.authToken, json.data.id, json.data.name, json.data.bio);

        if (json.sucess) {
            localStorage.setItem("authtoken", json.authToken)
            localStorage.setItem("id", json.data.id)
            localStorage.setItem("name", json.data.name)
            localStorage.setItem("bio", json.data.bio)
            history.push("/homefeed")
        } else {
            history.push("/home")
        }

    }


    const signupAPI = async (name, email, password, bio) => {
        const response = await fetch(`http://localhost:5000/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, email: email, password: password, bio: bio })
        });

        const jsn = await response.json()
        console.log(jsn.sucess, jsn.authToken, jsn.data.id, jsn.data.bio);
        if (jsn.sucess) {
            localStorage.setItem("authtoken", jsn.authToken)
            localStorage.setItem("id", jsn.data.id)
            localStorage.setItem("name", jsn.data.name)
            localStorage.setItem("bio", jsn.data.bio)
            history.push("/homefeed")
        } else {
            history.push("/")
        }
    }


    return (
        <div>
            <div className="LoginModal">
                <button type="button" ref={loginref} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Login to ChillR</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div className="container">
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Enter Email Address: </label>
                                        <input onChange={onChange} type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Enter Password: </label>
                                        <input onChange={onChange} type="password" class="form-control" name="password" id="password" />
                                    </div>


                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" ref={logoutref} data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={onLoginButton}>Login to cloud-book</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="SignupModal">
                <button type="button" ref={signupref} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#signupModal">
                    Launch demo modal
                </button>

                <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Sign-up for ChillR</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div className="container">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Enter your Full name: </label>
                                        <input type="text" onChange={onChangesignup} class="form-control" id="name" name="name" aria-describedby="emailHelp" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Enter Email Address: </label>
                                        <input type="email" onChange={onChangesignup} class="form-control" id="email" name="email" aria-describedby="emailHelp" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Enter Password: </label>
                                        <input onChange={onChangesignup} type="password" class="form-control" name="password" id="password" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Set your bio: </label>
                                        <input onChange={onChangesignup} type="text" class="form-control" name="bio" id="bio" />
                                    </div>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" ref={logoutrefer} data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={onSignupButton}>Sign-up now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand fw-bold" to="/">ChillR - Your Fun social Network</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {localStorage.getItem("authtoken") ?
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/homefeed" onClick={refresh}>Homefeed</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/posts">Explore</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/edit">Your Profile</Link>
                                </li>

                            </ul>
                        </div> : ""}

                        {!localStorage.getItem("authtoken")? <div className="btnwrap">
                            <button type="submit" class="btn btn-success mx-2" onClick={loginModalOpen}>Login</button>
                            <button type="submit" class="btn btn-primary mx-2" onClick={signupModalOpen}>Signup</button></div> :
                        <button type="submit" class="btn btn-warning mx-2" onClick={logout}>Logout</button>}
                    </div>
                </nav>
            </div>
            </div>
            )
}

            export default Navbar
