var cruTime = new Date().toLocaleTimeString();
function needLoginShow(tUrl , targetId , isAdd){
	$.ajax({
		url: tUrl,
		cache: false,
		async:false,
		success: function(html){
			if(isUserNotLogin(html)){
				window.location.href="/login?requestPageUrl=/cart.do?actionType=list";
				return;
			}
			if(isAdd){
				$("#" + targetId).append(html);
			}else{
				$("#" + targetId).html(html);
			}
		}
	});
}
function isUserNotLogin(data) {
	if (data.error == "nologin") {
		return true;
	} else {
		try {
			var obj = eval("(" + data + ")");
			if (obj != null && obj.error != null && obj.error == "nologin") {
				return true;
			}
		} catch (e) {
		}
	}
	return false;
}
function ajaxSetdefault(userInfoId){
	window.location.reload();
	var pageUrl = "/user/ajaxsetdefault?userInfoId="+userInfoId+"&date="+new Date();
	 $.ajax({    
	        type:'get',        
	        url:pageUrl,    
	        cache:false,    
	        success:function(data){ 
	        	if("success"==data){
	        		needLoginShow("/order/addressView?isAjax=true&dateTime=" + new Date(), 'address', false);
	        	}else if("no_id"==data){
	        		window.location.href="/login?requestPageUrl=/cart.do?actionType=list";
	        	}else{
	        		alert("设置失败");
	        	}
	        }    
	    });    
	}

function ajaxRemoveInfo(userInfoId){
	var pageUrl = "/user/ajaxremove?userInfoId="+userInfoId+"&date="+new Date();
	 $.ajax({    
	        type:'get',        
	        url:pageUrl,    
	        cache:false,    
	        success:function(data){ 
	        	if("success"==data){
	        		needLoginShow("/order/addAddress?userInfoId=new&isAjax=true&dateTime=" + new Date(), 'address', false);
	        	}else{
	        		alert("删除失败");
	        	}
	        }    
	    });
}
//编辑地址
function editAddress(){
	$('.defaultAdd').css({'display': 'block'}); //默认地址 隐藏
	$('#addAddress').css({'display': 'none'}); //添加地址 显示
}
function closeAddress(){
	needLoginShow('/order/addressView?isAjax=true&dateTime=' + new Date(), 'address', false);
	$("#sp_eidtAddress").html("[<a onclick=\"editAddress();\">修改</a>]");
}


function checkAddressForm() {
	if($("[id='PersonName']").val().trim() == "") {	
		alert("请填写收货人姓名");
		$("[id='PersonName']").focus();
		return false;
	}

	if($("[id='ProvinceName']").val() == "" || $("[id='ProvinceName']").val() =="请选择") {
		alert("请选择配送省");
		$("[id='ProvinceName']").focus();
		return false;
	}
	if($("[id='CityName']").val() == "" || $("[id='CityName']").val() =="请选择") {
		alert("请选择配送城市");
		$("[id='CityName']").focus();
		return false;
	}
	if($("[id='CountyName']").val() == "" || $("[id='CountyName']").val() =="请选择") {
		alert("请选择配送区县");
		$("[id='CountyName']").focus();
		return false;
	}
	if($("[name='DetailAddress']").val().trim() == "") {
		alert("请填写街道地址");
		$("[name='DetailAddress']").focus();
		return ;
	}
	if($("[name='DetailAddress']").val().length >25) {
		alert("街道地址不能超过25个字符");
		$("[name='DetailAddress']").focus();
		return ;
	}
	
	if($("[name='CellPhone']").val() != ""&&!isMobile($("[name='CellPhone']").val(),true)){
			alert("请填写正确的手机号码。");
			$("[name=CellPhone]").focus();
			return false;
	}
	if($("[name=CellPhone]").val()== ""	&& $("[name='CellPhone']").val()== "" ){
			alert("请填写手机号码。");
			$("[name=CellPhone]").focus();
			return false;
	}
	if(!isChinaCode($("[name='PostCode']").val(), true,6)|| !isNumber($("[name='PostCode']").val(),true)) {
			alert("请填写正确的邮编编码");
			$("[name='PostCode']").focus();
			return false;
	}
	return true;
}
function clearAddress(){
	$("[name='name']").val("");
	$("[name='provincial']").val("");
	$("[name='city']").val("");
	$("[name='region']").val("");
	$("[name='detailAddress']").val("");
	$("[name='zipCode']").val("");
	$("[name='mobileTelephone']").val("");
	$("[name='phoneNumber']").val("");
	$("[name='emailAddress']").val("");
}
var adressOptions = {
		beforeSubmit:  function(){
			return true;
		}, 
		type:'post',
		success: function(html){
			needLoginShow('/order/orderStat','stat_pay', false);
			$('#address').html(html);
			closeAddress();
	    }
  };
