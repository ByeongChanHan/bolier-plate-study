const mongoose = require('mongoose')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
// 10자리 솔트를 만들고
const saltRounds = 10;
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

// save 메소드 전에
userSchema.pre('save', function (next){
    var user = this;
    // 비밀번호를 암호화 시킴
    if(user.isModified('password')){
    // saltRounds = 10을 이용해 암호화시킴
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)
            // 유저에 패스워드를 hash값으로 바꿔줌
            user.password = hash
            next()
        });
    });
    // next를 타면 save메소드 실행됨
    } else{
        next()
    }
})

// 이메일이 존재할 경우 comparePassword 함수를 만들어준다
userSchema.methods.comparePassword = function(plainPassword,cb){
    // plainpassword 1234567 암호화된 비밀번호
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        // 에러가 있으면 콜백에 err를 반환 아니면 null에 isMatch값 반환
        if(err) return cb(err);
        cb(null,isMatch);
    })
}
userSchema.methods.generateToken = function(cb) {
    // user를 불러오고
    var user = this;
    // jsonwebtoken을 이용해서 토큰 생성 user._id를 secretToken 토큰으로 만들어준다
    var token = jwt.sign(user._id.toHexString(),  'secretToken')
    user.token = token
    // user에 있는 token에 저장
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}
userSchema.statics.findByToken = function(token,cb){
    var user = this;
    // 토큰을 decode
    jwt.verify(token,'secretToken',function(err,decoded){
        // 유저 아이디를 이용해서 유저를 찾은다음
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded,"token": token},function(err,user){
            // 찾아서 에러가 나면 콜백으로 리턴하고 콜백이 null이면 user를 던져준다
            if(err) return cb(err);
            cb(null,user)
        })
    })
}

// 첫번째 인자는 모델의 이름 두번째는 스키마 
// 모델은 스키마를 감싼다
const User = mongoose.model('User',userSchema)
// 외부사용
module.exports = {User}