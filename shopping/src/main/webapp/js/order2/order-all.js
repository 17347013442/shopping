/**
 * Created by Administrator on 2018/5/21/021.
 */

function chooseAddress(id) {
    $(".defaultAddress").removeClass("defaultAddress").addClass("otherAddress")
    $("#" + id + "").removeClass("otherAddress").addClass("defaultAddress")
    $(".lowertriangular img").css("display", "none");
    $("#" + id + "").find(".lowertriangular img").css("display", "block");
    var paraTrans = {
        TargetCountry: $(".defaultAddress").attr("data-Country"),
        TargetProvince: $(".defaultAddress").attr("data-Province"),
        TargetCity: $(".defaultAddress").attr("data-City"),
        TargetDistrict: $(".defaultAddress").attr("data-County"),
        Prods: products
    };
    isSaleOrderTrans(paraTrans, 1, orderSubmitPrice);
    //设为默认
    // $.ajax({
    //     type: "get",
    //     url: $.url.webUrl + "doB2C/B2Ca2_B_CustomerAddress/"+ id,
    //     headers: {"Authorization": "Bearer " + $.cookie("accessToken")},
    //     "content-type": "text/json",
    //     success: function (data) {
    //         data.IsDefault=1;
    //         $.ajax({
    //             type: "put",
    //             url: $.url.webUrl + "doB2C/B2Ca2_B_CustomerAddress",
    //             headers: {"Authorization": "Bearer " + $.cookie("accessToken")},
    //             beforeSend: function (xhr) {
    //                 xhr.setRequestHeader("Content-Type", 'application/json');
    //             },
    //             timeout: 100000,
    //             data: JSON.stringify(data),
    //             success: function (data) {
    //                 getAddresslist();
    //             }
    //         });
    //     },
    //     error: function (request, status, error) {
    //         if (!request.responseText) {
    //             request.responseText = "系统错误";
    //         }
    //         dialogModule.iTips("提示信息", request.responseText, "提示信息");
    //     }
    // });
}

function invoiceSave() {
    Invoices = [];
    var invphone = $(".defaultAddress").find(".defaultAddressMessage").find("p").eq(3).html();
    if ($("#isneed").prop("checked")) {
        if ($('#InvTIN').val() === '1') {
            Invoices.push({
                Type: '0',
                InvTitle: $('#value1').val(),
                InvoiceType: $("#InvoiceType").val(),
                InvTIN: $('#value2').val(),
                Comment: $("#Comment").val(),
                InvRegAddr: '',
                InvRegPhone: '',
                InvBankName: '',
                InvBankAccount: '',
                InvPersonName: '',
                InvPhone: invphone,
                InvEmail: '',
                InvProvince: '',
                InvCity: '',
                InvDistrict: '',
                InvAddress: '',
                Comment: ''
            });
        }

        if ($('#InvTIN').val() === '2') {
            Invoices.push({
                Type: '1',
                InvTitle: $('#value1').val(),
                InvoiceType: $("#InvoiceType").val(),
                InvTIN: $('#value2').val(),
                Comment: $("#Comment").val(),
                InvRegAddr: '',
                InvRegPhone: '',
                InvBankName: '',
                InvBankAccount: '',
                InvPersonName: '',
                InvPhone: invphone,
                InvEmail: '',
                InvProvince: '',
                InvCity: '',
                InvDistrict: '',
                InvAddress: '',
                Comment: ''
            });
        }

        if ($('#InvTIN').val() === '2' && $('#value1').val() == '') {
            dialogModule.iTips("请填写公司名称");
            return false
        }
        if ($('#InvTIN').val() === '2' && $('#value2').val() == '') {
            dialogModule.iTips("请填写纳税人识别号");
            return false
        }
        
        if($('#InvTIN').val() === '2'){
        	//公司-单位名称校验
			let reg=/^[\u4e00-\u9fa5\（\）]+$/
	        if(!reg.test($("#value1").val())){
	        	dialogModule.iTips("请输入正确的公司名称")
	        	return false;
	        }else if($("#value1").val().length>40){
	        	dialogModule.iTips("公司名称过长")
	        	return false;
	        }
	        //公司-税号校验
			let reg1=/^[A-Z\d]+$/
			if(!reg1.test($("#value2").val())){
	        	dialogModule.iTips("请输入正确的税号")
	        	return false;
	        }else if($("#value2").val().length != 18){
	        	dialogModule.iTips("税号格式不正确")
	        	return false;
	        }
        }
        
        $("#IsAutoBill").html("是");
        dialogModule.iTips("保存成功");
        if ($("#InvoiceType").val() == 0) {
            $("#fp1").html("增值税发票");
        } else if ($("#InvoiceType").val() == 1) {
            $("#fp1").html("普通发票");
        } else if ($("#InvoiceType").val() == 2) {
            $("#fp1").html("电子发票");
        }
        if ($("#Comment").val() == 1) {
            $("#fp3").html("明细");
        }
        if ($("#InvTIN").val() == 1) {
            $("#fp2").html("个人");
        } else {
            $("#fp2").html("公司");
        }
        $('.ClNone').show()
    } else {
        $('.ClNone').hide()
        Invoices.push({
            Type: '1',
            InvoiceType: $("#InvoiceType").val(),
            InvTIN: '',
            InvTitle: '',
            Comment: $("#Comment").val(),
            InvRegAddr: '',
            InvRegPhone: '',
            InvBankName: '',
            InvBankAccount: '',
            InvPersonName: '',
            InvPhone: invphone,
            InvEmail: '',
            InvProvince: '',
            InvCity: '',
            InvDistrict: '',
            InvAddress: '',
            Comment: ''
        });
        dialogModule.iTips("保存成功");
        $("#IsAutoBill").html("否");
    }

    invoiceCancel();
}

