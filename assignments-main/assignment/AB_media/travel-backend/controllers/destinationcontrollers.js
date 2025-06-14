const Destination = require('../models/Destination');

const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching destinations', error });
    }
}

module.exports = {
    getAllDestinations
};