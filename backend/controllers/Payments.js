const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mailTemplates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");


//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {

    //get courses and userId
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.json({
            success: false,
            message: "Please provide valid course ID",
        });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(200).json({
                    success: false,
                    message: "Could not find the course",
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled",
                });
            }

            totalAmount += course.price;
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        return res.status(200).json({
            success: true,
            message: paymentResponse,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Could not initiate order",
        });
    }
};


// verify Signature of Razorpay and Server
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(400).json({
            success: false,
            message: "Payment Failed, Missing Details",
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // enroll student in all courses
        await enrollStudents(courses, userId, res);
        return res.status(200).json({
            success: true,
            message: "Payment Verified",
        });
    }

    return res.status(400).json({
        success: false,
        message: "Payment Failed",
    });
};

// helper function
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data for Courses or UserId",
        });
    }

    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true },
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not Found",
                });
            }

            await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                { $push: { courses: courseId } },
                { new: true },
            );

            await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                "Congratulations, you are onboarded into new StudyNotion Course",
            );
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the details",
        });
    }

    try {
        const enrolledStudent = await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            `Payment Successful. Order ID: ${orderId}, Payment ID: ${paymentId}, Amount: ₹${amount / 100}`,
        );

        return res.status(200).json({
            success: true,
            message: "Payment success email sent",
        });
    } catch (error) {
        console.log("Error in sending mail", error);
        return res.status(500).json({
            success: false,
            message: "Could not send email",
        });
    }
};