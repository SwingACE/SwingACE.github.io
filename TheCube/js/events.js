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
    currentLevel++;
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
    $('div#systemNotice')[0].innerHTML = 'Level' + String(level);
    switch (level)
        // map Level 0;
    {
        case 1:
            {
                startPoint = { x: 100, y: 50 };
                setPosition(hero, startPoint.x, canv.height - startPoint.y);

                energys = [{ x: 270, y: 160, validity: 'uncollected' },
                            { x: 410, y: 160, validity: 'uncollected' }
                ];
                setEnergys();

                endLine = { x: 650, y: 50 };

                map.save();
                map.lineWidth = 2;
                map.beginPath();
                map.moveTo(100, 200);
                map.lineTo(200, 200);
                map.moveTo(220, 200);
                map.lineTo(500, 200);
                map.moveTo(560, 200);
                map.lineTo(700, 200);
                map.moveTo(250, 200);
                map.lineTo(250, 180);
                map.lineTo(250, 180);
                map.lineTo(270, 180);
                map.lineTo(270, 160);
                map.lineTo(290, 160);
                map.lineTo(290, 180);
                map.lineTo(310, 180);
                map.moveTo(330, 140);
                map.lineTo(350, 140);
                map.moveTo(350, 200);
                map.lineTo(350, 160);
                map.lineTo(430, 160);
                map.lineTo(430, 200);
                map.closePath();
                map.stroke();

                map.font = "20px gray ";
                map.strokeText("-->Next", 650, 190);

                map.restore();
            } break;
        case 0:
            {
                startPoint = { x: 100, y: 50 };
                setPosition(hero, startPoint.x, canv.height - startPoint.y);

                energys = [{ x: 280, y: 200, validity: 'uncollected' },
                            { x: 480, y: 200, validity: 'uncollected' }
                ];
                setEnergys();

                endLine = { x: 650, y: 50 };

                map.save();
                map.lineWidth = 2;
                map.beginPath();
                map.moveTo(100, 200);
                map.lineTo(700, 200);
                map.moveTo(300, 150);
                map.lineTo(300, 200);
                map.moveTo(400, 200);
                map.lineTo(400, 150);
                map.moveTo(500, 200);
                map.lineTo(500, 150);
                map.closePath();
                map.stroke();

                map.font = "20px gray ";
                map.strokeText("-->Next", endLine.x, canv.height - endLine.y -10);

                map.restore();
            } break;

    }
    url = 'maps/level' + String(currentLevel) + '.json';
    var mapData = eval("({'level':'1','startPoint':{'x':'200','y':'50'}})");
    //var xmlhttp;
    //if (window.XMLHttpRequest) {
    //    xmlhttp = new XMLHttpRequest();
    //}
    //else {
    //    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    //}
    //xmlhttp.onreadystatechange = function(){
    //    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //        var mapDrawing = xmlhttp.responseText;
    //        alert(mapDrawing);
    //    }
    //}   
    //var url = 'localhost:8888/start?level=' + String(level);
    //xmlhttp.open('GET', url, true);
    //xmlhttp.send();
}
function dead() {
    alert("You are dead!");
    restart();
}
//abandoned codes
/**/
