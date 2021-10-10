import React, { useContext, useEffect, useState } from 'react'
import PostItem from "./PostItem"
import NoteContext from "../contextAPI/ContextAPI"

function Homefeed() {

    useEffect(() => {
        userposts(localStorage.getItem("id"))
     }, [])
     
    const Context = useContext(NoteContext);

    const [allposts, setallpost] = useState([])


    const [post, setpost] = useState({post: ""})

    const [category, setcategory] = useState({category: ""})

    const onChange = (event) => {
        setpost({ ...post, [event.target.name]: event.target.value })
        console.log(post);
    }

    const onChanges = (event) => {
        setcategory({ ...post, [event.target.name]: event.target.value })
        console.log(category);
    }

    const userposts = async(id) => {

        const response = await fetch(`http://localhost:5000/auth/getuser/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("authtoken")
            },
        });
        const json = await response.json()
   

        let followers = await json.following
        console.log(followers);

        const responses = await fetch(`http://localhost:5000/auth/followers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("authtoken")
            },
            body:  JSON.stringify(followers)
        });

        const jsn = await responses.json()
        console.log(jsn);
        setallpost(jsn.array)

    }

    const postnew = async (post, category) => {
        const response = await fetch(`http://localhost:5000/post/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("authtoken")
            },
            body: JSON.stringify({ post: post, category: category })
        }); 

        const json = await response.json()
        console.log(json, "This one");

      let allnewposts = allposts.concat(json)
      setallpost(allnewposts)
    }

    const postneww = async(post, category) => {
        postnew(post, category)
    }

    return (
        <div className="container my-3">
        <h3 className="my-4">Hey Piyush, Here are all the posts: </h3>
        <div class="row g-1">
        <div class="col">
                <input type="text" class="form-control" name="post" id="post" placeholder="Enter a comment" onChange={onChange}/>
                <input type="text" class="form-control" name="category" id="category" placeholder="category" onChange={onChanges}/>
            </div>
            <div class="col-2">
                <button class="btn btn-primary mb-3" onClick={()=> postneww(post.post , category.category)}>Post now</button>
            </div>
        </div>
       
        <div className="row">
            {allposts.map(eachpost =>
                <PostItem username = {eachpost.name} userid={eachpost.user} postid={eachpost._id} content={eachpost.post} likes={eachpost.likes} comments={eachpost.comments} />
            )}
        </div>
    </div>
    )
}

export default Homefeed
