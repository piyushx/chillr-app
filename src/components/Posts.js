import React, { useContext } from 'react'
import PostItem from "./PostItem"
import NoteContext from "../contextAPI/ContextAPI"


function Posts() {

    const Context = useContext(NoteContext);
    const { posts } = Context


    return (
        <div className="container my-3">
            <h3 className="my-4">Hey Piyush, Here are all the posts: </h3>
            <div className="row">
                {posts.map((eachpost) =>
                    <PostItem userid={eachpost.user} postid={eachpost.postid} content={eachpost.content} likes={eachpost.likes} comments={eachpost.comments} />
                )}
            </div>
        </div>
    )
}

export default Posts
