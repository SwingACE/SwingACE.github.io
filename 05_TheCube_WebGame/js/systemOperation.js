/*
    主页面左上角的系统操作的函数。
    Neo Zackton.
    2014-07
*/
var isMusicOn = true;

function switchMusic() {
    if (isMusicOn) {
        isMusicOn = false;
        $('img#music')[0].src = "ext/hint_verse.png";
        $('audio#bgm')[0].pause();  
    }
    else {
        isMusicOn = true;
        $('img#music')[0].src = "ext/hint.png";
        $('audio#bgm')[0].play();
    }
}

function loadHelp() {
    var helper = $('table#HelpInfo');
    helper.html("<tr><td>这是一款二维闯关游戏，收集蓝色水晶，到达终点进入下一关<td></tr>"+
                "<tr><td>看上去朴实无华的魔方消耗蓝色水晶可以吸纳一块绝对的空间（快捷键C）<td></tr>"+
                "<tr><td>再次触发将该空间释放到指定位置，覆盖原有的一切。<td><tr>" +
                "<tr><td>通过右下角的操作面板控制魔方的使用。<td><tr>"+
                "<tr><td>（WASD控制释放方向，九宫格选取操作空间的相对位置）<td><tr>"
                );
}

function restart() {
    loadMap(currentLevel);
    start();
}

function returnMenu() {
    alert("警告警告——————————前方高能 ——————无限火力模式开启");
    currentEnergy = 1000;
}

function energySound() {
    if (document.getElementsByClassName("triggeredSound")[0]) {
        document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("triggeredSound")[0]);
    }
    var body = document.getElementsByTagName("body")[0];
    var sound = document.createElement("audio");
    var src = document.createElement("source");
    sound.setAttribute("class", "triggeredSound");
    sound.setAttribute("autoplay", "autoplay");
    src.setAttribute("src", "ext/energy.mp3");
    sound.appendChild(src);
    body.appendChild(sound);
}

/*Abandoned code:
 var body = document.getElementsByTagName("body")[0];
    var help = document.createElement("div");
    help.setAttribute("class", "help");
    var ok = document.createElement("input");
    ok.setAttribute("type", "button");
    ok.setAttribute("value", "确认");
    ok.onclick = function () { document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("help")[0]); };
    //ok.setAttribute("onclick","function(){document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("help")[0]);}");
    var p1 = document.createElement("p");
    p1.innerHTML = "←控制左移，→控制右移，↑控制跳跃";
    var p2 = document.createElement("p");
    p2.innerHTML = "W控制魔方向上，A控制魔方向左，D控制魔方向右，S控制魔方向下";
    var p3 = document.createElement("p");
    p3.innerHTML = "空格键利用魔方吸收线条，再次使用会根据魔方的方向释放线条";
    //help.innerHTML = "帮助内容";
    help.appendChild(p1);   
    help.appendChild(p2);
    help.appendChild(p3);
    help.appendChild(ok);
    body.appendChild(help);
*/