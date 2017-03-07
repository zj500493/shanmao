$(function(){
	/****当登录成功以后显示的用户名**************************/
	var now = $.cookie("now");
	if(now){
		var now1 = JSON.parse(now);
		$(".login").text("当前用户："+now1+"");
	}else{
		$(".login").text("请登录");
	}
	
	/******吸顶效果*************************/
	var fixTop = $(".headerSearch").offset().top;
		$(window).scroll(function(){
			var iScrollTop = $(window).scrollTop();
			if(iScrollTop >= fixTop){
				$(".headerSearch").css({
					position:"fixed", 
					top:0,
					left:406,
				}); 
			}else{
				$(".headerSearch").css("position", "static");
			}
		})
	
	/*******jsop去拿百度的数据*******************/
	var oInput = $("#search");
	oInput.keyup(function(){
		$.ajax({
			url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+oInput.val()+"&json=1&p=3",
			dataType:"jsonp",
			jsonp:"cb",
			success:function(data){
				//console.log(data);
				var lists = data.g;
				var oUl = $("#tipList");
			 	oUl.html("");
			 	for(var i in lists) {
			 		var oLi = $("<li></li>");
			 		oLi.html(lists[i].q);
			 		oUl.append(oLi);
			 	}
			}
		})
	})
	
	/*********点击跳转到购物车页面***********************************/
	$(".shopcar").click(function(){
		window.location.href  = "shopCar.html";
	});
	
	/***********购物车中的商品数量显示到小车上*************************************************/
	math1();
	function math1(){
		var maths = 0;
		$(".cart-checkbox").parents(".item-body").find(".amountIput").each(function(index,element){
			maths += parseFloat($(this).val());
		})
		$(".shopcar-center").text(maths);
	}
	
	
	/********************三级菜单***************************/
	$(".nav-left").hover(function(){
		$(".dd").stop().show();
	},function(){
		$(".dd").stop().hide();
	});
	$(".item-left").hover(function(){
		//$(".nav-layer")
		$(this).css("background","#FFFFFF").find("a").css("color","#e23435");
		$(this).next().show();
	},function(){
		$(this).css("background","#e23435").find("a").css("color","#FFFFFF");
		$(this).next().hide();
	});
	$(".nav-layer").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	})
	
	/********右边黑色部分的效果**************************************/
	$(".panne1-li").hover(function(){
		$(this).find("div").stop().css("display","block").animate({right:40},300);
	},function(){
		$(this).find("div").stop().css("display","none").animate({right:80},100);
	});
	$(".return_top").click(function(){
		$(window).scrollTop(0);
	})
	
	/******鼠标的移上去的显示红色底线*************************/
	$(".nav-right li:not(:first)").each(function(){
		$(this).hover(function(){
			var iLeft = $(this).position().left;
			var iWidth = $(this).width() ;
			$(this).find("a").addClass("selected").parent().siblings().find("a").removeClass("selected");
			$(".wrap-line").stop().animate({left: iLeft,width:iWidth},300);	
		},function(){
			$(".wrap-line").stop().animate({left: 20,width:72},200);
			$(".nav-right li:first").find("a").addClass("selected").parent().siblings().find("a").removeClass("selected");
		})
	});
	
		/*******尾页的选项卡效果***********************************************/
	$(".footer-tab li").mouseover(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".ft-wp-1").eq($(this).index()).css("display","block").siblings().css("display","none");
	});
	
	
	
	
		
});