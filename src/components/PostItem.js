import React, { useContext, useEffect, useState } from 'react'
import OpenPost from "./OpenPost"
import { useHistory, Link } from 'react-router-dom'
import ContextAPI from "../contextAPI/ContextAPI"

function PostItem(props) {

    const {userid, username, postid, content, likes, comments, followbtn, likebtn} = props
    const Context = useContext(ContextAPI)

    const {getonepost, getid} = Context

    const [like, setlike] = useState("Like")
    const [likeLength, setlikeLength] = useState(likes.length)
    let [follows, setfollower] = useState("follow")


    const checkiffollowed = async(userid) => {
        const responses = await fetch(`http://localhost:5000/post/iffollowed/${userid}`, {
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

    const checkifliked = async(postid) => {
        const responsess = await fetch(`http://localhost:5000/post/ifliked/${postid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
            });

        const jssn = await responsess.json()

        if(jssn === true){
            setlike("unlike")
        } else {
            setlike("like")
        }
    
    }

    useEffect(() => {
        checkiffollowed(userid)
        checkifliked(postid)
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
            const responsive = await fetch(`http://localhost:5000/auth/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
                body: JSON.stringify( {userid: id ,username: name})
            });
    
            const json = await responsive.json()
            console.log(json);
            setfollower("follow")
        }
      
    }

    const likePost = async(id) => {
        if(like === "like") {
            const response = await fetch(`http://localhost:5000/post/like/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
            });
            console.log(response);
            setlikeLength(likes.length+1)
            setlike("unlike")
        } else {
            const responsess = await fetch(`http://localhost:5000/post/unlike/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
             });
            console.log(responsess);
            setlikeLength(likeLength-1)
            setlike("like")
        }

    }

    if(followbtn === "hide" & likebtn === "hide") {
            return (
                <div>
                <div className="row">
                    <div className="col-sm-11 my-4">
                        <div className="card p-2">
                            <div className="card-body">
                            <div class="d-flex justify-content-between">
                            <Link className="nav-link" aria-current="page" to="/profile"><button className="btn btn-primary" onClick={()=>getid(userid)}>by : { username}</button></Link>
                            <h5 className="card-title mb-4">{content}</h5>
                            <p className="card-text">Likes: {likeLength}</p>
                            <p className="card-text">Comments: {comments.length}</p>
                            
                            <Link className="nav-link" aria-current="page" to="/open"><button className="btn btn-primary"  onClick={()=> getonepost(userid,postid, content,likes,comments)}>view all comments</button></Link>
                        
                            </div>
                              
                            </div>
                        </div>
                    </div>
                    
            </div>
            </div>
            )
        }

        if(followbtn === "hide" & likebtn != "hide"){
            return (
                <div>
                <div className="row">
                    <div className="col-sm-11 my-4">
                        <div className="card p-2">
                            <div className="card-body">
                            <div class="d-flex justify-content-between">
                            <Link className="nav-link" aria-current="page" to="/profile"><button className="btn btn-primary" onClick={()=>getid(userid)}>by : { username}</button></Link>
                            <h5 className="card-title mb-4">{content}</h5>
                            <p className="card-text">Likes: {likeLength}</p>
                            <p className="card-text">Comments: {comments.length}</p>
                            
                            <Link className="nav-link" aria-current="page" to="/open"><button className="btn btn-primary"  onClick={()=> getonepost(userid,postid, content,likes,comments)}>view all comments</button></Link>
                            <button  onClick={()=>likePost(postid)}>{like}</button>
                            </div>
                              
                            </div>
                        </div>
                    </div>
                    
            </div>
            </div>
            )

        }

        if(likebtn === "hide" & followbtn != "hide") {
            return (
                <div>
                <div className="row">
                    <div className="col-sm-11 my-4">
                        <div className="card p-2">
                            <div className="card-body">
                            <div class="d-flex justify-content-between">
                            <Link className="nav-link" aria-current="page" to="/profile"><button className="btn btn-primary" onClick={()=>getid(userid)}>by : { username}</button></Link>
                            <h5 className="card-title mb-4">{content}</h5>
                            <p className="card-text">Likes: {likeLength}</p>
                            <p className="card-text">Comments: {comments.length}</p>
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

        else {
            return (
                <div>
                <div className="row">
                    <div className="col-sm-11 my-4">
                        <div className="card p-2">
                            <div className="card-body">
                            <div class="d-flex justify-content-between">
                            <Link className="nav-link" aria-current="page" to="/profile"><button className="btn btn-primary" onClick={()=>getid(userid)}>by : { username}</button></Link>
                            <h5 className="card-title mb-4">{content}</h5>
                            <p className="card-text">Likes: {likeLength}</p>
                            <p className="card-text">Comments: {comments.length}</p>
                            <button  onClick={()=>likePost(postid)}>{like}</button>
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
       
    }
      

        
      
    

    


export default PostItem
