const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// createCategory handler function
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);
        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
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

// showAllCategories handler function
exports.showAllCategories = async (req, res) => {
    try {
        const allCategory = await Category.find({})
            .populate({
                path: "courses",
                populate: {
                    path: "ratingAndReviews",
                },
            })
            .exec();
        return res.status(200).json({
            success: true,
            message: "All categories returned successfully",
            data: allCategory,
        });
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                populate: {
                    path: "ratingAndReviews",
                },
            })
            .exec();

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
            });
        }

        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        })
            .populate({
                path: "courses",
                populate: {
                    path: "ratingAndReviews",
                },
            })
            .exec();

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