function addErrorStyle(name){
	if($("[name='"+name+"']").val()==""){
		$("[name='"+name+"']").addClass("error");
	}
}
function removeErrorStyle(name){
	$("[name='"+name+"']").removeClass("error");
}
function chageSystemArea(customerInfoUrl,position,fullAddressName){
	jqueryShow(customerInfoUrl,"systemareadiv",false);
	var provincial = getSelectText(document.getElementsByName('provincial')[0]);
	var city = getSelectText(document.getElementsByName('city')[0]);
	var region = getSelectText(document.getElementsByName('region')[0]);
	if(document.getElementsByName('provincial')[0].value == ""){
		provincial="";
		document.getElementsByName(fullAddressName)[0].value = provincial;
		document.getElementsByName("detailAddress")[0].value="";
		document.getElementById(fullAddressName).style.display = 'none';
	}else{
		var address = provincial + city + region;
		if(position=='1')
		 document.getElementsByName(fullAddressName)[0].value = provincial;
		if(position=='2')
		 document.getElementsByName(fullAddressName)[0].value = provincial + city;
		var length = document.getElementsByName(fullAddressName)[0].value.length*2;
		document.getElementsByName(fullAddressName)[0].size=length;
		document.getElementById(fullAddressName).style.display = 'none';
	}
}

function getSelectText(obj) {
	if(obj == null) return '';
	if(!obj.length) {
		return obj.value;
	}
	for(i=0;i<obj.length; i++) {
		if(obj[i].value == obj.value) return obj[i].text;
	}
	
	return '';
}

function changeRegion(fullAddressName) {
	var provincial = getSelectText(document.getElementsByName('provincial')[0]);
	var city = getSelectText(document.getElementsByName('city')[0]);
	var region = getSelectText(document.getElementsByName('region')[0]);
	if(document.getElementsByName('region')[0].value == ""){
	var address = provincial + city;
	}else{
	var address = provincial + city + region;
	}
	document.getElementsByName(fullAddressName)[0].value = address;
	var length = document.getElementsByName(fullAddressName)[0].value.length*2;
	document.getElementsByName(fullAddressName)[0].size=length;
	document.getElementById(fullAddressName).style.display = 'none';
}
//点击编辑发票
function invoiceBeforeEdit()
{

    $(".myP").show();

	$("#invoiceEdit").css("display","block");
	
	$("#remark").show();
	$("#remark span").show();

	var money = parseFloat($("#shouldMoney2").html().split(" ")[1]);
	
	$("#InvoiceMoney").val(money)

}
function closeInvoice(){
	needLoginShow('/order/invoiceView?isAjax=true', 'orderAddInvoiceView_new', false);
}

function isNeedInvoice(obj){
	// if($(obj).prop("checked")){
	// 	$(obj).parent().parent().css("text-align","center");
	// 	$(obj).parent().nextAll("span").show();
	// 	$("#remark").show();
	// 	$("#remark span").show();
	// }else{
	// 	$(obj).parent().parent().css("text-align","left");
	// 	$(obj).parent().nextAll("span").hide();
	// 	$("#optBtn").show();
	// 	$("#remark").hide();
	// }
}

