var mysql = require('mysql');

module.exports = function(){
    var connect = function(){ //连接数据库，私有方法
        var conn = mysql.createConnection({ //连接信息
            host     : '127.0.0.1',
            user     : 'newUser',
            password : '123456',
            database : 'translate'
        });
        conn.connect();
        return conn;
    }
    this.insert = function (word_key, word_value, callback){ //插入数据
        var conn = connect();
        var sql = `insert into words(word_key, word_value) values("${word_key}", "${word_value}");`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.delete = function (word_key, callback){ //删除数据
        var conn = connect();
        var sql = `delete from words where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.clear = function (callback){  //清空数据
        var conn = connect();
        var sql = `delete from words;`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.update = function (word_key, word_value, callback){ //更新value
        var conn = connect();
        var sql = `update words set word_value="${word_value}" where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.setHard = function (word_key, word_hard, callback){ //更新hard
        var conn = connect();
        var sql = `update words set word_hard=${word_hard} where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.setRepeat = function(word_key, word_repeat, callback){ //更新repeat
        var conn = connect();
        var sql = `update words set word_repeat=${word_repeat} where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryAll = function(callback){ //查询全部
        var conn = connect();
        var sql = `select * from words;`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryByValue = function(word_value, callback){ //精确查询value
        var conn = connect();
        var sql = `select * from words where word_value like "${word_value}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryBySomeValue = function(word_value, callback){ //模糊查询value
        var conn = connect();
        var sql = `select * from words where word_value like "%${word_value}%";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryByKey = function(word_key, callback){ //精确查询key
        var conn = connect();
        var sql = `select * from words where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
    this.queryBySomeKey = function(word_key, callback){ //模糊查询key
        var conn = connect();
        var sql = `select * from words where word_key="${word_key}";`;
        console.log(sql);
        conn.query(sql, function(err, res){
            callback(err, res);
        });
        conn.end();
    }
}