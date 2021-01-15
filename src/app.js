import path from 'path';
import express from 'express';
// Tạo một express mới
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors({
    credentials: true,
    // chấp nhận request
    origin: function (origin, callback) {
        callback(null, true);
    }
}));
// core để chia sẻ tài nguyên chéo nhau( gọi api)

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
}));
app.use(bodyParser.json({ limit: '500mb' }));
// Định dạng dữ liệu post đến server ( lấy data thì req.body)

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../media')))
app.use(express.static(path.join(__dirname, '../build')))
// khai báo các tập tin tĩnh để express có thể đọc được ( sử dụng nhiều thư mục để lưu các static file)

// Setup middlewares
import { isIP } from 'net';
app.use((req, res, next) => {
    if (isIP(req.hostname) == 0) {
        req.baseUri = req.protocol + '://' + req.hostname + '/';
    } else {
        if (!req.secure) {
            let port = app.get('port');
            req.baseUri = req.protocol + '://' + req.hostname + (port == 80 ? '' : (':' + port)) + '/';
        } else {
            let port = app.get('https_port');
            req.baseUri = req.protocol + '://' + req.hostname + (port == 443 ? '' : (':' + port)) + '/';
        }
    }
    next();
});

// Setup other routes
app.use('/api', routes);
// chỉ match với request là /api

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// map với tất cả các request

export default app;