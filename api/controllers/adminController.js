const User = require("../models/user");
const Restaurant = require("../models/restaurant");
const Category = require("../models/category");

const adminController = {
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            // const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: "không tìm thấy người dùng" });
            }
            res.status(200).json({ message: "Xoá thành công", deletedUser: user });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    editUser: async (req, res) => {
        const { userId } = req.params;
        const { username, email, role } = req.body;

        try {
            // Find the user by ID
            const user = await User.findById(userId);

            // If the user doesn't exist, return a 404 response
            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy người dùng" });
            }

            // Update user properties if provided in the request body
            if (username) {
                user.username = username;
            }

            if (email) {
                user.email = email;
            }

            if (role) {
                user.role = role;
            }

            // Save the updated user
            await user.save();

            res.status(200).json({ message: "Chỉnh sửa thành công", updatedUser: user });
        } catch (err) {
            res.status(500).json(err);
        }
    },



    // Restaurants
    deleteRestaurant: async (req, res) => {
        const restaurantId = req.params.restaurantId;
        try {
            const restaurant = await Restaurant.findById(restaurantId);
            // const user = await User.findByIdAndDelete(req.params.userId);
            if (!restaurant) {
                return res.status(404).json({ message: "Không tìm thấy nhà hàng" });
            }

            res.status(200).json({ message: "Xoá nhà hàng thành công", deletedRestaurant: restaurant });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};


module.exports = adminController;