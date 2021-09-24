import React, { useContext, useEffect } from 'react'
import CommentForm from './CommentForm'
import CommentItem from "./CommentItem"
import ContextAPI from "../contextAPI/ContextAPI"

function OpenPost(props) {
    const Context = useContext(ContextAPI)
    const { onepost, getonepost } = Context
    const {id, postid, post, likes, comments} = onepost


    
    return (
        <div className="container my-3">
            <h4>{post}</h4>
            <p>Liked by: {likes.length}</p>
            <CommentForm postid={postid} />
            <div className="container my-3">
                <div className="row">
                    {
                        comments.map((eachcomment) =>
                            <CommentItem comment={eachcomment.comment} userid={eachcomment.userid} />
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default OpenPost