function hideFP(b) {
    if (b) {
        $(".myP").find("u").not(":first").hide();
    } else {
        $(".myP").find("u").not(":first").each(function () {
            if ($(this).find("strong").html() != "") {
                $(this).show();
            }
        });
    }
}
// function hideFP(){
//     if($("#isneed").prop("checked")){
//         $(".myP").find("u").not(":first").each(function(){
//             if($(this).find("strong").html()!=""){
//                 $(this).show();
//             }
//         });
//     }else{
//         $(".myP").find("u").not(":first").hide();
//     }
// }

function invoiceCancel() {
    $(".myP").show();
    $("#invoiceEdit").hide();
}

//检查运费
function isSaleOrderTrans(para, mark, price, flg, title) {
    //去掉多余参数
    var transProds = [];
    for (var i = 0; i < para.Prods.length; i++) {
        transProds.push({
            ProdPriceId: para.Prods[i].ProdPriceId,
            Count: para.Prods[i].Count
        });
    }


    $.ajax({
        type: "POST",
        url: $.url.webUrl + "doB2C/B2Ca2_B_SaleOrderTrans",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", 'application/json');
        },
        headers: { "Authorization": "Bearer " + $.cookie("accessToken") },
        data: JSON.stringify({
            TargetCountry: '中国',
            TargetProvince: para.TargetProvince,
            TargetCity: para.TargetCity,
            TargetDistrict: para.TargetDistrict,
            Prods: transProds,
            VenderId: localStorage.getItem("VenderId"),

        }),

        success: function (data) {

            var flag = true;
            for (var k = 0; k < data.Prods.length; k++) {
                if (!data.Prods[k].IsHasStore) {
                    flag = false;
                }
                for (var p = 0; p < para.Prods.length; p++) {
                    if (para.Prods[p].ProdPriceId == data.Prods[k].ProdPriceId && flg != 1) {
                        para.Prods[p].WareId = data.Prods[k].WareId;
                        para.Prods[p].BatchNo = data.Prods[k].BatchNo;
                    }
                }

            }
            if (flg != 1) {
                var cutMoney = $("#cutMoney").attr('data-money');
                $("#transMoney").text("¥ " + (data.TransMoney / 100).toFixed(2))
                    .attr("data-money", (data.TransMoney / 100));
                $("#prodMoney").attr('data-money', price);
                $("#shouldMoney").text("¥ " + (data.TransMoney / 100 + price - cutMoney).toFixed(2))
                    .attr('data-money', (data.TransMoney / 100 + price - cutMoney));
                $("#shouldMoney2").html("¥ " + (data.TransMoney / 100 + price - cutMoney).toFixed(2));
            } else {
                var cutMoney = $("#cutMoney").attr('data-money');
                $("#transMoney").text("¥ " + 0.00)
                    .attr("data-money", 0);
                $("#prodMoney").attr('data-money', price);
                $("#shouldMoney").text("¥ " + (price - cutMoney).toFixed(2))
                    .attr('data-money', (data.TransMoney / 100 + price - cutMoney));
                $("#shouldMoney2").html("¥ " + (price - cutMoney).toFixed(2));
            }


            if (mark == 1) return;

            if (flag) {
                submitOrder(para);
            } else {
                console.log(para)
                var html = "";
                for (var i = 0; i < para.Prods.length; i++) {

                    for (var j = 0; j < data.Prods.length; j++) {
                        if (para.Prods[i].ProdPriceId === data.Prods[j].ProdPriceId && data.Prods[j].IsHasStore === false) {
                            html += para.Prods[i].Title + ',   '
                            dialogModule.iTips(para.Prods[i].Title + "商品库存不足");
                        }
                    }
                }
                dialogModule.iTips(html + "商品库存不足");
                $("#wait").hide();
                $("#sub").show();
            }
        }
    });
}

