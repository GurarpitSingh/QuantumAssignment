const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const User = require('./Models/User')
const port = 3001
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://sgurarpit:gurarpitsingh@cluster0.mb8t4k0.mongodb.net/?retryWrites=true&w=majority',() => {
    console.log("Connected to DB")
},
{useNewUrlParser: true, useUnifiedTopology: true})


app.post('/api/register', async (req, res) => {
    
        const [name, email, password, dob, username] = [req.body.name, req.body.email, req.body.password, req.body.dob, req.body.username]
        if(!name || !email || !password || !dob || !username) {
            console.log("Please fill all the fields");
            res.status(400).json({
                message: "Please fill all the fields"
            })
        }else{
        try{
    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        username: req.body.username
    })

    const saved = await user.save()
    res.status(200).json({
        message: "User registered successfully"
    })
} catch(err) {
    res.status(400).json({
        message: "User already exists"
    })}
}

})


app.post('/api/login', async (req, res) => {
    const [username, password] = [req.body.username, req.body.password]
    if(!username || !password) {
        console.log("Please fill all the fields");
        res.status(400).json({
            message: "Please fill all the fields"
        })
    }else{
        try {
            const user = await User.findOne({username: username})
            if(user.password === password) {
                const token = jwt.sign({username: user.username}, 'secretkey12345')
                res.status(200).json({
                    message: "User logged in successfully", status: true, token: token, username: user.username
                })
            }else{
                res.status(400).json({
                    message: "Invalid Credentials", status: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: "Invalid Credentials", status: false
            }) 
        }}})


app.post('/api/verify', async (req, res) => {
    const token = req.body.token
    try {
        const verified = await jwt.verify(token, "secretkey12345")
        if(verified) {
            res.status(200).json({
                message: "User verified successfully",
                username: verified.username
            })
        }
        else{
            res.status(400).json({
                message: "User not verified"
            })
        }

    } catch (error) {
        
    }
})


app.listen(port, () => {
    console.log(`App listening at Port: ${port}`)
})