function changeOrderInvoice(act){
	var zsCompany = document.getElementById('zsInvoiceCompany');
	var psTitle = document.getElementById('psInvoiceTitle');
	var psCompany = document.getElementById('psInvoiceCompany');
	var pscontent = document.getElementById('psContent');
	$("#invoiceType").val(act);
	if("ps"==act){
		var zsInvoice = document.getElementsByName('invoiceId');
		if(zsInvoice.length && zsInvoice.length > 0) {
			for(i=0;i<zsInvoice.length; i++) {
				if(zsInvoice[i].checked){
				 zsInvoice[i].checked='false';
				} 
			}
		}
		zsCompany.style.display='none';		
  		psTitle.style.display='';	
		pscontent.style.display='';
		
		if(window.global.invoiceEdit.invoiceTitleStrong == "个人")
		{
			document.getElementById('invoiceHead_sel')[0].selected="true";
			selectPsInvoiceTitle('gr');
		}else{
			document.getElementById('invoiceHead_sel')[1].selected="true";
			psCompany.value=window.global.invoiceEdit.invoiceTitleStrong;
			selectPsInvoiceTitle('dw');
		}

		var zsInvoiceContent = document.getElementsByName('bean.invoiceContent')[0];
		$(zsInvoiceContent).val(window.global.invoiceEdit.invoiceContentStrong);
	}
	
	if("zs"==act){
		var zsInvoice = document.getElementsByName('invoiceId');
		if(zsInvoice.length && zsInvoice.length > 0) {
			for(i=0;i<zsInvoice.length; i++) {
				if(zsInvoice[i].checked){
				 zsInvoice[i].checked='false';
				} 
			}
		}
		zsCompany.style.display='';
		pscontent.style.display='none';
		psTitle.style.display='none';
		psCompany.style.display='none';
	}
	if("wfp"==act){
		var zsInvoice = document.getElementsByName('invoiceId');
		if(zsInvoice.length && zsInvoice.length > 0) {
			for(i=0;i<zsInvoice.length; i++) {
				if(zsInvoice[i].checked){
				 zsInvoice[i].checked='false';
				} 
			}
		}
		
		$("#psContent").hide();
		zsCompany.style.display='none';
		psTitle.style.display='none';
		psCompany.style.display='none';
	}
}

function selectPsInvoiceTitle(act){
	if(act=="个人"){act="gr"}else if(act=="单位"){act="dw"}
	if('dw'==act){
		document.getElementById('psInvoiceCompany').style.display='';
		document.getElementById('taxPlayerId').style.display='';
	}
	if('gr'==act){
		document.getElementsByName('invoiceTitle')[0].value='';
		document.getElementById('psInvoiceCompany').style.display='none';
		document.getElementById('taxPlayerId').style.display='none';
	}
}
var invoiceOptions = {
		beforeSubmit:  function(){
			var invoiceType = $('#invoiceType').val();
			
			if(invoiceType=='ps'){
				var invoiceTitle = $("#invoiceHead_sel option:selected").val();
				if(invoiceTitle==''){
					alert("请选择发票抬头。");
					return false;
				}
				if(invoiceTitle=='单位'){
					if(document.getElementsByName('invoiceTitle')[0].value==''){
						alert('请填写单位名称。');
						return false;
					}
					if(document.getElementsByName('taxPlayerId')[0].value==''){
						alert('请填写纳税人识别号。');
						return false;
					}
				}else{
					document.getElementsByName('invoiceTitle')[0].value='个人';
				}
			}
			if(invoiceType=='zs'){
				var invoiceId = getRadioValue(document.getElementsByName('invoiceId'));
				if(invoiceId==''|| $("#invoiceId").length==0){
					alert('请选择开票的单位名称。');
					return false;
				}
			}
			
			return true;
		}, 
		type:'post',
		success: function(html){
			$('#orderAddInvoiceView_new').html(html);
	  } 
	};
function getRadioValue(obj) {
	if(obj == null) return '';
	if(obj.length == null && obj.checked) {
		return obj.value;
	}
	
	if(obj.length && obj.length > 0) {
		for(i=0;i<obj.length; i++) {
			if(obj[i].checked){
			 return obj[i].value;
			} 
		}
	} else {
		return obj.value;
	}
return ''; 
}

