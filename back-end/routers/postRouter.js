const express = require("express")
const router = express.Router()
const authorizeUser = require("../middleware/authorizeUser")
const postModel = require("../dataModels/postDataModel")
const { json } = require("express")

router.get("/all", authorizeUser, async(req,res)=> {
    const posts = await postModel.find()
    res.json({posts})
})

router.post("/new", authorizeUser, async(req,res)=> {
    const {post} = req.body
    const userid = req.userData.id

    const newPost = new postModel({
        user: userid,
        post   
    })
    const savePost = await newPost.save()
    res.json(savePost)
})

router.put("/addcomment/:id", authorizeUser, async(req,res)=> {
    let {comment} = req.body
    let newcomment = {comment, userid: req.userData.id}
    let particularPost = await postModel.findById(req.params.id)
    let updatedpost = {};
   updatedpost.user = particularPost.user
   updatedpost.post = particularPost.post
   updatedpost.likes = particularPost.likes
   updatedpost.comments = particularPost.comments.concat(newcomment)

    let particular = await postModel.findByIdAndUpdate(req.params.id, {$set: updatedpost}, {new:true})
    res.json(particular)
})

router.get("/user/:id", authorizeUser, async(req,res)=> {
    const userid = req.params.id

    const userposts = await postModel.find({"user": userid})
    res.json(userposts)
})



module.exports = router;