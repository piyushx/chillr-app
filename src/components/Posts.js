import React, { useContext, useEffect } from 'react'
import PostItem from "./PostItem"
import NoteContext from "../contextAPI/ContextAPI"


function Posts() {

    const Context = useContext(NoteContext);
    const { posts, getAll} = Context

    useEffect(() => {
       getAll()
    }, [])


    return (
        <div className="container my-3">
            <h3 className="my-4">Hey Piyush, Here are all the posts: </h3>
            <div class="col-auto">
                    <input type="text" class="form-control" name="post" id="post" placeholder="Enter a comment" />
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary mb-3" >Add comment</button>
                </div>
            <div className="row">
                {posts.map((eachpost) =>
                    <PostItem username = {eachpost.name} userid={eachpost.user} postid={eachpost._id} content={eachpost.post} likes={eachpost.likes} comments={eachpost.comments} />
                )}
            </div>
        </div>
    )
}

export default Posts
