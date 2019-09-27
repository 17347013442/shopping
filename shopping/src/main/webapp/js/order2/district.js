/**
 * Created by Administrator on 2018/6/5/005.
 */
function getProvince2(){
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
                $("#InvProvince").append("<option value=" + v.ProvinceName + ">" + v.ProvinceName + "</option>");
            });
        }
    });
}
$("#InvProvince").change(function () {
    $("#InvCity").empty().append("<option value=" + "请选择" + ">" + "请选择" + "</option>");
    if($("#InvProvince").val() != "" && $("#InvProvince").val() != "请选择"){
        getCityName2();
    }
});
function getCityName2(){
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "do4A/a/Area/GetCitys",
        dataType: "json",
        async: false,
        data: {
            ProvinceName: $("#InvProvince").val()
        },
        success: function (data) {
            $("#InvCity").empty().append("<option value=" + "请选择" + ">" + "请选择" + "</option>");
            $.each(data, function (i, v) {
                $("#InvCity").append("<option value=" + v.CityName + ">" + v.CityName + "</option>");
            });
            if($("#InvCity").val() != "" && $("#InvCity").val() != "请选择" && $("#InvProvince").val() != "" && $("#InvProvince").val() != "请选择"){
                getCountyName2();
            }
        }
    });
}
$("#InvCity").change(function () {
    if($("#InvCity").val() != "" && $("#InvCity").val() != "请选择" && $("#InvProvince").val() != "" && $("#InvProvince").val() != "请选择"){
        getCountyName2();
    }
});
function getCountyName2(){
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "do4A/a/Area/GetAreas",
        dataType: "json",
        async: false,
        data: {
            CityName: $("#InvCity").val()
        },
        success: function (data) {
            $("#InvDistrict").empty().append("<option value=" + "请选择" + ">" + "请选择" + "</option>");
            $.each(data, function (i, v) {
                $("#InvDistrict").append("<option value=" + v.AreaName + ">" + v.AreaName + "</option>");
            });
        }
    });
}