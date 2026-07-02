const Section = require("../models/Section");
const Course = require("../models/Course");

// createSection handler function
exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // create section
    const newSection = await Section.create({ sectionName });

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true },
    )
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create Section, please try again",
      error: error.message,
    });
  }
};

// updateSection handler function
exports.updateSection = async (req, res) => {
  try {
    // data input
    const { sectionName, sectionId } = req.body;

    // data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true },
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
      data: section, // THIS ONE FROM MYSIDE.............
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update Section, please try again",
      error: error.message,
    });
  }
};

// deleteSection handler function
exports.deleteSection = async (req, res) => {
  try {
    // get ID
    // const { sectionId } = req.params;
    const { sectionId } = req.body; // body ke sath chl rha hai ... params ke sath code complete krke check krna hai

    // use findByIdAndDelete
    await Section.findByIdAndDelete(sectionId);

    // WE NEED TO DELETE THE ENTRY FROM THE COURSE SCHEMA........ Check at testing time.................

    // return response
    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete Section, please try again",
      error: error.message,
    });
  }
};

// DeleteSection needs this improvement --->
// When you delete a section:
// await Section.findByIdAndDelete(sectionId);
// the section document gets deleted, but its ObjectId still remains inside the Course's courseContent array...

// A better production implementation would:
// 1. Find the course containing this section.
// 2. Remove the section id from courseContent.
// 3. Delete the section.

// Something like:

// await Course.findByIdAndUpdate(
//     courseId,
//     {
//         $pull: {
//             courseContent: sectionId,
//         },
//     }
// );
// await Section.findByIdAndDelete(sectionId);
