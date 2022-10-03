import { Schema, model } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema({
  regd: {
    type: Number,
    unique: true,
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
  college_id: { type: Schema.ObjectId, ref: "CollegeId", required: true },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

// methods

// this function runs before saving the document to database
UserSchema.pre("save", async function (next) {
  // condition to avoid hashing the already hashed password during updating the fields
  if (!this.isModified("password")) {
    next();
  }

  // hashing the password
  this.password = await bcryptjs.hash(this.password, 10);
});

// comparing password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// generating jwt
UserSchema.methods.createToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export default model("User", UserSchema);
