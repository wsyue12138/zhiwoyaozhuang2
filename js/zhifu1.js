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
	
	
	
/*收货信息的表单验证*/
var a1 = null   //姓名判断变量
var a2 = null	//地址判断变量
var a3 = null	//邮政编码判断变量
var a4 = null	//手机号判断变量
var a5 = null	//邮箱判断变量
/*姓名*/
var reg1 = /^([\u4e00-\u9fa5]){2,7}$/;
$(".name").on("blur",function(){
var str1 = $(".name").val()
if(!reg1.test(str1)){
	$(".name_td span").css({"display":"block"})
	a1 = false;
}else{
	$(".name_td span").css({"display":"none"})
	a1 = true;
}
})
/*详细地址*/
var reg2 = /^(?=.*?[\u4E00-\u9FA5])[\d\u4E00-\u9FA5]+/;
$(".id2").on("blur",function(){
var str2 = $(".id2").val()
if(!reg2.test(str2)){
	$(".id2_td span").css({"display":"block"})
	a2 = false;
}else{
	$(".id2_td span").css({"display":"none"})
	a2 = true;
}
})
/*邮政编码*/
var reg3 = /[1-9]\d{5}(?!\d)/
$(".ems").on("blur",function(){
	var str3 = $(".ems").val()
	if(!reg3.test(str3)){
		$(".ems_td span").css({"display":"block"})
		a3 = false;
	}else{
		$(".ems_td span").css({"display":"none"})
		a3 = true;
	}
})
/*手机号码*/
var reg4 = /^1[3|4|5|7|8]\d{9}$/
$(".phone").on("blur",function(){
	var str4 = $(".phone").val()
	if(!reg4.test(str4)){
		$(".phone_td span").css({"display":"block"})
		a4 = false;
	}else{
		$(".phone_td span").css({"display":"none"})
		a4 = true;
	}
})
	
/*邮箱*/
var reg5 =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
$(".e_mell").on("blur",function(){
	var str5 = $(".e_mell").val()
	if(!reg5.test(str5)){
		$(".e_mell_td span").css({"display":"block"})
		a5 = false;
	}else{
		$(".e_mell_td span").css({"display":"none"})
		a5 = true;
	}
})
/*保存收货地址*/
$(".use").on('click',function(){
	var mname = $(".name").val()
	var phone = $(".phone").val()
	var id = $(".id2").val()
	var ems = $(".ems").val()
	if(a1 && a2 && a3 && a4){
		setCookie("mname",mname)
		setCookie("phone",phone)
		setCookie("id",id)
		setCookie("ems",ems)
		$(".content_top").css({"display":"none"})
		$(".content_top2").css({"display":"block"})
		$(".name_sp").html(mname)
		$(".phone_sp").html(phone)
		$(".id_sp").html("北京市—市辖区—" + id)
		$(".ems_sp").html(ems)
	}
	
})
	
/*删除收货地址*/

$(".clear").on("click",function(){
	removeCookie("mname")
	removeCookie("phone")
	removeCookie("id")
	removeCookie("ems")
	$(".content_top").css({"display":"block"})
	$(".content_top2").css({"display":"none"})
})
	
	
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
								str+='<dl class="car_dl">'
								str+='<dt class="l car_dt"><img src="'+datas[j].src+'" /></dt>'
								str+='<dd class="l car_dd1">'+datas[j].name+'</dd>'
								str+='<dd class="l car_dd2">￥ '+datas[j].pic+'</dd>'
								str+='<dd class="l car_dd3">'+getCookie("n"+datas[j].id)+'</dd>'
								str+='<dd class="l car_dd4">￥ '+mpic+'</dd></dl>'
								allnum+=Number(getCookie("n"+datas[j].id))
								allpic+=Number(mpic)
							}
							
						}
					}
					$(".car").append(str);
					$(".oldpic").html("￥"+allpic)		//不加运费金额
					$(".newpic").html("￥"+(allpic+5))	//加运费金额
					$(".r_p2").html("￥"+(allpic+5))  //需支付的金额
				}
			})	
	
/*点击选择银行*/
$(".img").on("click",function(){
	$(".img").css({"border":"1px solid #ccc"})
	$(this).css({"border":"1px solid #ff643c"})
	$(".img_sp").css({"display":"none"})
	$(".img_sp").eq($(".img").index(this)).css({"display":"block"})
})

	
/*点击进入最后的支付页面*/

$(".r_p3").on("click",function(){
	var all = $(".r_p2").html() 
	//alert($(".r_p2").html())
	setCookie("all",all)	//总价钱存入cookie
	window.location.href = "zhifu2.html"
})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
