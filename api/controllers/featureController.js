const Featured = require("../models/featured");

module.exports = {
    getFeatured: async (req, res) => {
        try {
            const featuredData = await Featured.find().populate("restaurants"); // Sử dụng populate để lấy thông tin từ bảng liên quan (restaurants)
            res.json(featuredData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createFeatured: async (req, res) => {
        const { title,subTitle,author, name, description,image, restaurants } = req.body;

        try {
            const newFeatured = await Featured.create({
                title,
                subTitle,
                author,
                name,
                description,
                image,
                restaurants,
            });

            res.status(201).json(newFeatured);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};
