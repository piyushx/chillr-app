import React, { useContext, useState } from 'react'
import ContextAPI from "../contextAPI/ContextAPI"

function CommentForm(props) {

    const Context = useContext(ContextAPI)
    const {onepost, getonepost} = Context

     //this state will store the comment written by any user
    const [comment, setcomment] = useState({comment: ""})

    //this will change comment state to store comment
    const onChange = (event) => {
        setcomment({ ...comment, [event.target.name]: event.target.value })
    }

    //this will create a new & local version of onepost so we could update comment section instantly
    let newPost = JSON.parse(JSON.stringify(onepost))

    //to add bywho, we'll get userid from middleware
    const addcomment = async(comment, userid, postid) => {

        const response = await fetch(`http://localhost:5000/post/addcomment/${postid}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("authtoken")
            },
            body: JSON.stringify({comment})
        })

        const json = await response.json();


        let newcomment = {comment: comment, userid: userid}

        if(newPost.postid === postid){
                    newPost.user = newPost.user
                    newPost.post = newPost.post
                    newPost.likes = newPost.likes
                    newPost.comments = newPost.comments.concat(newcomment)
        }
        //here we will changed the state locally and new comment will reflect instantly
        getonepost(newPost.user,newPost.postid, newPost.post, newPost.likes, newPost.comments)
    }

    //this function will change the state both locally and globally
    const addedcomments =() => {
        let data = localStorage.getItem("id")
        addcomment(comment.comment, data, onepost.postid)
    }

    return (
        <div>
            <div class="row g-3">
                <div class="col-auto">
                    <input type="text" class="form-control" name="comment" id="content" placeholder="Enter a comment" onChange={onChange} />
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary mb-3"  onClick={addedcomments}>Add comment</button>
                </div>
            </div>
        </div>
    )
}

export default CommentForm
