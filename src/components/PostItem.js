import React, { useContext, useEffect, useState } from 'react'
import OpenPost from "./OpenPost"
import { useHistory, Link } from 'react-router-dom'
import ContextAPI from "../contextAPI/ContextAPI"


function PostItem(props) {

    const {userid, username, postid, content, likes, comments} = props
    const Context = useContext(ContextAPI)

    const {getonepost, getid} = Context

    const [like, setlike] = useState(likes.length)
    let [follows, setfollower] = useState("follow")

    const checkiffollowed = async(userid) => {
        const responses = await fetch(`http://localhost:5000/post/ifliked/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
            });

        const jsn = await responses.json()

        if(jsn === true){
            setfollower("unfollow")
        } else {
            setfollower("follow")
        }
    
    }

    useEffect(() => {
        checkiffollowed(userid)
    }, [])

    const addFollower = async(id, name) => {

        if(follows === "follow") {
            const response = await fetch(`http://localhost:5000/auth/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
                body: JSON.stringify( {userid: id ,username: name})
            });
    
            const json = await response.json()
            console.log(json);
            setfollower("unfollow")
        } else {
            setfollower("follow")
        }
      
    }

    const likePost = async(id) => {
        if(like === likes.length) {
            const response = await fetch(`http://localhost:5000/post/like/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
            });
            console.log(response);
            setlike(likes.length+1)
        } else {
            setlike(likes.length)
        }

       
    }

    return (
        <div>
        <div className="row">
            <div className="col-sm-11 my-4">
                <div className="card p-2">
                    <div className="card-body">
                    <div class="d-flex justify-content-between">
                    <Link className="nav-link" aria-current="page" to="/profile"><button className="btn btn-primary" onClick={()=>getid(userid)}>by : { username}</button></Link>
                    <h5 className="card-title mb-4">{content}</h5>
                    <p className="card-text">Likes: {like}</p>
                    <p className="card-text">Comments: {comments.length}</p>
                    <button class="fas fa-heart" onClick={()=>likePost(postid)}></button>
                    <Link className="nav-link" aria-current="page" to="/open"><button className="btn btn-primary"  onClick={()=> getonepost(userid,postid, content,likes,comments)}>view all comments</button></Link>
                    <button className="btn btn-secondary" onClick={()=>addFollower(userid, username)}>{follows}</button>

                    </div>
                      
                    </div>
                </div>
            </div>
            
    </div>
    </div>
    )
}

export default PostItem
