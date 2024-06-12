const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
import dotenv from "dotenv";


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "nguyenhieu9474@gmail.com",
      pass: "nguyenthanhhieu1342002",
    },
  });
  // Compose the email message
  const mailOptions = {
    from: "BookingRestaurant.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };
  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};
const secretKey = generateSecretKey();

// function upload userImage to Cloudinary
const uploadToCloudinary = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "BookingApp/UserImage",
    });
    return result.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("Email already registered:", email); // Debugging statement
        return res.status(400).json({ message: "Email already registered" });
      }
      // Create a new user
      const newUser = new User({ name, email, password });
      // Generate and store the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");
      await newUser.save();
      console.log("New User Registered:", newUser);
      sendVerificationEmail(newUser.email, newUser.verificationToken);

      res.status(201).json({
        message:
          "Registration successful. Please check your email for verification.",
      });
    } catch (error) {
      console.log("Error during registration:", error); // Debugging statement
      res.status(500).json({ message: "Registration failed" });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const token = req.params.token;
      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      }
      user.verified = true;
      user.verificationToken = undefined;

      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Email Verificatioion Failed" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      //check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      //check if the password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { userId: user._id, admin: user.admin },
        secretKey
      );

      res.status(200).json({ token });
      // Generate a token with role information
      // const token = jwt.sign({ userId: user._id, admin: user.admin }, secretKey);

      // res.status(200).json({ token, admin });
    } catch (error) {
      res.status(500).json({ message: "Login Failed" });
    }
  },

  updateAddress: async (req, res) => {
    try {
      const userId = req.params.userId;
      const updateFields = req.body;
      let avatarUrl;

       // Check if there's an avatar to upload
       if (updateFields.avatar) {
        avatarUrl = await uploadToCloudinary(updateFields.avatar);
        updateFields.avatar = avatarUrl;
      }
      

      // Check if latitude and longitude are provided before updating location
      const locationUpdate =
        updateFields.latitude && updateFields.longitude
          ? {
              location: {
                type: "Point",
                coordinates: [updateFields.longitude, updateFields.latitude],
              },
            }
          : {};

      // Tìm và cập nhật thông tin của người dùng
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            ...updateFields,
            ...locationUpdate,
          },
        },
        { new: true } // Trả về người dùng đã được cập nhật
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  },

  getUserAddress: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user details" });
    }
  },

  changePassword: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { oldPassword, newPassword, confirmPassword } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Khong tim thay nguoi dung" });
      }

      if (user.password !== oldPassword) {
        return res.status(401).json({ message: "Nhap sai mat khau cu" });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Mat khau nhap khong hop" });
      }

      user.password = newPassword;
      await user.save();

      res.status(200).json({ message: "Thay doi mat khau thanh cong" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Loi khi thay doi mat khau" });
    }
  },

  addToFavorites: async (req, res) => {
    try {
      const { userId, restaurantId } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // check if res exists in favorite list
      if (!user.favoriteRestaurants.includes(restaurantId)) {
        user.favoriteRestaurants.push(restaurantId);
        await user.save();
        res.status(200).json({ message: "Added to favorites successfully" });
      } else {
        res.status(400).json({ message: "Restaurant already in favorites" });
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  removeFromFavorites: async (req, res) => {
    try {
      const { userId, restaurantId } = req.body;
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { favoriteRestaurants: restaurantId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Removed from favorites successfully" });
    } catch (error) {
      console.error("Error removing from favorites:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getFavoriteRestaurants: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId).populate('favoriteRestaurants');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const favoriteRestaurants = user.favoriteRestaurants;

      res.status(200).json(favoriteRestaurants);
    } catch (error) {
      console.error('Error retrieving favorite restaurants:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

// test update post man

// {
//     "name": "Updated User",
//     "avatar": "",
//     "mobileNo": "9876543210",
//     "street": "456 Updated Street",
//     "city": "Updated City",
//     "occupation": "Updated Occupation",
//     "gender": "Female",
//     "dateOfBirth": "1995-05-05",
//     "latitude": 12.971598,
//     "longitude": 77.594562
//   }
