import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import ContextAPI from "../contextAPI/ContextAPI"



function Editpostitem(props) {

    const Context = useContext(ContextAPI)
    const { getonepost, addcomments} = Context

    const { userid, postid,content, likes, comments } = props


    return (
        <div>
            <div className="row">
                <div className="col-sm-11 my-4">
                    <div className="card p-2">
                        <div className="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 className="card-title mb-4">{content}</h5>
                                <p className="card-text">Likes: {likes.length}</p>
                                <p className="card-text">Comments: {comments.length}</p>
                                <i class="fas fa-pen-square mx-4"></i>
                                <i class="fas fa-trash"></i>
                                <Link className="nav-link" aria-current="page" to="/open"><button className="btn btn-primary" onClick={() => getonepost(userid, postid, content, likes, comments)}>view all comments</button></Link>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Editpostitem
