const http = require('http');
const {URL, URLSearchParams} = require('url');
const fs = require('fs');
const translate = require("baidu-translate-api");


var server = http.createServer(function(req,res){
    res.setHeader("Content-type","text/html;charset=utf8");
    var url = new URL(req.url, 'http://127.0.0.1:3000');
    var search = new URLSearchParams(url.search);
    if(url.pathname==="/index.js/t"){
        translate(search.get("key"), {
            from: search.get("from"),
            to: search.get("to")
        }).then(done => {
            console.log(search.get("key"), '   ', done.trans_result.dst);
            res.end(done.trans_result.dst);
        });
    }
    else{
        fs.readFile(__dirname+'/index.html', 'utf8', function(err, data){
            res.end(data);
        })
    }
});
server.listen(3000)
