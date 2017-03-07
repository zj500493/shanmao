$(function(){
	//对注册的表单的做出的选项卡效果
	$(".tab>li").each(function(){
		$($(this)).click(function(){
			$(this).addClass("curr").siblings().removeClass("curr");
			$(".registerTxet > div").eq($(this).index()).css("display","block").
				siblings().css("display","none");
		});
	})
	
	
	var reg1 = /^[a-zA-z][a-zA-Z0-9_]{2,9}$/;
	var reg2 = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
	var reg3 = 	/^[a-z0-9_-]{6,17}$/;
	var reg4 = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])[0-9]{8}$/;
	var btn1 = false;
	var btn2 = false;

/*这是针对后面有三个的提示*/
function keyup1(obj, product1, success, product2, product3, reg){
	$(obj).keyup(function(){
		var username = $(obj).val();
		if (username.length === 0) {
			$(product1).css("display","block").siblings().not(".item").css("display","none");
		}else{
			if (reg.test(username)) {
				$(success).css("display","block").siblings().not(".item").css("display","none");
				btn1 = true;
			} else if(username.length < 3 && username.length > 0){
				$(product2).css("display","block").siblings().not(".item").css("display","none");
			}else {
				$(product3).css("display","block").siblings().not(".item").css("display","none");
			}
		}		
	});
	$(obj).focus(function(){
		var username = $(obj).val();
		if (username.length === 0) {
			$(product1).css("display","block").siblings().not(".item").css("display","none");
		}
	});
}
/*这是针对后面有二个的提示*/
function keyup2(obj, product1, success, product2, reg){
	$(obj).keyup(function(){
		var email = $(obj).val();
		if (email === "") {
			$(product1).css("display","block").siblings().not(".item").css("display","none");
		}else{
			if (reg.test(email)) {
				$(success).css("display","block").siblings().not(".item").css("display","none");
				btn2 = true;
			} else{
				$(product2).css("display","block").siblings().not(".item").css("display","none");
			}
		}
	});
	$(".email").focus(function(){
		var email = $(obj).val();	
		if (email === "") {
			$(product1).css("display","block").siblings().not(".item").css("display","none");
		}
	})
}
/*******邮箱注册的时候******************************************************************************/
	/******对注册的用户名进行判断********************************************/
	keyup1(".username", ".user-notice1", ".username-success", ".user-notice2", ".user-notice3", reg1);
	$(".username").keyup(function(){		//对cookie中有没有进行判断
		var name1 =  $.cookie("products1");
		if(name1){
			var name2 = JSON.parse(name1);
			for(var i in name2){
				var name3 = $(".username").val(); 
				if (name3 == name2[i].name) {
					$(".user-notice4").css("display","block").siblings().not(".item").css("display","none");
				}
			}
		}
	})
	
	/******对注册的邮箱进行判断********************************************/
	keyup2(".email", ".email-notice1", ".email-success", ".email-notice2", reg2);
	$(".email").keyup(function(){
		var name1 =  $.cookie("products1");
		if(name1){
			var name2 = JSON.parse(name1);
			for(var i in name2){
				var name3 = $(".email").val(); 
				if (name3 == name2[i].email) {
					$(".email-notice3").css("display","block").siblings().not(".item").css("display","none");
				}
			}
		}
	})
	/******对注册的密码进行判断********************************************/
	keyup2(".password", ".password-notice1", ".password-success", ".password-notice2", reg3);
	
	/******确认密码进行判断********************************************/
	var btn3 = false;
	$(".confirm").keyup(function(){
		var confirm = $(".confirm").val();
		if (confirm === "") {
			$(".confirm-notice1").css("display","block").siblings().not(".item").css("display","none");
		}else{
			if (confirm === $(".password").val()) {
				$(".confirm-success").css("display","block").siblings().not(".item").css("display","none");
				btn3 = true;
			} else{
				$(".confirm-notice2").css("display","block").siblings().not(".item").css("display","none");
			}
		}
	});
	$(".confirm").focus(function(){
		var confirm = $(".confirm").val();
		if (confirm === "") {
			$(".confirm-notice1").css("display","block").siblings().not(".item").css("display","none");
		}
	})
	