var name = null
$(function () {
    $.ajax({
        type: "get",
        url: $.url.webUrl + "do4A/a2/MyInformation",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", 'application/json');
        },
        headers: { "Authorization": "Bearer " + $.cookie("accessToken") },
        success: function (data) {
            name = data.Name
        }
    })

    $("#InvTIN").change(function (e) {
        if ($('#InvTIN').val() === '2') {
            $('#classValue').show()
        } else {
            $('#classValue').hide()
        }
    })
})

//提交订单
function submitOrder(para) {
    //去掉多余参数
    if (DisplayId == 1) {
        para.Label = 6;     //展示区是私房礼
    }
    var prodProds = [];
    for (var i = 0; i < para.Prods.length; i++) {
        prodProds.push({
            ProdPriceId: para.Prods[i].ProdPriceId,
            Count: Number(para.Prods[i].Count),
            SaleCartId: para.Prods[i].SaleCartId,
            WareId: para.Prods[i].WareId,
            SalePrice: para.Prods[i].SalePrice
        });
    }
    para.Prods = prodProds;


    // if(para.Pays.length == 0){
    //     var jsonS = {}
    //     para.Pays.push(jsonS)
    // }
    // if (para.Pays.length == 0) {
    //     var json = {
    //         Comment = ""
    //     }
    //     para.Pays.push(json)
    // }

    var $para = {};
    var $IsAutoBill = "";
    if ($("#isneed").prop("checked")) {
        $IsAutoBill = "1"; //开发票
        if (!para.Invoices[0].InvoiceType) {
            para.Invoices[0].InvoiceType = 0
            para.Invoices[0].InvType = '1'
        }
        if (!para.Invoices[0].InvoiceMoney) {
            var money = $("#shouldMoney").html().split(" ")[1]
            para.Invoices[0].InvoiceMoney = 0
            para.Invoices[0].InvType = '1'
        }
        if ($('#InvTIN').val() === '1') {
            var invphone = $(".defaultAddress").find(".defaultAddressMessage").find("p").eq(3).html();
            para.Invoices[0].InvTitle = '个人'
            para.Invoices[0].InvoiceType = Number($("#InvoiceType").val()),
                para.Invoices[0].InvTIN = '',
                para.Invoices[0].Comment = $("#Comment").val(),
                para.Invoices[0].InvRegAddr = '',
                para.Invoices[0].InvRegPhone = '',
                para.Invoices[0].InvBankName = '',
                para.Invoices[0].InvBankAccount = '',
                para.Invoices[0].InvPersonName = '',
                para.Invoices[0].InvPhone = invphone,
                para.Invoices[0].InvEmail = '',
                para.Invoices[0].InvProvince = '',
                para.Invoices[0].InvCity = '',
                para.Invoices[0].InvDistrict = '',
                para.Invoices[0].InvAddress = '',
                para.Invoices[0].Comment = ''
            para.Invoices[0].InvType = '0'
        }
    } else {
        $IsAutoBill = "0"; //不开发票
        para.Invoices = [];
    }

    $para = {
        "VenderId": para.VenderId,
        "TransType": para.TransType,
        "TransTime": para.TransTime,
        "TargetUser": para.TargetUser,
        "TargetPhone": para.TargetPhone,
        "TargetCountry": '中国',
        "TargetProvince": para.TargetProvince,
        "TargetCity": para.TargetCity,
        "TargetDistrict": para.TargetDistrict,
        "TargetAddress": para.TargetAddress,
        "Message": para.Message,
        "Label": para.Label,
        "IsAutoBill": $IsAutoBill,
        "Prods": para.Prods,
        "Invoices": para.Invoices,
        "Pays": para.Pays
    }

    if (getRequest()["typeid"] === 'D2019040309575713') {
        $para.Label = '6'
    } else {
        $para.Label = '2'
    }

    $.ajax({
        type: "POST",
        url: $.url.webUrl + "doB2C/B2Ca2_B_SaleOrder",
        headers: { "Authorization": "Bearer " + $.cookie("accessToken") },
        data: JSON.stringify($para),
        contentType: "application/json",
        success: function (data) {
            var $money = $("#shouldMoney2").html().replace("¥ ", "") * 100
            if (data.Statue == 2) {
                window.location.href = "order-pay-success.html?OrderId=" + data.OrderId + "&$money=" + $money;
            } else if (data.Statue == 0) {
                window.location.href = "order-pay.html?OrderId=" + data.OrderId + "&$money=" + $money;
            } else if (data.Statue == 1) {
                dialogModule.iTips("订单已取消");
                window.location.href = "order-list.html"
            } else {
                dialogModule.iTips("下单失败");
                $("#wait").hide();
                $("#sub").show();
            }
        }
    });
}
//    点击确认
function addressBtn() {
    $.ajax({
        type: "post",
        url: $.url.webUrl + "doB2C/B2Ca2_B_CustomerAddress",
        headers: { "Authorization": "Bearer " + $.cookie("accessToken") },
        timeout: 100000,
        data: {
            Country: '中国',
            Province: $("#ProvinceName").val(),
            City: $("#CityName").val(),
            District: $("#CountyName").val(),
            Address: $("#DetailAddress").val(),
            IsDefault: $("#IsDefault").prop("checked") ? 1 : 0,
            PostCode: $("#PostCode").val(),
            PersonName: $("#PersonName").val(),
            Phone: $("#CellPhone").val()
        },
        success: function (data) {
            dialogModule.iTips("添加成功");
            $('.defaultAdd').css({ 'display': 'block' }); //默认地址 隐藏
            $('#addAddress').css({ 'display': 'none' }); //添加地址 显示
            $("#addAddressBtn").show();
            getAddresslist();
        }
    });
}
function delAddress(id) {
    $.ajax({
        url: $.url.webUrl + "doB2C/B2Ca2_B_CustomerAddress/" + id,
        headers: { "Authorization": "Bearer " + $.cookie("accessToken") },
        type: "delete",
        cache: false,
        success: function (data) {
            dialogModule.iTips("删除成功");
            getAddresslist();
        },
        error: function (request, status, error) {
            if (!request.responseText) {
                request.responseText = "系统错误";
            }
            $.message.alert("提示信息", request.responseText, "提示信息");
        }
    });
}
function getCountry() {
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "do4A/a/Area/GetProvince",
        dataType: "json",
        async: false,
        data: {
            CountyName: "中国"
        },
        success: function (data) {
            $.each(data, function (i, v) {
                $("#ProvinceName").append("<option value=" + v.ProvinceName + ">" + v.ProvinceName + "</option>");
            });
            //$("#zCityName").empty().append("<option value=" + "请选择" + ">" + "请选择" + "</option>");
        }
    });
}
$("#ProvinceName").change(function () {
    $("#CityName").empty().append("<option value=" + "请选择" + ">" + "--请选择--" + "</option>");
    if ($("#ProvinceName").val() != "" && $("#CountryName").val() != "请选择") {
        getProvince();
    }
    $("#CityName").empty().append("<option value=" + "请选择" + ">" + "请选择" + "</option>");
});
function getProvince() {
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "do4A/a/Area/GetProvince",
        dataType: "json",
        async: false,
        data: {
            CountyName: $("#CountryName").val()
        },
        success: function (data) {
            $.each(data, function (i, v) {
                $("#ProvinceName").append("<option value=" + v.ProvinceName + ">" + v.ProvinceName + "</option>");
            });
            $("#CountyName").empty().append("<option value=" + "请选择" + ">" + "--请选择--" + "</option>");
        }
    });
}
$("#ProvinceName").change(function () {
    $("#CityName").empty().append("<option value=" + "请选择" + ">" + "--请选择--" + "</option>");
    if ($("#ProvinceName").val() != "" && $("#ProvinceName").val() != "请选择") {
        getCityName();
    }
    //        $("#CountyName").empty().append("<option value=" + "请选择" + ">" + "请选择" + "</option>");
});
function getCityName() {
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "do4A/a/Area/GetCitys",
        dataType: "json",
        async: false,
        data: {
            ProvinceName: $("#ProvinceName").val()
        },
        success: function (data) {
            $("#CityName").empty().append("<option value=" + "请选择" + ">" + "--请选择--" + "</option>");
            $.each(data, function (i, v) {
                $("#CityName").append("<option value=" + v.CityName + ">" + v.CityName + "</option>");
            });
            if ($("#CityName").val() != "" && $("#CityName").val() != "请选择" && $("#ProvinceName").val() != "" && $("#ProvinceName").val() != "请选择") {
                getCountyName();
            }
        }
    });
}
$("#CityName").change(function () {
    if ($("#CityName").val() != "" && $("#CityName").val() != "请选择" && $("#ProvinceName").val() != "" && $("#ProvinceName").val() != "请选择") {
        getCountyName();
    }
});
function getCountyName() {
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "do4A/a/Area/GetAreas",
        dataType: "json",
        async: false,
        data: {
            CityName: $("#CityName").val()
        },
        success: function (data) {
            $("#CountyName").empty().append("<option value=" + "请选择" + ">" + "请选择" + "</option>");
            $.each(data, function (i, v) {
                $("#CountyName").append("<option value=" + v.AreaName + ">" + v.AreaName + "</option>");
            });
            if ($("#CityName").val() != "" && $("#CityName").val() != "请选择" && $("#ProvinceName").val() != "" && $("#ProvinceName").val() != "请选择" && $("#CountyName").val() != "" && $("#CountyName").val() != "请选择") {
                //                    getPostCode();
            }
        }
    });
}
$("#CountyName").change(function () {
    if ($("#CityName").val() != "" && $("#CityName").val() != "请选择" && $("#ProvinceName").val() != "" && $("#ProvinceName").val() != "请选择" && $("#CountyName").val() != "" && $("#CountyName").val() != "请选择") {
        //            getPostCode();
    }
});
function getPostCode() {
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "do4A/a/Area/GetPostCode",
        dataType: "json",
        async: false,
        data: {
            ProvinceName: $("#ProvinceName").val(),
            CityName: $("#CityName").val(),
            CountyName: $("#CountyName").val()
        },
        success: function (data) {
            if (data) {
                $("#PostCode").val(data);
            }
        }
    });
}
//获取购物卡列表
function getCardLikst() {
    $.ajax({
        type: "GET",
        url: $.url.webUrl + "doB2C/B2Ca2_B_MyCard",
        //url:"../json/myCard.json",
        headers: { "Authorization": "Bearer " + $.cookie("accessToken") },
        dataType: "json",
        success: function (data) {
            data.forEach(function (v) {
                if (v.create_time) {
                    v.create_time = v.create_time.split("T")[0];
                }
                if (v.start_time) {
                    v.start_time = v.start_time.split("T")[0];
                }
                if (v.end_time) {
                    v.end_time = v.end_time.split("T")[0];
                }
                if (v.total_money != null || v.total_money != undefined) {
                    v.total_money = (v.total_money / 100).toFixed(2);
                }
            });
            $(".xg_topLine tbody[id='cardBody']").empty().append(template("tbody-cell", { returnJson: data }));
        }
    });
}

