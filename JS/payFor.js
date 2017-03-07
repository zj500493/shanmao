$(function(){
	var iPriceSum = $.cookie("iPriceSum");
	if(!iPriceSum){
		$(".submit span").text(iPriceSum);
	}else{
		alert("亲，你还没有在购物车中确认你要买的东西！")
	}
	
	
	
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
	
});