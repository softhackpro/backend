const User = require ("../models/userModel");
const Gallery = require ("../models/gallery");
const nodemailer = require('nodemailer');
const fs = require('fs');
const getHome = async (req, res)=>{
    try {
        const carousel = await Gallery.find({Type:'swiper'}).sort({_id:-1}).limit(5).select('Photo _id')
        const Blogs = await Gallery.find({Type:'events'}).sort({_id:-1}).limit(10).select('Photo _id Title')
        const Notify = await Gallery.find({Type:'notice'}).sort({_id:-1}).limit(10).select('_id Title createdAt')
        const Pages = await Gallery.find({Type:'page'}).sort({_id:-1}).limit(6).select('_id Title')
        const chairman = await Gallery.findOne({Type:'pen'}).sort({_id:-1})
        const data = {carousel, Blogs, Notify, Pages, chairman}
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
}
const mailotp = async(req, res) => {
    
    const {userskaOTP} = req.body;
    const otp = Math.floor(100000 + Math.random()*900000).toString(); 
    console.log(userskaOTP);
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user:'allindiadusadhpariwar.org@gmail.com',
        pass: 'kfeo oatx prkq gttd'
    },
});

const sendOTPEmail = (userskaOTP, otp) =>{
    
    const mailOptions = {
        from:'AIDP',
        to: userskaOTP,
        subject : 'Your OTP For AIDP',
        text:`Your One Time Verification Code is ${otp}. Please don't share it with anyone. Thank You for joining with AIDP Family.`,
    };
    transporter.sendMail(mailOptions, (error, info)=> {
       if(error){
        console.log('error sending', error);
       }else{
        console.log('email sent');
       }
    });
};
sendOTPEmail(userskaOTP, otp);
res.json(otp);
}
const getcontact = async(req, res) => {
    const {user} = req.body;
    const reciever = 'allindiadusadhpariwar.org@gmail.com'
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user:'allindiadusadhpariwar.org@gmail.com',
        pass: 'kfeo oatx prkq gttd'
    },
});

