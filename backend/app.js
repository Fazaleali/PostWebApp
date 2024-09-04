const express = require("express")
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post")
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const cors = require('cors')
const path = require('path')
const upload = require('./config/multerconfig.js')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/auth/check',isLoggedIn, (req,res)=>{
    res.status(200).json({isAuthenticated: true})
})

app.post('/auth/register',async (req , res)=>{
    const { name, email, password, age, username } = req.body;
    const checkuser = await userModel.findOne({email});

    if(checkuser) return res.status(500).send("User already Registered")

    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
           const user =  await userModel.create({
                name,
                username,
                email,
                age,
                password:hash
            })

            const token = jwt.sign({email:email, userid: user._id}, "abcdefg")
            res.cookie('token', token)         
            res.send(user,)
        })
    })
})

app.post('/upload', isLoggedIn, upload.single('pic'), async (req, res)=>{
    const user = await userModel.findOne({email: req.user.email})
    user.profilepic = req.file.filename
    await user.save()
    res.json({
        picUrl: `/images/uploads/${req.file.filename}`
    });
})


app.post('/auth/login',async (req , res)=>{
    const { email, password } = req.body;
    const user = await userModel.findOne({email});

    if(!user) return res.status(500).send("Something Went Wrong")

    bcrypt.compare(password, user.password, (err,result)=>{
        if(result){
            const token = jwt.sign({email:email, userid: user._id}, "abcdefg")
            res.cookie('token', token)
            
            res.status(200).send("logged in")
        }
        else return res.status(500).send("Something went wrong")
    })
})


app.get('/auth/logout', (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    res.status(200).send("Logged out");
});

app.get('/auth/profile', isLoggedIn , async (req, res) => {

   const user = await userModel.findOne({email: req.user.email}).populate("posts")
   res.json(user)
});


app.post('/create/post', isLoggedIn, async (req,res)=>{
    const {content} = req.body
    let user = await userModel.findOne({email:req.user.email})
    let post = await postModel.create({
        user: user._id,
        content
    })
    user.posts.push(post._id)
    await user.save()
    res.json(post)
})

app.get('/posts', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email }).populate('posts');
        res.json({ posts: user.posts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.get('/like/:id', isLoggedIn,async (req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate('user')

    if(post.likes.indexOf(req.user.userid) === -1)
    {
        post.likes.push(req.user.userid)
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
    await post.save()
    res.json(post)
})

app.get('/edit/:id', isLoggedIn, async (req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate('user')
    res.json(post)
})

app.post('/update/:id', isLoggedIn, async (req,res)=>{
    const {updatecontent} = req.body
    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {
        content: updatecontent
    })
    
    res.json(post)
})

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const data = jwt.verify(token, 'abcdefg');
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
}
app.listen(3000)