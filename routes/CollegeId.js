import express from "express";
import { createNewRegID, deleteRegId } from "../controllers/CollegeId.js";

const router = express.Router();

router.post("/admin/id/new", createNewRegID);
router.delete("/admin/id/delete", deleteRegId);

export default router;