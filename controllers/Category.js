const Category = require("../models/Category");
const { Mongoose } = require("mongoose");


function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};


// createCategory handler function
exports.createCategory = async (req, res) => {
    try {
        // fetch data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        console.log(categoryDetails);

        // return response
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


// getAllCategory or showAllCategory handler function
exports.showAllCategories = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: "All categories returned successfully",
            allCategory,
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

        //get categoryId
        const {categoryId} = req.body;

        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
            .populate("courses")
            .exec();

        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:"Data Not Found",
            });
        }

        //get courses for different categories
        const differentCategories = await Category.find({
            _id: {$ne: categoryId},
        })
        .populate("courses")
        .exec();

        //get top selling courses.......................

        //return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
            },
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}