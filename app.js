const express = require('express');
const server = express();


server.set('view engine', 'ejs')
server.set('views', './views')

const mainRouter = require('./routers/rout');
const adminRouter = require('./routers/admin');

server.use(express.static('./public'));

server.use('/admin', adminRouter);
server.use('/', mainRouter);

server.use((err, req, res, next) => {
    switch (err.message) {
        case "index":
        case "rout":
        case "about":
            res.status(404).render('error/error', {
                title: "Sorry, page not found",
                image: "/img/404.png"
            });
            break;
        case "users":
            res.status(401).render('error/error', {
                title: "Sorry, Unauthorize",
                image: "/img/401.png"
            });
            break;
        case "upload":
            res.status(409).render('error/error', {
                title: "Sorry, Conflict file can't upload",
                image: "/img/409.png"
            });
            break;
        default:
            res.status(500).render('error/error', {
                title: "Sorry. Server error",
                image: "/img/500.png"
            });
            break;
    }
    next();
});

server.listen(3000)