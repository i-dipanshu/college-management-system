import { Schema, model } from "mongoose";

const StudentInfoSchema = new Schema({
  regd: {
    type: Number,
    unique: true,
    required: [true, "Invalid Regd"],
  },
  name: {
    type: String,
    required: [true, "Invalid Name"],
  },
  semester: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
    required: [true, "Invalid semester"],
  },
  branch: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  result: [
    {
      semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: [true, "Invalid semester"],
      },
      grades: [
        {
          subject: {
            type: String,
            required: true,
          },
          grade: {
            type: String,
            enum: ["A", "B", "C", "D", "E"],
            required: true,
          },
        },
      ],
    },
  ],
  fees: [
    {
      semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: [true, "Invalid semester"],
      },
      fee: [
        {
          academic: {
            paid: {
              type: Number,
              required: true,
              default: 0,
            },
            total: {
              type: Number,
              required: [true, "Enter a valid total academic fee"],
            },
          },
          hostel: {
            paid: {
              type: Number,
              required: true,
              default: 0,
            },
            total: {
              type: Number,
              required: [true, "Enter a valid total hostel fee"],
            },
          },
          others: {
            paid: {
              type: Number,
              required: true,
              default: 0,
            },
            total: {
              type: Number,
              required: [true, "Enter a valid total other fee"],
            },
          },
        },
      ],
    },
  ],
});

export default model("StudentInfo", StudentInfoSchema);
