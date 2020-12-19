const {User} = require('../models/User')

let auth = (req,res,next) => {
    // 인증 처리(login에서 x_auth 쿠키를 가져옴)
    // 클라이언트 쿠키에서 데이터를 가져온다
    let token = req.cookies.x_auth;
    // 토큰을 복호화 한 후 유저를 찾고 유저가 있을경우 인증 ok 없으면 no
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        // 유저가 없으면 isAuth를 false로 줌
        if(!user) return res.json({isAuth:false,error:true})
        // 유저가 있다면
        req.token = token;
        req.user = user;
        next();
    })

}
module.exports = {auth}