$(function(){
/*上部移入出现二级菜单*/
$("#header .txt").hover(function(){
		$("#header .over").eq($("#header .txt").index(this)).stop().slideDown(500)
	},function(){
		$("#header .over").eq($("#header .txt").index(this)).stop().slideUp(500);
	})
/*验证码*/
function num(){
var arr = ["A","1","B","9","C","4","D","6","E","7","F","8","G","2","H","3","I","2","G","5","K","5","L","M","1","N","3","O","0","P","7","Q","4","R","S","6","T","8","U","9","V","W","0","X","Y","Z"];
var a = Math.floor(Math.random()*46);
var b = Math.floor(Math.random()*46);
var c = Math.floor(Math.random()*46);	
var d = Math.floor(Math.random()*46);
$(".num_sp1").html(arr[a] + arr[b] + arr[c] + arr[d])	
}	
num();
$(".num_sp2").on("click",function(){
	num();
})

/*name名获取并判断*/
$(".btn").on("click",function(){
	var name = getCookie("name");
	var pas = getCookie("pas");
	var mName = $(".name").val();
	var mPas = $(".pas").val();
	var mNum = $(".num").val();
	var num = $(".num_sp1").html();
	var a1 = null //name名判断变量
	var a2 = null //pas名判断变量
	var a3 = null //num名判断变量
	if(mName == name){
		$(".name_sp").html("");
		a1 = true;
	}else{
		$(".name_sp").html("账号输入有误");
		$(".name_sp").css({"color":"red"});
		a1 = false;
	}
	if(mPas == pas){
		$(".pas_sp").html("");
		a2 = true;
	}else{
		$(".pas_sp").html("密码输入有误");
		$(".pas_sp").css({"color":"red"});
		a2 = false;
	}
	if(mNum == num){
		$(".num_sp").html("");
		a3 = true;
	}else{
		$(".num_sp").html("验证码输入有误");
		$(".num_sp").css({"color":"red"});
		a3 = false;
	}
	if(a1 && a2 && a3){
		setCookie("a",true)
		window.location.href = "index.html";
	}
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
		 //removeCookie("name");
	})






})