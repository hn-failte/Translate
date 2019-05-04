var mysql = require('mysql');

module.exports = function(){
    var connect = function(){
        var conn = mysql.createConnection({
            host     : '127.0.0.1',
            user     : 'failte',
            password : '52171250',
            database : 'translate'
        });
        conn.connect();
        return conn;
    }
    this.insert = function (word_key, word_value, callback){
        var conn = connect();
        var sql = `insert into words(word_key, word_value) values("${word_key}", "${word_value}");`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.delete = function (word_key, callback){
        var conn = connect();
        var sql = `delete from words where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.clear = function (callback){
        var conn = connect();
        var sql = `delete from words;`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.update = function (word_key, word_value, callback){
        var conn = connect();
        var sql = `update words set word_value="${word_value}" where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.setHard = function (word_key, word_hard, callback){
        var conn = connect();
        var sql = `update words set word_hard=${word_hard} where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.setRepeat = function(word_key, word_repeat, callback){
        var conn = connect();
        var sql = `update words set word_repeat=${word_repeat} where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryAll = function(callback){
        var conn = connect();
        var sql = `select * from words;`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryByValue = function(word_value, callback){
        var conn = connect();
        var sql = `select * from words where word_value like "${word_value}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryBySomeValue = function(word_value, callback){
        var conn = connect();
        var sql = `select * from words where word_value like "%${word_value}%";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryByKey = function(word_key, callback){
        var conn = connect();
        var sql = `select * from words where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryBySomeKey = function(word_key, callback){
        var conn = connect();
        var sql = `select * from words where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
}

// var conn = new MySQLUtil();
// conn.insert('throw', '抛出', function(err, res){
//     if(!err && res.affectedRows>0) console.log("Insert Success");
//     else console.log("Insert Failed");
// });
// conn.delete("throw", function(err, res){
// if(!err && res.affectedRows>0) console.log("Delete Success");
// else console.log("Delete Failed");
// });
// conn.setHard("throw", true, function(err, res){
//     if(!err && res.affectedRows>0) console.log("Set Hard Success");
//     else console.log("Set Hard Failed");
// });
// conn.setRepeat("throw", 2, function(err, res){
//     if(!err && res.affectedRows>0) console.log("Set Repeat Success");
//     else console.log("Set Repeat Failed");
// });
// conn.queryAll(function(err,data){
//     if(!err) console.log(data);
//     else console.log("Operation Failed");
// });
// conn.queryByKey("dev", function(err,data){
//     if(!err) console.log(data);
//     else console.log("Operation Failed");
// });
// conn.queryByValue("目", function(err,data){
//     if(!err) console.log(data);
//     else console.log("Operation Failed");
// });