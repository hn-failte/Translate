const http = require('http');
const {URL, URLSearchParams} = require('url');
const fs = require('fs');
const translate = require("baidu-translate-api");

var server = http.createServer(function(req,res){
    var url = new URL(req.url, 'http://127.0.0.1:3000');
    var search = new URLSearchParams(url.search);
    if(fs.existsSync(__dirname+url.pathname)){
        if(/^\/\w+\.ico$/.test(url.pathname)){ // ico文件解析
            var data = fs.readFileSync(__dirname+url.pathname, "binary"); // 加载图片过程中，不能向页面写入其他数据
            res.writeHeader(200, {"Content-type": "image/x-icon"});
            res.write(data, "binary");
            res.end();
        }

        else if(url.pathname==="/"){ // 主页
            res.setHeader("Content-type","text/html;charset=utf8");
            fs.readFile(__dirname+'/index.html', 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/\w+\.png$/.test(url.pathname)){ // png文件解析
            var data = fs.readFileSync(__dirname+url.pathname, "binary"); // 加载图片过程中，不能向页面写入其他数据
            res.writeHeader(200, {"Content-type": "image/png"});
            res.write(data, "binary");
            res.end();
        }

        else if(/^\/\w+\.jpg$/.test(url.pathname)){ // jpg文件解析
            var data = fs.readFileSync(__dirname+url.pathname, "binary"); // 加载图片过程中，不能向页面写入其他数据
            res.writeHeader(200, {"Content-type": "image/jpeg"});
            res.write(data, "binary");
            res.end();
        }

        else if(/^\/\w+\.gif$/.test(url.pathname)){ // gif文件解析
            var data = fs.readFileSync(__dirname+url.pathname, "binary"); // 加载图片过程中，不能向页面写入其他数据
            res.writeHeader(200, {"Content-type": "image/gif"});
            res.write(data, "binary");
            res.end();
        }

        else if(/^\/\w+\.html$/.test(url.pathname)){ // html文件解析
            res.setHeader("Content-type","text/html;charset=utf8");
            fs.readFile(__dirname+url.pathname, 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/\w+\.htm$/.test(url.pathname)){ // htm文件解析
            res.setHeader("Content-type","text/html;charset=utf8");
            fs.readFile(__dirname+url.pathname, 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/\w+\.js$/.test(url.pathname)){ // JS文件解析
            res.setHeader("Content-type","text/javascript;charset=utf8");
            fs.readFile(__dirname+url.pathname, 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/\w+\.css$/.test(url.pathname)){ // css文件解析
            res.setHeader("Content-type","text/css;charset=utf8");
            fs.readFile(__dirname+url.pathname, 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/.+\.mp3$/.test(url.pathname)){ // mp3文件解析
            res.setHeader("Content-type","audio/mp3;");
            fs.readFile(__dirname+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else if(/^\/.+\.wav$/.test(url.pathname)){ // wav文件解析
            res.setHeader("Content-type","audio/wav;");
            fs.readFile(__dirname+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else if(/^\/.+\..ogg$/.test(url.pathname)){ // ogg文件解析
            res.setHeader("Content-type","application/ogg;");
            fs.readFile(__dirname+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else if(/^\/.+\..mp4$/.test(url.pathname)){ // mp4文件解析
            res.setHeader("Content-type","video/mpeg4;");
            fs.readFile(__dirname+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else if(/^\/.+\.webm$/.test(url.pathname)){ // webm文件解析
            res.setHeader("Content-type","video/webm;");
            fs.readFile(__dirname+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else{
            fs.readFile(__dirname+url.pathname, 'utf8', function(err, data){
                if(err){ //读取错误
                    console.log(err);
                    res.end();
                }
                else{ // 其他类型文件
                    res.setHeader("Content-type","text/plain;charset=utf8");
                    res.end(data);
                }
            })
        }
    }
    else{
        if(/^\/\w+\.ico$/.test(url.pathname)) {
            var data = fs.readFileSync("./favicon.ico", "binary"); // 读取ico错误，加载服务器默认ico
            res.writeHeader(200, {"Content-type": "image/x-icon"});
            res.write(data, "")
            res.end();
        }

        else if(url.pathname==="/t/q"){ // 翻译API
            res.setHeader("Content-type","text/plain;charset=utf8");
            translate(search.get("key"), {
                from: search.get("from"),
                to: search.get("to")
            }).then(done => {
                console.log(search.get("key"), ' => ', done.trans_result.dst);
                res.end(done.trans_result.dst);
            });
        }

        else if(url.pathname==="/t/k"){ // 语种API
            res.setHeader("Content-type","application/json;charset=utf8");
            fs.readFile("./kind.json", "utf8", function(err, data){
                if(err){
                    console.log(err);
                }
                else{
                    res.end(JSON.stringify(data));
                }
            })
        }

        else{ // 不存在，返回404
            res.writeHeader(404);
            res.end();
        }
    }
});

console.log("Start Server At http://127.0.0.1:3000");
server.listen(3000);