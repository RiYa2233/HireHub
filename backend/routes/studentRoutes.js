const express = require("express");
const Student = require("../models/studentModel");

const router = express.Router();

// Get All Students
router.get("/", async (req, res) => {

    try {

        const students = await Student.find();

        res.status(200).json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Get Student By ID
router.get("/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        res.status(200).json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Update Student
router.put("/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        res.status(200).json({
            message: "Student Updated Successfully ✅",
            student
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Test Route
router.get("/test", (req, res) => {
    res.send("Test Route Working 🚀");
});

// Register Student
router.post("/register", async (req, res) => {

    try {

        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            college: req.body.college,
            branch: req.body.branch,
            cgpa: req.body.cgpa
        });

        await student.save();

        res.status(201).json({
            message: "Student Registered Successfully ✅",
            student: student
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Delete Student
router.delete("/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        res.status(200).json({
            message: "Student Deleted Successfully ✅"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;