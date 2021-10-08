const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    lastName: {
        type: String,
        maxLength: 50
    },
    password: {
        type: String,
        // 처음 maxLength 50 으로 하는 중에 로그인체크하는 부분에서 오류 발생함
        minLength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

});

userSchema.pre('save', function (next){
    const user = this;
    if( user.isModified('password')){
        // 비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds, function (err,salt){
            if(err) return next(err)
            bcrypt.hash(user.password , salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    const user = this;
    // plainPassword 1234567 암호화된 비밀번호 $2b$10$KZQjGwrgi7QNjb.Sq7z2jusocPmSCw8UTPmV9JwGg6BWmG5PTKSIW
    bcrypt.compare(plainPassword, user.password, function (err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    // jsonwebtoken을 이용해서 token생성
    const user = this;
    const token = jwt.sign(this._id.toHexString(), 'secretToken');
    user.token = token;
    user.save((err,user) => {
        if(err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function (token, cb){
    var user = this;

    // 토큰을 decode한다
    jwt.verify(token, 'secretToken', function (err, decoded){
        console.log(decoded)
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는 확인
        user.findOne({"_id" : decoded, "token" : token}, function (err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User' , userSchema)

module.exports = { User }
// module.exports.comparePassword = userSchema.method.comparePassword
// module.exports.generateToken = userSchema.method.generateToken