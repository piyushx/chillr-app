const express = require("express")
const router = express.Router()
const authorizeUser = require("../middleware/authorizeUser")
const postModel = require("../dataModels/postDataModel")
const userModel = require("../dataModels/userDataModel")
const { json } = require("express")

router.get("/all", authorizeUser, async(req,res)=> {
    const posts = await postModel.find()
    res.json({posts})
})

router.post("/new", authorizeUser, async(req,res)=> {
    const {post} = req.body
    const userid = req.userData.id
    const name = req.userData.name

    const newPost = new postModel({
        user: userid,
        post,
        name
    })
    const savePost = await newPost.save()
    res.json(savePost)
})

router.put("/addcomment/:id", authorizeUser, async(req,res)=> {
    let {comment} = req.body
    let newcomment = {comment, userid: req.userData.id, name: req.userData.name}
    let particularPost = await postModel.findById(req.params.id)
    let updatedpost = {};
   updatedpost.user = particularPost.user
   updatedpost.post = particularPost.post
   updatedpost.likes = particularPost.likes
   updatedpost.comments = particularPost.comments.concat(newcomment)

    let particular = await postModel.findByIdAndUpdate(req.params.id, {$set: updatedpost}, {new:true})

    res.json(particular)
})

router.get("/iffollowed/:id", authorizeUser, async(req,res)=> {
    let usertobefollowed = req.params.id
    let particularuser = await userModel.findById(req.userData.id)
    let followers = particularuser.following
    let iffollowed = false
  
        if(particularuser) {
            for (let i = 0; i < followers.length; i++) {
                const followeduser = followers[i].userid;
                if(followeduser === usertobefollowed) {
                    iffollowed = true
                }
            }
           res.json(iffollowed)
        }
    
})

router.get("/ifliked/:id", authorizeUser, async(req,res)=> {
    let postid = req.params.id
    let userid = req.userData.id
    let particularpost = await postModel.findById(postid)
    let likes = particularpost.likes
    let ifliked = false
  
        if(particularpost) {
            for (let i = 0; i < likes.length; i++) {
                const likeduser = likes[i].userid;
                if(likeduser === userid) {
                    ifliked = true
                }
            }
           res.json(ifliked)
        }
    
})

router.put("/like/:id", authorizeUser, async(req,res)=> {
    let newlike = { userid: req.userData.id, name: req.userData.name}
    let particularPost = await postModel.findById(req.params.id)
    let updatedpost = {};
   updatedpost.user = particularPost.user
   updatedpost.post = particularPost.post
   updatedpost.likes = particularPost.likes.concat(newlike)
   updatedpost.comments = particularPost.comments

    let particular = await postModel.findByIdAndUpdate(req.params.id, {$set: updatedpost}, {new:true})

    res.json(particular)
})

router.put("/unlike/:id", authorizeUser, async(req,res)=> {
    let newlike = { userid: req.userData.id, name: req.userData.name}
    let particularPost = await postModel.findById(req.params.id)
    let updatedpost = {};
   updatedpost.user = particularPost.user
   updatedpost.post = particularPost.post
   updatedpost.likes = await particularPost.likes.filter((likes)=> {return likes.userid !== req.userData.id})
   updatedpost.comments = particularPost.comments

    let particular = await postModel.findByIdAndUpdate(req.params.id, {$set: updatedpost}, {new:true})

    res.json(particular)
})

router.get("/user/:id", authorizeUser, async(req,res)=> {
    const userid = req.params.id

    const userposts = await postModel.find({"user": userid})
    res.json(userposts)
})

router.get("/get/:id", authorizeUser, async(req,res)=> {
    const postid = req.params.id
    const post = await postModel.findById({_id: postid})
    const userid = await req.userData.id
    res.json(post, userid)
})




module.exports = router;