import React, { useContext, useEffect, useState} from 'react'
import CommentForm from './CommentForm'
import { useHistory, Link } from 'react-router-dom'
import CommentItem from "./CommentItem"
import ContextAPI from "../contextAPI/ContextAPI"

function OpenPost(props) {
    const Context = useContext(ContextAPI)
    const { onepost, getonepost } = Context
    const { getid} = Context
    const {id, postid , comments} = onepost
    const [like, setlike] = useState("Like")
    const [postdetails, setpostdetails] = useState({ content: "", likes: [] })
    const [likeLength, setlikeLength] = useState()


    const getthepost = async(postid) => {
        const response = await fetch(`http://localhost:5000/post/get/${postid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("authtoken")
            },
        });

        const json = await response.json()

        setpostdetails({
            content: json.post,
            likes: json.likes,
        })
        setlikeLength(json.likes.length)
    
    }
   
    const {content, likes} = postdetails
    
 
    useEffect(() => {
        checkifliked(postid)
        getthepost(postid)
    }, [])

   

    const checkifliked = async(postid) => {
        const responsess = await fetch(`http://localhost:5000/post/ifliked/${postid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
            });

        const jssn = await responsess.json()

        if(jssn === true){
            setlike("unlike")
            
        } else {
            setlike("like")
        }
    
    }

    const likePost = async(id) => {
        if(like === "like") {
            const response = await fetch(`http://localhost:5000/post/like/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
            });
            console.log(response);
            setlikeLength(likeLength+1)
            setlike("unlike")
        } else {
            const responsess = await fetch(`http://localhost:5000/post/unlike/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("authtoken")
                },
             });
            console.log(responsess);
            setlikeLength(likeLength-1)
            setlike("like")
        }

    }
    
    return (
        <div className="container my-3">
            <h4>{content}</h4>

            <p>Liked by: {likeLength}</p>
            <CommentForm postid={postid} />
            <button  onClick={()=>likePost(postid)}>{like}</button>
            <div className="container my-3">
                <div className="row">
                    {
                        comments.map((eachcomment) =>
                            <CommentItem comment={eachcomment.comment} userid={eachcomment.userid} name = {eachcomment.name}/>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default OpenPost