function useCardDD() {
    if ($('#lipinkaforOrderPassword').val() == '' || $('#lipinkaforOrderCard').val() == '') {
        dialogModule.iTips("卡号或密码均不能为空");
        return false
    }
    $.ajax({
        type: "POST",
        url: $.url.webUrl + "doB2C/B2Ca2_B_MyCard",
        headers: { "Authorization": "Bearer " + $.cookie("accessToken") },
        dataType: "json",
        async: false,
        contentType: "application/json",
        data: JSON.stringify({
            card_code: $.trim($('#lipinkaforOrderCard').val()),
            card_password: $.trim($('#lipinkaforOrderPassword').val())
        }),
        success: function (data) {
            dialogModule.iTips("礼品卡绑定成功，请5分钟之后使用礼品卡");
            $('#lipinkaforOrderCard').val('');
            $('#lipinkaforOrderPassword').val('');
            myCard();//重新调用礼品卡接口获取数据
        },
        error: function (xhr) {
            if (xhr.status == 200) {
                dialogModule.iTips("礼品卡绑定成功，请5分钟之后使用礼品卡");
                $('#lipinkaforOrderCard').val('');
                $('#lipinkaforOrderPassword').val('');
                myCard();//重新调用礼品卡接口获取数据
            } else {
                if (xhr.responseText) {
                    dialogModule.iTips(xhr.responseText);
                }
            }

        }
    });
}

