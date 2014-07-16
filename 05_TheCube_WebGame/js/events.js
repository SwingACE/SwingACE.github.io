/*
事件响应的脚本文件，需要和Operation及basicAction.js一起调用。
Neo Zackton
2014-07
*/
function takeAction(event) {                         //  
    var key = event.keyCode;
    switch (key) {
        case 67: useCube(map); break;
        case 37: moveHoriziontallyL(); break;
        case 38: moveVerticallyUp(); break;
        case 39: moveHoriziontallyR(); break;

        case 65: setCubeDirection('left'); break;
        case 68: setCubeDirection('right'); break;
        case 83: setCubeDirection('down'); break;
        case 87: setCubeDirection('up'); break;
    };
}

function removeAction(event) {
    var key = event.keyCode;
    switch (key) {
        //case 32: alert("使用魔方了！"); break;
        case 37: engine.speedX = 0; break;
            //case 38: moveVerticallyUp(); break;
        case 39: engine.speedX = 0; break;

            //case 65: setCubeDirection('right'); break;
    };
}

function nextLevel() {
    //currentLevel++;
    loadMap(currentLevel);
    start();
}

function clearMap() {
    startPoint = { x: 0, y: 0 };
    endLine = { x: 800, y: 0 };
    map.clearRect(0, 0, canv.width, canv.height);
    resetEnergy();
    resetCube();
    clearInterval(timer);
}

function loadMap(level) {

    clearMap();
    // map Level 0;
    url = 'maps/lv' + String(level) + 'Map.json';

    var xmlhttp;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var mapInfo = eval('(' + xmlhttp.responseText + ')');
            console.log(mapInfo);

            startPoint.x = mapInfo.startPoint.x;
            startPoint.y = mapInfo.startPoint.y;

            setPosition(hero, startPoint.x, canv.height - startPoint.y);

            energys = mapInfo.energys;
            setEnergys();
            endLine = mapInfo.endLine;
            map.save();
            map.lineWidth = 2;
            map.beginPath();
            for(i in mapInfo.lines)
            {
                map.moveTo(mapInfo.lines[i][0].x, mapInfo.lines[i][0].y);   
                for(var j = 1; j < mapInfo.lines[i].length; j ++)
                    map.lineTo(mapInfo.lines[i][j].x, mapInfo.lines[i][j].y)
            }
            map.closePath();
            map.stroke();
            map.restore();
            
            map.save();
            map.font = "20px gray ";
            map.strokeText("-->Next", mapInfo.endLine.x, canv.height - mapInfo.endLine.y - 10);
            map.restore();
        }
    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

function dead() {
    alert("You are dead!");
    restart();
}

//Abandoned Codes
/*
        map.save();
        map.lineWidth = 2;
        map.beginPath();
        map.moveTo(200, 200);
        map.lineTo(300, 200);
        map.moveTo(320, 200);
        map.lineTo(700, 200);
        map.moveTo(350, 200);
        map.lineTo(350, 180);
        map.lineTo(350, 180);
        map.lineTo(370, 180);
        map.lineTo(370, 160);
        map.lineTo(390, 160);
        map.lineTo(390, 180);
        map.lineTo(410, 180);
        map.moveTo(430, 140);
        map.lineTo(450, 140);
        map.moveTo(450, 200);
        map.lineTo(450, 160);
        map.lineTo(530, 160);
        map.lineTo(530, 200);
        map.closePath();
        map.stroke();
    var url = 'localhost:8888/start?level=' + String(level);
*/
