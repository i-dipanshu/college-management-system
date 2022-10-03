import express from "express";

import {
  createNewStudent,
  getOneStudent,
} from "../../controllers/admin/Student.js";

const router = express.Router();

// route at api/v1/admin

router.post("/student/new", createNewStudent);

router.get("/student/:regd", getOneStudent);

export default router;
