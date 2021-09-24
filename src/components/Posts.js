import React, { useContext, useEffect, useState } from 'react'
import PostItem from "./PostItem"
import NoteContext from "../contextAPI/ContextAPI"


function Posts() {

    const Context = useContext(NoteContext);
    const { posts,postnew, getAll} = Context

    const [post, setpost] = useState({post: ""})

    const onChange = (event) => {
        setpost({ ...post, [event.target.name]: event.target.value })
        console.log(post);
    }

    useEffect(() => {
       getAll()
    }, [])

    const postneww = async(post) => {
        postnew(post)
        console.log(post);
    }


    return (
        <div className="container my-3">
            <h3 className="my-4">Hey Piyush, Here are all the posts: </h3>
            <div class="row g-1">
            <div class="col">
                    <input type="text" class="form-control" name="post" id="post" placeholder="Enter a comment" onChange={onChange}/>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary mb-3" onClick={()=> postneww(post.post)}>Post now</button>
                </div>
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
