import express from "express";


const app = express();

// middleware
app.use(express.json());


app.use("/user", userRoute)


export default app;