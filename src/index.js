var type = null;
var li = null;
var from_content = "",to_content = "";
var origin_val = "auto",target_val = "zh";
var reg_en = /^[a-zA-Z\s_-]+$/;
var reg_zh = /^[\u4e00-\u9fa5]+$/;

$().ready(function(){
    $('#enterance').focus();
    $.ajax({
        url: "t/g",
        dataType: "json",
        success: function(res){
            localStorage.setItem("type", res);
            init();
        }
    });
});

function init(){
    type = JSON.parse(localStorage.getItem("type"));
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

function fromLang(el){
    origin_val = $(el).attr('lang');
    $('#origin').html(type[origin_val] + " <span class='caret'></span>");
}

function toLang(el){
    target_val = $(el).attr('lang');
    $('#target').html(type[target_val] + " <span class='caret'></span>");
}

function getRepeat(obj){
    $.ajax({
        url: "t/a",
        type: "get",
        data: obj,
        dataType: "json",
        success: function(res){
            console.log(res);
        }
    })
}

$('#start').click(function(){
    var iVal = $('#enterance').val();
    $.ajax({
        url: "t/q",
        type: "get",
        data: 'key=' + iVal + '&from=' + origin_val + '&to=' + target_val,
        dataType: "json",
        success: function(res){
            var dst = res.dst;
            $("#result").val(dst);

            if(reg_en.test(iVal) && reg_zh.test(dst)){
                console.log("do");
                
                getRepeat({"en": iVal, "zh": dst});
            }
            else if(reg_en.test(dst) && reg_zh.test(iVal)){
                console.log("do2");
                getRepeat({"en": dst, "zh": iVal});
            }
        }
    })
})