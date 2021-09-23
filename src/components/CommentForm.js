import React, { useContext, useState } from 'react'
import ContextAPI from "../contextAPI/ContextAPI"

function CommentForm(props) {

    const Context = useContext(ContextAPI)
    const {onepost, getonepost, addcomments} = Context

     //this state will store the comment written by any user
    const [comment, setcomment] = useState({content: "", byuser: ""})

    //this will change comment state to store comment
    const onChange = (event) => {
        setcomment({ ...comment, [event.target.name]: event.target.value })
    }

    //this will create a new & local version of onepost so we could update comment section instantly
    let newPost = JSON.parse(JSON.stringify(onepost))

    //to add bywho, we'll get userid from middleware
    const addcomment = async(comment, postid, bywho) => {

        let newcomment = {content: comment, byuser: bywho}

        if(newPost.postid === postid){
                    newPost.user = newPost.user
                    newPost.content = newPost.content
                    newPost.likes = newPost.likes
                    newPost.comments = newPost.comments.concat(newcomment)
        }
        //here we will changed the state locally and new comment will reflect instantly
        getonepost(newPost.user,newPost.postid, newPost.content, newPost.likes, newPost.comments)
    }

    //this function will change the state both locally and globally
    const addedcomments =() => {
        addcomments(comment.content, props.postid, comment.byuser)
        addcomment(comment.content, props.postid, comment.byuser)
    }

    return (
        <div>
            <div class="row g-3">
                <div class="col-auto">
                    <input type="text" class="form-control" name="content" id="content" placeholder="Enter a comment" onChange={onChange} />
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary mb-3"  onClick={addedcomments}>Add comment</button>
                </div>
            </div>
        </div>
    )
}

export default CommentForm
