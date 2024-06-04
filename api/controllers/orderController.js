// controllers/orderController.js
const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const User = require("../models/user");

module.exports = {
    placeOrder: async (req, res) => {
        try {
            const { restaurantId, userId, adults, children, date, selectedHour, note, selectedItem } = req.body;
    
            const restaurant = await Restaurant.findById(restaurantId);
            const user = await User.findById(userId);
    
            if (!restaurant || !user) {
                return res.status(404).json({ message: 'Restaurant or user not found' });
            }
    
            const order = new Order({
                restaurant: restaurantId,
                user: userId,
                adults,
                children,
                date,
                selectedHour,
                note,
                status: "Chờ xác nhận",
                services: "Đặt chỗ",
            });

            if (selectedItem) {
                order.orderItems.push({ selectedItem });
            }
    
            await order.save();
    
            // lọc bookingHours đã đặt 
            const updatedBookingHours = restaurant.bookingHours.filter(hour => hour !== selectedHour);
            restaurant.bookingHours = updatedBookingHours;
    
            await restaurant.save();
    
            res.status(201).json({ message: 'Order placed successfully', order });
        } catch (error) {
            console.error('Error placing order:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    getOrdersByUser: async (req, res) => {
        try {
            const userId = req.params.userId;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const orders = await Order.find({ user: userId });

            res.status(200).json({ message: 'lay du lieu order thanh cong', orders });
        } catch (error) {
            console.error('Error retrieving orders by user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json({ message: 'Lay thanh cong', orders });
        } catch (error) {
            console.error('Loi khi lay orders:', error);
            res.status(500).json({ message: 'loi mang' });
        }
    },

    updateOrder: async (req, res) => {
        try {
          const { orderId } = req.params;
          const updatedFields = req.body;
    
          const order = await Order.findById(orderId);
    
          if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
    
          Object.keys(updatedFields).forEach((field) => {
            order[field] = updatedFields[field];
          });
    
          await order.save();
    
          res.status(200).json({ message: 'cập nhật thành công', order });
        } catch (error) {
          console.error('lỗi:', error);
          res.status(500).json({ message: 'lỗi mạng' });
        }
    },
};
