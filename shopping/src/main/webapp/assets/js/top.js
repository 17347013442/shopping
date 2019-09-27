/**
 * Created by duanyan on 2018/5/26.
 */
var timeout         = 500;
var closetimer		= 0;
var ddmenuitem      = 0;

//企业用户 头部提示
$(document).ready(function() {
    $(".top-notice p").remove();
    $.ajax({
        type : "GET",
        url : "/ajax/user/iscompanystatus",
        success : function(data) {
            $(".top-notice").prepend(data);
            if ($('#iscompanystatus').val() == 1) {
                $(".top-notice").show();
//				/* 新加的js */
                setTimeout(function() {
                    $('#Pop-up').empty().remove();
                }, 5000);
                /* 新加的js */
            }
        }
    });
});


// 商品收藏
function addFavoriteProduct(productId,showId){
    var thisUrl="/product.do?actionType=ajaxaddfavorite&productId="+productId;
    $.ajax({
        type:"GET",
        url:thisUrl,
        success:function(data){
            if(data == "fav_noproduct"){
                $("#"+showId).show();
                $("#"+showId+"info").html('该商品已不存在！');
                $("#product_favoriteimg").addClass("product_favoriteh4");
                $("#product_favoriteimg").removeClass("product_favoriteh3");
                $("#"+showId+"show").hide();
                return;
            }
            if(data == "fav_already"){
                $("#"+showId).show();
                $("#"+showId+"info").attr("color","red");
                $("#"+showId+"info").html('该商品已经收藏！');
                $("#product_favoriteimg").addClass("product_favoriteh4");
                $("#product_favoriteimg").removeClass("product_favoriteh3");
                $(".addtofavourite").removeClass("hasown");

                return;
            }
            if(data == "fav_success"){
                $("#"+showId).show();
                $("#"+showId+"info").html("该商品收藏成功！");
                $("#"+showId+"show").show();
                $(".addtofavourite").removeClass("hasown");
                return;
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            $("#"+showId).show();
            $("#"+showId+"info").html("页面有异常，刷新啊 ！亲！");
            $("#"+showId+"show").hide();
            return;
        }
    });
}



function mopen(id)
{
    mcancelclosetime();
    if(ddmenuitem) ddmenuitem.style.display = 'none';
    ddmenuitem = document.getElementById(id);
    if(ddmenuitem!==null){
        ddmenuitem.style.display = 'block';
    };

}
function mopen(obj,id)
{
    mcancelclosetime();
    if(ddmenuitem) ddmenuitem.style.display = 'none';
    ddmenuitem = document.getElementById(id);
    ddmenuitem.style.display = 'block';
    $(obj).addClass("lay_on");

}

function mclose()
{
    if(ddmenuitem) ddmenuitem.style.display = 'none';
}
function mclosetime()
{
    closetimer = window.setTimeout(mclose, timeout);
}
function mclosetime(obj)
{
    closetimer = window.setTimeout(mclose, timeout);
    $(obj).removeClass("lay_on");
}

function mcancelclosetime()
{
    if(closetimer)
    {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}


//商城首页头部搜索
function searchSubmitForm(act, mapping, messageInfo, channelId){

    if(channelId==''){
        channelId = "index";
    }
    var categoryId = "1";
    if(channelId=="luxury"){
        categoryId = "3";
    }else if(channelId=="special"){
        categoryId = "4";
    }else if(channelId=="electronic"){
        categoryId = "5";
    }
    var fieldNames = "key";
    var fieldValue = document.getElementsByName(act)[0].value;
    var searchUrl = "/search-allsearch_all" + mapping + "?fieldNames=" + fieldNames + "&" + fieldNames + "=" + fieldValue;
    //searchUrl = urlEncode(searchUrl);
    //if(fieldValue && (trim(fieldValue) == "" || fieldValue == messageInfo)){
    if(fieldValue && (trim(fieldValue) == "")){
        alert("请输入" + messageInfo);
        document.getElementsByName(act)[0].value = "";
        document.getElementsByName(act)[0].focus();
        return;
    }else{

        //searchUrl = encodeURI(searchUrl);
        window.location = searchUrl;
    }
}

//将url编码
function urlEncode(urlString){
    return urlString.replace(/\+/g, "%2B");//.replace(/\"/g,"%22").replace(/\'/g, "%27").replace(/\//g,"%2F");
}



//刷新验证码
function flushValidateCode(imgId , imgUrl){
    $("#" + imgId).attr("src",imgUrl + "/ISGOCaptchaServlet");
}

//自动关键字列表展示
function searchKeySelectListShow(searchkeyArray, aebizSearchKeyValueInputId){
    $("#" + aebizSearchKeyValueInputId).autocomplete(searchkeyArray, {
        minChars: 0,
        max: 10,
        autoFill: true,
        mustMatch: false,
        matchContains: true,
        scrollHeight: 420,
        width:278,
        formatItem: function(data, i, total) {
            //alert("0" + data.toString());
            return data[0];
        },
        formatMatch: function(data, i, total) {
            //alert("1" + data.toString());
            return data[0];
        },
        formatResult: function(data) {
            //alert("2" + data.toString());
            return data[0];
        }
    });
}

//自动关键字列表
function getSearchKeyList(searchKey, eventObject, messageInfo){
    //var searchkeys = new Array();
    var isAutocomplete = false;
    /*
     var searchPath = CONTEXT + "/fg/product/shopProductSearchKeylSearch.do?actionType=ajaxList&currentPage=1&rowsPerPage=5&searchKey=" + searchKey;
     $.getJSON(searchPath, function(json){
     var aebizSearchKeyValueInputId = "aebizSearchKeyValueInput";
     for(var jsonIndex = 0;jsonIndex < json.length;jsonIndex++){
     searchkeys[jsonIndex] = json[jsonIndex].searchKey;
     }
     searchKeySelectListShow(searchkeys, aebizSearchKeyValueInputId);
     $("#" + aebizSearchKeyValueInputId).result(function(eventObject, row, formatted){
     isAutocomplete = true;
     searchSubmitForm("key", mappingPath, messageInfo);
     });
     });
     */
    if(eventObject.keyCode == 13 && isAutocomplete){
        searchSubmitForm("key", mappingPath, messageInfo);
        //setTimeout("searchSubmitForm('key', mappingPath, messageInfo)" ,500) ;
    }
}

$(".sub-nav-list-son ol li a").hover(function(){
    $(this).css("color","#7cd8cf")
},function(){
    $(this).css("color","#000")
})
//跳转到首页
function goToHome(){
    window.location.href = "/" ;
}


/*旧index.js*/
//用户登录
function gologin() {
    document.userloginForm.requestPageUrl.value = window.top.location;
    document.userloginForm.actionType.value = "gologin";
    document.userloginForm.submit();
}

//用户注销
function logout1() {
    document.userloginForm.requestPageUrl.value=window.top.location;
    document.userloginForm.actionType.value = "logout";
    document.userloginForm.submit();
}

/*初始化头部购物袋*/
function initCart(){
    var thisUrl = "/cart.do?actionType=ajaxgetcart&date=" + new Date();
    //在提交订单页面
    if($("#order_add")!=null && $("#order_add").val()==1){
        thisUrl = "/cart.do?actionType=ajaxgetcart_orderAdd&date=" + new Date();
    }
    $.getJSON(thisUrl, function(json){
        var _c =$("#productCountsAndTotoalIdBak").val();
        if(_c!=json.count){
            showTopCartManager();
        }
        $("#productCountsAndTotoalIdBak").val(json.count);
        var _cc = json.count>99?"...":json.count;
        $("#productCountsAndTotoalId").html(_cc);
        if($(".miniCartGoodsN")!=null){
            $(".miniCartGoodsN").html(_cc);
        }
        $("#productCountsAndTotoalIdisgo").html(json.count + "");
        $("#productCountsAndTotoalIdTopShow").html("购物车<a href=\"/cart.do?actionType=list\">" + json.count + "</a>件商品");
        $("#productTotoalProductPriceIdTopShow").html("￥" + json.tototalProductPrice);
        $("#productTotoalPromotionPriceIdTopShow").html("-￥" + json.tototalPromotionPrice);
        $("#productTotoalPriceIdTopShow").html("￥" + json.tototal);
    });
}

$(document).ready(function() {
    if($("#order_add")!=null && $("#order_add").val()==1){
        show("/head/jsp/showTopCartManegerIsgoInfo.jsp?from=order_add","showCartBox",false);
    }else{
        show("/head/jsp/showTopCartManegerIsgoInfo.jsp","showCartBox",false);
    }
    initCart();

    //头部导航切换及购物车悬浮显示
    $(".nav02").hover(function(){
        $(".select02").show();
    },function(){
        $(".select02").hide();
    })

    $(".nav03").hover(function(){
        $(".select03").show();
    },function(){
        $(".select03").hide();
    })
    $(".nav04").hover(function(){
        $(".select04").show();
    },function(){
        $(".select04").hide();
    })
    $(".nav05").hover(function(){
        $(".select05").show();
    },function(){
        $(".select05").hide();
    })
    $(".nav06").hover(function(){
        $(".select06").show();
    },function(){
        $(".select06").hide();
    })
    //导航
    $(".wrapper>ul li").hover(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $(".sub-nav-list ul li ").css("background","#FFF")
    },function(){
        $(this).removeClass("current");
        $(".sub-nav-list ul li ").css("background","#FFF")
    })
});

function isEmailMagazine(str,bEmpty){
    if (isNull(str)){
        return bEmpty;
    }
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if(str.match(reg)){
        return true;
    }
    return false;
}

//快速订阅信息
function quickMagazine(magazineEmail,magazineType){
    var emailValue = document.getElementsByName(magazineEmail)[0].value;
    if("请输入您的" + USER_EMAIL == emailValue || null == emailValue || "" == emailValue){
        alert("请输入您的" + USER_EMAIL + "！");
        return;
    }
    if(!isEmailMagazine(emailValue,false)){
        alert("您输入的" + USER_EMAIL + "地址格式不正确！");
        document.getElementsByName(magazineEmail)[0].focus();
        return;
    }
    var thisUrl = "/fg/user/userMagazine.do?actionType=ajaxquicksave&magazineType=" + magazineType + "&quickMagazineEmail=" + emailValue + "&time=" + new Date();
    var returnText = ajaxReTurnXmlCont(thisUrl);
    if("email_already_sub" == returnText){
        alert("您输入的" + USER_EMAIL + "已经订阅了，请重新输入其它" + USER_EMAIL + "！");
        return;
    }else if("magazine_reg_success" == returnText){
        alert("恭喜您，订阅成功啦，并且成功注册为本网站会员！");
        initUserLogin();
        initCart();
        window.location.reload();
    }else if("magazine_login_success" == returnText || "magazine_success" == returnText){
        alert("恭喜您，您订阅成功啦！");
    }else{
        alert("订阅错误，请重新订阅！");
        return;
    }
}

/**
 * Hides all drop down form select boxes on the screen so they do not appear above the mask layer.
 * IE has a problem with wanted select form tags to always be the topmost z-index or layer
 *
 * Thanks for the code Scott!
 */
function hideSelectBoxes() {
    var x = document.getElementsByTagName("SELECT");
    for (i=0;x && i < x.length; i++) {
        x[i].style.visibility = "hidden";
    }

    var windowFrames = window.frames;
    for(var frameIndex = 0;windowFrames && frameIndex < frames.length;frameIndex++){
        var selects = windowFrames[frameIndex].document.getElementsByTagName("SELECT");
        for (var selectIndex = 0;selects && selectIndex < selects.length; selectIndex++) {
            selects[selectIndex].style.visibility = "hidden";
        }
    }
}



/**
 * Makes all drop down form select boxes on the screen visible so they do not
 * reappear after the dialog is closed.
 *
 * IE has a problem with wanting select form tags to always be the
 * topmost z-index or layer.
 */
function displaySelectBoxes() {
    var x = document.getElementsByTagName("SELECT");
    for (i=0;x && i < x.length; i++){
        x[i].style.visibility = "visible";
    }

    var windowFrames = window.frames;
    for(var frameIndex = 0;windowFrames && frameIndex < frames.length;frameIndex++){
        var selects = windowFrames[frameIndex].document.getElementsByTagName("SELECT");
        for (var selectIndex = 0;selects && selectIndex < selects.length; selectIndex++) {
            selects[selectIndex].style.visibility = "visible";
        }
    }
}


/*旧showTopCartManeger.js*/
$(document).ready(function(){
    $.ajaxSetup ({
        cache: false
    });


    //消息中心
    var meobjStr = "#topmessagemanager div.top-gwc";
    $(meobjStr).mouseover(function(){
        $(meobjStr).addClass("isgo-gwdcur");
        $($("#showMessageBox")).show();
    });
    $(meobjStr).hover(function(){},function(){
        $(meobjStr).removeClass("isgo-gwdcur");
        $($("#showMessageBox")).hide();
    });



});

function showTopCartManager(){
    var cruTime=new Date().toLocaleTimeString();
    var thisUrl = "/head/jsp/showTopCartManegerIsgoInfo.jsp";
    if($("#order_add")!=null && $("#order_add").val()==1){
        thisUrl = "/head/jsp/showTopCartManegerIsgoInfo.jsp?from=order_add";
    }
    $("#showCartBox").load(thisUrl,{"dateTime":cruTime});
    $("#goToCart").click(function () {
        gotoCartManeger();
    });
}


//JScript 文件
//通过Url异步调用数据
function ajaxReTurnXmlCont(URL){
    if   (window.XMLHttpRequest){
        isIE   =   false;
        xml   =   new   XMLHttpRequest();
    }else if (window.ActiveXObject) {
        isIE   =   true;
        xml   =   new   ActiveXObject("Microsoft.XMLHTTP");
    }

    try{
        xml.open("get",URL,false);
        xml.send();
    }catch(ex){
    }
    return xml.responseText;
}


function gotoCartManeger(act){
    var thisurl="/cart.do?actionType=list&date=" + new Date();

    window.location.href=thisurl;
}

function removeTopCartProduct(act,orderDetailNo) {
    var thisUrl = "/cart.do?actionType="+act+"&orderDetailNo="+orderDetailNo;
    var result = ajaxReTurnXmlCont(thisUrl);
    switch(parseInt(result,10))
    {
        case 0:
            alert("删除失败！");
            break;
        case 1:
            initCart();
            showTopCartManager();
            break;
    }
}

/**
 * 从购物袋中删除商品。
 *
 * @param actionType
 *            执行方法
 * @param orderDetailNo
 *            订单明细编号
 * @return 没有返回值。
 */
function removeComTopcartproduct(actionType, orderDetailNo) {

    var thisUrl = "/cart.do?actionType=" + actionType
        + "&orderDetailNo=" + orderDetailNo;
    var thisUrl2 = "";

    if ("ajaxremoveproduct" == actionType) {
        show(thisUrl, "cartManagerCountId", false);
    }

    var num = $("#tr_"+orderDetailNo).parent().children().length;
    initCart();
    if(num>1){
        reCountPrice();
        $("#tr_"+orderDetailNo).remove();
    }else{
        showTopCartManager();
    }


}

function reCountPrice(){
    var thisUrl = "/cart.do?actionType=jsongetcartcount&date=" + new Date();
    $.getJSON(thisUrl, function(json){
        $("#cart_productNumber").html(json.productNumber + "");
        $("#productCountsAndTotoalId").html(json.productNumber);
        $("#cart_totalPrice").html("￥" + json.total);
    });
}

function loginUserCenter(){
    $(document).ready(function(){
        $('.usercenter').openDOMWindow({
            height:480,
            positionTop:-10,
            width:545,
            borderColor:'#393939',
            borderSize:'1',
            //eventType:'click',
            positionType:'centered',
            anchoredClassName:'absoluteIframeDOMWindow',
            anchoredSelector:'.absoluteIframeDOMWindow',
            positionLeft:-20,
            windowSource:'iframe',
            windowSourceURL:'/fg/user/login.ftl?actionType=gologin&requestPageUrl=/usercenter/usercenter.do?actionType=usercenter&forwardResult=indexPage',
            overlay:1,
            overlayColor:'#000',
            overlayOpacity:'60',
            windowPadding:0
        });
    });

}

function checklogin(){

    var currentUrl = window.location.href;
    if(currentUrl.indexOf("usercenter")>0||currentUrl.indexOf("/fg/user/user.do?actionType=info")> 0
        ||currentUrl.indexOf("usrcenter")>0||currentUrl.indexOf("fg/product/notify.do?actionType=list")> 0
        ||currentUrl.indexOf("fg/user/userVatinvoice.do?actionType=add")>0
        ||currentUrl.indexOf("/presentcard/presentcardSearch.do?actionType=fglist&init=true")>0){
        window.location="/usercenter/usercenter.do?actionType=usercenter&forwardResult=indexPage";
    }else{
        var url = "/fg/user/user.do?actionType=checklogin&rid="+Math.random();
        var result = ajaxReTurnXmlCont(url);
        if(result == "false"){
            loginShow('mycenter');
        }else{
            window.location="/usercenter/usercenter.do?actionType=usercenter&forwardResult=indexPage";
        }
    }
}
//弹出登录框
function loginShow(id){

    $(document).ready(function(){
        $("#"+id).openDOMWindow({
            height:480,
            positionTop:-10,
            width:545,
            borderColor:'#393939',
            borderSize:'8',
            //eventType:'click',
            positionType:'centered',
            anchoredClassName:'absoluteIframeDOMWindow',
            anchoredSelector:'.absoluteIframeDOMWindow',
            positionLeft:-20,
            windowSource:'iframe',
            windowSourceURL:'/fg/user/login.ftl?actionType=gologin&requestPageUrl=/usercenter/usercenter.do?actionType=usercenter&forwardResult=indexPage',
            overlay:1,
            overlayColor:'#000',
            overlayOpacity:'60',
            windowPadding:0
        });
    });
}


function showMessage(url){
    alert(url);
}

var currentUrl="";

function isgo_message_show(url)
{
    currentUrl = url;


    var aHtml=[];



    aHtml.push("<div id=\"chunjie_box\" style=\"display:block;\">");
    aHtml.push("<div class=\"mubu\"><div class=\"boder_lay\"></div></div>");
    aHtml.push("<div class=\"w_100\">");
    aHtml.push("<div class=\"chunjie_box\">");
    aHtml.push("<i><a href=\"javascript:isgo_message_close();\"><img src=\"../../images/general/closed.gif\"></a></i>");

    aHtml.push("<b><a href=\"javascript:isgo_message_close();\"><img src=\"../../images/LandingPage/chunjie_button.jpg\"></a></b>");
    aHtml.push("</div>");
    aHtml.push("</div>");
    aHtml.push("</div>");


    $(document.body).append(aHtml.join(''));
    parent.$.closeDOMWindow();

}

function isgo_message_close(){

    $('#chunjie_box').hide();
    window.location.href=currentUrl;

}

function initCallbackFx(carousel, obejctli,liindex,listate){
    $("#mycarousel01 li").mouseenter(function(){
        carousel.stopAuto();
    }).mouseleave(function(){
        carousel.startAuto();
    });
}