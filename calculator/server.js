const { User } = require("./models/user");
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
app.use(cors());
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ejisknjirlkjew?[]"

const mongoUrl = "mongodb+srv://kkyingg:990822cky@kk.ceuzroz.mongodb.net/?retryWrites=true&w=majority";

// connect to mongo db
mongoose
    .connect(mongoUrl, {
    useNewUrlParser: true
    })
    .then(() => {
        console.log("Connected to database"); 
    })
    .catch(e => console.log(e));

app.listen(3001, () => {
    // serve start
    console.log("server start");
})


app.post("/register", async (req, res) => {
    const username = req.body.username;
    const oldUser = await User.findOne({username})

    if (oldUser){
        return res.status(400).send({error: "User Exists"});
    }
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    User.create({
        username: req.body.username,
        password: encryptedPassword,
        history: []
    }).then(user => {
            res.status(200).send(user);
    }).catch(error => {
            res.status(400).send(error);
        }
    )
})

app.post("/login", async(req, res) =>{
    const username = req.body.username;
    const data = await User.findOne({username})
    console.log("find in login database");
    console.log(data);
    if (!data){
        return res.status(400).send({error: "User not found."});
    }

    if(await bcrypt.compare(req.body.password, data.password)){
        const token = jwt.sign({username: data.username}, JWT_SECRET);
        return res.status(201).send({token: token})
    }
    else{
        return res.status(400).send({error: "Invalid Password"});
    }

})

app.post("/userData", async(req, res) =>{
    console.log(req.body.token);
    const user = jwt.verify(req.body.token, JWT_SECRET);
    console.log("fetch data")
    console.log(user);
    User.findOne({username: user.username}).then((user) => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send({error: error})
    })

})


app.put("/updateData", async(req, res) =>{

    User.findOne({username: req.body.username}).then((user) => {
        if(!user){
            res.status(400).send({error: "User not found!"});
        }
        else{
            const updateHistory = user.history.concat(req.body.history);
            console.log(updateHistory);
            User.updateOne({username: req.body.username}, {$set:{history: updateHistory}}).then((user) => {
                res.status(201).send(user);
            }).catch((error) => {
                res.status(500).send({error: error});
            })
        }
    }).catch((error) => {
        res.status(500).send({error: error});
    })

})