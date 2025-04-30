const mongoose = require("mongoose");
const product = require("./product");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
        unique: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                require: true,
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            },
        }
    ]
},
{
    timestamps: true,
})

module.exports = mongoose.model("Cart", cartSchema);