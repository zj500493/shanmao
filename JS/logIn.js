$(function(){
	//给登陆按钮添加事件
	$(".login-btn").click(function(){
		$.cookie.json = true;
		//第一步：从cookie中读取到你注册的信息
		var products1 = $.cookie("products1");
		//获取到你在登录框中输入的用户名和密码
		var name = $("#name").val();
		var ipassword = $("#password").val();
		
		//封装函数来知道你所填写的数据在原来的cookie中是否存在，/*只是对用邮箱登录进行了验证*/
		function findIndex1(name, products1){		//对名字的验证
			for(var i in products1){
				if(products1[i].name === name|| products1[i].email === name)
					return i;	
			}
			return -1;
		}
		
		var index1= findIndex1(name, products1);
		if(index1 === -1){
			$(".error").css("display","block").animate({top:150},1000).find("a").text("不存在该用户!");
		}else{
			//当用户名存在的情况下判断密码是否输入错误
			if(ipassword === products1[index1].ipassword){
				$(".error").css("display","block").animate({top:150},1000).find("a")
					.html("登录成功将在<span>3</span>秒内跳转");
				var timer = null;
				var amount = $(".error span").text();
				timer = setInterval(function(){
					amount--;
					$(".error").css("display","block").animate({top:150},1000).find("span").text(amount);
					if(amount===0){
						window.location.href= "index.html";
						clearInterval(timer);
					}
				},1000)
				//登录成功以后保存现在的值,在页面去输出这个值
				var nowName = $("#name").val();
				$.cookie("now",nowName,{expires:7,path:"/"});	
				
			}else{
				$(".error").css("display","block").stop().animate({top:150},1000).find("a").text("密码错误!");
			}
		}
	});
	
	$("input").focus(function(){
		$(".error").css("display","none").stop().animate({top:0},10);
	})

});
