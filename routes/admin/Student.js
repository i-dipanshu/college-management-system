import express from "express";

import {
  createNewStudent,
  getAllStudent,
  getOneStudent,
} from "../../controllers/admin/Student.js";

const router = express.Router();

// route at api/v1/admin

router.post("/student/new", createNewStudent);

router.get("/student/:regd", getOneStudent);

router.get("/student/all", getAllStudent);

export default router;
