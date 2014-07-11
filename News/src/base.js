			var storage = window.localStorage;
			var pageList = ["service/page1.json",
			"service/page2.json",
			"service/page3.json"
			]
			var pageIndex;
			if (!storage.getItem("pageIndex")){
				pageIndex = 0;
				storage.setItem("pageIndex",pageIndex);
			}
			else{
				pageIndex=parseInt(storage.getItem("pageIndex"));
			}
			function pageUp(){
				if (pageIndex==0){
					return;
				}
				else{
					pageIndex--;
					loadComments(pageList[pageIndex]);
					storage.pageIndex = pageIndex;
				}
			}
			function pageDown(){
				if (pageIndex == pageList.length-1){
					return;
				}
				else{
					pageIndex++;
					loadComments(pageList[pageIndex]);
					storage.pageIndex = pageIndex;
				}
			}
			function showPage(str){
				pageIndex = parseInt(str);
				loadComments(pageList[pageIndex]);
				storage.pageIndex = pageIndex;
			}
			function loadComments(str){
				var result;
				if(window.XMLHttpRequest){
					result = new XMLHttpRequest();
				}
				else{
					result=new ActiveXObject("Microsoft.XMLHTTP");
				}
				result.onreadystatechange = function (){
					if (result.readyState == 4 && result.status==200){
						var data = JSON.parse(result.responseText);
						processComments(data);
					}
				}
				result.open("GET",str);
				result.send();
			}
			function processComments(data){
				var comment = document.getElementsByClassName("content");
				if (comment.length == data.length){
					var string = "共"+pageList.length+"页"+"  当前 第"+(pageIndex+1)+"页";
					$(".pageDisplay").html(string);
					var s=document.getElementsByTagName("select")[0];
					s.getElementsByTagName("option")[pageIndex].selected=true;
					if (pageIndex == 0){
						a = 7;
					}
					else if (pageIndex == 1){
						a = 3;
					}
					else if (pageIndex == 2){
						a = 0;
					}
					if (pageIndex == 0){
						document.querySelector("#pageUp").style.color="grey";
						document.querySelector("#pageDown").style.color="black";
					}
					else if (pageIndex == pageList.length-1){
						document.querySelector("#pageDown").style.color="grey";
						document.querySelector("#pageUp").style.color="black";
					}
					else{
						document.querySelector("#pageUp").style.color="black";
						document.querySelector("#pageDown").style.color="black";
					}
					for(var i = 0; i < data.length; i++){
						comment[data.length-1-i].getElementsByClassName("floor")[0].innerHTML="第"+(i+1+a)+"楼";
						comment[data.length-1-i].getElementsByClassName("personalInfo")[0].innerHTML=data[i].personalInfo;
						comment[data.length-1-i].getElementsByClassName("detail")[0].innerHTML=data[i].detail;
					}
				}
				else if(comment.length > data.length){
					var j = (comment.length-data.length);
					for (var i = 0; i < j; i++){
						document.getElementsByTagName("ul")[0].removeChild(document.getElementsByTagName("li")[0]);
					}
					processComments(data);
				}
				else{
					var j =  data.length-comment.length;
					for (var i = 0; i < j; i++){
						var newFloor = document.createElement("li");
						var div = document.createElement("div");
						div.setAttribute("class","content");
						var span1 = document.createElement("span");
						span1.setAttribute("class","floor");
						var p = document.createElement("p");
						p.innerHTML="发言人：";
						var span2 = document.createElement("span");
						span2.setAttribute("class","personalInfo");
						p.appendChild(span2);
						var div2 = document.createElement("div");
						div2.setAttribute("class","detail");
						div.appendChild(span1);
						div.appendChild(p);
						div.appendChild(div2);
						newFloor.appendChild(div);
						document.getElementsByTagName("ul")[0].appendChild(newFloor);
					}
					processComments(data);
				}
			}
			var list = ["service/news1.json",
			"service/news2.json",
			"service/news3.json",
			"service/news4.json"
			];
			var index;
			if (!storage.getItem("index")){
				index = 0;
				storage.setItem("index",index);
			}
			else{
				index=parseInt(storage.getItem("index"));
			}
			function loadPhoto(indx){
				var result;
				if(window.XMLHttpRequest){
					result = new XMLHttpRequest();
				}
				else{
					result=new ActiveXObject("Microsoft.XMLHTTP");
				}
				result.onreadystatechange = function (){
					if (result.readyState == 4 && result.status==200){
						var data = JSON.parse(result.responseText);
						$(".showWindow a").attr("href",data.linked);
						$(".showWindow img").attr("src",data.source);
					}
				}
				result.open("GET",list[index]);
				result.send();
			}
			function updateNewsAuto(){
				if(parseInt((new Date-time)/3000) == 1){
					if(index < list.length-1){
						index++;
						loadPhoto(index);
						storage.index = index;
					}
					else if(index == list.length-1){
						index = 0;
						loadPhoto(index);
						storage.index = index;
					}
					time = new Date;
				}
			}