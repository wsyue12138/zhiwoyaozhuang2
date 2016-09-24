
	
$(function(){
	/*头部动画效果*/
	
	setTimeout(function(){
		$("#header .header_top").animate({"height":"100px"},1000,function(){
			$("#header a.big").fadeOut(500,function(){
				
				$("#header span.open").css({"display":"block"})
			});
			$("#header a.small").css({"display":"block"})
		})
	},3000)
	var a = true; 
	$("#header span.open").click(function(){
		if(a == true){
			a = false;
			$("#header .header_top").stop().animate({"height":"300px"},1000)
			$("#header a.small").stop().fadeToggle(500);
			$("#header a.big").stop().fadeToggle(500);
			$("#header span.open").html("收起")
		}else
		if(a == false){
			a = true;
			$("#header .header_top").stop().animate({"height":"100px"},1000,function(){
				$("#header a.big").stop().fadeToggle(500);
				$("#header a.small").stop().fadeToggle(500);
				$("#header span.open").html("展开")
			})
			
		}
	})
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
	/*banner轮播图 */
	var index = 1;
	var timer1 = setInterval(banMove,3000)
	function banMove(){
		$("#banner li.banner_li").hide();
		$("#banner li.banner_li").eq(index).show();
		$("#banner a.banner_a").css({"width":"1300px","height":"370px"})
		$("#banner a.banner_a").eq(index).animate({"width":"1263px","height":"350px"},1000)
		$("#banner .move_sp").css({"background":"#6c6c6c"})
		$("#banner .move_sp").eq(index).css({"background":"#00c8ff"})
		index++;
		index %= $("#banner li.banner_li").size();
	}
		
	$("#banner").on("click",".move_sp",function(){
		clearInterval(timer1);
		$("#banner li.banner_li").hide();
		$("#banner li.banner_li").eq($(this).index()).show();
		$("#banner .move_sp").css({"background":"#6c6c6c"})
		$(this).css({"background":"#00c8ff"})
		timer1 = setInterval(banMove,3000)
	})
	
/*倒计时*/

var timer = setInterval(function(){
	var time = mTime(2016,8,5)
	$(".time").html(time)
	$(".hot_sp6").html(time)
},1000)

function mTime(a,b,c){
	var now = new Date()
	var tom = new Date(a,b,c)
	var cha = (tom - now)/1000;
	var day = Math.floor(cha/60/60/24);
	var hour = Math.floor(cha%(60*60*24)/3600);
	var min = Math.floor(cha%8400%3600/60);
	var s = Math.floor(cha%60)
	var time = day + "天" + hour + "小时" + min + "分钟" + s + "秒"
	return time
}


	
	
	/*content部分头条*/
	$.ajax({
		
		url:"json/index.json",
		success:function(data){
			var datas=data.data
			var str=''
			for(var i in datas){
				str+='<dl class="w tim_dl">'
				str+='<dt class="l tim_dt"><a href="#"><img src="'+datas[i].src+'" alt="'+datas[i].name+'" /></a></dt>'
				str+='<dd class="r tim_dd">'
				str+='<p class="dd_p1">团购结束 &nbsp;&nbsp;&nbsp;&nbsp;<span class="time"></span></p>'
				str+='<p class="dd_p2"><a href="#"><span style="color:#ff643c;">'+datas[i].zhe+'</span>'+datas[i].txt+'</a></p>'
				str+='<p class="dd_p3">'
				str+='<span class="l sp_pic1"><b>'+datas[i].pic+'</b></span>'
				str+='<span class="l sp_pic2">'+datas[i].oldpic+'</span>'
				str+='<span class="r sp_btn car"  dataid="'+datas[i].id+'">加入购物车</span>'
				str+='</p>'
				str+='<p class="dd_p4">'+datas[i].men+'</p>'
				str+='</dd></dl>'
						
			}
			$(".top_one").html(str)
		}
	});	
	/*content部分轮播图*/
	$.ajax({
		url:"json/index1.json",
		success:function(data){
			var datas = data.data;
			var str = '';
			for(var i in datas){
				str+='<dl class="l recomm_dl">'
				str+='<dt><a href="#"><img class="recomm_img" src="'+datas[i].src+'" /></a></dt>'
				str+='<dd class="recomm_dd">'
				str+='<p class="recomm_p1">'+datas[i].name+'</p>'
				str+='<p class="recomm_p2"><span class="l recomm_p2_sp1" style="color:#ff704b; font-size:20px;">'+datas[i].pic+'</span><span class="l recomm_p2_sp2" style="color:#c4c4c4;">'+datas[i].oldpic+'</span><span class="r recomm_p2_btn car"  dataid="'+datas[i].id+'">加入购物车</span></p>'
				str+='</dd></dl>'
			}
			$(".recomm_move").html(str)
		}
	});
	var _indexR=0
	var _indexL=0
	$(".move_left").on("click",function(){
		_indexL++
		if(_indexL >=2){
			_indexL = 0;
		}
		$(".recomm_move").stop().animate({"marginLeft":"-"+1120*_indexL+"px"},1000);
		
	});
	$(".move_right").on("click",function(){
		_indexR++
		if(_indexR>=2){
			_indexR=0
		}
		$(".recomm_move").stop().animate({"marginLeft":"-"+1120*_indexR+"px"},1000);
	});
	/*主页选项卡*/
	$(".log_li").hover(function(){
		$(this).css({"color":"#00c8ff","borderBottom":"2px solid #00c8ff"}).siblings().css({"color":"#000","borderBottom":"0"})
		$(".log_bottom").hide();
		$(".log_bottom").eq($(this).index()).show()
	})
	
	/*今日新品  商品*/
		$.ajax({
			url:"json/index2.json",
			success:function(data){
				var datas = data.data;
				var str = '';
				for(var i in datas){
					str+='<dl class="l hot_dl">'
					str+='<dt class="hot_dt"><a href="#"><span class="hot_sp1"><img src="'+datas[i].src+'" /><span href="#" class="sp_sp">润 肤</span></span></a></dt>'
					str+='<dd class="hot_dd">'
					str+='<p class="hot_dd_p1"><a href="#"><span class="hot_sp2" style="color:#ff643c; font-size:16px; line-height:26px; height:26px;">'+datas[i].zhe+'</span>'+datas[i].name+'</a></p>'
					str+='<p class="hot_dd_p2"><span class="l hot_sp2" style="font-size:26px; color:#ff643c">'+datas[i].pic+'</span><span class="l hot_sp3">'+datas[i].oldpic+'</span><span class="r hot_sp4 car" dataid="'+datas[i].id+'">加入购物车</span></p>'
					str+='<p class="hot_dd_p3"><span class="l hot_sp5">距离团购结束</span><span class="l hot_sp6"></span><span class="r hot_sp10">'+datas[i].men+'</span></p></dd>'
					str+='</dl>'
				}
				$(".content_hot").html(str);
			}
		})
	
	/*左侧楼梯*/
	$(window).scroll(function(){
		if($(this).scrollTop() >= 621){
			$("#all_left").fadeIn(500);
		}else{
			$("#all_left").fadeOut(500);
		}
	})
	$(".zhiwo").on("click",function(){
		$(window).scrollTop(0);
	})
	$(".new").on("click",function(){
		$(window).scrollTop(625);
	})
	$(".brand").on("click",function(){
		$(window).scrollTop(2168);
	})
	$(".newthing").on("click",function(){
		$(window).scrollTop(3308);
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
	
/*进入购物车 */
$(".shop").on("click",function(){
	window.location.href = "shopcar.html"
})
	














	
})
