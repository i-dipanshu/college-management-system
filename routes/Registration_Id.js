import express from "express";
import Registration_Id from "../controllers/Registration_Id";

const router = express.Router();

router.post("/admin/newId", Registration_Id);

export default router;