import express from "express";

// middleware imports
import handleErrors from "./middlewares/handleErrors";

// routes import
import Registration_Id from "./routes/Registration_Id";

const app = express();

// middleware
app.use(express.json());
app.use(handleErrors);

// routes at localhost:4000/
app.use("/api/v1", Registration_Id);



export default app;