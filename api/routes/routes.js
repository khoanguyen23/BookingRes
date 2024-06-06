// routes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const RestaurantController = require("../controllers/restaurantController");
const OrderController = require("../controllers/orderController");
const FeatureController = require("../controllers/featureController");
const CategoryController = require("../controllers/categoryController");
const GeospatialController = require("../controllers/geospatialController");
const ChatController = require("../controllers/chatController");


// routes.js admin
const AdminController = require("../controllers/adminController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", UserController.register);

router.get("/verify/:token", UserController.verifyEmail);
router.post("/login", UserController.login);
router.put("/address/:userId", UserController.updateAddress);
router.get("/address/:userId", UserController.getUserAddress);
router.put("/change-password/:userId", UserController.changePassword);

// Restaurant Routes
router.post("/restaurants", RestaurantController.createRestaurant);
router.get("/restaurants", RestaurantController.getAllRestaurants);
router.get("/restaurants/:restaurantId", RestaurantController.getRestaurantsById);
router.get("/restaurants/categories/:categoryId", RestaurantController.getRestaurantsByCategory);
router.get("/restaurants/search/:keyword", RestaurantController.searchRestaurants);
router.post("/restaurants/:restaurantId/suggestions", RestaurantController.addSuggestion); // New route for adding suggestions
router.post("/restaurants/:restaurantId/suggestions/:suggestionId/items", RestaurantController.addComboOrMeal);


// Order Routes
router.post("/api/orders", OrderController.placeOrder);
router.get("/api/orders/:userId", OrderController.getOrdersByUser);
router.get('/api/orders', OrderController.getAllOrders);
router.put('/api/orders/:orderId', OrderController.updateOrder);

// Feature Routes
router.get("/api/featured", FeatureController.getFeatured);
router.post("/api/featured", FeatureController.createFeatured);
router.put("/api/featured/:id", FeatureController.updateFeatured);

// Category Routes
router.post("/categories", CategoryController.createCategory);
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories
 */
router.get("/categories", CategoryController.getAllCategories);

// Map 
router.get("/nearby-restaurants", GeospatialController.getNearbyRestaurants);
router.get("/intersect-restaurants", GeospatialController.getIntersectbyRestaurants);
router.get('/restaurants-in-city', GeospatialController.getRestaurantsByPolygon);
router.get('/restaurants-in-circle', GeospatialController.getRestaurantsInCircle);

// Favorite 
router.post('/addToFavorites', UserController.addToFavorites);
router.post('/removeFromFavorites', UserController.removeFromFavorites);
router.get('/:userId/favoriteRestaurants', UserController.getFavoriteRestaurants);

// admin routes
router.get("/admin", AdminController.getAllUsers);
router.delete("/admin/:userId", AdminController.deleteUser);
router.put("/users/:userId", AdminController.editUser);

router.delete("/admin/restaurants/:restaurantId", AdminController.deleteRestaurant);
router.put('/admin/restaurants/:restaurantId', AdminController.updateRestaurant);

// chat routes 
router.get('/api/chat', ChatController.getAllChats);
router.post('/api/chat', ChatController.postChatMessage)
router.get('/api/chat/:userId', ChatController.getUserChats)

module.exports = router;
