import express from "express";

// middleware imports
import handleErrors from "./middlewares/handleErrors.js";

// routes import
import Registration_Id from "./routes/CollegeId.js";
import User from "./routes/User.js";

const app = express();

// middlewares
app.use(express.json());
app.use(handleErrors);

// routes at localhost:4000/
app.use("/api/v1", Registration_Id);
app.use("/api/v1", User);

export default app;