/************************对点击按钮进行操作***********************************************/
	$(".registerSubmit").click(function(){
		var product = {
				name:      $(".username").val(),
				ipassword: $(".password").val(),
				email :	   $(".email").val(),
		}
		$.cookie.json = true;
		var products1 = $.cookie("products1");
		if(!products1){		//如果从cookie读取到的数组不存在
			products1 = [];
		}
		//console.log(products1);
		//通过函数来判断到底cookie中是否已经注册了用户名
		var index1 = findIndex(product.name, products1);
		var index2 = findIndex1(product.email, products1)
		var isChecked = $(".checkbox").prop("checked");		
		if (isChecked) {
			$(".checkbox-notice1").hide();
			if(index1 === -1 && index2===-1 && btn1 && btn2 && btn3) {
				products1.push(product);
				$.cookie("products1", products1, {expires:7, path:'/'});
				$(".showSuccess").css("display","block");
				$(".bg").css("display","block");
				setTimeout(function(){
					window.location.href = "loginIn.html";
				},5000)
			}
		} else{
			$(".checkbox-notice1").show();
		}
		//封装函数来知道你所存的数据在原来的cookie中是否存在，
		function findIndex(name, products1){
			for(var i in products1){
				if(products1[i].name === name)
					return i;		
			}	
			return -1;
		}
		function findIndex1(email, products1){
			for(var i in products1){
				if(products1[i].email === email)
					return i;		
			}	
			return -1;
		}		
	});
	
		
	
	
	
	
	
	
/*******手机注册的时候****************************************************************/

	/******对注册的用户名进行判断********************************************/
	keyup1(".username1", ".user-notice11", ".username-success1", ".user-notice21", ".user-notice31", reg1);
	$(".username1").keyup(function(){		//对cookie中有没有进行判断
		var name1 =  $.cookie("products1");
		if(name1){
			var name2 = JSON.parse(name1);
			for(var i in name2){
				var name3 = $(".username1").val(); 
				if (name3 == name2[i].name) {
					$(".user-notice41").css("display","block").siblings().not(".item").css("display","none");
				}
			}
		}
	})

	/******对手机号码的判断********************************************/
	keyup2(".phone", ".phone-notice1", ".phone-success", ".phone-notice2", reg4);
	$(".phone").keyup(function(){
		var name1 =  $.cookie("products1");
		if(name1){
			var name2 = JSON.parse(name1);
			for(var i in name2){
				var name3 = $(".phone").val(); 
				if (name3 == name2[i].phone) {
					$(".phone-notice3").css("display","block").siblings().not(".item").css("display","none");
				} 
			}
		}
	})

	/******对注册的密码进行判断********************************************/
	keyup2(".password1", ".password-notice11", ".password-success1", ".password-notice21", reg3);
	
	/******确认密码进行判断********************************************/
	$(".confirm1").keyup(function(){
		var confirm = $(".confirm1").val();
		if (confirm === "") {
			$(".confirm-notice11").css("display","block").siblings().not(".item").css("display","none");
		}else{
			if (confirm === $(".password1").val()) {
				$(".confirm-success1").css("display","block").siblings().not(".item").css("display","none");
			} else{
				$(".confirm-notice21").css("display","block").siblings().not(".item").css("display","none");
			}	
		}
	})
	$(".confirm1").focus(function(){
		var confirm = $(".confirm1").val();
		if (confirm === "") {
			$(".confirm-notice11").css("display","block").siblings().not(".item").css("display","none");
		}
	})
	
	
	/******对短信验证码的判断********************************************/
	$(".text-1").keyup(function(){
		var dx = $(".text-1").val();
		if (dx === "") {
			$(".dx-notice1").css("display","block").siblings().not(".item").css("display","none");
		}else{
			$(".dx-success").css("display","block").siblings().not(".item").css("display","none");
		}
	})
	$(".text-1").focus(function(){
		var dx = $(".text-1").val();
		if (dx === "") {
			$(".dx-notice1").css("display","block").siblings().not(".item").css("display","none");
		}
	})
	
	

/************************对点击按钮进行操作***********************************************/
	$(".registerSubmit1").click(function(){
		var product = {
				name1:      $(".username1").val(),
				ipassword1: $(".password1").val(),
				phone:      $(".phone").val()
		}
		$.cookie.json = true;
		var products1 = $.cookie("products1");
		if(!products1){		//如果从cookie读取到的数组不存在
			products1 = [];
		}
		//console.log(products1);
		//通过函数来判断到底cookie中是否已经注册了用户名
		var index1 = findIndex(product.name1, products1);
		var index2 = findIndex3(product.phone, products1);
		var isChecked = $(".checkbox1").prop("checked");		
		if (isChecked) {
			$(".checkbox-notice2").hide();
			if(index1 === -1 && index2 === -1 && btn1 && btn2) {
				products1.push(product);
				alert("注册成功！")
				$.cookie("products1", products1, {expires:7, path:'/'});
				setTimeout(function(){
					window.location.href = "loginIn.html";
				},1000)
			}
		} else{
			$(".checkbox-notice2").show();
		}
		console.log(products1);
		//封装函数来知道你所存的数据在原来的cookie中是否存在，
		function findIndex(name, products1){
			for(var i in products1){
				if(products1[i].name === name)
					return i;		
			}	
			return -1;
		}
		function findIndex3(phone, products1){
			for(var i in products1){
				if(products1[i].phone === phone)
					return i;		
			}	
			return -1;
		}	
	});
	
		
});