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
	


/*滚动出现定位条*/

$(window).scroll(function(){
	if($(this).scrollTop() >= 1600){
		$(".move").css({"display":"block"})
	}else{
		$(".move").css({"display":"none"})
	}
})

/*添加内容*/
var name = getCookie("names")
$.ajax({
	url:"json/minute.json",
	success:function(data){
		var datas = data.data;
		var str1 = '';
		var str2 = '';
		var str3 = '';
		for(var i in datas){
			if(datas[i].id == name){
				str1+='<div class="l left_"><div class="through"></div><img src="'+datas[i].src+'" /></div>'
				str1+='<div class="big"><img class="big_img" src="'+datas[i].src+'" /></div>'
				str1+='<div class="l right"><p class="r_p1">'+datas[i].name+'</p>'
				str1+='<p class="r_p2">￥'+datas[i].pic+'<span class="p2_sp"> '+datas[i].oldpic+'</span></p>'
				str1+='<p class="r_p3">评 价 ：<span class="p3_sp"></span>&nbsp;&nbsp;'+datas[i].men+'</p>'
				str1+='<div class="r_evalute"><p class="l r_num1">数 量 ：&nbsp;</p>'
				str1+='<p class="l r_num2"><span class="l sp_l">-</span><input class="l num" type="text" value="1" /><span class="r sp_r">+</span></p>'
				str1+='<p class="l r_num3"><a href="#" style="color:#00C8FF;">&nbsp;&nbsp;更多 '+datas[i].txt+'</a></p></div>'
				str1+='<p class="r_p4"><span class="p4_sp">满减</span>贝德玛品牌团  满199减30 </p>'
				str1+='<p class="r_p5"><span class="l btn" dataid="'+datas[i].id+'"></span><span class="l shou">收藏</span></p>'
				str1+='<p class="r_p6"><span class="p6_sp">功效&nbsp;&nbsp;</span>'+datas[i].gong+'</p></div>'
				str1+='<div class="fly"></div>'
				str2+='<a style="color:#ff643c;" href="#">'+datas[i].name+'</a>'
				str3+='<img src="'+datas[i].img+'" />'
			}
		}
		$(".show1").html(str1);
		$(".a_name").html(str2);
		$(".bot_right").html(str3);
		var _left=document.getElementsByClassName("left_")[0]
		var _through = document.getElementsByClassName("through")[0]
		var _big = document.getElementsByClassName("big")[0]
		var _img = document.getElementsByClassName("big_img")[0]
		big(_left,_through,_big,_img,175,2 )
		
	}
})

/*增/减少加购物车件数*/
$(".show1").on("click",".sp_l",function(){
	var num = $(".num").val();
	var mNum = Number(num) - 1;
	if(mNum <= 1){
		mNum = 1;
	}
	$(".num").val(mNum)
})
$(".show1").on("click",".sp_r",function(){
	var num = $(".num").val();
	var mNum = Number(num) + 1;
	$(".num").val(mNum)
})


/*进入购物车 */
$(".shop").on("click",function(){
	window.location.href = "shopcar.html"
})

/*加入购物车*/
$(".show1").on("click",".btn",function(){
	var dataid = $(this).attr("dataid");
	var num = $(".num").val();
	if(getCookie(dataid)){
		setCookie(dataid,dataid)
		var oldnum = getCookie("n"+dataid)
		var newnum = Number(oldnum) + Number(num)
		setCookie("n"+dataid,newnum)
	}else{
		setCookie(dataid,dataid)
		setCookie("n"+dataid,num)
	}
	
})

/*店击加入购物车动画*/
$(".show1").on("click",".btn",function(){
	$(".fly").css({"display":"block"})
	$(".fly").stop().animate({"right":"-35px","top":"-180px","width":"0","height":"0"},500,function(){
		$(".fly").css({"right":"410px","top":"291px","width":"200px","height":"45px"})
		$(".fly").css({"display":"none"})
	})
})


/*放大镜*/



 function big(obj1,obj2,obj3,img,obj2Width,num){
	 		var i = num;
			obj1.onmouseover = function(){
				obj2.style.display = "block";
				obj3.style.display = "inline-block";
			};
				obj1.onmousemove = function(evt){
					var e = evt || window.event;
					var w = e.clientX - obj1.offsetLeft - obj2Width;
					var h = e.clientY - obj1.offsetTop - obj2Width* 2;
					if(w <= 0){
						w = 0;	
					}else
					if(w >= obj1.offsetWidth - obj2Width){		
						w = obj1.offsetWidth - obj2Width;
					}
					if(h <=0){
						h = 0;	
					}else
					if(h >=obj1.offsetHeight - obj2Width){	
						h = obj1.offsetHeight - obj2Width;	
					}

					obj2.style.left = w + "px";
					obj2.style.top = h + "px";
					img.style.marginLeft = -w*num + "px";
					img.style.marginTop = -h*num + "px";
				};
			obj1.onmouseout = function(){
				obj2.style.display = "none";
				obj3.style.display = "none";	
			};

		};













})

