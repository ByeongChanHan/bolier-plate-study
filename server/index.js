const express = require('express')
const app = express()
const port = 4000
const {User} = require('./models/User');
const {auth} = require('./middleware/auth')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
// config 폴더안 key.js 가져오기
const config = require('./config/key')
// url 타입 분석해서 가져오기
app.use(bodyParser.urlencoded({extended:true}));
// json 타입 분석해서 가져오기
app.use(bodyParser.json());
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>{console.log("연결 성공")})
.catch(err=>{console.log(err)})

app.get('/', (req, res) => {
  res.send('Hello World!111')
})

app.get('/api/hello',(req,res)=>{
  res.send("안녕하세요")
})

app.post('/api/users/register',(req,res)=>{
  // 회원가입 할때 필요한 정보들을 client에서 가져오면
  // DB에 저장
  // user는 User모델에 body-parser를 이용한 요청 body를 받음
  const user = new User(req.body)
  user.save((err,userInfo)=>{
    // 에러가 나면 json형식 리턴하면서 에러메세지도 보여주고
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true
    })
  })
})
app.post('/api/users/login',(req,res)=>{
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email:req.body.email },(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess:false,
        message:'제공된 이메일에 해당하는 유저가 없습니다.'
      })
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password,(err, isMatch)=>{
      if(!isMatch)
        return res.json({ loginSuccess:false,message:'비밀번호가 틀렸습니다.'})
      // 비밀번호 맞으면 generateToken 메소드를 생성
      user.generateToken((err,user)=>{
        // 에러 전달
        if(err) return res.status(400).send(err);
        // 토큰을 x_auth라는 쿠키에 저장 ,성공하면
        res.cookie('x_auth',user.token)
        .status(200)
        .json({loginSuccess : true ,userId : user._id})
      })
    })
  })
})
app.get('/api/users/auth', auth ,(req,res)=>{
    // 미들웨어를 통과했기 때문에 Auth가 true라는 말
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 1,
      isAuth:true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    })
})

app.get('/api/users/logout',auth,(req,res)=>{
  // req.user_id로 찾고 토큰을 지워준다
  User.findOneAndUpdate({_id:req.user._id},
    {token:""}
    ,(err,user)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).send({
      success:true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})