import React, { useContext } from 'react'
import CommentForm from './CommentForm'
import CommentItem from "./CommentItem"
import ContextAPI from "../contextAPI/ContextAPI"


function OpenPost(props) {
    const Context = useContext(ContextAPI)
    const { onepost } = Context

    const { id, postid, content, likes, comments} = onepost

    return (
        <div className="container my-3">
            <h4>{content}</h4>
            <p>Liked by: {likes.length}</p>
            <CommentForm postid={postid} />
            <div className="container my-3">
                <div className="row">
                    {
                        comments.map((eachcomment) =>
                            <CommentItem comment={eachcomment.content} userid={eachcomment.byuser} />
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default OpenPost
