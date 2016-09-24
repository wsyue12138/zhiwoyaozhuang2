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
	
/*获取总价钱*/

var allpic = getCookie("all")
$(".allpic").html(allpic)
$(".pic1").html(allpic)
$(".pic2").html(allpic)	
/*获取名字*/
var name = getCookie("mname")
$(".name").html(name)
	
/*获取地址*/

var id = getCookie("id")
$(".id").html("北京—市辖区—"+id)
	
/*获取手机号*/

var phone = getCookie("phone")
$(".phone").html(phone)
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
