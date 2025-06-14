const Package = require('../models/Package');

const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packages', error });
    }
};

module.exports = {
    getAllPackages
};