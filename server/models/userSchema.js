import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  username: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLoginDate: {
    type: Date,
    default: null,
  },
  isAdmin: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

export default User;
