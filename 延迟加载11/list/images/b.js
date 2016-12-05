String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}
// JavaScript Document
 $(
   function(){
     $('.gotop').hover(
       function(){
         $(this).addClass('gotop_hover');
       },
       function(){
         $(this).removeClass('gotop_hover');
       }
     );
	 
	 $('.con_box').hover(
       function(){
         $(this).addClass('con_box_hover');
       },
       function(){
         $(this).removeClass('con_box_hover');
       }
     );	
 
 	 $('.col').live({
	  	mouseenter:function(){
			$(this).find(".comm_to_btn").show();
	    },
		
	    mouseleave:function(){
		 	$(this).find(".comm_to_btn").hide();
		}
	 });
	 
	 
   }
 ); 
 
 function nav_menu() {
	$(".subitem:gt(3)").css({
			"right" : "-1px",
			"left" : "auto"
	});
	
	$(".ismenu").hover(
	  function() {
			$(this).find(".subitem").removeClass("hide")
			$(this).find(".item_val").css({"background-color":"#fff8fb","color":"#ff6699"});
	},
	
	function() {
	       $(this).find(".subitem").addClass("hide");		
			if($(this).find(".item_val").hasClass("current")) {
				$(this).find(".item_val").css({"background-color":"#fff8fb","color":"#ff6699"});	
			} else {
				$(this).find(".item_val").css({"background-color":"","color":"#fff"});
			}
	});	
}

function width_auto(){
  var w=$(window).width();
  $(".width_auto").width(Math.floor(w/332)*332);
}

function tj_link(url) {
	var t_url = base64_decode(url);
    var t= new Date().getTime(); 
    var img = new Image(); 
    img.src= t_url + "&t=" + t;
    return false;
}


$(document).ready(
  function(){
	nav_menu();
    width_auto();
    window.onresize=width_auto; 
  }
 
) 
image_cnt=0;
$("img.lazy").each(
  function(){
    if(image_cnt<8){
      $(this).attr("src",$(this).attr("data-original"));
      image_cnt++;
    }
  }
);
$("img.lazy").lazyload({effect:"fadeIn"});

function show_more_detail(obj){
	$(obj).parent().addClass("dis_ne");
	$(obj).parent().next().show("fast");
	$("#d_info_box").css("height","380px");
} 

