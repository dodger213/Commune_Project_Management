const { Schema, model } = require("mongoose");

const projectSchema = Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
    },
    githubLink: {
        type: String,
    },
    liveDemo: {
        type: String,
    },
    status: {
        type: String,
    },
    developers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    stars: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    disLikes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    pms: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    avatar: {
        type: String,
        default: 'default'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model("Project", projectSchema);
