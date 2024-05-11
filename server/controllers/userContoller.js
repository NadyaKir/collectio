import User from "../models/userSchema.js";

export const getUsers = async (_, res) => {
  try {
    const users = await User.find();
    const formattedUsers = users.map((user) => {
      return {
        ...user.toJSON(),
        registrationDate: user.registrationDate.toLocaleString(),
        lastLoginDate: user.lastLoginDate
          ? user.lastLoginDate.toLocaleString()
          : null,
      };
    });

    res.json(formattedUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const setRole = async (req, res) => {
  const { userId, isAdmin } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = isAdmin;
    await user.save();

    res.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Failed to update user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
