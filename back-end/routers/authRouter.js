const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../dataModels/userDataModel")
const authorizeUser = require("../middleware/authorizeUser")
const postModel = require("../dataModels/postDataModel")


let sucess = false

router.post("/signup", async(req,res)=> {
    const {name, email, password, bio} = req.body;

    ifUserExist = await userModel.findOne({ email: email })
    if (ifUserExist) {
        return res.json({ error: "user already exists" })
    } else {

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
           name: name,
           email: email,
           password:securePassword,
           bio: bio,
        })

        const SECRET = "This is the secret which will be changed in .env file..."
        let data = {
            user: {
                id: user.id,
                name: user.name,
                password:securePassword,
                bio: user.bio
            }
        }
        
        sucess = true
        const authToken = jwt.sign(data, SECRET);
        res.json({sucess, authToken, data: data.user });
    }
})

router.post("/login", async(req,res)=> {
    const {email, password} = req.body;

    const ifuserexists = await userModel.findOne({email: email})

    if(!ifuserexists) {
        return res.status(400).send("user doesn't exist")
    }

    const comparePassword = await bcrypt.compare(password, ifuserexists.password)

    if(!comparePassword) {
       return res.status(400).send("Invalid credentials")
    }


    const SECRET = "This is the secret which will be changed in .env file..."
    let data = {
        user: {
            id: ifuserexists.id,
            name: ifuserexists.name,
        }
    }
    sucess = true
    const authToken = jwt.sign(data, SECRET);
    res.json({sucess, authToken, data: data.user});


})

router.post("/getuser/:id", authorizeUser, async(req,res)=> {

    try {
        userID = req.params.id;

        const userData = await userModel.findById(userID).select("-Password")
        res.send(userData)

    } catch (error) {
        return res.status(500).send("Some error occured").json({ error });
    }

})

router.put("/edit", authorizeUser, async(req,res)=> {
    const {bio} = req.body
    let updatedProfile = {};
    updatedProfile.name = req.userData.name
    updatedProfile.email = req.userData.email
    updatedProfile.password = req.userData.password
    updatedProfile.bio = bio

    let updateProfile = await userModel.findByIdAndUpdate(req.userData.id, {$set: updatedProfile}, {new:true})
    res.json(updateProfile)
})

router.post("/add", authorizeUser, async(req,res)=> {
    const {userid, username} = req.body

    let particularuser = await userModel.findById(req.userData.id)
    let updatedProfile = {};

    updatedProfile.name = particularuser.name
    updatedProfile.email = particularuser.email
    updatedProfile.password = particularuser.password
    updatedProfile.bio = particularuser.bio
    updatedProfile.following = await particularuser.following.concat({userid, username})

    let updateProfile = await userModel.findByIdAndUpdate(req.userData.id, {$set: updatedProfile}, {new:true})
    res.json(updateProfile)
})


router.post("/remove", authorizeUser, async(req,res)=> {
    const {userid} = req.body

    let particularuser = await userModel.findById(req.userData.id)
    let updatedProfile = {};

    updatedProfile.name = particularuser.name
    updatedProfile.email = particularuser.email
    updatedProfile.password = particularuser.password
    updatedProfile.bio = particularuser.bio
    const newFollowers = await particularuser.following.filter((follower)=> {return follower.userid !== userid})
    updatedProfile.following = newFollowers

    let updateProfile = await userModel.findByIdAndUpdate(req.userData.id, {$set: updatedProfile}, {new:true})
    res.json(updateProfile)
})

router.post("/followers", authorizeUser, async(req,res)=> {
    let follower = req.body
    console.log(follower);
    
    let array = []
    for (let index = 0; index < follower.length; index++) {
        const element = follower[index];
        let userid = element.userid

        let posts = await postModel.find({"user": userid})

        for (let i = 0; i < posts.length; i++) {
            const element = posts[i];
            array.push(element)
        }

        
    }

    console.log(array);

    res.json({array})
})


module.exports = router;