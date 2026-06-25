const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// create SubSection handler function
exports.createSubSection = async (req, res) => {
    try {

        // fetch data from req body
        const { sectionId, title, timeDuration, description } = req.body;

        // extract file/video
        const video = req.files.videoFile;

        // validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary( video, process.env.FOLDER_NAME );

        // create subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        // update section with this sub-section objectId
        const updatedSection = await Section.findByIdAndUpdate( { _id: sectionId },
                                                    {
                                                        $push: {
                                                            subSection: subSectionDetails._id,
                                                        },
                                                    },
                                                    { new: true }
                                                ).populate("subSection");


        // return response
        return res.status(200).json({
            success: true,
            message: "Sub-Section Created Successfully",
            updatedSection,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


// updateSubSection handler function
exports.updateSubSection = async (req, res) => {
    try {

        // data input
        const {
            subSectionId,
            title,
            description,
            timeDuration,
        } = req.body;

        // validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required",
            });
        }

        // update data
        const subSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title,
                description,
                timeDuration,
            },
            { new: true }
        );

        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection Updated Successfully",
            data: subSection,    // this one from myside.........................
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to update SubSection, please try again",
            error: error.message,
        });

    }

};



// deleteSubSection handler function
exports.deleteSubSection = async (req, res) => {
    try {

        // get ID
        const { subSectionId } = req.params;

        // use findByIdAndDelete
        await SubSection.findByIdAndDelete(subSectionId);

        // WE NEED TO DELETE THE ENTRY FROM THE SECTION SCHEMA........ Check at testing time.................

        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection Deleted Successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to delete SubSection, please try again",
            error: error.message,
        });

    }
};