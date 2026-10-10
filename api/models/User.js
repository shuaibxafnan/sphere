const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: false
        },
        profilePic: {
            type: String,
            default: ""
        },
        userdesc: {
            type: String,
            required: false
        },
        userInstagram: {
            type: String,
            required: false
        },
        userLinkedin: {
            type: String,
            required: false
        },
        userFacebook: {
            type: String,
            required: false
        },
        userTwitter: {
            type: String,
            required: false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)