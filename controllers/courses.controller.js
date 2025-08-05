let { courses } = require("../data/courses");
const asyncWrapper = require("../middleware/asyncWrapper");
const Course = require("../models/course.model");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

const getCourses = asyncWrapper(async (req, res) => {
  // get all courses from DB using Course model
  const query = req.query;
  const limit = query.limit || 20;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
});
const getCourse = asyncWrapper(async (req, res, next) => {
  // old way
  // const courseId = +req.params.courseId;
  // const course = courses.find((course) => course.id === courseId);
  // if (!course) {
  //   return res.status(404).json({ msg: "Not Found" });
  // }
  // res.json(course);
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    const error = appError.create("Course NOT FOUND", 404, httpStatusText.FAIL);
    return next(error);
    // return res.status(404).json({
    //   status: httpStatusText.FAIL,
    //   data: { course: "Course Not Found" },
    // });
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
});
const postCourse = asyncWrapper(async (req, res, next) => {
  // old way
  // console.log(req.body);
  // courses.push({ id: courses.length + 1, ...req.body });
  // if (!req.body.title || !req.body.price) {
  //   return res.status(400).json("Not Found");
  // }
  // res.status(201).json(courses);
  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
});
const patchCourse = asyncWrapper(async (req, res) => {
  // old way
  // const courseId = +req.params.courseId;
  // let course = courses.find((course) => course.id === courseId);
  // course = { ...course, ...req.body };
  // res.status(200).json(course);
  const courseId = req.params.courseId;
  const course = await Course.updateOne(
    { id: courseId },
    {
      $set: { ...req.body },
    },
    { new: true },
  );
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { course } });
});
const deleteCourse = asyncWrapper(async (req, res) => {
  // old way
  // const courseId = +req.params.courseId;
  // const course = courses.filter((course) => course.id !== courseId);
  // res.status(200).json({ success: true });
  await Course.deleteOne({ _id: req.params.courseId });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getCourses,
  getCourse,
  postCourse,
  patchCourse,
  deleteCourse,
};