function presentcard() {
	//var cruTime=new Date().toLocaleTimeString();
		//needLoginShow("/order/presentcard?isAjax=true&dateTime=" + cruTime, 'presentcardDiv', false);
	 $('.box').css({'display':'block'});
	// var y=event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	 //$('#presentcardDiv').css("margin-top",y-20);
	 $('#presentcard').show();
	//myCard();
}
 function giftcardShow() {
 	
	var cruTime=new Date().toLocaleTimeString();
	//needLoginShow("/order/giftcardadd?isAjax=true&dateTime=" + cruTime, 'giftcardDiv', false);
	//$('.box').css({'display':'block'});
	//var y=event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	//$('#giftcardDiv').css("margin-top",y-20);
	$('#giftcard').show();
}

function checkpresentCardHandler(obj) {
	if(!$(obj).attr("checked")) {
	$(".butoon_clear").each(function(i,n) {
		 	if(i == 0)
		 	{	
		 		$('#presentAllClearCardForm').ajaxSubmit(presentALLClearCardOptions);
		 	}
	});
	$("input[name='orderPresentCardNo']").each(function(i,n){
		$(n).attr("checked","");
	})
	$("#divPresentCardListTable").hide();
	$("#beanusePresentCard").val("false");
	}
	else
	{
		$("#divPresentCardListTable").show();
		$("#beanusePresentCard").val("true");
	}
}
//绑定购物卡
function bindPresentCardForDX()
{
		var cardNo = document.getElementById("lipinkaforOrderCard").value;
		var cardPassword = document.getElementById("lipinkaforOrderPassword").value;	

		var data={"cardNo":cardNo,"passWord":cardPassword};
		var turl="/order/bindpresentcard";

		$.ajax({
			cache:false,
			type: "get",
			data: data,
			dataType: "json",
			url:turl,
			error:function(err){alert(err);},
			complete :function(){;},//AJAX请求完成时隐藏loading提示
			success: function(json){//msg为返回的数据，在这里做数据绑定
					if(json == null)
					{
						alert("输入卡号错误，绑定失败");
						return;
					}
					var type=json.type;
					if(type == 1)//普通成功
					{
						//调用刷新页面。
						//绑定成功后刷新购物卡已绑定的列表
						refreshForPresentCard(cardNo);
						
					}
					else if(type == 3)//失败
					{
						var error=json.error;
						alert(error);
					}
				}
		})
}
//刷新购物卡这块
function refreshForPresentCard(cardNo)
{
	//绑定成功后刷新购物卡已绑定的列表
	
	needLoginShow('/order/presentcard?isAjax=true&cardNo='+cardNo,'presentcardDiv', false);
}
//购物卡，是否选择上
function checkBoxClickForPresentCard(obj,type)
{
	if(type=='all'){
		//全选
		var check = obj.checked;
		$("input[name='orderPresentCardNo']").attr('checked',check)
	}
	
		$("#cart_table_B").text($("input[name='orderPresentCardNo']:checked").length);
		if($("input[name='orderPresentCardNo']:checked").length>0){
			//确定使用购物卡
			productSelectForCardClick();
		}else{
			//不使用购物卡
			$('#presentClearCardForm').ajaxSubmit(presentClearCardOptions);
		}
	
}

//当选择完商品选择之后，需要回调选中的JS，添加成功之后，需要刷新页面。
function productSelectForCardClick()
{
	$("#isSepcialCard").val("false");
	var checkedProduct = $(".checkedProduct"); //document.getElementsByTagName('checkedProduct');
	if(checkedProduct.length >0){
		var productNo = "";
		var cardNo=document.getElementById("cardForDXProduct").value;
		 var strs = new Array();
		 strs= cardNo.split(";");
		for(var i=0;i<strs.length;i++){
			if(strs[i]!=""){
				var productArray = document.getElementsByName(strs[i] + "_checkedProduct");
				var isChecked= false;
				for(var j=0;j <productArray.length;j++){
					if(productArray[j].checked){
						isChecked = true;
					}
				}
				if(!isChecked){
					alert("卡号:"+strs[i]+"没有选中能购买的商品，请您重新选择！");
					return;
				}
			}
		}
		$("#isSepcialCard").val("true");
		$('#presentCardForm').ajaxSubmit(presentCardOptions);
	}else
	{
		$('#presentCardForm').ajaxSubmit(presentCardOptions);
	}
}

