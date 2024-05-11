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
