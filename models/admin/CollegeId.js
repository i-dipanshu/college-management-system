import { Schema, model } from "mongoose";

const CollegeIdSchema = new Schema({
  regd: {
    type: Number,
    unique: true,
    required: [true, "Please enter a valid College Id."],
  },
  position: {
    type: String,
    enum: ["student", "teacher"],
    default: "student",
  },
});

export default model("CollegeId", CollegeIdSchema);
