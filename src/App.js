import React, { useContext } from "react";
import ContextAPI from "../src/contextAPI/NoteState";
import Homepage from "./components/Homepage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts"
import Editprofile from "./components/Editprofile"
import Profile from "./components/Profile"
import OpenPost from "./components/OpenPost"


function App() {


  return (
    <ContextAPI>
      <Router>
        <Switch>

        {/* This route will take you to the homepage of app */}
          <Route exact path= "/">
          <Navbar/>
          <Homepage/>
          </Route>

        {/* this route will show all the posts after logging or signing up */}
          <Route exact path= "/posts">
          <Navbar/>
          <Posts/>
          </Route>

        {/* This route will allow the user to edit his own profile info and posts */}
          <Route exact path= "/edit">
          <Navbar/>
          <Editprofile/>
          </Route>

        {/* This route will allow all users to see the author's profile */}
          <Route exact path= "/profile">
          <Navbar/>
          <Profile/>
          </Route>

        {/* This route will allow all users to open the author's post which will include comments */}
          <Route exact path= "/open">
          <Navbar/>
          <OpenPost/>
          {/* */}
          </Route>

        </Switch>
      </Router>
    </ContextAPI>
  );
}

export default App;
