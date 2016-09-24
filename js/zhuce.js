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
	
/*手机号 */
var a1 = null;  // 手机号判断变量
var a2 = null;  // 密码判断变量
var a3 = null;   //确定密码判断变量
var a4 = null;   //验证码判断变量
var reg1 = /^1[3|4|5|7|8]\d{9}$/
$(".phone").on("blur",function(){
	var phone = $(".phone").val();
	if(!(reg1.test(phone))){
		$(".phone_p").html("*号码输入有误，请重新输入")
		$(".phone_p").css({"color":"red"})
		a1 = false;
	}else{
		$(".phone_p").html("");
		a1 = true;
	}
})

/*密码*/
$(".pas1").on("focus",function(){
	$(".pas1_p").html("请输入6个字符以上的数字、字母")
	$(".pas1_p").css({"color":"#ccc"});
})
var reg2 = 

/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,30}$/

$(".pas1").on("blur",function(){
	var pas1 = $(".pas1").val();
	if(!(reg2.test(pas1))){
		$(".pas1_p").html("*密码输入有误，请重新输入")
		$(".pas1_p").css({"color":"red"})
		a2 = false;
	}else{
		$(".pas1_p").html("");
		a2 = true;
	}
})
	
/*确定密码*/
$(".pas2").on("blur",function(){
	var pas2 = $(".pas2").val();
	if($(".pas1").val() == pas2){
		$(".pas2_p").html("")
		a3 = true;
	}else{
		$(".pas2_p").html("*密码不同，请重新输入")
		$(".pas2_p").css({"color":"red"})
		a3 = false;
	}
})	

/*验证码*/

$(".num").on("blur",function(){
	var num = $(".num").val();
    var num2 = $(".num_sp1").html();
	if(num == num2){
	$(".num_p").html("");	
	a4 = true;
}else{
	$(".num_p").html("*验证码输入有误，请重新输入")
	$(".num_p").css({"color":"red"})
	a4 = false;
}
})

/*存入cookie*/
$(".btn").on("click",function(){
	if(a1 && a2 && a3 && a4){
		var name = $(".phone").val();
		var pas = $(".pas1").val();
		setCookie("name",name)
		setCookie("pas",pas)
		window.location.href = "denglu.html"
	}else{
		alert("输入有误");
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
