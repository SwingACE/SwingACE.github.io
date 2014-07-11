window.onload=function(){
	loadComments(pageList[pageIndex]);
	loadPhoto(index);
	document.getElementById("pageUp").addEventListener("click",pageUp);
	document.getElementById("pageDown").addEventListener("click",pageDown);
	document.getElementById("slideRight").addEventListener("click",function(){
		if(index < list.length-1){
			index++;
			loadPhoto(index);
			storage.index = index;
			time = new Date;
		}
		else if(index == list.length-1){
			index = 0;
			loadPhoto(index);
			storage.index = index;
			time = new Date;
		}
	});
	document.getElementById("slideLeft").addEventListener("click",function(){
		if(index > 0){
			index--;
			loadPhoto(index);
			storage.index = index;
			time = new Date;
		}
		else if(index == 0){
			index = list.length-1;
			loadPhoto(index);
			storage.index = index;
			time = new Date;
		}
	});
	$(".showWindow img").hover(function(){clearInterval(timer);},function(){time = new Date;timer = setInterval(updateNewsAuto);});
}