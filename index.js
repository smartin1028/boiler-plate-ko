const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
// mongodb+srv://daewon1028:<password>@boilerplate.aa8qr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const { User } = require('./models/User');
const config = require('./config/key')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
// application/json
app.use(bodyParser.json());

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