//使用购物卡
function useCard() {
    var total = 0;
    Pays = []
    $("input[name='checkCard']").each(function () {
        var paytype = {};
        if ($(this).prop('checked')) {
            var GiftCard = $(this).parent().parent().find("input[name='GiftCard']").val() * 100;
            var optMoney = parseInt(GiftCard.toFixed(2));
            var totalMoney = $(this).parent().parent().find("td:eq(3)").html();
            var CardPassword = $(this).attr("data-pass");
            var Comment = $(this).parent().parent().find("input[name='Comment']").val();
            var due = $(this).parent().parent().find("td:eq(5)").html(); //有限期
            var CardCode = $(this).parent().parent().find("input[name='checkCard']").val();
            if (!optMoney) {
                optMoney = 0;
            }
            if (optMoney == 0) {
                dialogModule.iTips("使用金额应大于0元");
                return false;
            }
            var shouldMoney = $("#shouldMoney").attr("data-money") * 100;
            shouldMoney = parseInt(Number(shouldMoney).toFixed(2));
            var a = new Date();
            var b = new Date(due);
            console.log(optMoney)
            console.log(totalMoney * 100)
            console.log(shouldMoney)
            if (a.getTime() > b.getTime()) {
                dialogModule.iTips("礼品卡已过期");
                return false;
            } else if (optMoney > totalMoney * 100) {
                dialogModule.iTips("不能超过礼品卡剩余金额");
                return false;
            } else if (optMoney > shouldMoney) {
                dialogModule.iTips("不能超过应付金额");
                return false;
            } else if (optMoney > 0) {
                paytype.PayTotal = optMoney;
                paytype.Comment = CardCode
                total += optMoney;
                paytype.PayType = 3;
                paytype.Data = JSON.stringify({
                    CardCode: CardCode,
                    CardType: "",
                    Comment: ''
                });
                Pays.push(paytype);
            }
        }
    });
    check();

    $("#cutMoney").attr('data-money', (total / 100)).text("-¥ " + (total / 100).toFixed(2));
    var sm = $("#shouldMoney").attr("data-money");
    sm = Number(sm).toFixed(2)
    if (total != 0) {
        if (parseFloat(total / 100).toFixed(2) > parseFloat(sm)) {
            dialogModule.iTips("不能超过应付金额");
            return false;
        }
        $("#warn").html("您即将使用" + (total / 100).toFixed(2) + "元礼品卡")
    } else {
        $("#warn").html("");
    }
    $("#shouldMoney").text("¥ " + (sm - total / 100).toFixed(2));
    $("#shouldMoney2").text("¥ " + (sm - total / 100).toFixed(2));
}

// 获取选中checkbox
function check() {
    var obj = document.getElementsByName("checkCard");
    var check_val = [];
    for (k in obj) {
        if (obj[k].checked)
            check_val.push(obj[k].value);
    }
    var count = check_val.length;
    if (count == "0") {
        dialogModule.iTips("请选择您即将使用的礼品卡");
        return false;
    }
}


