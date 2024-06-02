const Restaurant = require("../models/restaurant");
const Category = require("../models/category");

module.exports = {
  createRestaurant: async (req, res) => {
    const {
      name,
      description,
      image,
      location: { coordinates }, // Extract coordinates from the location object
      address,
      rating,
      type,
      promotions,
      menu,
      album,
      openingHours,
      bookingHours,
    } = req.body;

    try {
      // Check if the category exists
      const category = await Category.findById(type);
      if (!category) {
        return res.status(400).json({ message: "Loại nhà hàng không hợp lệ" });
      }

      const newRestaurant = new Restaurant({
        name,
        description,
        image,
        location: {
          type: "Point", // Set the location type as 'Point'
          coordinates, // Use the extracted coordinates
        },
        address,
        rating,
        type,
        promotions,
        menu,
        album,
        openingHours,
        bookingHours,
      });

      const savedRestaurant = await newRestaurant.save();
      res.status(201).json(savedRestaurant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.find().populate("type"); // Sử dụng populate để lấy thông tin từ bảng Category
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getRestaurantsByCategory: async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
      // Lấy danh sách nhà hàng dựa trên ID của category
      const restaurants = await Restaurant.find({ type: categoryId });
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  searchRestaurants: async (req, res) => {
    const { keyword } = req.params;

    try {
      const restaurants = await Restaurant.find({
        name: { $regex: new RegExp(keyword, "i") },
      }).populate("type");

      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getRestaurantsById: async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const restaurant = await Restaurant.findById(restaurantId);

      if (!restaurant) {
        return res.status(404).json({ message: "Khong tim thay nha hang" });
      }

      res.status(200).json({ message: "thanh cong", restaurant });
    } catch (error) {
      console.error("loi khong lay duoc data nha hang", error);
      res.status(500).json({ message: "loi server" });
    }
  },
};