var presentCardOptions = {
		beforeSubmit:  function(){
		var cardNo = document.getElementsByName('orderPresentCardNo');	
		var flag = false;
		if(cardNo!=null && cardNo.length>0){
			for(var i = 0; i < cardNo.length; i++){
				if(cardNo[i].checked==true){
					flag = true;
					break;
				}
			}
		}
		if(!flag){
			$("#presentNum").text("0 ")
			$("#presentPrice").text("￥0.00")	
		}
		return flag;
		}, 
		type:'post',
		success: function(html){
			var text = html;
			var msg = "";
			if(text.indexOf("notexisted")>=0){
				msg="购物卡不存在";
			}else if(text.indexOf("invalid")>=0){
				msg = "购物卡未激活";
			}else if(text.indexOf("expired")>=0){
				msg = "购物卡已过期";
			}else if(text.indexOf("no_cart")>=0){
				msg = "当前购物车为空";
			}else if(text.indexOf("errorMessage")>=0){
				msg = text.substr(13);
			}
			if(msg!=""){
				alert(msg);
				var cruTime=new Date().toLocaleTimeString();
				//用返回的内容覆盖presentcardDiv的内容,false表示覆盖，true表示追加
				needLoginShow("/order/presentcard?isAjax=true&dateTime=" + cruTime, 'presentcardDiv', false);
				$('#presentcard').show();
				return;
			}
			if($("#isSepcialCard").val()=="true"){
				var url="/order/add?init=true&orderadd=true";
				window.location.href=url;
			}else{
				needLoginShow("/order/presentcard?isAjax=true&dateTime=" + cruTime, 'presentcardDiv', false);
				$('#presentcard').show();
				needLoginShow('/order/orderStat','stat_pay', false);
				//closePopDiv("presentcard");
			}
		} 
	};
var presentClearCardOptions = {
		beforeSubmit:  function(){
			return true;
		}, 
		type:'post',
		success: function(html){
			if(html=="success"){
				needLoginShow("/order/presentcard?isAjax=true&dateTime=" + cruTime, 'presentcardDiv', false);
				$('#presentcard').show();
				needLoginShow('/order/orderStat?isAjax=true','stat_pay', false);
			}
	  } 
	};

function selectGiftNo(){
	var orderGifgcardNo = getRadioValue(document.getElementsByName('orderGifgcardNos'));
	document.getElementById('hidden_gift_no').value=orderGifgcardNo;
	$('#hiddenGiftCardForm').ajaxSubmit(giftCardOptions1);
}
var giftCardOptions = { 
		beforeSubmit:  function(){
			if (window.event && window.event.keyCode == 13) {
                window.event.returnValue = false;
            }
			var giftCardNo = $('#gift_no').val();
	
			if(giftCardNo == "") { 
				alert("请输入优惠券号码。");
				$('#gift_no').focus();
				return false;
			}
			return true;
		}, 
		type:'post',
		success: function(html){
			$('#giftcardDiv').html(html);
			
			needLoginShow('/order/orderStat','stat_pay', false);
	  } 
	};

var giftCardOptions1 = { 
		beforeSubmit:  function(){
			var giftCardNo = $('#hidden_gift_no').val();
			
			if(giftCardNo == "") { 
				alert("请选择优惠券号码。");
				return false;
			}
			return true;
		}, 
		type:'post',
		success: function(html){
			$('#giftcardDiv').html(html);
			needLoginShow("/order/presentcard?isAjax=true&dateTime=" + cruTime, 'presentcardDiv', false);
			$('#presentcard').show();
			needLoginShow('/order/orderStat?isAjax=true','stat_pay', false);
		} 
};
var giftCardClearOptions = { 
		type:'post',
		success: function(html){
			if(html=="success"){
				$("#giftNum").text(0+" ");
				$("#giftPrice").text("￥0.00");
				needLoginShow("/order/presentcard?isAjax=true&dateTime=" + cruTime, 'presentcardDiv', false);
				$('#presentcard').show();
				needLoginShow('/order/orderStat?isAjax=true','stat_pay', false);
			}
		} 
	};

