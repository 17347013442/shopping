<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
       <link rel="stylesheet" href="css/bsp/bootstrap.min.css" ">
        <link href="css/floating-labels.css" rel="stylesheet">
       <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
       <script type="text/javascript" src="js/bsp/bootstrap.min.js"></script>
<script type="text/javascript">
        $(function () {
      $("#form-demo").submit(function(event){
        var f=$(this)
        if(f[0].checkValidity()==false){
          event.preventDefault()//阻止表单提交
          event.stopPropagation()//阻止任何父事件处理程序被执行
        }
        f.addClass("was-validated")//bootstrap提供给验证失败后出现的
      })

        })
    </script>
</head>
<body>
<div class="container" style="margin-top: 0px;">
    <form action="admin/add" method="post" novalidate id="form-demo">
    <div class="text-center mb-4">
    <img class="mb-4" src="images/1.png" alt="" width="75" height="72">
    <h1 class="h3 mb-3 font-weight-normal">Register</h1>

  </div>
      <div class="form-group">
        <input type="text" name="aname" class="form-control" required="required" placeholder="请输入用户名" pattern="[A-Za-z0-9]{5,30}">
        <div class="invalid-feedback"><small>请输入用户名6-30位字母或数字！</small></div><!-- 验证失败出现 -->
      </div>
      <div class="form-group">
        <input type="text" name="pwd" class="form-control" required="required" pattern="[A-Za-z0-9]{6,30}" placeholder="请输入密码">
        <div class="invalid-feedback">密码长度至少为六位,只能是大小写字母或数字！</div>
      </div>
      <!-- <div class="form-group">
        <input type="text" class="form-control" required="required" pattern="[\u4e00-\u9fa5]{2,}" placeholder="请输入真实姓名">
        <div class="invalid-feedback">必须是中文，且长度不小于2位！</div>
      </div> -->
      
      <div class="form-group">
        <input type="text" name="tel" class="form-control" required="required" pattern="1[34578]\d{9}$" placeholder="请输入手机号码">
        <div class="invalid-feedback">手机号只能是11位的数字！</div>
      </div>
      <!--  <div class="form-group">
        <input type="email" class="form-control" required="required"  placeholder="输入邮箱">
        <div class="invalid-feedback">邮箱地址格式不正确！</div>
      </div> -->
      
     
      <button class="btn btn-lg btn-primary btn-block" id="btn" type="submit">register</button>
    </form>
    
    
  </div>
</body>
</html>