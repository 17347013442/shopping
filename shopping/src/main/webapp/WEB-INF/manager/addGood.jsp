<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>商品添加页面</title>
<%String path=request.getContextPath(); 
//System.out.println("path:"+path);
%>
</head>
<link rel="stylesheet" href="<%=path%>/css/bootstrap.min.css" >
<script type="text/javascript" src="<%=path%>/js/common/jquery.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/bootstrap.min.js"></script>
<script charset="utf-8" src="<%=path%>/editor/kindeditor-all.js"></script>
<script charset="utf-8" src="<%=path%>/editor/zh-CN.js"></script>
<link href="<%=path%>/editor/themes/simple/simple.css" rel="stylesheet">
<link rel="stylesheet" href="<%=path%>/editor/themes/default/default.css" />
<body>
<div>
	<form role="form" action="../good/addGood" method="post"  id="form" enctype="multipart/form-data">
	<div>
		<label>tno：</label>
		    <select class="combobox form-control" name="tno" id="tno"  style="width: 300px; " onblur="getValue()">
         
            
    </select> 
    <label>tino:</label>
		    <select class="combobox form-control" name="tino" id="tino"  style="width: 300px;">
           
            
            
    </select> 
	</div>
  <div class="form-group col-sm-4">
    <label for="name">商品名称：</label>
    <input type="text" class="form-control" id="name" name="gname" placeholder="请输入商品名称">
     <label for="name">商品进价：</label>
    <input type="text" class="form-control" id="inprice" name="inprice" placeholder="请输入商品进价">
    <label for="name">商品售价：</label>
    <input type="text" class="form-control" id="price" name="price" placeholder="请输入商品售价">
    <label for="name">商品库存：</label>
    <input type="text" class="form-control" id="balance" name="balance" placeholder="请输入商品库存">
    <label for="name">商品单位：</label>
    <input type="text" class="form-control" id="unit" name="unit" placeholder="请输入商品单位">
    <label for="name">商品产地：</label>
    <input type="text" class="form-control" id="place" name="place" placeholder="请输入商品产地">
    <label for="name">商品保质期：</label>
    <input type="text" class="form-control" id="qualityPeriod" name="qualityPeriod" placeholder="请输入商品保质期">
  
    <div class="form-group">
    <label for="inputfile">商品图片:</label>
    <input type="file" id="pics" name="upload1" >
    <label for="inputfile">商品描述:</label>
    <input type="text" id="intro" name="intro">
    </div>
    <div class="form-group">
    <label for="name">商品简介：</label>
    <textarea class="form-control" rows="3" name="descr" id="editor_id"></textarea>
  </div>
  <button type="button" id="btn1" class="btn btn-default">添加</button>
  </div>
  

  
</form>
</div>
</body>
<script type="text/javascript">
var href=window.location.href;
//alert(href);
//console.log(href);
var url=href.substring(0,href.indexOf('?'));
//console.log(url)
function getValue()
{ 
	var str1='';
	var tno=$('#tno').val();
	//console.log('tno'+tno);
	//根据tno查找所有的tino
	$.post("../type/findByTno",{tno:tno},function(data){
		//console.log(data);
		for(var i=0;i<data.length;i++){
			str1+=' <option value="'+data[i].tino+'">'+data[i].tname+'</option>';
			
		}
		$('#tino').html(str1);
	},'json');
	
	}

$(function(){
	
	//查询所有的tno
$.post("../type/findType",function(data){
	//console.log(data);
	var str='';
	for(var i=0;i<data.length;i++){
		str+=' <option value="'+data[i].tno+'">'+data[i].tname+'</option>';
		//console.log(str+"**");
	}
	//console.log(str);
	$('#tno').html(str);
},'json');
	
	
});

KindEditor.ready(function(K) {
	var editor  = K.create('#editor_id', {
           // themeType : 'simple'
             filterMode: false, //HTML特殊代码过滤
             afterBlur: function () { this.sync(); },   //编辑器失去焦点(blur)时执行的回调函数（将编辑器的HTML数据同步到textarea）    
             uploadJson :url+'/../../editor/jsp/upload_json.jsp',
             fileManagerJson : url+'/../editor/jsp/file_manager_json.jsp',
             allowFileManager : true
    	
    		  
    	
    });
});



$('#btn1').click(function(){
	var gname=$('#name').val();
	var tino=$('#tino').val();
	var price=$('#price').val();
	var balance=$('#balance').val();
	//alert(tino);
	if(gname!='' && tino!='' && price!=''&& balance!=''){
		
		document.getElementById("form").submit();
		
		
	}
	//
});

</script>
</html>