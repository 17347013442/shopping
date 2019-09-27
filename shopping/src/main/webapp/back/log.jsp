<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%String path=request.getContextPath(); 
//System.out.println("path:"+path);
%>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
       <link rel="stylesheet" href="<%=path%>/css/bsp/bootstrap.min.css" ">
       <script type="text/javascript" src="<%=path%>/js/jquery-3.3.1.min.js"></script>
       <script type="text/javascript" src="<%=path%>/js/bsp/bootstrap.min.js"></script>
      
<title>Insert title here</title>
 <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
    <!-- Custom styles for this template -->
    <link href="css/floating-labels.css" rel="stylesheet">
  </head>
  <body>
    <form class="form-signin">
  <div class="text-center mb-4">
    <img class="mb-4" src="images/1.png" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal">Login</h1>

  </div>

  <div class="form-label-group">
    <input type="text" id="aname" class="form-control" placeholder="Username" required autofocus>
    <label for="inputEmail">Username</label>
  </div>
 

  <div class="form-label-group">
    <input type="password" id="pwd" class="form-control" placeholder="Password" required>
    <label for="inputPassword">Password</label>
    
  </div>

  <div class="checkbox mb-3">
    <label>
      <input type="checkbox" value="remember-me"> Remember me
    </label>
  </div>
  <button class="btn btn-lg btn-primary btn-block" id="btn" type="button">Sign in</button>
  <a class="btn btn-lg btn-primary btn-block"  href="register.html">register</a>
  <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2019</p>
</form>
</body>
<script type="text/javascript">


$(function(){
	//var aname=document.getElementById('aname');
	//alert(100==='100'); ==true  ===false
	$('#btn').click(function(){
		var pwd=$('#pwd').val();
		var aname=$('#aname').val();
		console.log(pwd+"**"+aname);
		$.post("login",{pwd:pwd,aname:aname},function(data){
			//console.log(data);
			if(data==1){
				window.location.href="index.jsp";
			}
			
		});
	});
	
});



</script>
</html>