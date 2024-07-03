const User = require("../models/user");


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

      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json({ message: "Xoá thành công", deletedUser: user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  editUser: async (req, res) => {
    const { userId } = req.params; // Lấy userId từ params
    const updatedData = req.body; // Lấy dữ liệu cần cập nhật từ body

    try {
      // Tìm và cập nhật user bằng id
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true, // Trả về tài liệu đã được cập nhật
        runValidators: true, // Chạy validators để đảm bảo dữ liệu hợp lệ
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      res.status(200).json({ message: "Chỉnh sửa thành công", updatedUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};

module.exports = adminController;
