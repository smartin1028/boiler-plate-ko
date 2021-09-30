const express = require('express')
const app = express()
const port = 5000

// mongodb+srv://daewon1028:<password>@boilerplate.aa8qr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://daewon1028:dwpassword1234@boilerplate.aa8qr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=> console.log("MongoDB Conneted..."))
    .catch(err => console.log(err))
app.get('/', (req, res) => {
    res.send('Hello World! 안녕하세요')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})