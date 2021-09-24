import React, { useContext } from 'react'
import OpenPost from "./OpenPost"
import { useHistory, Link } from 'react-router-dom'
import ContextAPI from "../contextAPI/ContextAPI"

function PostItem(props) {

    const {userid, username, postid, content, likes, comments} = props
    const Context = useContext(ContextAPI)

    const {getonepost, getid} = Context
    return (
        <div>
        <div className="row">
            <div className="col-sm-11 my-4">
                <div className="card p-2">
                    <div className="card-body">
                    <div class="d-flex justify-content-between">
                    <Link className="nav-link" aria-current="page" to="/profile"><button className="btn btn-primary" onClick={()=>getid(userid)}>by : { username}</button></Link>
                    <h5 className="card-title mb-4">{content}</h5>
                    <p className="card-text">Likes: {likes.length}</p>
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

export default PostItem
