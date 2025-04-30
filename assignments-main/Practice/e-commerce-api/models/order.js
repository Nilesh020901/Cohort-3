const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                typ: Number,
                require: true,
            }
        }
    ],
    status: {
        type: String,
        default: "Processing"
    },
    totalAmount: {
        type: Number,
        require: true,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);