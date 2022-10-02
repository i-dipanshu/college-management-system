import { Schema, model} from 'mongoose';

const UserSchema = new Schema({
  Reg_no: {
    type: Number,
    unique: true,
    required: [true, "Please enter a valid Registration Id."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please a valid user email."],
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  userName: {
    type: String,
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
  resetPasswordToken: String,
  resetPasswordExpire: String
});

export default model("User", UserSchema);
