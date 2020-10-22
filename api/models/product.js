const mongoose = require('mongoose')


const Schema = new mongoose.Schema({
    name : {type: String, unique:true},
    description: String,
    cover: {
        type: String,
        default: 'https://pbs.twimg.com/profile_images/1126137112825335808/L5WvNz8W_400x400.jpg'
    },
    }, {
    collection: 'products',
    minimize: false,
    versionKey: false
    }).set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id

        delete ret._id
    }
    })

module.exports = Schema
