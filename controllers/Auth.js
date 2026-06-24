const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// sendOTP
exports.sendotp = async (req, res) => {

    try {

        //fetch email from request ki body
        const { email } = req.body;

        //check if user already exist
        const checkUserPresent = await User.findOne({ email });

        //if user already exist, then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User already registered',
            });
        }

        //generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated: ", otp);

        //check unique otp or not
        let result = await OTP.findOne({ otp: otp });
        
        //agar unique nhi he otp
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        // create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return response successful
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,   // For production, don't send OTP in response, This is okay for testing, but later remove otp, because OTP should be sent via email/SMS, not exposed in the API response...  
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// QUESTION ----
// sendOtp  ---> What package we can use for unique otp generation
// also what validation can we add in this sendOtp step




// sign up
exports.signup = async (req, res) => {

    try {
        // 1. Fetch data from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        // 2. Validate data ki non empty to nhi he
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 3. Check if passwords match (Password & Confirm password)
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match",
            });
        }

        // 4. Check whether user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }
         
        //user already exist nhi krta fhir
        // 5. Find the most recent OTP stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);

        // 6. Validate OTP
        if (recentOtp.length === 0) {
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP Not Found",
            });
        }
        // If the first block does not return, use else if... But If the first block returns/exits the function, many developers prefer a separate if because it reduces nesting... So here we will not use if else-if, but we will use two separate if block
        if (otp !== recentOtp[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // 7. Hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // 8. Create user entry in database
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // 9. Return success response
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again",
        });

    }

};



// login
exports.login = async (req, res) => {

    try {
        // get data from request body
        const { email, password } = req.body;

        // validate data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        // check if user exits or not
        const user = await User.findOne({ email })
            .populate("additionalDetails");  // you should usually also populate only if additionalDetails is a reference field in your User schema... Otherwise, you can remove .populate(...)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first",
            });
        }
        // agar user exist krta he toh
        // generate JWT, after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again",
        });
    }
}



// changePassword 
exports.changePassword = async (req, res) => {
    try {

        // get data from request body
        const {
            oldPassword,
            newPassword,
            confirmNewPassword,
        } = req.body;

        // validation
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check if new password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New Password and Confirm New Password do not match",
            });
        }

        // get user details
        const userDetails = await User.findById(req.user.id);

        // verify old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Old Password is incorrect",
            });
        }

        // hash new password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        // update password in DB
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        // return response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
            updatedUserDetails,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while changing password",
        });
    }
};   