var base64DecodeChars = new Array(
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
-1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function comm_redirect_link(tj_url, url, obj_link) {
	var tj_url = base64_decode(tj_url);
    var t= new Date().getTime(); 
    var img = new Image(); 
    img.src= tj_url + "&t=" + t;
		
	var t_url = base64_decode(url);
	obj_link.setAttribute('href', t_url);
    return true;
}


function redirect_link(url, obj_link) {
	var t_url = base64_decode(url);
	obj_link.setAttribute('href', t_url);
    return true;
}
 
function base64_decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c1 == -1);
        if(c1 == -1)
            break;

        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c2 == -1);
        if(c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if(c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while(i < len && c3 == -1);
        if(c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if(c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while(i < len && c4 == -1);
        if(c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

 //校验字符串长度
 function getStringLength(svalue){
	  var sum=0; 
	  for(var i=0;i<svalue.length;++i){
		var c=svalue.charCodeAt(i);
		if((c>=0x0001&&c<=0x007e)||(0xff60<=c&&c<=0xff9f)){
		  sum++;
		}else{
		  sum+=2;
		}
	  }
	  return sum;
 }
 
     //查数据库表校验是否存在了
   function check(value){
      //alert("check...");
      var result = false;
	  var t= new Date().getTime();
	  var req_url   = "/feedback/check.php";
	  var req_param = "value="+ value + "&t="+t;				  
	  //document.write(req_url + "?"+  req_param);				  
	  //同步方式async=false;
	   $.ajax({
			type:'POST',
			async:false,
			url:req_url,
			data:req_param,
			dataType:'json',
			success:function(data){
				//alert(data[0]["state"]);
				if(data[0]["state"]=="1"){ 
				  result = true;
				}
			}					
	  });		
	  return result;
   }
    

 function change_captcha(){
    var t= new Date().getTime();				    
   $("#img_checkcode").attr("src", "/public/captcha.php?t=" + t );				 
 }
 
 function captcha_onblur_input(){
       var result = false;
	   var captcha = $("#captcha").val();
	   if( captcha=='' ){
	      $("#tip_msg").html("请输入验证码！");
		  //$("#tip_msg").show();
		  return result;
	   }
	   if( !check(captcha) ){
	      $("#tip_msg").html("请输入正确的验证码！");
		  ///$("#tip_msg").show();
		  return result;					   
	   }else{				
		  result=true;
	   }		   
	   $("#tip_msg").html('');
	   return result;				     
 }
 
 function check_content_input(){
	 var content = $("#content").val();
	 
	 if(content=='亲！如果您有什么好的建议，可以向我们畅所欲言。如果你有什么想找的宝贝也可以给我们留言。'){
	 	content = "";
     }
	 var len = Math.ceil(getStringLength(content)/2);
	 if(content=='' || len==0){
		$("#tip_msg").html("请输入你的意见！");
		//$("#content").focus();
		return false;
	 } 
	  if(len<5){
	 	 $("#tip_msg").html("意见至少5个字！");
	 	 return false;
	  }
	 //500
     if( len>500 ){
		 $("#tip_msg").html("只允许输入500字以内！");
		 return false; 
	 }
	 return true;	 
 }
 
 function submit_feedback(){	 
     if( !check_content_input() ){
		 return false;
	 }	
	 if( !captcha_onblur_input() ){
		 return false;
	 }	 
	 return true;
 }
   
$( 
   function(){
   	 $('#captcha').keydown(
       function(event){
		   if( event.keyCode==13 ){
			   submit_feedback();
		   }
       }
     );	
  }  
)  


function chk_w(){
	var w = $("#w").val();
	if(w==''){
		$("#w").focus();
		return false;
	}
	return true;
}
//QQ登录
function toQzoneLogin(){	
	var url = "http://www.zaoku.com/third/qq/oauth/redirect_to_login.php"; 
    var check_ie=(document.all)? true : false;	
    if(check_ie) {
        var a = document.createElement("a");
        a.href = url;
        document.body.appendChild(a);
        a.click();
     } else {
        window.location = url;
     }
}

function go_comm_page(url){
    var check_ie=(document.all)? true : false;	
    if(check_ie) {
        var a = document.createElement("a");
        a.href = url;
        document.body.appendChild(a);
        a.click();
     } else {
        window.location = url;
     }
}

function go_my_collect(){
	if( !check_me_login() ){
		to_zaoku_login();//登录页\
		return false;
	}
	go_comm_page("http://bang.zaoku.com/my_collect.html");
}


function check_exists(model_id){	
    	var t= new Date().getTime();
	    var req_url   = "/collect/check_exists.php";
	    var req_param = "model_id=" + model_id + "&t="+t; 		
		//alert("http://localhost"+ req_url + "?" + req_param);		
        var state="";		
		var result = false;		
		//同步方式async=false;
		$.ajax({
				type:'POST',
				async:false,
				url:req_url,
				data:req_param,
				dataType:'json',
				success:function(data){				
					state = data[0]["state"];
					//alert("exists state=" + state);
					return;
				}
		 });
		 //is exists
		 if( state==2 ){
			 return true;
		 }else{
			 return false; 
		 }		 	
}

function check_collect(model_id){
		 if( !check_me_login() ){
		 	return false;
		 }
		
		if( check_exists(model_id) ){			
			$("#collect_btn"+model_id).val('已收藏');
			$("#collect_btn"+model_id).attr("disabled","disabled");
			return false;
		}
}

function set_collect(model_id, list_type, type_id){
		//alert("model_id=" + model_id + ", list_type=" + list_type +", type_id=" + type_id);
		
	    if( !check_me_login() ){
	        //登录页
		    to_zaoku_login();
			return false;
		}
		
		if( check_exists(model_id) ){			
			$("#collect_btn"+model_id).val('已收藏');
			$("#collect_btn"+model_id).attr("disabled","disabled");
			return false;
		}
	
	    var t= new Date().getTime();
	    var req_url   = "/collect/collect_submit.php";
	    var req_param = "model_id=" + model_id + "&list_type=" + list_type + "&type_id=" + type_id + "&t="+t; 
		
		//alert("http://bang.zaoku.com"+ req_url + "?" + req_param);		
        var state="";		
		var result = false;		
		//同步方式async=false;
		$.ajax({
				type:'POST',
				async:false,
				url:req_url,
				data:req_param,
				dataType:'json',
				success:function(data){				
					state = data[0]["state"];
					//alert("state=" + state);
					return;
				}
		 });
		 		 
		 if(state==0){
			alert("参数为空值，收藏失败！");
		 }else if(state==1){
			alert("写记录收藏失败！");
		 }else if(state==2){
			alert("已收藏了！");
		  }else if(state==8){
			//alert("收藏成功！");
			$("#collect_btn"+model_id).val('已收藏');
			$("#collect_btn"+model_id).attr("disabled","disabled");			
			result=true;
		 }else{
			alert("失败！");
		 }	
		 return result;		
}

function to_zaoku_login(){
	var url = "http://www.zaoku.com/login.php"; 
    var check_ie=(document.all)? true : false;
    if(check_ie) {
        var a = document.createElement("a");
        a.href = url;
        document.body.appendChild(a);
        a.click();
     } else {
        window.location = url;
     }
}

function check_me_login(){
	//校验是否已登录了
	var isexists = $.cookie("zaoku_name");
	if(isexists==null || isexists==''){
		return false;  
	}	
	return true;
}