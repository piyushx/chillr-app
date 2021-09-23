const Mongoose = require("mongoose")
const {Schema} = Mongoose;

const postSchema = new Schema({
    user:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    post: String,
    likes: Array,
    comments: Array
})

module.exports = Mongoose.model("post", postSchema);