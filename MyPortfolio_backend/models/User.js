import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    require: true,
    trim: true,
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("users", UserSchema);
export default User;
