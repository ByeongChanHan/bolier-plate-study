const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique:1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type:Number,
        default:0
    },
    image:String,
    token:{
        type: String
    },
    tokenExp: {
        type:Number
    }
})

// 첫번째 인자는 모델의 이름 두번째는 스키마 
// 모델은 스키마를 감싼다
const User = mongoose.model('User',userSchema)

// 외부사용
module.exports = {User}