import React, { useContext } from 'react'
import PostItem from "./PostItem"
import NoteContext from "../contextAPI/ContextAPI"

function Posts() {

    const Context = useContext(NoteContext);
    const {post} = Context
    console.log(post);

    return (
        <div className = "container my-3">
        <h3 className="my-4">Hey Piyush, Here are all the posts: </h3>
        <div className="row">
            {post.map((eachpost)=> 
                <PostItem userid = {eachpost.user} content = {eachpost.content} likes = {eachpost.likes} comments = {eachpost.comments} />
            )}
        </div>
        </div>
    )
}

export default Posts
