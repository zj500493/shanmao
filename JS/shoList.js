$(function(){
	/******出现一个框****************************/
	$(".filter-tabs").hover(function(){
		$(".content-wrap").show();
		$(".filter-tab1").css({"border-color":"#EC5051","border-bottom-color":"#ffffff"});
	},function(){
		$(".content-wrap").hide();
		$(".filter-tab1").css("border-color","#DCDCDC")
	})
	
	
	/****鼠标滑过显示出字**************/
	$(".wrap-div-img").hover(function(){
		$(this).find("strong").show();
		$(this).find("img").hide();
		$(this).css("borderColor", "#ec5151");
	},function(){
		$(this).find("strong").hide();
		$(this).find("img").show();
		$(this).css("borderColor", "#ddd");
	})
	
	//
	$(".choice-open").click(function(){
		$(".wrap-div-space").stop().slideToggle();
	})
	
	
	/*****对于颜色的选择*********************************/
	$(".p-color li").click(function(){
		$(this).addClass("select").siblings().removeClass("select");
	});
	
	/****购物车的效果******************************/
	//点击'添加到购物车' 
	$(".btn2").click(function(event){
		//用一个对象来保存获取到的商品信息
		var product = {
			shopName :	$(this).siblings(".g-name").text(), 
			shopPrice:  $(this).siblings(".p-ad").find("span").text(),
			shopSrc  :  $(this).siblings(".g-img").find("img").attr("src"),
			shopColor:  $(this).siblings(".p-color").find(".select").text(),
			amount   : 1
		}
		$.cookie.json = true;
		//先从cookie中读取到数组
		var cars = $.cookie("cars");
		//判断是否为空
		if(!cars){
			cars = [];
		}
		var index  = findIndex(product.shopName, cars);
		//var index1  = findIndex(product.shopColor, cars);
		if(index === -1){
			//当不存在该商品时候，将购物车的商品添加到数组中
			cars.push(product);
		}else{
			//存在的话则让数量自加
			cars[index].amount++;
		}
		//将数组保存回cookie
		$.cookie("cars", cars, {});
		
		/*****点击以后让购物清单中的购物车图标上的数量加******************/
		var num = 0;
		for (var i in cars) {
			num += cars[i].amount;
		}
		$(".cart_num").text(num);
		$(".shopcar-center").text(num);
		
		//封装函数来找出数组中指定商品名称的元素位置
		function findIndex(shopName, cars){
			for(var i in cars){
				if(cars[i].shopName === shopName)
				return i;
			}
			return -1;
		}	
	});	
	
	var offset = $("#shopCart .message").offset();  //结束的地方的元素
	$(".btn2").each(function(){
		$(this).click(function(event){   //是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
			var img = $(this).parent().children('.g-img').find("img").attr('src');
			var flyer = $('<img class="u-flyer" src="'+img+'"/>');
			flyer.fly({
				start: {
					left: event.pageX,
					top: event.pageY
				},
				end: {
					left: offset.left,
					top: offset.top,
					width: 0,
					height: 0
				},
				/*onEnd: function(){
					$("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
				}*/
			});
		});
	})

	/******成功以后购物车的数量加***************************************/
	var cars = $.cookie("cars");
	if (cars) {
		var cars2 = JSON.parse(cars);
		var num = 0;
		for (var i in cars2) {
			num += cars2[i].amount;
		}
		$(".cart_num").text(num);
		$(".shopcar-center").text(num);
	} 
		
		
	/*********动态加载商品********************************************************/	
	$.get("../json/shopList.json",function(data){
		var j = 0;
		for(var i in data){
			j++;
			if(i = "img"+j){
				$(".goods-ul .goods-li").eq(j-1).find(".g-img a").append("<img src ="+data[i].img+"/>");
				$(".goods-ul .goods-li").eq(j-1).find(".g-price strong").append("￥<span>"+data[i].shoPrice+"</span>");
				$(".goods-ul .goods-li").eq(j-1).find(".g-num").text("销量是："+data[i].saleSum+"");
				$(".goods-ul .goods-li").eq(j-1).find(".g-name").append("<a href='##'>"+data[i].name+"<a/>");		
			}else{
				i++
			}
		}
	})
		
		
		
		
		
		
		
		
		
		
		
		
		
		
});