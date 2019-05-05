var type = null; //语种信息
var origin_val = "auto",target_val = "zh"; //初始语种
var reg_en = /^[a-zA-Z\s_-]+$/; //英文词验证
var reg_zh = /^[\u4e00-\u9fa5]+$/; //中文词验证

$().ready(function(){
    $('#enterance').focus(); //输入框自动聚焦
    init(); //初始化
});

function init(){ //初始化函数
    if(localStorage.getItem("type")){ //存在本地存储，直接读取
        type = JSON.parse(localStorage.getItem("type"));
        create();
    }
    else{ //不存在本地存储，查询所有语种
        $.ajax({
            url: "t/g",
            dataType: "json",
            success: function(res){
                type = res;
                create();

                //进行本地存储，下次使用加速
                localStorage.setItem("type", res);
            }
        });
    }
}

function create(){ //创建语种下拉菜单
    var li = null;
    var from_content = "",to_content = "";
    for(var item in type){
        li = "<li><a href='javascript: void(0);' onclick='fromLang(this)' lang='"+item+"'>"+type[item]+"</a></li>"
        from_content += li;
    }
    $("#from-list").html(from_content);
    $('#origin').html(type.auto + " <span class='caret'></span>");

    for(var item in type){
        li = "<li><a href='javascript: void(0);' onclick='toLang(this)' lang='"+item+"'>"+type[item]+"</a></li>"
        to_content += li;
    }
    $("#to-list").html(to_content);
    $('#target').html(type.zh + " <span class='caret'></span>");
}

function fromLang(el){ //来源语种选择函数
    origin_val = $(el).attr('lang');
    $('#origin').html(type[origin_val] + " <span class='caret'></span>");
    layer.msg("<span style='color: orange'>"+type[origin_val]+"</span>"+" 转 "+"<span style='color: lightgreen'>"+type[target_val]+"</span>", {icon: 0});
}

function toLang(el){ //翻译语种选择函数
    target_val = $(el).attr('lang');
    $('#target').html(type[target_val] + " <span class='caret'></span>");
    layer.msg("<span style='color: orange'>"+type[origin_val]+"</span>"+" 转 "+"<span style='color: lightgreen'>"+type[target_val]+"</span>", {icon: 0});
}

function getRepeat(obj){ //查重函数
    $.ajax({
        url: "t/a",
        type: "get",
        data: obj,
        dataType: "json",
        success: function(res){
            if(res.state==0){
                layer.msg("查询重复失败", {icon: 2});
            }
            else if(res.state>1){
                layer.msg("有查询过该词哦~", {icon: 0});
            }
        }
    })
}

$('#enterance').keydown(function(e){ //给输入框添加enter键监听
    if(e.keyCode == 13) $('#start').click();
})

$('#start').click(function(){ //翻译键点击事件
    var iVal = $('#enterance').val();
    $.ajax({
        url: "t/q",
        type: "get",
        data: 'key=' + iVal + '&from=' + origin_val + '&to=' + target_val,
        dataType: "json",
        success: function(res){
            var dst = res.dst;
            var state = res.state;
            $("#result").val(dst);
            if(state==0) layer.msg("网络繁忙，请重试", {icon: 5});

            //来源与翻译语种符合中英文时，执行查重函数
            if(reg_en.test(iVal) && reg_zh.test(dst)){
                getRepeat({"en": iVal, "zh": dst});
            }
            else if(reg_en.test(dst) && reg_zh.test(iVal)){
                getRepeat({"en": dst, "zh": iVal});
            }
        }
    })
})