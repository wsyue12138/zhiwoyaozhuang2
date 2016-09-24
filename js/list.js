$(function(){
/*上部移入出现下拉列表*/
	
	$("#header .txt").hover(function(){
		$("#header .over").eq($("#header .txt").index(this)).stop().slideDown(500)
	},function(){
		$("#header .over").eq($("#header .txt").index(this)).stop().slideUp(500);
	})
	/*导航移入出现div*/
	
	$("#nav li.two").hover(function(){
		$("#nav .list").stop().slideToggle(500);
	},function(){
		$("#nav .list").stop().slideToggle(500);
	})
	/*导航栏右侧li动画*/
	$("#nav .ul_right_li").on("mouseover",function(){
		$(this).stop().animate({"width":"108px"},500);
	})
	$("#nav .ul_right_li").on("mouseout",function(){
		$(this).stop().animate({"width":"34px"},500);
	})
	
/*右侧固定栏*/
	$(".ul1_li").hover(function(){
		$(".ul1_d").eq($(".ul1_li").index(this)).css({"display":"block"})
		$(".ul1_d").eq($(".ul1_li").index(this)).stop().animate({"left":"-80px"},500)
	},function(){
			$(".ul1_d").eq($(".ul1_li").index(this)).css({"display":"none"})
				$(".ul1_d").eq($(".ul1_li").index(this)).stop().animate({"left":"-100px"},500)	
	})
	$(".all_r_p").on("click",function(){
		$(window).scrollTop(0);
	})

/*登录显示用户名*/

	var name = getCookie("name");
	if(getCookie("a")== "true"){
		$(".land a").html('欢迎知我用户:' + name +'&nbsp;&nbsp;<a class="out" href="#">退出</a>')
	}else{
		$(".land a").html("请登录")
	}
	/*退出*/
	$(".out").on("click",function(){
		$(".land a").html("请登录")
		setCookie("a",false)
	})

/*top部分json*/
$.ajax({
	url:"json/list1.json",
	success:function(data){
		var datas = data.data;
		var str = "";
		for(var i in datas){
			str+='<dl class="l top_dl">'
			str+='<dt class="l top_dt"><a href="#"><img src="'+datas[i].src+'" /></a></dt>'
			str+='<dd class="l top_dd" dataid="'+datas[i].id+'">'
			str+='<p class="top_txt"><a href="#">'+datas[i].name+'</a></p>'
			str+='<p class="top_pic">'+datas[i].pic+'</p></dd></dl>'		
		}
		$(".content_top").html(str);
	}
})

/*商品栏商品添加*/
$.ajax({
	url:"json/list2.json",
	success:function(data){
		var datas = data.data;
		var str = '';
		for(var i in datas){
			str+='<dl class="l">'
			str+='<dt><a dataid="'+datas[i].id+'" class="in" href="minute.html"><span class="op_sp"><img src="'+datas[i].src+'" /></span></a></dt>'
			str+='<dd><p class="goods_p1"><a dataid="'+datas[i].id+'" class="in" href="minute.html">'+datas[i].name+'</a></p>'
			str+='<p class="goods_p2"><span class="l sp_1"><b>'+datas[i].pic+'&nbsp;</b></span><span class="l sp_2">'+datas[i].oldpic+'</span><span class="r btn" dataid="'+datas[i].id+'">加入购物车</span></p></dd></dl>'	
		}
		$(".goods").html(str);
	}
})

/*进入详情页*/

$(".goods").on("click",".in",function(){
	var names = $(this).attr("dataid")
	setCookie("names",names)
})





/*换页变色*/

$(".num").on("click","li",function(){
	$(this).css({"background":"#c4c4c4"}).siblings().css({"background":"#fff"})
})











})