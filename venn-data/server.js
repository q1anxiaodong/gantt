const express = require('express');
const app = express();
const PORT = 80;

// 中间件，用于解析 JSON 请求体
app.use(express.json());

// 模拟数据
let data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

app.get('/api/data', (req, res) => {
    console.log('GET request received');
    res.json(data);
});

app.post('/api/data', (req, res) => {
    console.log('POST request received with body:', req.body);
    const newItem = {
        id: data.length + 1,
        name: req.body.name
    };
    data.push(newItem);
    res.status(201).json(newItem);
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});