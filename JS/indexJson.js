$(function(){
	//封装一个只是保存了一个图片来源属性的json
	function picJson(jsonHref, obj){	//jsonHref:表示要引入的json文件名  obj表示要插入图片的位置
		$.get(jsonHref,function(data){
			var j = 0;
			for(var i in data){		
				j++;
				if(i === "img"+j){
				$(obj).eq(j-1).append("<img src="+data[i].img+"/>");
				}else{
					i++;
				}				
			}
		})
	}
	
/****************主页中心的轮播图***********************************************************************/
	//方法一：用$.get方法
	/*$.get("../json/index-bannerlunbo.json",function(data){
		var j = 0;
		for(var i in data){		
			j++;
			if(i === "img"+j){
			$(".containner li").eq(j-1).find("a").append("<img src="+data[i].img+"/>");
			}else{
				i++;
			}				
		}
	})*/
	//方法二：用$.ajax方法
	$.ajax({
		type: "get",
		url: "../json/index-bannerlunbo.json",
		async: true,
		success: function(data){
			var j = 0;
			for(var i in data){		
				j++;
				if(i === "img"+j){
				$(".containner li").eq(j-1).find("a").append("<img src="+data[i].img+"/>");
				}else{
					i++;
				}				
			}
		}			
	});
	
/*******主页中心的banner下的无缝轮播*********************************************************************/
	picJson("../json/json1.json", ".wf-tab a");
	
/*******热门推荐下的轮播*********************************************************************************/	
 	$.get("../json/json2.json",function(data){
		var num = 1;
		for(var i in data){		
			var oDom = $(".dom"+num);
			var aLi = oDom.find("li");
			var num1 = 0;
			for(var j in data[i]) {
				var oImgInfo = data[i][j];
				aLi.eq(num1).find("div:eq(0)").find("a").append("<img src="+data[i][j].img+"/>");
				aLi.eq(num1).find("div:eq(1)").find("a").text(data[i][j].name);
				aLi.eq(num1).find("div:eq(2)").find(".shop-price").html("<em>￥"+data[i][j].shoPrice+"</em>");
				aLi.eq(num1).find("div:eq(2)").find(".original-price").append("<del>"+data[i][j].originalPrice+"</del>");
				num1++;
			}
			num++;							
		}
	})
		
	
/*******品牌街下面的商品logo****************************************************************************/			
	picJson("../json/json3.json", ".brand-logos-ul a");
	
	//品牌街下面的轮播图
	picJson("../json/json4.json", "#dom3-ul a");
	
/*********第一个楼层中的图片****************************************************************************/	
	var winHeight = $(window).height();
	$(window).on("scroll", function(){
		var scrollTop = $(this).scrollTop();
		var st = $("#floor_1").offset().top;
		if(winHeight + scrollTop > st +800 ){
			//轮播图	
			picJson("../json/json5.json", "#floor_1  .floor-tab1  a");
		}
	})
	//楼层中的图片
	$.get("../json/json6.json",function(data){
		var j = 0;
		for(var i in data){
			j++;
			if(i = "img"+j){
				$("#floor_1 .floor-right-ul .f-img").find("a").eq(j-1).append("<img src="+data[i].img+"/>");
				$("#floor_1 .floor-right-ul .f-name").find("a").eq(j-1).text(data[i].name);
				$("#floor_1 .floor-right-ul .f-price").find(".shop-price").eq(j-1).append("<em>￥"+data[i].shoPrice+"</em>");
				$("#floor_1 .floor-right-ul .f-price").find(".original-price").eq(j-1).append("<del>￥"+data[i].originalPrice+"</del>");
			}
		}
	});

	
	
	//获取每一个楼层前面的图画
	$.get("../json/json7.json",function(data){
		$(".floor-startPictureImg a").append("<img src="+data.img+"/>");
	});
	
	
	
	/*$.get("../json/json6.json",function(data){
		var j = 0;
		for(var i in data){
			j++;
			if(i = "img"+j){
				var str = '<div class="floor w1200" id="floor_1">'+
					'<div class="floor-title">'+
						'<h2>'+
							'<b class="floor-icon">1F</b>'+
							'<span class="floor-title-span" rev="8">鞋靴、箱包、钟表、奢侈品</span>'+
						'</h2>'+
						'<ul class="floorTab">'+
							'<li class="floorTab-li">'+
								'奢侈品'+
								'<span class="floorTab-span" style="width: 44px;"></span>'+
							'</li>'
							'<li class="floorTab-li">'+
								'功能箱包'+
								'<span  class="floorTab-span" style="width: 60px;"></span>'+
							'</li>'+
						'</ul>'+
					'</div>'+
					'<div class="floor-content">'+
						'<div class="floor-left">'+
							'<div class="floor-left-banner">'+
								'<ul class="floor-tab1">'+
									'<li>'+
										'<a href="#">'+
											'<img src = "../img/floor-tab1.jpg"/>'+
										'</a>'+
									'</li>'+
									'<li>'+
										'<a href="#">'+
											'<img src = "../img/floor-tab2.jpg"/>'+
										'</a>'+
									'</li>'+
									'<li>'+
										'<a href="#">'+
											'<img src = "../img/floor-tab3.jpg"/>'+
										'</a>'+
									'</li>'+
									'<li>'+
										'<a href="#">'+
											'<img src = "../img/floor-tab4.jpg"/>'+
										'</a>'+
									'</li>'+
								'</ul>'+
								'<div class="hd">'+
									'<ul class="hd-ul">'+
										'<li class="on3">1</li>'+
										'<li>2</li>'+
										'<li>3</li>'+
										'<li>4</li>'+
									'</ul>'+
								'</div>'+
							'</div>'+
	
							'<div class="banner-nav">'+
								'<ul class="banner-nav-ul">'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">奢侈品</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">功能箱包</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">流行男鞋</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">精品男包</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">奢侈品</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">奢侈品</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">时尚女鞋</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">礼品</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">潮流女包</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
									'<li class="banner-nav-li">'+
										'<a href="#" class="banner-nav-a">钟表</a>'+
										'<i class="banner-nav-i">></i>'+
									'</li>'+
								'</ul>'+
							'</div>'+
							'<!--轮播切换----------------->'+
							'<div class="floor-left-tab">'+
								'<div class="floor-tab-list">'+
									'<ul class="floor-tab-ul">'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab1.jpg"/>'+
											'</a>'+
										'</li>'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab1.jpg"/>'+
											'</a>'+
										'</li>'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab1.jpg"/>'+
											'</a>'+
										'</li>'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab1.jpg"/>'+
											'</a>'+
										'</li>'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab1.jpg"/>'+
											'</a>'+
										'</li>'+
									'</ul>'+
									'<ul class="floor-tab-ul">'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab2.jpg"/>'+
											'</a>'+
										'</li>'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab2.jpg"/>'+
											'</a>'+
										'</li>'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab2.jpg"/>'+
											'</a>'+
										'</li>'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab2.jpg"/>'+
											'</a>'+
										'</li>'+
										'<li class="floor-tab-li">'+
											'<a href="#">'+
												'<img src="../img/floor-left-tab2.jpg"/>'+
											'</a>'+
										'</li>'+
									'</ul>'+
								'</div>'	+						
								'<div class="prev"> < </div>'+
								'<div class="next"> > </div>'+
							'</div>'+
						'</div>'+
						'<!-------所有的图片---------------->'+
						'<div class="floor-right">'+
							'<ul class="floor-right-ul">'+
								'<li class="f-li">'+
									'<div class="f-img">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-name">'+
										'<a href="#">'+
										
										'</a>'+
									'</div>'+
									'<div class="f-price">'+
										'<span class="shop-price">'+
											
										'</span>'+
										'<span class="original-price">'+
										
										'</span>'+
									'</div>'+
								'</li>'+
								'<li class="f-li">'+
									'<div class="f-img">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-name">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-price">'+
										'<span class="shop-price">'+
											
										'</span>'+
										'<span class="original-price">'+
											
										'</span>'+
									'</div>'+
								'</li>'+
								'<li class="f-li">'+
									'<div class="f-img">'+
										'<a href="#">'+
										
										'</a>'+
									'</div>'+
									'<div class="f-name">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-price">'+
										'<span class="shop-price">'+
											
										'</span>'+
										'<span class="original-price">'+
										
										'</span>'+
									'</div>'+
								'</li>'+
								'<li class="f-li">'+
									'<div class="f-img">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-name">'+
										'<a href="#">'+
										
										'</a>'+
									'</div>'+
									'<div class="f-price">'+
										'<span class="shop-price">'+
											
										'</span>'+
										'<span class="original-price">'+
											
										'</span>'+
									'</div>'+
								'</li>'+
								'<li class="f-li">'+
									'<div class="f-img">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-name">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-price">'+
										'<span class="shop-price">'+
											
										'</span>'+
										'<span class="original-price">'+
										
										'</span>'+
									'</div>'+
								'</li>'+
								'<li class="f-li">'+
									'<div class="f-img">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-name">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-price">'+
										'<span class="shop-price">'+
										
										'</span>'+
										'<span class="original-price">'+
									
										'</span>'+
									'</div>'+
								'</li>'+
								'<li class="f-li">'+
									'<div class="f-img">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-name">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-price">'+
										'<span class="shop-price">'+
										
										'</span>'+
										'<span class="original-price">'+
										
										'</span>'+
									'</div>'+
								'</li>'+
								'<li class="f-li">'+
									'<div class="f-img">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-name">'+
										'<a href="#">'+
											
										'</a>'+
									'</div>'+
									'<div class="f-price">'+
										'<span class="shop-price">'+
										
										'</span>'+
										'<span class="original-price">'+
											
										'</span>'+
									'</div>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
				'</div>'
				$(".goods-cat-level").append(str);
			}else{
				i++;
			}
		}
	})	
	*/
				
	

	
	
	
	
	
	
	
	
	
})