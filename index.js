require('dotenv').config();

const express = require('express');
const multer = require('multer');
const db = require('./modules/db_connect');
const session = require('express-session');
process.env.MODE = process.env.MODE || 'development';
console.log('process.env.MODE:', process.env.MODE);

const app = express();
//樣板引擎
app.set('view engine', 'ejs');

// Top level middlewares
app.use(require('cors')());
//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'sdfgdsf456456456YIOIUOIUOf',
    // store: sessionStore,
    cookie: {
        maxAge: 1800000
    }
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));
app.use((req, res, next)=>{
    res.locals.title = 'FUFU-CAT WEB';
    res.locals.member = req.session.member || {};
    res.locals.admin = req.session.admin || '';

    console.log({admin: res.locals.admin, url: req.url});
    res.locals.pageName = '';  // 預設值

    // template helper functions
    res.locals.toDateString = d => moment(d).format('YYYY-MM-DD');
    res.locals.toDatetimeString = d => moment(d).format('YYYY-MM-DD HH:mm:ss');

    next();
});

app.get('/', (req, res)=>{
    res.locals.pageName = 'home';

    res.locals.title = res.locals.title ? ('首頁 - ' + res.locals.title) : '首頁';
    res.render('home');
});


app.use('/catlist', require('./routes/catlist'));
app.use('/product-list', require('./routes/product-list'));
app.use('/cart', require('./routes/cart'));




// 放在所有路由的後面
app.use((req, res)=>{
    res.status(404).send('<h1>找不到頁面</h1>');
});


app.listen(3000, ()=>{
    console.log('server started:', new Date().toString());
})