function checkVirtualAccount(obj)
{
	if(checkInt(obj,0))
	{
		var turl="/order/ajaxcaculatevirtualmoney?money="+obj.value;
		$.ajax({
		cache:false,
		type: "get",
		dataType: "json",
		url:turl,
		error:function(err){alert(err);},
		complete :function(){;},//AJAX请求完成时隐藏loading提示
		success: function(json){//msg为返回的数据，在这里做数据绑定
		
				if(json == null)
				{
						alert("出错了!");
						obj.value=0;
				}

				var Maxmoney=json.Maxmoney;
				var Maxusemoney=json.Maxusemoney;
				var money=json.Money;
				
				if(parseFloat(Maxmoney)<parseFloat(obj.value))
				{
					$("#vaccountAmount").val(Maxmoney);
					alert("最多可用 "+Maxmoney+"个支付币");
				}
				$("#spanVirtualDeposit").html(Maxusemoney);
				$('#virtualForm').ajaxSubmit(userVirtualOptions);
			}
		})
	}
	else
	{
		obj.value=0;
		alert("请输入正确的数据！");
	}
}


function checkVirtualAccount2(obj)
{
	if(checkfloat(obj,0)){

	}else{
		obj.value=0;
		alert("请输入正确的数据！");
	}
}


var userVirtualOptions = { 
		type:'post',
		success: function(html){
		$('#userVirtual').html(html);
		$('.shopb-Invoice04').hide();
		needLoginShow('/order/orderStat?isAjax=true','stat_pay', false);
    } 
};
var isCommitted = false;
function orderSubmit(act) {
	if($('#hasAddress').val() != 'true') {
		  alert('请输入完整的收货人信息并保存。');
			return false;
	}
	if($("#hasInvoiceInfo").val()!="true"){
		alert("请输入完整的发票信息并保存");
		return false;
	}
	if($('#hasShipTypeId').val() == 'ZT001' && $('#hasShipTypeZTId').val() == '') {
		alert('请选择自提点并保存');
		show(CONTEXT + '/fg/order/orderadd.do?actionType=shiptypeadd', 'shipTypeAndPayType', false)
		return false;
	}
	var sendTime = getRadioValue(document.getElementsByName('sendTimeSelect'));
	
	if(sendTime == "") { 
		alert("请选择送货时间。");
		return false;
	}
	$("input[name='sendTime']").val(sendTime);
	if("yuding"==act){
		if(confirm("确认预订?")) {
			//防止表单重复提交
			if(isCommitted==false){
				 isCommitted = true;
				 document.getElementById('orderForm').submit()
				 return true;
			}else{
				 return false;
			 }
		}	
	}else{
		//防止表单重复提交
		if(isCommitted==false){
			 isCommitted = true;
			 document.getElementById('orderForm').submit()
			 return true;
		}else{
			 return false;
		 }
			
	}
}

function closePopDiv(obj){
	 $("#"+obj).hide();
	 $('.box').css({'display':'none'});
     $('.dis_none').css({'display':'none'});
}

function myCard() {
	$.ajax({
		type: "GET",
//            url: $.url.webUrl + "doB2C/B2Ca2_B_MyCard",
		url:"../json/myCard.json",
		headers: {"Authorization": "Bearer " + $.cookie("accessToken")},
		dataType: "json",
		success: function (data) {
			data.rows.forEach(function (v) {
				if(v.create_time){
					v.create_time = v.create_time.split("T")[0];
				}
				if(v.start_time){
					v.start_time = v.start_time.split("T")[0];
				}
				if(v.end_time){
					v.end_time = v.end_time.split("T")[0];
				}
				if(v.total_money != null || v.total_money != undefined){
					v.total_money = (v.total_money/100).toFixed(2);
				}
			});
			$("#cardbody").empty().append(template("tbody-cell", {returnJson: data.rows}));
		}
	});
}

function showGiftAndpresentcard(id){
	if(!$("#"+id).hasClass('active')){
        $("#"+id).css("background","url(../assets/images/order/join-png_10.png) left 0px no-repeat");
        $("#"+id).parent().nextAll().slideDown("solw");
        $("#"+id).addClass('active');
        if(id=='giftCart_'){
        	giftcardShow();
        }
        if(id=='presentcard_'){
        	presentcard();
        }
    }else{
        $("#"+id).css("background","url(../assets/images/order/join-png_07.png) left 0px no-repeat");
        $("#"+id).parent().nextAll().slideUp("solw");
        $("#"+id).removeClass('active');
    }
}