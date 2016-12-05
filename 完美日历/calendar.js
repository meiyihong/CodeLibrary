function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l, top:t};
}
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
function myCalendar(name){
	var oT=document.getElementsByName(name)[0];
	
	var oBox=document.createElement('div');
	oBox.className='zns_calendar';
	oBox.innerHTML='<a href="javascript:;" class="left">←</a>'
		+'<a href="javascript:;" class="right">→</a>'
		+'<h3>2014年9月</h3>'
		+'<ol>'
		+'<li>一</li>'
		+'<li>二</li>'
		+'<li>三</li>'
		+'<li>四</li>'
		+'<li>五</li>'
		+'<li class="week">六</li>'
		+'<li class="week">日</li>'
		+'</ol>'
		+'<ul></ul>';
		
	document.body.appendChild(oBox);
	
	var oH3=oBox.getElementsByTagName('h3')[0];
	var oUl=oBox.getElementsByTagName('ul')[0];
	var oLeft=oBox.children[0];
	var oRight=oBox.children[1];
	
	oT.onfocus=function(){
		oBox.style.display='block';
		oBox.style.left=getPos(oT).left+'px';
		oBox.style.top=getPos(oT).top+oT.offsetHeight+'px';
	};
	oT.onclick=function(ev){
		var oEvent=ev || event;
		oEvent.cancelBubble=true;
	};
	oBox.onclick=function(ev){
		var oEvent=ev || event;
		oEvent.cancelBubble=true;
	}
	
	/*document.onclick=function(){
		oBox.style.display='none';
	};*/
	addEvent(document,'click',function(){
		oBox.style.display='none';	
	});
	
	var iNow=0;
	
	function changeMonth(){
		oUl.innerHTML='';
		//创建空白的li
		function getFirstDay(){
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+iNow,1);
			oDate.setDate(1);	
			return oDate.getDay();
		}
		var d=getFirstDay();
		if(d==0)d=7;
		d--;
		for(var i=0; i<d; i++){
			var oLi=document.createElement('li');
			oUl.appendChild(oLi);
		}
		
		//创建本月的li
		function getMonthDay(){
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+iNow,1);
			oDate.setMonth(oDate.getMonth()+1);
			oDate.setDate(0);
			return oDate.getDate();	
		}
		var m=getMonthDay();
		
		for(var i=0; i<m; i++){
			var oLi=document.createElement('li');
			oLi.innerHTML=i+1;
			
			oLi.onclick=function(){
				var oDate=new Date();
				oDate.setMonth(oDate.getMonth()+iNow,1);
				oT.value=oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+this.innerHTML;
				oBox.style.display='none';
			};
			
			oUl.appendChild(oLi);
		}
		
		//周末变红
		for(var i=0; i<oUl.children.length; i++){
			if(i%7==5 || i%7==6){
				oUl.children[i].className='week';	
			}
		}
		
		if(iNow<0){  //过去的月份
			for(var i=0; i<oUl.children.length; i++){
				oUl.children[i].className='past';
				
			}
		}else if(iNow>0){
			
		}else{
			//本月过去的变灰
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+iNow);
			var toDay=oDate.getDate();
			for(var i=0; i<oUl.children.length; i++){
				if(parseInt(oUl.children[i].innerHTML)<toDay){
					oUl.children[i].className='past';	
				}else if(parseInt(oUl.children[i].innerHTML)==toDay){
					oUl.children[i].className='today';
				}
			}	
		}	
	}
	changeMonth();
	//点击
	oRight.onclick=function(){
		iNow++;
		changeMonth();
	};
	oLeft.onclick=function(){
		iNow--;
		changeMonth();
	};
}
var oLink=document.createElement('link');
oLink.href='calendar.css';
oLink.rel='stylesheet';
var oHead=document.getElementsByTagName('head')[0];
oHead.appendChild(oLink);