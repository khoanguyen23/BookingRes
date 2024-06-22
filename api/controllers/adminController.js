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
  
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }
  
      // Delete the user from the database
      await User.findByIdAndDelete(req.params.userId);
  
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

      res
        .status(200)
        .json({ message: "Chỉnh sửa thành công", updatedUser: user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  deleteRestaurant: async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: "Không tìm thấy nhà hàng" });
      }

      // Thực hiện xóa nhà hàng
      await Restaurant.findByIdAndDelete(restaurantId);

      res
        .status(200)
        .json({
          message: "Xóa nhà hàng thành công",
          deletedRestaurant: restaurant,
        });
    } catch (error) {
      console.error("Lỗi không thể xóa nhà hàng", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  },

    updateRestaurant: async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const {
        name,
        description,
        image,
        location,
        address,
        rating,
        type,
        menu,
        openingHours,
        bookingHours,
      } = req.body;

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: "Không tìm thấy nhà hàng" });
      }
      if (name) restaurant.name = name;
      if (description) restaurant.description = description;
      if (image) restaurant.image = image;
      if (location) restaurant.location = location;
      if (address) restaurant.address = address;
      if (rating) restaurant.rating = rating;
      if (type) restaurant.type = type;
      if (menu) restaurant.menu = menu;
      if (openingHours) restaurant.openingHours = openingHours;
      if (bookingHours) restaurant.bookingHours = bookingHours;
      await restaurant.save();

      res
        .status(200)
        .json({
          message: "Cập nhật nhà hàng thành công",
          updatedRestaurant: restaurant,
        });
    } catch (error) {
      console.error("Lỗi không thể cập nhật nhà hàng", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  },
};

module.exports = adminController;
