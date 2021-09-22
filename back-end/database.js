const Mongoose = require("mongoose");

const connectDB = () => {
    Mongoose.connect("mongodb://localhost:27017/chillrDB", {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {
        console.log("DB connected successfully");
    })
}

module.exports = connectDB;