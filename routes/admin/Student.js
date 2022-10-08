import express from "express";

import {
  createNewStudent,
  deleteOneStudent,
  getAllStudents,
  getOneStudent,
} from "../../controllers/admin/Student.js";

const router = express.Router();

// route at api/v1/admin

router.post("/student/new", createNewStudent);

router.get("/student/all", getAllStudents);

router.get("/student/:regd", getOneStudent);

router.delete("/student/:regd", deleteOneStudent);

export default router;
