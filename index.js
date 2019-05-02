var type = null;
var li = null;
var from_content = "",to_content = "";
var origin_val = "auto",target_val = "zh";

$().ready(function(){
    $.ajax({
        url: "t/k",
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

$('#start').click(function(){
    $.ajax({
        url: "t/q",
        method: "get",
        data: 'key=' + $('#enterance').val() + '&from=' + origin_val + '&to=' + target_val,
        success: function(res){
            $("#result").val(res);
        }
    })
})