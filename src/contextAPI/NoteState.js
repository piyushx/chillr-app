import { useState } from "react"
import ContextAPI from "./ContextAPI"

const Context = (props) => {
   
    const [post, setpost] = useState([
        {
        user: "100",
        content: "Hey humans! What's up?",
        likes: [],
        comments: [{
            content: "This is very fake",
            byuser: "103"
        }]
        },
        {
        user: "101",
        content: "Long time no see?",
        likes: [],
        comments: [{
            content: "Naiceeeeeeee",
            byuser: "105"
        }]
        },
        {
        user: "102",
        content: "How's it going guys?",
        likes: [],
        comments: [{
            content: "use google man!",
            byuser: "107"
        }]
        }
    ])

    const [onepost, setonepost] = useState({id: "", content: "", likes: [], comments: []})

    const getonepost = async(id, content, likes, comments) => {
        setonepost({
            id,
            content,
            likes,
            comments
        })
        
    }

    const addcomments = async(comment, forwho, bywho) => {

        const newcomment = {content: comment, byuser: bywho}

        let newPost = await JSON.parse(JSON.stringify(post))

        for(let i=0; i< post.length ; i++) {
            let comments = newPost[i].comments
            const element = newPost[i];
            if (element.user === forwho) {
                newPost[i].user = newPost[i].user
                newPost[i].content = newPost[i].content
                newPost[i].likes = newPost[i].likes
                newPost[i].comments = comments.concat(newcomment)
            }

        }
        console.log(newPost);
        setpost(newPost)
        
    }



        return (
            <ContextAPI.Provider value={{post, onepost, getonepost, addcomments}}>
                {props.children}
            </ContextAPI.Provider>
        )
    }
    
export default Context