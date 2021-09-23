import { useState } from "react"
import ContextAPI from "./ContextAPI"


const Context = (props) => {
   //this state provides all the posts created by all users
    const [posts, setposts] = useState([
        {
        user: "100",
        postid: "101",
        content: "Hey humans! What's up?",
        likes: [],
        comments: [{
            content: "This is very fake",
            byuser: "103"
        },
        {
            content: "This is ferkgneipne very fake",
            byuser: "102"
        },{
            content: "This is very  ipetgnpern fake",
            byuser: "103"
        }]
        },
        {
            user: "100",
            postid: "102",
            content: "Hey hu;mf;mrekl;mmans! What's up?",
            likes: [],
            comments: [{
                content: "This is very fake",
                byuser: "103"
            }]
            },
        {
        user: "101",
        postid: "103",
        content: "Long time no see?",
        likes: [],
        comments: [{
            content: "Naiceeeeeeee",
            byuser: "105"
        }]
        },
        {
        user: "102",
        postid: "104",
        content: "How's it going guys?",
        likes: [],
        comments: [{
            content: "use google man!",
            byuser: "107"
        }]
        }
    ])

    //this state provides data of any particular post
    const [onepost, setonepost] = useState({id: "", postid: "", content: "", likes: [], comments: []})

    //this function will change the state of onepost and then we can pass the data as a prop through context API.
    const getonepost = async(id, postid, content, likes, comments) => {
        setonepost({
            id,
            postid,
            content,
            likes,
            comments
        }) //this function will run whenever someone clicks on any particular post
    }

    const [allposts, setallposts] = useState([])

    const getallposts = (id) => {
            let tempallposts = []
            for (let index = 0; index < posts.length; index++) {
                const element = posts[index];
        
                if (element.user === id) {
                tempallposts.push(element)
                console.log(allposts);
                }
        }

        setallposts(tempallposts)

         //this function will run whenever someone clicks on any particular post
    }


    //this function will add comments to any post from open post component | this function will help reflect the changed comments globally
    const addcomments = async(comment, postid, bywho) => {

        const newcomment = {content: comment, byuser: bywho}

        let newPost = await JSON.parse(JSON.stringify(posts))

        for(let i=0; i< posts.length ; i++) {
            let comments = newPost[i].comments
            const element = newPost[i];
            if (element.postid === postid) {
                newPost[i].user = newPost[i].user
                newPost[i].content = newPost[i].content
                newPost[i].likes = newPost[i].likes
                newPost[i].comments = comments.concat(newcomment)
            }

        }
        console.log(newPost);
        setposts(newPost)
        
    }


        return (
            <ContextAPI.Provider value={{posts, onepost, getonepost, addcomments, allposts, getallposts, setallposts}}>
                {props.children}
            </ContextAPI.Provider>
        )
    }
    
export default Context