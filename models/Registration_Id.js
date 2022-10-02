import { Schema, model } from "mongoose";

const Id_Schema = new Schema({
    Reg_no: {
        type: Number,
        required: [true, "Please enter a valid Registration Number."]
    }
});

export default model("Registration_Id", Id_Schema);
