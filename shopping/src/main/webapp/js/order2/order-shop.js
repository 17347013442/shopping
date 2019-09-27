/**
 * Created by Administrator on 2018/7/4/004.
 */
function zgetProvince(){
    $.ajax({
        type:"GET",
        url: $.url.webUrl + "do4A/a/Area/GetProvince",
        dataType:"json",
        async: false,
        data: {
            CountyName: "中国"
        },
        success: function (data) {
            $.each(data, function (i, v) {
                $("#zProvinceName").append("<option value=" + v.ProvinceName + ">" + v.ProvinceName + "</option>");
            });
            //$("#zCityName").empty().append("<option value=" + "请选择" + ">" + "请选择" + "</option>");
        }
    });
}
$(function(){
    $("#zProvinceName").change(function () {
        $("#zCityName").empty().append("<option value=" + "" + ">" + "请选择" + "</option>");
        if($("#zProvinceName").val() != "" && $("#zProvinceName").val() != "请选择"){
            zgetCityName();
        }
        BaiDuMap()
    });
    $("#zCityName").change(function () {
        if($("#zCityName").val() != "" && $("#zCityName").val() != "请选择" && $("#zProvinceName").val() != "" && $("#zProvinceName").val() != "请选择"){
            zgetCountyName();
        }
        BaiDuMap()
    });
    $("#zCountyName").change(function () {
        BaiDuMap()
    });
});

function zgetCityName(){
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "do4A/a/Area/GetCitys",
        dataType: "json",
        async: false,
        data: {
            ProvinceName: $("#zProvinceName").val()
        },
        success: function (data) {
            $("#zCityName").empty().append("<option value=" + "" + ">" + "请选择" + "</option>");
            $.each(data, function (i, v) {
                $("#zCityName").append("<option value=" + v.CityName + ">" + v.CityName + "</option>");
            });
            if($("#zCityName").val() != "" && $("#zCityName").val() != "请选择" && $("#zProvinceName").val() != "" && $("#zProvinceName").val() != "请选择"){
                zgetCountyName();
            }
        }
    });
}

function zgetCountyName(){
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "do4A/a/Area/GetAreas",
        dataType: "json",
        async: false,
        data: {
            CityName: $("#zCityName").val()
        },
        success: function (data) {
            $("#zCountyName").empty().append("<option value=" + "" + ">" + "请选择" + "</option>");
            $.each(data, function (i, v) {
                $("#zCountyName").append("<option value=" + v.AreaName + ">" + v.AreaName + "</option>");
            });
        }
    });
}