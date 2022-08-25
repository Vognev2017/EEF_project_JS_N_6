const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const multer = require('multer')
let count = 0

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

router.use(multer({
    storage: storage,
    fileFilter: fileFilter
}).single("myImage"));

router.get('*', (req, res, next) => {
    count++;
    console.log(count);
    next();
});

router.get('/', (req, res, next) => {
    const page = "index"
    if (fs.existsSync('views/index.ejs')) {
        res.render(page)
    } else {
        next(new Error('index'))
    }
});

router.get('/about', (req, res) => {
    const page = "about"
    if (fs.existsSync('views/about.ejs')) {
        res.render(page)
    } else {
        next(new Error('about'))
    }
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/comment', (req, res) => {
    res.render("my-security")
});

router.get('/comment/:pass', (req, res, next) => {
    const {
        pass
    } = req.params;
    if (pass === '20') {
        res.json({
            comment: "<h1>Hello. It\'s my first comment!</h1>"
        });
    } else {
        next(new Error('comment'))
    }
});

router.get('/comment-error', (req, res) => {
    res.render("error/error", {
        title: "Sorry, password is not correct",
        image: "/img/403.png"
    })
});

router.get('/video/home.mp4', (req, res, next) => {
    console.log("aaa-a-a-a-a-a-a!")
    next()
});

router.get('/upload-page', (req, res) => {
    res.render("upload-page")
});

router.post('/upload', function (req, res, next) {
    let filedata = req.file;
    if (!filedata) {
        next(new Error('upload'))
    } else {
        res.send("<a href='/'>Home</a><br/>Файл загружен");

    }
});

router.get('/*', (req, res, next) => {
    next(new Error('rout'))
});

module.exports = router;