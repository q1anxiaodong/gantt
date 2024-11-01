const express = require('express');
const app = express();

// 设置ejs为视图引擎 
app.set('view engine', 'ejs');

// 设置public文件夹为assets存储位置
app.use(express.static(__dirname + '/public'));

// 设置app路由 
app.get('/', function(req, res) {
    res.render('pad');
});

app.get('/(:id)', function(req, res) {
    res.render('pad');
});

const sharejs = require('share');
require('redis');

const options = {
    db: {type: 'redis'}
};

sharejs.server.attach(app, options);

// 监听端口8000
const port = process.env.Port || 8000;
app.listen(port);