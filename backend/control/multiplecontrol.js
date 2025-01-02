const mainImage = require("../module/mainImage");
const ImageModule = require("../module/ImageModule");
const fs = require("fs");
const path =  require("path");

const create = async ( req,res)=>{
    const {title,price  } = req.body;
    const singleImage = req.files['image'] ? req.files['image'][0] : null;
    await mainImage.create({
        title:title,
        price:price,
        image: `http://localhost:4000/${singleImage.path}`, 
    });
    const single = await mainImage.find().sort({$natural:-1}).limit(1);
    const imageFiles = req.files['images'] || [];
    const imagePaths = imageFiles.map((file) => `http://localhost:4000/${file.path}`);
    const id = single[0]._id;
    const imageData = imagePaths.map((path) => ({
        image: path,
        person_id:id,
      }));
      await ImageModule.insertMany(imageData);

      res.json({message:"Data Has Been Added..."});
};

const readimage = async(req,res)=>{
   const a = await mainImage.find();
   res.json(a);
}

const readMultipleImage = async (req,res)=>{
    const a = await ImageModule.find();
    res.json(a);
}

const delImage = async (req,res)=>{
    const imageRecord = await mainImage.findById(req.params.id);
    const filePath = path.join(__dirname, '../', imageRecord.image.replace('http://localhost:4000/', ''));
        await mainImage.findByIdAndDelete(req.params.id);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            const multiple = await ImageModule.find({ person_id: req.params.id });
            await ImageModule.deleteMany({person_id: req.params.id});
            for (const item of multiple) {
                if (item.image) {
                    const filePath = path.join(__dirname, '../', item.image.replace('http://localhost:4000/', ''));
                            
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
        }
    }    
    res.json({ message: "Your image has been deleted successfully." });
}

module.exports = {create,readimage,readMultipleImage,delImage}