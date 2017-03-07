$(function(){
	/****通过cookie获取到商品个数***************/
	var cars = $.cookie("cars");
	if (cars) {
		var cars2 = JSON.parse(cars);
		var num = 0;
		for (var i in cars2) {
			num += cars2[i].amount;
		}
		$(".shopcar-center").text(num);
	} 
	
	/*****放大镜效果******************************************/
	var popWidth = $(".pop").width();
	var popHeight = $(".pop").height();
	var middleWidth =  $(".middle-box").outerWidth();
	var middleHeight =  $(".middle-box").outerHeight();
	var bigWidth = $(".big-box").width();
	var bigHeight = $(".big-box").height();
	var rateX = bigWidth / popWidth;  
	var rateY = bigHeight / popHeight;
	
	$(".middle-box").hover(function(){
		$(".pop").show();
		$(".big-box").show();
	},function(){
		$(".pop").hide();
		$(".big-box").hide();
	}).on("mousemove" ,function(event){
		$(".pop").offset({
			left:event.pageX - popWidth/2,
			top:event.pageY - popHeight/2

		});
		//获取.pop 相对有定位的父元素   .middle 的相对定位位置
		var position = $(".pop").position(),
			_top = position.top,
			_left = position.left;
		//判断_top _left的取值
		if(_top<0)
		_top = 0;
		else if(_top > middleHeight - popHeight)
			_top = middleHeight - popHeight;
		
		if(_left<0)
		_left = 0;
		else if(_left > middleWidth - popWidth)
			_left = middleWidth - popWidth;
		
		//重新设置.pop 的相对定位位置
		$(".pop").css({
			top:_top,
			left:_left
		});
		
		//设置大图片框中的图片定位位置
		$(".big-box img").css({
			top: -rateY * _top,
			left: -rateX * _left
		});

		//阻止浏览器的默认行为
		document.onmousedown = function(evt){
			var e = evt || window.event;
			evt?e.stopPropagation():e.cancelBubble=true;
			evt?e.preventDefault():e.returnValue=false;
			return false;
		}
		
	});
	$(".small").on("click",function(){
		$(this).addClass("curr").siblings().removeClass("curr");
		var _src = $(this).find("img").attr("src");
		$(".middle-box img").attr("src", _src);
		$(".big-box>img").attr("src", _src);
	});
	
	
	
	/*****滑上滑下的效果******************************************/
	$(".arrow-show-more").click(function(){
		$(".seller-address").stop().slideToggle();
	});
	
	/******倒计时**************************************************/
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
	timeDown("2092/01/01",".time");
	
	
	
	
	
	
	
	

});
