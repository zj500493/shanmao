$(function(){

	$.cookie.json = true;
	
	//读取到cookie中的数据
	var cars = $.cookie("cars");
	//读取到以后再来判断读取到的数据是否为空
	if(!cars || cars.length ===0){
		$(".row").hide();
		$(".carBottom").hide();
		$("#cart-list").hide();
		$(".car-empty").show();
	}else{
		//如果不是空则执行以下的操作
/*		//首先遍历到数组中所有的元素
		//console.log(cars)
		$.each(cars, function(index, element){
											//将当前遍历到的属性保存  格式为：xxx.product = element;
			$(".row:first").clone().insertBefore(".carBottom").data("product", element)
							.children(".all").find("label").after("<img src ="+element.shopSrc+"/>").end()
							.children(".shop-name").text(element.shopName).end()
							.children(".shop-attr").html("<span>颜色："+element.shopColor+"</span>").end()
							.children(".shop-price").html("￥<span>"+element.shopPrice+"</span>").end()
							.children(".shop-num").html("<span class='minus' style='cursor:pointer'> - </span><input  class='amountIput' style='text-align:center' type='text' size='1' value='"+element.amount+"'><span class='add' style='cursor:pointer'> + </span>")
							.next(".shop-sub").text(element.shopPrice * element.amount)
							.next(".shop-action").html("<a href = 'javascript:;'>删除</a>");			
		});*/
		for(var i in cars) {
			var str = '<div class="item-body">'+
							'<div class="item-item">'+
								'<div class="item-form">'+
									'<div class="p-checkbox cell">'+
										'<input type="checkbox" class="cart-checkbox"/>'+
									'</div>'+
									'<div class="p-img cell">'+
										'<a href="##">'+
											'<img src='+cars[i].shopSrc+' />'+
										'</a>	'+
									'</div>'+
									'<div class="p-name cell">'+
										'<a href="##">'+cars[i].shopName+'</a>'+
									'</div>'+
									'<div class="p-attr cell">'+
										'<span>颜色是：'+cars[i].shopColor+'</span>'+
									'</div>'+
									'<div class="p-price cell">￥<span class="price-sum">'+cars[i].shopPrice+'</span></div>'+
									'<div class="p-quantity cell">'+
										'<div class="quantity-form">'+
											'<span class="minus" style="cursor:pointer"> - </span>'+
											'<input  class="amountIput" style="text-align:center" type="text" size="1" value='+cars[i].amount+'>'+
											'<span class="add" style="cursor:pointer"> + </span>'+
										'</div>'+
									'</div>'+
									'<div class="p-sum cell">￥<span class="sums">'+cars[i].shopPrice * cars[i].amount+'</div>'+
									'<div class="p-ops cell"><a href = "javascript:;">删除</a></div>'+
								'</div>'+
							'</div>'+
						'</div>';
			$(".item-list").append(str);
		}
	}
	//点击继续购物页面跳转
	$(".go-shopping").click(function(){
		window.location.href = "shopList.html";
	});
	
	//全选功能的实现
	$(".checkbox1").click(function(){
		$(".cart-checkbox").prop("checked", $(this).prop("checked"));
		calcTotal();
		math();
		math1();
	});
	$(".checkbox2").click(function(){
		$(".cart-checkbox").prop("checked", $(this).prop("checked"));
		calcTotal();
		math();
		math1();
	});
	
	// 点击商品行前的复选框，设置“全选”复选框刷新状态与显示合计金额
	$(".cart-checkbox").click(function() {
		$(".checkbox2").prop("checked", $(".cart-checkbox:checked").length === $(".cart-checkbox").length ? true : false);
		calcTotal();
		math();
		math1();
	});
	
	//删除购物车选中的商品 
	$(".p-ops a").click(function(){
		var $row = $(this).parents(".item-body");
		deleteRow($row);
	})
	
	// "删除选中行"
	$(".clearshop-a").click(function(){
		$(".cart-checkbox").each(function(index, element){  //遍历得到所有的  .product
			// $(this).prop("checked")
			if ($(this).is(":checked")) { // 被选中的
				var $row = $(this).parents(".item-body");
				deleteRow($row);
			}
		});
	});
	
	function deleteRow($row){
		//首先要获取你所删除的缓存的数据
		var product = $row.data('product');
		//找出当前删除的商品在数组中是第几个元素       既是找到所获取的缓存数据在购物车中是第几个元素
		var index = $.inArray(product,cars);
		//删除该索引处的元素
		cars.splice(index,1);
		//将删除后得到的数组保存到cookie
		$.cookie("cars", cars, {});
		
		//从页面中删除行
		$row.remove();
		//如果购物车为空，则发生一些动作。如跳转页面....
		if(cars.length ===0){
			$(".row").hide();
			$(".carBottom").hide();
			$("#cart-list").hide();
			$(".car-empty").show();
		}
		//重新计算合计
		calcTotal();
		math();
		math1();
	}
	//计算合计的金额
	function calcTotal(){
		var total =0;
		$(".cart-checkbox:checked").parents(".item-body").find(".sums").each(function(index,element){
			total += parseFloat($(this).text());	
		});
		//显示合计的金额
		$(".amount-price").text(total);
	}
	//计算合计数量
	function math(){
		var maths = 0;
		$(".cart-checkbox:checked").parents(".item-body").find(".amountIput").each(function(index,element){
			maths += parseFloat($(this).val());
		})
		//显示合计的数量
		$(".amount-sum").text(maths);
	}
	
	math1();
	function math1(){
		var maths = 0;
		$(".cart-checkbox").parents(".item-body").find(".amountIput").each(function(index,element){
			maths += parseFloat($(this).val());
		})
		$(".shopcar-center").text(maths);
	}
	
	// 加数量
	$(".add").click(function(){
		// 获取原有数量
		var amount = parseInt($(this).prev().val());
		amount++;
		// 加数量，将加了之后的结果放回文本框中显示
		$(this).prev().val(amount);
		// 获取单价
		var price = parseFloat($(this).parents(".p-quantity").prev(".p-price").find("span").text());
		// 重新计算小计
		$(this).parents(".p-quantity").next(".p-sum").find("span").text(price * amount);
		// 重新计算合计
		calcTotal();
		//重新计算数量
		math();
		math1();
		// 保存修改了数量的商品信息
		var cars = $.cookie("cars");
		for(var i in cars) {
			cars[i].amount = amount;
		}
		console.log( $.cookie("cars"))
		$.cookie("cars", cars, {expires:7, path:"/"});
	});

	// 减数量
	$(".minus").click(function(){
		// 获取原有数量
		var amount = parseInt($(this).next().val());
		if (amount <= 1) // 数量最小减到1
			return;
		amount--;
		// 减数量，将减了之后的结果放回文本框中显示
		$(this).next().val(amount);
		// 获取单价
		var price = parseFloat($(this).parents(".p-quantity").prev(".p-price").find("span").text());
		// 重新计算小计
			$(this).parents(".p-quantity").next(".p-sum").find("span").text(price * amount);
		// 重新计算合计
		calcTotal();
		//重新计算数量
		math();
		math1();
		// 保存修改了数量的商品信息
		for(var i in cars) {
			cars[i].amount = amount;
		}
		$.cookie("cars", cars, {expires:7, path:"/"});
	});
	
	
	//点击支付跳转
	$(".select-payfor").click(function(){
			window.location.href = "payFor.html";
			var iPriceSum = parseFloat($(".amount-price").text());
			$.cookie("iPriceSum", iPriceSum, {expires:7,path:"/"});
	});
	
	
});