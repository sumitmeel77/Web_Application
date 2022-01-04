const express = require("express")
const mongoose = require('mongoose')
const User = require("./model/user.js")
const cors = require('cors');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const url = "mongodb+srv://Username:Password@cluster0.jkt16.mongodb.net/WebApp?retryWrites=true&w=majority";

const jwt_sceret = 'hsdfgshkagfahjsgfkhg3624@!3j234bk'


// connecting with mongoose
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("connection successfull") }).catch((err) => console.log(err))

const app = express()

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.post("/api/register", async (req, res) => {

    const { username, email, password: plainTextPassword } = req.body

    const password = await bcrypt.hash(plainTextPassword, 10) // Hashing the password

    // Adding data to database
    try {
        await User.create({
            username,
            email,
            password
        })
        // console.log('User created successfully: ', response)
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'email already in use' })
        }
        throw error
    }

    res.json({ status: "ok" })

})
//Acccessing data from server side on web app
// Adding login
app.post("/api/login", async (req, res) => {

    //checking whether username and password are correct or not
    const { email, password } = req.body
    // first searching the username and then checking whether password is correct or not
    const user = await User.findOne({ email }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email/password' })
    }

    if (await bcrypt.compare(password, user.password)) {

        //generating jwt token for authentication
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            jwt_sceret //  a scret key attached with every token
        )

        //pushing new token every time user login through different browser
        await User.findOneAndUpdate(
            { email: user.email },
            { $push: { tokens: [{ "tokenvalue": token }] } }
        )
        return res.json({ status: "ok", data: token })
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
})


// changing the password
app.post("/api/change-password", async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    try {
        const user = jwt.verify(token, jwt_sceret) // verifying user with jwt token

        const _id = user.id

        const password = await bcrypt.hash(plainTextPassword, 10)
        //updating password
        await User.updateOne(
            { _id },
            {
                $set: { password }
            }
        )
        //deleting all tokens for a user
        await User.updateOne(
            { _id },

            { $set: { tokens: [] } }
        )
        //add preent token of a website
        await User.updateOne(
            { _id },
            { $push: { tokens: [{ "tokenvalue": token }] } }
        )

        res.json({ status: 'ok' })
    } catch (error) {
        // console.log(error)
        res.json({ status: 'error', error: ';))' })
    }
})

app.post("/api/logout", async (req, res) => {
    const { cookieData } = req.body
    try {
        // searching user name using value of stored cookie on browser
        const user = await User.findOne({ tokens: { $elemMatch: { tokenvalue: cookieData } } })
        //deleting token of user from browser
        await User.findOneAndUpdate(
            { email: user.email },
            { $pull: { tokens: { tokenvalue: cookieData } } }
        )
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: error })
    }

})
app.post("/api/userData", async (req, res) => {
    const { cookievalue } = req.body
    try {
        const a = await User.findOne({ tokens: { $elemMatch: { tokenvalue: cookievalue } } })
        if (a != null) { res.json({ status: "found" }) } else { res.json({ status: "notfound" }) }
    } catch (error) {
        res.json({ status: "notfound" })
    }

})
app.listen(port, () => {
    console.log(`server at ${port}`)
}
)