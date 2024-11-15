const mongoose = require('mongoose')
const GallerySchema = new mongoose.Schema({
    Title : {
        type : String,
        unique: true,
        required: true
    },
    Photo : {
        type: String,
        default:"Name"
    },
    About : {
        type: String,
    },
    Type : {
        type: String,
    },
    YouTube : {
        type: String,
    }
},
{
    timestamps: true
})

const Gallery = new mongoose.model("Gallery", GallerySchema)
module.exports = Gallery;