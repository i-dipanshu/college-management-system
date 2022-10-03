import express from "express";
import cookieParser from "cookie-parser";
// middleware imports
import handleErrors from "./middlewares/handleErrors.js";

// routes import
import Registration_Id from "./routes/CollegeId.js";
import User from "./routes/User.js";
import Student from "./routes/admin/Student.js";
import { isRole, isUserAuthenticated } from "./middlewares/Auth.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(handleErrors);

// routes at localhost:4000/
app.use("/api/v1", Registration_Id);
app.use("/api/v1", User);

// strictly for admins
app.use("/api/v1/admin", isUserAuthenticated, isRole("admin"), Student);

export default app;
