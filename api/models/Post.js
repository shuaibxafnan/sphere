const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        story: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        userimg: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        userdesc: {
            type: String,
            required: false,
        },
        fb: {
            type: String,
            required: false,
        },
        insta: {
            type: String,
            required: false,
        },
        linkedin: {
            type: String,
            required: false,
        },
        twitter: {
            type: String,
            required: false,
        },
        categories: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema)