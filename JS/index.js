$(function(){
	/****当登录成功以后显示的用户名**************************/
	var now = $.cookie("now");
	var now1 = JSON.parse(now);
	if(now){
		$(".login").text("当前用户："+now1);
	}else{
		$(".login").text("请登录");
	}
	
	/****通过cookie获取到商品个数***************/
	var cars = $.cookie("cars");
	if (cars) {
		var cars2 = JSON.parse(cars);
		var num = 0;
		for (var i in cars2) {
			num += cars2[i].amount;
		}
		$(".shopcar-center").text(num);
		$(".cart_num").text(num);
		$(".show-cars-num").text(num);
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
	
	
	/********右边黑色部分的效果**************************************/
	$(".panne1-li").hover(function(){
		$(this).find("div").stop().css("display","block").animate({right:40},300);
	},function(){
		$(this).find("div").stop().css("display","none").animate({right:80},100);
	});
	
	/********************三级菜单***************************/
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
	
	/*******楼梯效果*******************/
	var isClick = false;//是否点击，初始状态是没有点击
	$("#loutiNav ul li:not(:last)").click(function(){
		isClick = true;
		$(this).find("span").addClass("on4").parent().siblings().find("span").removeClass("on4");
		var iTop = $(".floor").eq($(this).index()).offset().top;
		$("html,body").stop().animate({scrollTop:iTop},500,function(){
			isClick =false;
		});
	})
	$(window).scroll(function(){	
		if(!isClick){
			var iScrollTop = $(this).scrollTop();
			var startTop = $("#floor_1").offset().top;
			if(iScrollTop < startTop){
				$("#loutiNav").css("display","none");
			}else{
				$("#loutiNav").css("display","block");
				$(".floor").each(function() {
				var srcHeight = $(".floor-startPicture").outerHeight();
				if(iScrollTop > $(this).offset().top - srcHeight/2){
					$("#loutiNav ul li").eq($(this).index(".floor")).find("span").addClass("on4").
						parent().siblings().find("span").removeClass("on4");		
					}
				})
			}	
		}
	})
	$("#loutiNav li:last").click(function(){
		$(window).scrollTop(0);
	})
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
	
	
/*************banner部分********************************************************************************/	
	
	/*******主页中心的轮播图************************************/
	var ali = $(".containner li");
	var len = ali.length;
	var index = 1;//显示出下一张的索引
	var timer = null;
	//给小圆点添加事件
	$(".circle span").click(function(){
		$(this).addClass("on1").siblings().removeClass("on1");
		$(".containner li").eq($(this).index()).show().siblings("li").hide();
	})
	//自动轮播
	timer = setInterval(move, 2000);
	function move(){
		$(".circle span").eq(index).addClass("on1").siblings().removeClass("on1");
		index++;
		if(index >= len){
			index = 0
		}
		$(".containner li").eq(index).fadeIn().siblings("li").fadeOut();
	}
	//鼠标移入移除的事件
	$("#box1").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(move, 2000);
	});
	
	/*****banner下的左边的轮播*****************************/
	var $lis = $(".wf-tab>li"), //所有在#box下的li
		len1 = $lis.length,	//li的个数
		liWidth = $lis.width(),	//每个li的宽度		jq中width只是第一个元素的宽度
		index1 = 0;//下一张要显示的索引
	$(".wf-tab").width(liWidth * len1);
	$(".wufenglunbo").hover(function(){
		$(".wf-prev").show();
		$(".wf-next").show();
	},function(){
		$(".wf-prev").hide();
		$(".wf-next").hide();
	})
	$(".wf-prev").click(function(){
		index1-= 1;
		if(index1 < 0)
			index1 = 0;
		var _left = -liWidth *index1;
		$(".wf-tab").stop().animate({left:_left}, 1000);
		console.log(index1)
	});
	$(".wf-next").click(function(){
		move1();
	});
	function move1(){
		index1++;
		if(index1 >= len1)
			index1 = len1-1;
		var _left = -liWidth *index1;
		$(".wf-tab").stop().animate({left:_left}, 1000);
	};
	
	/*****在banner左下方的轮播图中，鼠标移入会有一个透明度的改变****/
	$(".wf-tab a").mouseover(function(){
		$(this).css("opacity",1).siblings().css("opacity",0.6);	
	});
	$(".wf-tab").mouseout(function(){
		$(".wf-tab a").css("opacity",1);
	})
	
	/****banner右边的倒计时*******************************/
	function timeDown(endtime,obj){		//endtime:如2017/01/01
		setInterval(function(){
			var iFinadate = new Date(endtime);
			var iCurrntentdate = new Date();
			var iDiffer = iFinadate - iCurrntentdate;
			var day = parseInt(iDiffer/(24*60*60*1000));//剩余的天数
			var hour = parseInt(iDiffer/(1000*60*60)%24);//剩余的小时
			var minute = parseInt(iDiffer/(1000*60)%60);//剩余的分钟
			var secend = parseInt(iDiffer/1000%60);//剩余的秒数
			$(obj).find(".days").html(day);
			$(obj).find(".hours").html(hour);
			$(obj).find(".minutes").html(minute);
			$(obj).find(".secends").html(secend);
			var str = "";
			if($(obj).find(".days").text() < 10 ){
				str = "0" + day;
				$(obj).find(".days").html(str);
			}
			if($(obj).find(".hours").text() < 10 ){
				str = "0" + hour;
				$(obj).find(".hours").html(str);
			}
			if($(obj).find(".minutes").text() < 10 ){
				str = "0" + minute;
				$(obj).find(".minutes").html(str);
			}
			if($(obj).find(".secends").text() < 10 ){
				str = "0" + secend;
				$(obj).find(".secends").html(str);
			}	
		},1000);
	}
	timeDown("2022/07/07",".time");
	
	
	/***在banner的右边的选项卡效果*************************/
	$(".proclamation-tab li").mouseover(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".tabs>div").eq($(this).index()).css("display","block").siblings().css("display","none");
	});
		
/**********************************content部分的效果*********************************************/	
	$(".contentFirst-tab-ul li").mouseover(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".contentFirst-picture > div").eq($(this).index()).css("display","block").siblings()
			.css("display", "none");	
	});
	/***封装的是在热门推荐下面的有选项卡的轮播*/
	function contentLunbo1(obj,index,i,fn){   //i代表你这个ul的可视区中li个数    index表示当前显示的索引
		var $lis2 = $(obj).find("li"), //所有在#box下的li
			len2 = $lis2.length,	//li的个数
			liWidth2 = $lis2.outerWidth(),	//每个li的宽度		jq中width只是第一个元素的宽度
				index2 = index;//当前显示的索引
		$(obj).find("ul").width(liWidth * len2);
		$(obj).parent().hover(function(){
			$(obj).children("div").first().show();
			$(obj).children("div").last().show();	
			if (index2 === 0) {
				$(obj).children("div").first().hide();
			}
			if (index2 === len2 - i) {
				$(obj).children("div").last().hide();
			}
		},function(){
			$(obj).children("div").first().hide();
			$(obj).children("div").last().hide();
		})
		$(obj).children("div").first().click(function(){
			index2-= 1;
			if(index2 < 0)
				index2 = 0;
			var _left = -liWidth2 *index2;
			$(obj).find("ul").stop().animate({left:_left}, 400);
			if (index2 === 0) {
				$(obj).children("div").first().hide();
			}
			 $(obj).children("div").last().show();
		});
		$(obj).children("div").last().click(function(){
			index2++;
			if(index2 > len2-i)
				index2 = len2-i;
			var _left = -liWidth2 *index2;
			$(obj).find("ul").stop().animate({left:_left}, 400);
			if (index2 === len2 - i) {
				$(obj).children("div").last().hide();
			}
			$(obj).children("div").first().show();
		});
	}
	contentLunbo1(".dom1",0,5);
	contentLunbo1(".dom2",0,5);
	contentLunbo1(".dom3",0,5);
	contentLunbo1(".dom4",0,5);
	
	
	/*******热门推荐的右边的轮播***********************/
	contentLunbo1("#dom2",2,1);
	
	/*******热门推荐的右边的倒计时***********************/
	timeDown("2100/01/01",".dom2-cdTime");
	
	/************品牌街上面的效果*****************************/
	//左边的出现红色的框
	$(".brand-logos-ul a").hover(function(){
		$(this).addClass("on3").parent().siblings().find("a").removeClass("on3");
	},function(){
		$(".brand-logos-ul a").removeClass("on3");
	})
	
	
	//品牌街右边的做成一个无缝轮播的轮播图
	var $lis3 = $("#dom3>ul").find("li"); //所有在#box下的li
	var len3 = $lis3.length;	//li的个数
	var liWidth3 = $lis3.outerWidth();	//每个li的宽度		jq中width只是第一个元素的宽度
	var oFirst = $("#dom3>ul").find("li").first().clone();//复制第一张图片
	var index3 = 0;//当前显示的索引
	var timer3 = null;
	 len3 += 1;
	$("#dom3-ul").append(oFirst);
	$("#dom3>ul").width(liWidth3 * len3);
	//给横条加上移入事件
	$(".dom3-rail-ul li").mouseover(function(){
		var _left = -liWidth3*$(this).index();
		$("#dom3-ul").stop().animate({left:_left}, 500);
		$(this).addClass("on2").siblings().removeClass("on2");	
	});
	//鼠标移入停止，移出开始
	$("#dom3").hover(function(){
		clearInterval(timer3);
	},function(){
		timer3  = setInterval(move2,2000);
	});
	//自动轮播
	timer3 = setInterval(move2,2000);
	function move2(){
		//不是无缝滚动的轮播
		/*index3++;
		if(index3 > len3-2){
			index3 = 0;
		}
		var _left = -liWidth3*index3;
		$("#dom3-ul").stop().animate({left:_left}, 500);	
		$(".dom3-rail-ul li").eq(index3).addClass("on2").siblings().removeClass("on2");	*/
		index3++;
		if (index3 === len3) {
			index3 = 1;
			$("#dom3-ul").css({left:0});//当滚动到最右边的时候，将它拉回来
		} 
		var _left = -liWidth3*index3;
		$("#dom3-ul").stop().animate({left:_left}, 400);
		//对小横条做出的限制
		if (index3 == len3-1) { 
			$(".dom3-rail-ul li").eq(0).addClass('on2').siblings().removeClass('on2');
		}else{
			$(".dom3-rail-ul li").eq(index3).addClass('on2').siblings().removeClass('on2');
		}
	}
	
	/*******每一个楼层中的效果***********************************************************************/
	//楼梯右边的切换轮播********
	var width = $(".floor-tab-ul").outerWidth();
	$(".floor-left-tab").hover(function(){
		if ($(".floor-tab-list").position().left === 0) {
			$(".next").show(300);
		}else if($(".floor-tab-list").position().left === -width){
			$(".prev").show(300);
		}
	},function(){
		$(".floor-left-tab>div").not(".floor-tab-list").hide();
	});
	$(".prev").click(function(){
		$(".floor-tab-list").stop().animate({left:0},500);
		$(".next").show(300);
		$(".prev").hide(300);
	});
	$(".next").click(function(){
		$(".floor-tab-list").stop().animate({left:-width},500);
		$(".prev").show(300);
		$(".next").hide(300);
	});
	
	//楼梯左边的轮播    不做成无缝***********************
	var $lis4 = $(".floor-left-banner > ul").find("li"); //所有在#box下的li
	var	len4 = $lis4.length;	//li的个数
	var liWidth4 = $lis4.outerWidth();	//每个li的宽度		jq中width只是第一个元素的宽度
	var index4 = 0;//当前显示的索引
	var timer1 = null;
	$(".floor-left-banner>ul").width(liWidth4 * len4);
	//给横条加上移入事件
	$(".hd li").mouseover(function(){
		var _left = -liWidth4*$(this).index();
		$(".floor-tab1").stop().animate({left:_left}, 500);
		$(this).addClass("on3").siblings().removeClass("on3");	
	});
	//鼠标移入停止，移出开始
	$(".floor-left-banner").hover(function(){
		clearInterval(timer1);
	},function(){
		timer1 = setInterval(move4,1500);
	});
	//自动轮播
	timer1 = setInterval(move4,1500);
	function move4(){
		//不是无缝滚动的轮播
		index4++;
		if(index4 > len4-1){
			index4 = 0;
		}
		var _left = -liWidth4*index4;
		$(".floor-tab1").stop().animate({left:_left}, 500);	
		$(".hd li").eq(index4).addClass("on3").siblings().removeClass("on3");		
	}
	
	//鼠标移入商品，透明度会发生改变
	$(".floor-right-ul li").mouseover(function(){
		$(this).css("opacity",1).siblings().css("opacity",0.6);	
	});
	$(".floor-right-ul").mouseout(function(){
		$(".floor-right-ul li").css("opacity",1);
	})
	

	/*****小效果：在猜你喜欢的环节，鼠标移上去会出现一个遮罩层***************/
	$(".product-item").each(function(){
		$(this).hover(function(){
			$(this).find(".bgbox").stop().animate({left:0},400);
		},
		function(){
			$(this).find(".bgbox").stop().animate({left:-110},400);
		})
	})
	
	/*******尾页的选项卡效果***********************************************/
	$(".footer-tab li").mouseover(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".ft-wp-1").eq($(this).index()).css("display","block").siblings().css("display","none");
	});
	
});