const sendOTPEmail = (reciever, user) =>{
    
    const mailOptions = {
        from:'AIDP',
        to: reciever,
        subject : `Contact From ${user.fullname}`,
        text: `${user.message} sent by ${user.fullname} email: ${user.email} and phone no. ${user.phone} `,
    };
    transporter.sendMail(mailOptions, (error, info)=> {
       if(error){
        console.log('error sending', error);
       }else{
        console.log('email sent');
       }
    });
};
sendOTPEmail(reciever, user);
res.json({message: "Message sent"});
}
const addpost = async(req, res) =>{
    const {path} = req.file;
    const {Title, Type, YouTube, About} = req.body;
    
    
    
    try {
        if(Type === 'events'){
            const getVideoId = (YouTube) => {
                const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
                const match = YouTube.match(regex);
                return match ? match[1] : null;
              };
              const videoId = getVideoId(YouTube);
              if (!videoId) {
                console.log("invalid url");
                
              }
            const GalleryData = new Gallery({
                Title:Title,
                Type:Type,
                Photo:path,
                YouTube: videoId,
                About:About
            })
            await GalleryData.save();
            res.status(201).json({message: "Event Added successfully"});
        }else if(Type === 'gallery'){
            const GalleryData = new Gallery({
                Title:Title,
                Type:Type,
                Photo:path
            })
            await GalleryData.save();
            res.status(201).json({message: "Phot Added successfully"});
        }
        else if(Type === 'swiper'){
            const GalleryData = new Gallery({
                Title:Title,
                Type:Type,
                Photo:path
            })
            await GalleryData.save();
            res.status(201).json({message: "Phot Added successfully"});
        }
        else if(Type === 'certificates'){
            const GalleryData = new Gallery({
                Title:Title,
                Type:Type,
                Photo:path,
                About:About
            })
            await GalleryData.save();
            res.status(201).json({message: "Certificate Added successfully"});
        }
        else if(Type === 'pen'){
            const GalleryData = new Gallery({
                Title:Title,
                Type:Type,
                Photo:path,
                About:About
            })
            await GalleryData.save();
            res.status(201).json({message: "Pen Added successfully"});
        }
    } catch (error) {
        console.log(error);
        
    }
}
const notice = async(req, res) =>{
    
    const {Title, Type, About} = req.body;
    try {
        if(Type === 'page'){
            const GalleryData = new Gallery({
                Title:Title,
                Type:Type,
                About:About
            })
            await GalleryData.save();
            res.status(201).json({message: "Page Updated successfully"});
        }else if(Type === 'notice'){
            const GalleryData = new Gallery({
                Title:Title,
                Type:Type
            })
            await GalleryData.save();
            res.status(201).json({message: "Notice Added successfully"});
        }else if(Type === 'faq'){
            const GalleryData = new Gallery({
                Title:Title,
                Type:Type,
                About:About
            })
            await GalleryData.save();
            res.status(201).json({message: "FAQ added successfully"});
        }
    } catch (error) {
        console.log(error);
        
    }
    
     
}
const getdata = async(req, res) =>{
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 12;
    try {
        const data = await User.find().sort({_id:-1}).limit(12).skip(skip).select('-password');
        res.json(data)
    } catch (error) {
       console.log(error);
        
    }
     
}
const getvalue = async(req, res) =>{
    const {value} = req.body;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 12;
    
    
    try {
        const data = await Gallery.find({Type:value}).sort({_id:-1}).skip(skip).limit(12);
        res.json(data)
    } catch (error) {
       console.log(error);
        
    }
     
}
const page = async(req, res) =>{
    const {id} = req.params;
    
    try {
        const data = await Gallery.findOne({_id:id, 
            $or: [{Type:'page'},
                {Type:'events'}
            ]});
        res.json(data)
    } catch (error) {
       console.log(error);
        
    }
     
}
const userDetail = async(req, res) =>{
    const {value} = req.body;
    
    try {
        const data = await Gallery.find({About:value, Type:'certificates'});
        res.json(data)
        
        
    } catch (error) {
       console.log(error);
        
    }
     
}
const deletepost = async (req, res)=>{
    try {
        const {id} = req.params;
        const deleteOneResult = await Gallery.findOne({_id:id})
        
        if(!deleteOneResult){
           console.log("not found");
           
        }
        if(deleteOneResult.Photo !== "Name"){
            fs.unlink(deleteOneResult.Photo, async(err)=>{
                if(err){
                   console.log("unexpected error");
                   
                }
            })
        }
        
        await Gallery.deleteOne({_id : id});
        res.json({message: "Deleted"});

          
    }
    catch (error) { 
        res.status(500).json({message: 'Server Error', error});
    }
}
const deleteuser = async (req, res)=>{
    try {
        const {id} = req.params;
        const deleteOneResult = await User.findOne({_id:id})
        
        if(!deleteOneResult){
            res.json({message: "Try later"})
        }
        await User.deleteOne({_id : id});
        res.json({message: "Deleted"});

          
    }
    catch (error) { 
        res.status(500).json({message: 'Server Error', error});
    }
}
const updateuser = async (req, res)=>{
    try {
        const {id} = req.params;
        const {load} = req.body;
        
        const updateOneResult = await User.findOne({_id:id})
        
        if(!updateOneResult){
            res.json({message: "Try later"})
        }
        await User.findByIdAndUpdate(id, {role : load}, { new: true });
        res.json({message: "Updated"});

          
    }
    catch (error) { 
        res.status(500).json({message: 'Server Error', error});
    }
}
const updatephoto = async (req, res)=>{
    try {
        const {id} = req.params;
        const {path} = req.file;
        
        const updateOneResult = await User.findOne({_id:id})
        
        if(!updateOneResult){
            res.json({message: "Try later"})
        }
        await User.findByIdAndUpdate(id, { profilepicture : path}, { new: true });
        res.json({message: "Updated"});

          
    }
    catch (error) { 
        res.status(500).json({message: 'Server Error', error});
    }
}
module.exports = {updatephoto, updateuser, deleteuser, deletepost, getHome, mailotp, getcontact, addpost, notice, getdata, getvalue, page, userDetail}