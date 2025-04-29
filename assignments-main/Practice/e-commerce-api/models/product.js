const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
    },
    stock: {
        type: Number,
    },
    isActive: {
        type: Boolean,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);