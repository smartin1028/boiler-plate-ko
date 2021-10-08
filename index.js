const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const config = require('./server/config/key')

const { auth } = require('./server/middleware/auth')
const { User } = require('./server/models/User');


// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
// application/json
app.use(bodyParser.json());

//
app.use(cookieParser())

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI).then(()=> console.log("MongoDB Conneted..."))
    .catch(err => console.log(err))
app.get('/', (req, res) => {
    res.send('Hello World! 새해 복 많이 받으세요')
})


app.post('/register' , (req, res) =>
{
    // 회원 가입 할때 필요한 정보를 client에서 가져오면 그것들을 데이터 베이스에 넣어준다
    const user = new User(req.body)
    user.save((err, doc) => {
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success : true
        })
    })
})

app.post('/api/users/login', (req, res) => {

    // const user = new User(req.body)
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다
    User.findOne({email : req.body.email}, null, null, (err, userInfo)=>{

        if(!userInfo){
            return res.json({
                loginSuccess : false,
                message:"정보가 잘 못되었습니다."
            })
        }
        // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
        userInfo.comparePassword(req.body.password , (err, isMatch) => {
            if(!isMatch){
                return res.json({
                    loginSuccess : false,
                    message:"정보가 잘 못되었습니다.02"
                })
            }else{
                // 비밀번호 까지 맞다면 토큰을 생성하기
                userInfo.generateToken((err, user)=>{
                    if(err) return res.status(400).send(err);
                    // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                    res.cookie('x_auth', user.token)
                        .status(200)
                        .json({
                            loginSuccess : true, userId:user._id, token : user.token
                        })
                })
            }
        })
    })
})



app.get('/api/users/auth' , auth , (req, res) =>{
    // Router <-- express
    // 여기 까지 미들웨어를 통과해 왔다는 얘기는 authentication이 True라는 말
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        image : req.user.image

    })
})


app.get('/api/users/logout' , auth , (req, res) =>{

    User.findOneAndUpdate({_id:req.user._id}
        ,{token : ""}
        ,(err, user) => {
            if(err) return res.json({success : false , err})
            return res.status(200).send({success : true})

            }

    )

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
