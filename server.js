const http = require('http');
const {URL, URLSearchParams} = require('url');
const fs = require('fs');
const translate = require("baidu-translate-api");
const MySQLUtil = require("./MySQLUtil");

const reg_en = /[a-zA-Z\s_-]+/;
const reg_zh = /^[\u4e00-\u9fa5]+$/;

const util = new MySQLUtil();
const server = http.createServer(function(req,res){
    var url = new URL(req.url, 'http://127.0.0.1:3000');
    var search = new URLSearchParams(url.search);
    if(fs.existsSync(__dirname+"/src"+url.pathname)){
        if(/^\/\w+\.ico$/.test(url.pathname)){ // ico文件解析
            var data = fs.readFileSync(__dirname+"/src"+url.pathname, "binary"); // 加载图片过程中，不能向页面写入其他数据
            res.writeHeader(200, {"Content-type": "image/x-icon"});
            res.write(data, "binary");
            res.end();
        }

        else if(url.pathname==="/"){ // 主页
            res.setHeader("Content-type","text/html;charset=utf8");
            fs.readFile(__dirname+'/src/index.html', 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/\w+\.png$/.test(url.pathname)){ // png文件解析
            var data = fs.readFileSync(__dirname+"/src"+url.pathname, "binary"); // 加载图片过程中，不能向页面写入其他数据
            res.writeHeader(200, {"Content-type": "image/png"});
            res.write(data, "binary");
            res.end();
        }

        else if(/^\/\w+\.jpg$/.test(url.pathname)){ // jpg文件解析
            var data = fs.readFileSync(__dirname+"/src"+url.pathname, "binary"); // 加载图片过程中，不能向页面写入其他数据
            res.writeHeader(200, {"Content-type": "image/jpeg"});
            res.write(data, "binary");
            res.end();
        }

        else if(/^\/\w+\.gif$/.test(url.pathname)){ // gif文件解析
            var data = fs.readFileSync(__dirname+"/src"+url.pathname, "binary"); // 加载图片过程中，不能向页面写入其他数据
            res.writeHeader(200, {"Content-type": "image/gif"});
            res.write(data, "binary");
            res.end();
        }

        else if(/^\/\w+\.html$/.test(url.pathname)){ // html文件解析
            res.setHeader("Content-type","text/html;charset=utf8");
            fs.readFile(__dirname+"/src"+url.pathname, 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/\w+\.htm$/.test(url.pathname)){ // htm文件解析
            res.setHeader("Content-type","text/html;charset=utf8");
            fs.readFile(__dirname+"/src"+url.pathname, 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/\w+\.js$/.test(url.pathname)){ // JS文件解析
            res.setHeader("Content-type","text/javascript;charset=utf8");
            fs.readFile(__dirname+"/src"+url.pathname, 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/\w+\.css$/.test(url.pathname)){ // css文件解析
            res.setHeader("Content-type","text/css;charset=utf8");
            fs.readFile(__dirname+"/src"+url.pathname, 'utf8', function(err, data){
                res.end(data);
            })
        }

        else if(/^\/.+\.mp3$/.test(url.pathname)){ // mp3文件解析
            res.setHeader("Content-type","audio/mp3;");
            fs.readFile(__dirname+"/src"+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else if(/^\/.+\.wav$/.test(url.pathname)){ // wav文件解析
            res.setHeader("Content-type","audio/wav;");
            fs.readFile(__dirname+"/src"+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else if(/^\/.+\..ogg$/.test(url.pathname)){ // ogg文件解析
            res.setHeader("Content-type","application/ogg;");
            fs.readFile(__dirname+"/src"+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else if(/^\/.+\..mp4$/.test(url.pathname)){ // mp4文件解析
            res.setHeader("Content-type","video/mpeg4;");
            fs.readFile(__dirname+"/src"+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else if(/^\/.+\.webm$/.test(url.pathname)){ // webm文件解析
            res.setHeader("Content-type","video/webm;");
            fs.readFile(__dirname+"/src"+url.pathname, 'binary', function(err, data){
                res.write(data, 'binary');
                res.end();
            })
        }

        else{
            fs.readFile(__dirname+url.pathname, 'utf8', function(err, data){
                if(err){ // 读取错误
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
            var data = fs.readFileSync("./src/favicon.ico", "binary"); // 读取ico错误，加载服务器默认ico
            res.writeHeader(200, {"Content-type": "image/x-icon"});
            res.write(data, "")
            res.end();
        }

        else if(url.pathname==="/t/q"){ // 翻译API t: translate q: query
            res.setHeader("Content-type","text/plain;charset=utf8");
            var sKey = search.get("key");
            var sFrom = search.get("from");
            var sTo = search.get("to");
            translate(sKey, {
                from: sFrom,
                to: sTo
            }).then(done => {
                console.log(done);
                var dst = done.trans_result.dst;
                res.end(JSON.stringify({"state":"1","dst": dst}));
            })
            .catch(function(err){ // 捕获API错误，返回输入值
                res.end(JSON.stringify({"state":"0","dst": sKey}));
            });
        }

        else if(url.pathname==="/t/a"){ //添加生词本 a: add
            var qKey = search.get("en");
            var qValue = search.get("zh");
            console.log(qKey, qValue);
            console.log(reg_en.test(qKey) , reg_zh.test(qValue));
            
            console.log(reg_en.test(qKey) && reg_zh.test(qValue));
            
            if(reg_en.test(qKey) && reg_zh.test(qValue)){
                console.log("next");
                
                var count = 1;
                util.queryByKey(qKey, function(err, data){
                    if(err) {
                        console.log(err);
                        res.end(JSON.stringify({"state": 0}));
                    }
                    else if(data.length==0){
                        util.insert(qKey, qValue, function(err, data){
                            if(!err && data.affectedRows>0) console.log(`"${qKey}" => "${qValue}"`);
                            res.end(JSON.stringify({"state": 1}));
                        })
                    }
                    else{
                        count = ++data[0]["word_repeat"];
                        cVal = data[0]["word_value"];
                        util.setRepeat(qKey, count, function(err, data){
                            if(!err && data.affectedRows>0) {
                                console.log(`"${qKey}" is already exist`);
                                res.end(JSON.stringify({"state": count}));
                                console.log(new RegExp(cVal));
                                if(!new RegExp(cVal).test(qValue)) {
                                    cVal+="; "+qValue;
                                    util.update(qKey, cVal, function(err, data){
                                        if(!err && data.affectedRows>0) {
                                            console.log(`"${qKey}" increase new value`);
                                        }
                                        else console.log(err);
                                    });
                                }
                            }
                        })
                    }
                })
            }
            else res.end(JSON.stringify({"state": 0}));
        }

        else if(url.pathname==="/t/n"){ // 单词本 n: notebook
            res.writeHead(200, {"Content-Type": "application/json;charset=utf8"});
            util.queryAll(function(err, data){
                if(!err) res.end(JSON.stringify(data));
                else res.end();
            })
        }

        else if(url.pathname==="/t/g"){ // 语种API g: global
            res.setHeader("Content-type","application/json;charset=utf8");
            fs.readFile("./global.json", "utf8", function(err, data){
                if(err){
                    console.log(err);
                }
                else{
                    res.end(JSON.stringify(data));
                }
            })
        }

        else if(url.pathname==="/t/d"){ // 删除 d: delete
            var dKey = search.get("key");
            res.writeHeader(200, {"Content-Type": "application/json;charset=utf8"});
            util.delete(dKey, function(err, data){
                if(!err && data.affectedRows>0) res.end(JSON.stringify({"state": data.affectedRows}));
                else res.end(JSON.stringify({"state": 0}));
            })
        }

        else if(url.pathname==="/t/c"){ // 清空 c: clear
            res.writeHead(200, {"Content-Type": "application/json;charset=utf8"});
            util.clear(function(err, data){
                if(!err && data.affectedRows>0) res.end(JSON.stringify({"state": data.affectedRows}));
                else res.end(JSON.stringify({"state": 0}));
            })
        }

        else if(url.pathname==="/t/m"){ // 标记 m: mark
            res.writeHead(200, {"Content-Type": "application/json;charset=utf8"});
            util.setHard(search.get("key"), !(search.get("flag")==1),function(err, data){
                if(!err && data.affectedRows>0) res.end(JSON.stringify({"state": data.affectedRows, "data": Number(!(search.get("flag")==1))}));
                else res.end(JSON.stringify({"state": 0}));
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