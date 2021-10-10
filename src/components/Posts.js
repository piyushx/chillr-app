import React, { useContext, useEffect, useState} from 'react'
import PostItem from "./PostItem"
import NoteContext from "../contextAPI/ContextAPI"



function Posts() {

    

    const Context = useContext(NoteContext);
    const { postnew } = Context

    const [posts, setposts] = useState([])



    const getAll = async () => {
        const response = await fetch(`http://localhost:5000/post/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("authtoken")
            },
        });

        const json = await response.json()
        console.log(json.posts);
        setposts(json.posts)
    }


    const [post, setpost] = useState({post: ""})


    const [categorypost, setcategorypost] = useState([])

    const [allPosts, setallPosts] = useState(posts)

    const getCategory = async(category) => {
        const categoryposts = posts.filter((post)=> {return post.category == category})  
          setcategorypost(categoryposts)
      }

    const onChange = (event) => {
        setpost({ ...post, [event.target.name]: event.target.value })
        console.log(post);
    }

    useEffect(() => {
       getAll()
    }, [])

    const postneww = (post) => {
        postnew(post)
        console.log(post);
    }


    return (
        <div className="container my-3">
            <h3 className="my-4">Hey {localStorage.getItem("name")}, Here are all the posts: </h3>
           

            <div class="d-flex align-items-start">
  <div class="nav flex-column nav-pills me-3 p-5" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button class="nav-link active p-2" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Latest Posts</button>
    <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false" onClick={()=>getCategory("Entertainment")}>Entertainment</button>
    <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false" onClick={()=>getCategory("Education")}>Education</button>
    <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false" onClick={()=>getCategory("Politics")}>Politics</button>
  </div>
  <div class="tab-content" id="v-pills-tabContent">
    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"> <div className="row">
                {posts.map((eachpost) =>
                    <PostItem username = {eachpost.name} likebtn = "hide" userid={eachpost.user} postid={eachpost._id} content={eachpost.post} likes={eachpost.likes} comments={eachpost.comments} />
                )}
            </div></div>
    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"> <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"> <div className="row">
                {categorypost.map((eachpost) =>
                    <PostItem username = {eachpost.name} likebtn = "hide" userid={eachpost.user} postid={eachpost._id} content={eachpost.post} likes={eachpost.likes} comments={eachpost.comments} />
                )}
            </div></div></div>
    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"> <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"> <div className="row">
                {categorypost.map((eachpost) =>
                    <PostItem username = {eachpost.name} likebtn = "hide" userid={eachpost.user} postid={eachpost._id} content={eachpost.post} likes={eachpost.likes} comments={eachpost.comments} />
                )}
            </div></div></div>
    <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"> <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"> <div className="row">
                {categorypost.map((eachpost) =>
                    <PostItem username = {eachpost.name} likebtn = "hide" userid={eachpost.user} postid={eachpost._id} content={eachpost.post} likes={eachpost.likes} comments={eachpost.comments} />
                )}
            </div></div></div>
  </div>
</div>
           
           
        </div>
    )
}

export default Posts
