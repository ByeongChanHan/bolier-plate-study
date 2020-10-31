const express = require('express')
const app = express()
const port = 4000
const {User} = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key')
// url 타입 분석해서 가져오기
app.use(bodyParser.urlencoded({extended:true}));
// json 타입 분석해서 가져오기
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>{console.log("연결 성공")})
.catch(err=>{console.log(err)})

app.get('/', (req, res) => {
  res.send('Hello World!111')
})

app.post('/register',(req,res)=>{
  // 회원가입 할때 필요한 정보들을 client에서 가져오면
  // DB에 저장
  // user는 User모델에 body-parser를 이용한 요청 body를 받음
  const user = new User(req.body)
  // req.body
  user.save((err,userInfo)=>{
    // 에러가 나면 json형식 리턴하면서 에러메세지도 보여주고
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})