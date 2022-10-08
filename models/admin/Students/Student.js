import { Schema, model } from "mongoose";

const StudentInfoSchema = new Schema({
  regd: {
    type: String,
    unique: true,
    required: [true, "Invalid Regd"],
  },
  name: {
    type: String,
    required: [true, "Invalid Name"],
  },
  semester: {
    type: String,
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
        type: String,
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
        type: String,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: [true, "Invalid semester"],
      },
      fee: [
        {
          academic: {
            paid: {
              type: String,
              required: true,
              default: 0,
            },
            total: {
              type: String,
              required: [true, "Enter a valid total academic fee"],
            },
          },
          hostel: {
            paid: {
              type: String,
              required: true,
              default: 0,
            },
            total: {
              type: String,
              required: [true, "Enter a valid total hostel fee"],
            },
          },
          others: {
            paid: {
              type: String,
              required: true,
              default: 0,
            },
            total: {
              type: String,
              required: [true, "Enter a valid total other fee"],
            },
          },
        },
      ],
    },
  ],
});

export default model("StudentInfo", StudentInfoSchema);
