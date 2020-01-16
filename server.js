let express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// io.on('connection', () => {
//     console.log("user connected")
// })


let app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


// check for routes
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//setup database
const url = "mongodb+srv://cobylyates:<Visi0nman!>@cluster0-4v2fc.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(url , { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log(error))
//setup data model
let Message = mongoose.model('Message', { name : String, message : String})

//route then callback function
app.post('/messages', (req, res) => {
    let message = new Message(req.body)
    console.log("Post messsage received")

    message.save((err) => {
        if(err)
            sendStatus(500)
        io.emit('message', req.body)
        res.sendStatus(200)
    })
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        console.log(messages)
        res.send(messages)
    })
})

// console.log(__dirname)

server.listen(3000, () => {
    console.log(`Server is running on port: ` + server.address().port)
})