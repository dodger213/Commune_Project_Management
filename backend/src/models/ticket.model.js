const { Schema, model } = require("mongoose");

const ticketSchema = Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
    },
    budget: {
        type: Number,
    },
    developer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    githubLink: {
        type: String,
    },
    liveDemo: {
        type: String,
    },
    status: {
        type: String,
        default: 'Created'
    },
    reviewRequire: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true

    });

module.exports = model("Ticket", ticketSchema);
