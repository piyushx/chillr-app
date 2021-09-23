const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../dataModels/userDataModel")
const authorizeUser = require("../middleware/authorizeUser")

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
           bio: bio
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
        res.json({sucess, authToken, data });
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
    res.json({sucess, authToken, data});


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


module.exports = router;