import { Schema, model } from "mongoose";
import validator from "validator";

const UserSchema = new Schema({
  Reg_Id: {
    type: Number,
    required: [true, "Please enter a valid Registration Id."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter a valid Email."],
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  userName: {
    type: String,
    unique: true,
    required: [true, "Please enter a valid user name."],
    minLength: [3, "Name must be at least 3 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password."],
    minLength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  student_id: { type: Schema.ObjectId, ref: "Registration_Id", required: true },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

export default model("User", UserSchema);
