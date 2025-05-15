const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: "",
    },
    version: {
        type: Number,
        default: 1,
    },
    history: [
        {
            version: Number,
            content: String,
            updatedAt: Date,
        }
    ]
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Document", documentSchema);