import express from 'express'
import mongoose from 'mongoose'
import router from "./router.js";
import * as dotenv from "dotenv";
import fileUpload from 'express-fileupload';
import Post from "./Post.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const DB_URL = `mongodb+srv://${user}:${password}@cluster0.vvwjl.mongodb.net/express-test?retryWrites=true&w=majority`

const app = express()


app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)
app.post('/',(req, res) => {
    try {
        const { author, title, content, picture } = req.body;
        const post = Post.create({author, title, content, picture});
        res.json(post);
    } catch (e) {
        res.status(500).json(e);
    }
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()