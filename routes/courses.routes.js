const express = require("express");
const courseController = require("../controllers/courses.controller");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middleware/allowedTo");

// Existing routes - rewritten carefully
router
  .get("/", courseController.getCourses)
  .post("/", verifyToken, courseController.postCourse);
// Parameterized routes - written separately
router
  .get("/:courseId", courseController.getCourse)
  .patch("/:courseId", courseController.patchCourse)
  .delete(
    "/:courseId",
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    courseController.deleteCourse,
  );

module.exports = router;
