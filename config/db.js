import { connect } from "mongoose";

const connectDB = () => connect(process.env.DB_URI).then((data) => {
    console.log(`Database is successfully connected and running at ${data.connection.host}`);
});

export default connectDB;