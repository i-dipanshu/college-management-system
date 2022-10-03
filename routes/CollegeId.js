import express from "express";
import { createNewRegID, deleteRegId } from "../controllers/CollegeId.js";

const router = express.Router();

// route at api/v1/admin
router.post("/id/new", createNewRegID);
router.delete("/id/delete", deleteRegId);

export default router;
