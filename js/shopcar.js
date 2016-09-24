 $(function(){
	/*上部移入出现下拉列表*/
		
		$("#header .txt").hover(function(){
			$("#header .over").eq($("#header .txt").index(this)).stop().slideDown(500)
		},function(){
			$("#header .over").eq($("#header .txt").index(this)).stop().slideUp(500);
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

/*购物车选项卡*/
$(".choose li").hover(function(){
	$(".small").hide()
	$(".small").eq($(this).index()).show()
	$(".choose li").css({"background":"#6C6C6C"})
	$(this).css({"background":"#00C8FF"})
})


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


/*获取商品加入页面*/
var cookies = document.cookie;
var cook = cookies.split("; ");
var arr = [];
for(var i = 0; i < cook.length; i++){
	var id = cook[i].split("=");
	var nameid = id[0]*1;
	if(!isNaN(nameid)){
		arr.push(nameid)
		}
	}

		$.ajax({
				url:"json/minute.json",
				dataTypy:"json",
				success:function(data){
					var datas = data.data;
					var str = '';
					var allnum = 0;
					var allpic = 0;
					for(var i = 0; i < arr.length; i++){
						for(var j = 0; j < datas.length; j++){
							if(arr[i] == datas[j].id){
								var mpic = getCookie("n"+datas[j].id) * datas[j].pic;
								var mnum = getCookie("n"+datas[j].id) * datas[j].num
								str+='<dl class="w1 thing_dl">'
								str+='<dt class="l thing_dt"><img src="'+datas[j].src+'" /></dt>'
								str+='<dd class="l thing_dd1">'+datas[j].name+'</dd>'
								str+='<dd class="l thing_dd2"><span>￥</span>'+datas[j].pic+'</dd>'
								str+='<dd class="l thing_dd2"><input class="thing_dd2_in" type="text" value="'+getCookie("n"+datas[j].id)+'" /></dd>'
								str+='<dd class="l thing_dd3"><span class="mpic">'+mpic+'</span></dd>'
								str+='<dd class="l thing_dd2">'+mnum+'</dd>'
								str+='<dd class="l thing_dd4">'
								str+='<span class="clear" dataid="'+datas[j].id+'">删除</span><br />'
								str+='<span class="shou">收藏</span></dd></dl>'
								allnum+=Number(getCookie("n"+datas[j].id))
								allpic+=Number(mpic)
							}
							
						}
					}
					$(".car1").append(str);
					$(".num_all").html(allnum)
					$(".pic_all_sp").html(allpic)
				}
			})


/*点击删除单个商品*/
$(".car1").on("click",".clear",function(){
	var dataid = $(this).attr("dataid")
	$(this).parents(".thing_dl").remove()
	removeCookie(dataid)
	removeCookie("n"+dataid)
	
	var old=$(".num_all").html()

	var delthis=$(this).parent().siblings("dd").find(".thing_dd2_in").val()
	$(".num_all").html(old-delthis)
	var oldp = $(".pic_all_sp").html();
	var delp = $(this).parent().siblings("dd").find(".mpic").html()
	$(".pic_all_sp").html(oldp - delp)
	
	

})

/*全部删除*/
$(".and").on("click",".clear_all",function(){
	$(".thing_dl").remove();
	for(var l = 0;l < arr.length;l++){
		var clearnum = Number(arr[l]);
		removeCookie(clearnum)
		removeCookie("n"+clearnum)
	}
	$(".num_all").html("0");
	$(".pic_all_sp").html("0")
	
})

/*进入结算也*/
$(".end").on("click",function(){
	window.location.href = "zhifu1.html"
})










})