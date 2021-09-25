import React, { useContext, useEffect, useState } from 'react'
import PostItem from "./PostItem"
import NoteContext from "../contextAPI/ContextAPI"

function Homefeed() {

    useEffect(() => {
        userposts("614c9b8d475c28363d4bc675")
     }, [])
     
    const Context = useContext(NoteContext);
    const { postnew} = Context

    const [allposts, setallpost] = useState([])


    const [post, setpost] = useState({post: ""})

    const onChange = (event) => {
        setpost({ ...post, [event.target.name]: event.target.value })
        console.log(post);
    }

    const userposts = async(id) => {

        const response = await fetch(`http://localhost:5000/auth/getuser/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0YzliOGQ0NzVjMjgzNjNkNGJjNjc1IiwibmFtZSI6IkdlbnVpbmUgdXNlciJ9LCJpYXQiOjE2MzI0NTg2MDV9.xOY5xqeIVq8mmyRUYWyXCJUIYtuLcDVgVLcIsoQk5BY"
            },
        });
        const json = await response.json()
        console.log(json);

        let followers = await json.following

        console.log(followers);

        const getfollowerposts = async(element)=> { 
            const responses = await fetch(`http://localhost:5000/post/user/${element.userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0YzliOGQ0NzVjMjgzNjNkNGJjNjc1IiwibmFtZSI6IkdlbnVpbmUgdXNlciJ9LCJpYXQiOjE2MzI0NTg2MDV9.xOY5xqeIVq8mmyRUYWyXCJUIYtuLcDVgVLcIsoQk5BY"
                },
            });

            let jsn = await responses.json()

            console.log(jsn);

          setallpost(allposts.concat(jsn))

            
        }
      
        for (let index = 0; index < followers.length; index++) {
            const element = followers[index];
             getfollowerposts(element)
        }
          

    }

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
            {allposts.map(eachpost =>
                <PostItem username = {eachpost.name} userid={eachpost.user} postid={eachpost._id} content={eachpost.post} likes={eachpost.likes} comments={eachpost.comments} />
            )}
        </div>
    </div>
    )
}

export default Homefeed
