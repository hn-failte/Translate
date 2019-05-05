$().ready(function(){
    $.ajax({ //获取所有单词
        url: "t/n",
        type: "get",
        dataType: "json",
        success: function(res){
            fillTable(res); //用数据填充表格
            arr = res;
        }
    })
})

function fillTable(arr){ //填充表格函数
    var content = "";
    var wHard;
    for (var item of arr) {
        wHard = item["word_hard"]==0 ? "glyphicon glyphicon-star-empty" : "glyphicon glyphicon-star";
        wHardState = item["word_hard"];
        content += `<tr>
                    <td>${item["word_key"]}</td>
                    <td>${item["word_value"]}</td>
                    <td><span class="${wHard}"  bState="${wHardState}"></span></td>
                    <td>${item["word_repeat"]}</td>
                    <td>
                        <a href="javascript: void(0);" class="btn btn-info" onclick="markData(this)">重要</a>
                        <a href="javascript: void(0);" class="btn btn-danger" onclick="deleteData(this)">删除</a>
                    </td>
                    </tr>`;
    }
    $("#dynimic").html(content);
    total(arr); //统计
}

function total(arr) { //统计函数
    var count_1 = arr.length;
    var count_2 = arr.filter(function(item, index){
        return item["word_hard"]==1;
    }).length;
    var count_3 = arr.filter(function(item, index){
        return item["word_repeat"]>1;
    }).length;
    $("#count_1").text(count_1);
    $("#count_2").text(count_2);
    $("#count_3").text(count_3);
}

function markData(el){ //重要单词标记函数
    $.ajax({
        url: "t/m",
        type: "get",
        data: {"key": $(el).parent().parent().children().eq(0).text(), "flag": $(el).parent().parent().children().eq(2).children().attr("bState")},
        dataType: "json",
        success: function(res){
            if(res["state"]>0){
                if(res.data){
                    $(el).parent().parent().children().eq(2).html('<span class="glyphicon glyphicon-star" bState="1"></span>');
                    layer.msg("添加标注", {icon: 1});
                    $("#count_2").text(Number($("#count_2").text())+1);
                }
                else{
                    $(el).parent().parent().children().eq(2).html('<span class="glyphicon glyphicon-star-empty" bState="0"></span>');
                    layer.msg("取消标记", {icon: 1});
                    $("#count_2").text(Number($("#count_2").text())-1);
                }
            }
            else layer.msg("标记失败", {icon: 2});
        }
    })
}
function deleteData(el){ //删除数据
    $.ajax({
        url: "t/d",
        type: "get",
        data: {"key": $(el).parent().parent().children().eq(0).text()},
        dataType: "json",
        success: function(res){
            if(res["state"]>0){
                $("#count_1").text(Number($("#count_1").text())-1);
                if($(el).parent().parent().children().eq(2).children().attr("bState")==1)
                    $("#count_2").text(Number($("#count_2").text())-1);
                $(el).parent().parent().remove();
                if($(el).parent().parent().children().eq(3).text()>1)
                    $("#count_3").text(Number($("#count_3").text())-1);
                $(el).parent().parent().remove();
                layer.msg("删除成功", {icon: 1});
            }
            else layer.msg("删除失败", {icon: 2});
        }
    })
}
function clearAll(){ //清空数据
    if($("#dynimic").html()==""){
        layer.msg("当前没有数据", {icon: 2});
        return;
    }
    layer.prompt({title: '输入“清空”继续操作？', formType: 0}, function(pass, index){
        if(pass=="清空"){
            $.ajax({
                url: "t/c",
                type: "get",
                dataType: "json",
                success: function(res){
                    if(res["state"]>0) {
                        $("#dynimic").html("");
                        layer.msg("已清空", {icon: 1});
                        $("#count_1").text(0);
                        $("#count_2").text(0);
                        $("#count_3").text(0);
                    }
                    else layer.msg("清空失败", {icon: 2}, function(){
                        location.reload();
                    });
                }
            })
            layer.close(index);
        }
    });
    $(document).keydown(function(e){ //layer层按键监听
        if(e.keyCode==13) $(".layui-layer-btn0").click();
        if(e.keyCode==27) $(".layui-layer-btn1").click();
    })
}