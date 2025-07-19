
import cloudinary from "cloudinary"

const cloud = cloudinary.v2

cloud.config({
    secure: true
})

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImageToCloud = async (imagePath: string) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloud.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;

    } catch (error) {
      throw new Error(`Upload to cloudinary failed ${error}`)
    }
};