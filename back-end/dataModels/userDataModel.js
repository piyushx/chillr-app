const Mongoose = require("mongoose")
const {Schema} = Mongoose;

const userSchema = new Schema({
    name: String,
    email: {
    type: String,
    unique: true
    },
    password: String,
    bio: String,
    following: Array
})

module.exports = Mongoose.model("user", userSchema);