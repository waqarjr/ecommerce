const usermodel = require('../module/module');
const bcrypt =  require('bcrypt');
var jwt = require('jsonwebtoken');
const ImageModule = require('../module/ImageModule');
const path = require('path');
const fs = require("fs");

// const home = async (req,res)=>{
    // const password = await bcrypt.hash("Salman Ahmad",10);
    // const password1 = bcrypt.compareSync("Salman Ahmad",password);
    // res.send(password1);
//     res.render('index');
// }


const upload = async (req,res)=>{
    const newImage = await ImageModule.create({
        image: `http://localhost:4000/${req.file.path}`, 
    });
    res.json({message:"Image Have been Inserted Sucessfully...."})
}

const readImage = async (req,res)=>{
    const imagedata =  await ImageModule.find();
    res.json(imagedata);
}

const delimage = async (req,res)=>{
    const imageRecord = await ImageModule.findById(req.params.id);
    if(!imageRecord){
        res.json({message:"Image not fouund"});
    }
    const filePath = path.join(__dirname, '../', imageRecord.image.replace('http://localhost:4000/', ''));

    await ImageModule.findByIdAndDelete(req.params.id);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        res.json({ message: "Your image has been deleted successfully." });

}
const editImage = async(req,res)=>{
    const edit = await ImageModule.findOne({_id:req.params.id})
    res.json(edit);
}


const editNewImage = async (req,res)=>{
    const imageRecord =  await ImageModule.findById(req.params.id);

    const edit = await ImageModule.updateOne({_id:req.params.id},{$set:{image:`http://localhost:4000/${req.file.path}`}});

    if(edit){
        const filePath = path.join(__dirname, '../', imageRecord.image.replace('http://localhost:4000/', ''));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
    res.json({ message: "Your image has been deleted successfully...." });
}


const creatdata = async (req,res)=>{
    let {name,email,password} = req.body;
    const user = await usermodel.findOne({email:email});
    if(!user)
    {
        await usermodel.create({
            name:name,
            email:email,
            password:password,
        });
        res.json({ message: "Data Has Been Inserted Successfully" });
    }
    else
    {
        res.json({ message: "Data not insert..." });
    }
    
}

const cooky = (req,res)=>{
    res.cookie("name","Salman Ahmad");
    res.send("Cookie is done");
}


const cookishow = (req,res)=>{
    res.send(req.cookies.name);
}

const index = (req,res)=>{

// res.render('index');
const a = jwt.verify(req.cookies.token,"secret");
// res.send(req.cookies.token);
res.send(a);
}


const showdata = async (req,res)=>{
    const data = await usermodel.find();
    res.render('create',{data});
}

const signin =  (req , res)=>{
    res.render('signin');
}

const create = (req,res)=>{
    res.render('create');
    }


const cookidel = (req,res)=>{
    res.cookie("name","");
    res.send("Cookie has been deleted");
}    

const login = async (req,res)=>{
let {email,password} = req.body;
const user = await usermodel.findOne({email:email});
if(user)
{
    const log = bcrypt.compareSync(password,user.password);
    if(log)
    {
        
        var token = jwt.sign({ email:email }, 'secret');
        res.cookie('token',token);
        res.send("User Logged in successfully....");
    }
    else
    {
        res.send("Your Password in invalid");
    }
}
else
{
    res.send("Your Email is invalid");
}

} 

const logout = (req,res)=>{
res.cookie('token','');
res.redirect('/signin');
}

function isLoggedin(req,res,next)
{
    if(!req.cookies.token || req.cookies.token=="")
    {
        res.send("Please Login Your Account");
    }
    next();
}    

const showAlldata = async (req,res)=>{
    const abc = await usermodel.find();
    res.json(abc);
}
const deleteData = async (req,res)=>{
    const del = await usermodel.deleteOne({_id:req.params.id});
    res.json({message:"Data Has Been Deleted..."});
}

const edit = async(req,res)=>{
    const edit = await usermodel.findOne({_id:req.params.id});
    res.json(edit);    
}

const update = async(req,res)=>{
    const { name, email } = req.body;
    await usermodel.updateOne({_id:req.params.id},{$set:{name:name,email:email}});
    res.json({message:"Your data Have been Update Sucessfully...."});
} 

module.exports =  {editNewImage,delimage,readImage,edit,update,upload,deleteData,index,create,creatdata,signin,showdata,login,cooky,cookishow,cookidel,logout,isLoggedin,showAlldata,editImage };
