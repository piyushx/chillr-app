import { useState } from "react"
import ContextAPI from "./ContextAPI"

const Context = (props) => {

    const postHost = "http://localhost:5000/post"

    //this state provides all the posts created by all users
    const [posts, setposts] = useState([])

    const getAll = async () => {
        const response = await fetch(`${postHost}/all`, {
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

    
    const postnew = async (post) => {
        const response = await fetch(`${postHost}/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("authtoken")
            },
            body: JSON.stringify({ post })
        });

        const json = await response.json()
        console.log(json);

        let newstate = posts.concat(json)
        setposts(newstate)

    }

    //this state provides data of any particular post
    const [onepost, setonepost] = useState({ id: "", postid: "", content: "", likes: [], comments: [] })

    //this function will change the state of onepost and then we can pass the data as a prop through context API.
    const getonepost = async (id, postid, post, likes, comments) => {

        setonepost({
            id,
            postid,
            post,
            likes,
            comments
        }) //this function will run whenever someone clicks on any particular post
    }

    const [id, setid] = useState()

    const getid = (id) => {
        setid(id)
    }

    const [allposts, setallpost] = useState([])


    

    //this function will run whenever someone clicks on any particular post



    //this function will add comments to any post from open post component | this function will help reflect the changed comments globally


    return (
        <ContextAPI.Provider value={{ posts, onepost, getAll, getonepost, id, getid, postnew, allposts, setallpost}}>
            {props.children}
        </ContextAPI.Provider>
    )
}

export default Context