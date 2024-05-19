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

export const blockUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!userIds) {
      return res.status(400).json({ message: "No users IDs provided" });
    }

    const blockedUsers = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isBlocked: true } }
    );

    res
      .status(200)
      .json({ message: "Users blocked successfully", blockedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error blocking users" });
  }
};

export const unblockUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!userIds) {
      return res.status(400).json({ message: "No users IDs provided" });
    }

    const unblockedUsers = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isBlocked: false } }
    );

    res
      .status(200)
      .json({ message: "Users unblocked successfully", unblockedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error unblocking users" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!userIds) {
      return res.status(400).json({ message: "No user IDs provided" });
    }

    const deletedUsers = await User.deleteMany({ _id: { $in: userIds } });

    res
      .status(200)
      .json({ message: "Users deleted successfully", deletedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting users" });
  }
};
