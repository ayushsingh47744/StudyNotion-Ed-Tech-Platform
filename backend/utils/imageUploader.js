const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async ( file, folder, height, quality ) => {

    const options = { folder };
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    
    options.resource_type = "auto";
    return await cloudinary.uploader.upload( file.tempFilePath, options );
};

// const cloudinary = require("cloudinary").v2;
// const path = require("path");

// exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
//     const options = {};
//     options.resource_type = "auto";
    
//     const absolutePath = path.resolve(file.tempFilePath);
    
//     try {
//         const result = await cloudinary.uploader.upload(absolutePath, options);
//         return result;
//     } catch(e) {
//         console.log("FULL CLOUDINARY ERROR:", JSON.stringify(e, null, 2));
//         throw e;
//     }
// };