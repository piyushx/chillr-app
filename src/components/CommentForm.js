import React, { useContext, useState } from 'react'
import ContextAPI from "../contextAPI/ContextAPI"

function CommentForm(props) {
   

    const [comment, setcomment] = useState({content: "", byuser: ""})

    const onChange = (event) => {
        setcomment({ ...comment, [event.target.name]: event.target.value })
    }

    const Context = useContext(ContextAPI)
    const {onepost, getonepost, addcomments} = Context

    let newPost = JSON.parse(JSON.stringify(onepost))

    const addcomment = async(comment, forwho, bywho) => {

        let newcomment = {content: comment, byuser: bywho}

        if(newPost.id === forwho){
                    newPost.user = newPost.user
                    newPost.content = newPost.content
                    newPost.likes = newPost.likes
                    newPost.comments = newPost.comments.concat(newcomment)
        }
        getonepost(newPost.user, newPost.content, newPost.likes, newPost.comments)
    }

    const addedcomments =() => {
        addcomments(comment.content, props.id, comment.byuser)
        addcomment(comment.content, props.id, comment.byuser)
    }

    return (
        <div>
            <div class="row g-3">
                <div class="col-auto">
                    <input type="text" class="form-control" name="content" id="content" placeholder="Enter a comment" onChange={onChange} />
                    <input type="text" class="form-control" name="byuser" id="byuser" placeholder="Enter userid" onChange={onChange} />
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary mb-3"  onClick={addedcomments}>Add comment</button>
                </div>
            </div>
        </div>
    )
}

export default CommentForm
