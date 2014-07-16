/*
    魔方操作的脚本
*/

// 变量声明
var lengthUnit = 20;
var dirHash = { 'right': 0, 'up': 1, 'left': 2, 'down': 3, 'undefined': -1};
var cubeRegionNo = [0, 7, 6, 1, 8, 5, 2, 3, 4];
var activeRegionArray = [];

// 魔方操作
function useCube(map) {                                                     // 使用魔方  
    if (isCubeEmpty) {
        if (currentEnergy == 0) {
            alert("没有足够能量使用魔方了！");
            return;
        }
        if (cubeDirection == "undefined") {
            alert('请先在右边选择魔方朝向');
            return;
        }
        origin = getPosition(hero);
        offset = posCorrection(cubeDirection);
        origin.x += offset.x;
        origin.y += offset.y;
        transport(cubeSpace, { x: 0, y: 0 }, map, origin);
        costEnergy(calEnergyCost());
        isCubeEmpty = false;
        htmlRefresh();
    }
    else {
        var origin = getPosition(hero);
        var offset = posCorrection(cubeDirection);
        origin.x += offset.x;
        origin.y += offset.y;
        transport(map, origin, cubeSpace, { x: 0, y: 0 });
        isCubeEmpty = true;
        htmlRefresh();
    }
}

function setCubeDirection(dir) {                                            //选择魔方朝向
    if (dir == cubeDirection) return;

    if (cubeDirection == 'undefined') {
        //switch (dir) {
        //    case 'right': activeRegionArray[0] = { left: 0, top: lengthUnit }; break;
        //    case 'left': activeRegionArray[0] = { left: 2 * lengthUnit, top: lengthUnit }; break;
        //    case 'up': activeRegionArray[0] = { left: lengthUnit, top: 2 * lengthUnit }; break;
        //    case 'down':  { left: lengthUnit, top: 0 }; break;
        //          activeRegionArray[1] = { left: lengthUnit, top: lengthUnit };
        //    default: alert(Error);
        //};
        activeRegionArray[0] = dirHash[dir] * 2 + 1;
        cubeDirection = dir;
        htmlRefresh('both');
        return;
    }

    //魔方旋转
    if (!isCubeEmpty) {
        var canvas = $('canvas.storage')[0];
        var imgSrc = canvas.toDataURL("tmp/png");
        cubeSpace.save();
        cubeSpace.clearRect(0, 0, 60, 60);
        cubeSpace.translate(canvas.width / 2, canvas.height / 2);
        cubeSpace.rotate((dirHash[cubeDirection] - dirHash[dir]) * Math.PI / 2);
        cubeSpace.drawImage($('<img src= \"' + imgSrc + '\"/>')[0], -canvas.width / 2, -canvas.height / 2);
        cubeSpace.restore();
    }

    //激活区域更新
    for (var i in activeRegionArray) {
        if (activeRegionArray[i] == 8) continue;
        activeRegionArray[i] = ((dirHash[dir] - dirHash[cubeDirection]) * 2 + activeRegionArray[i] + 8) % 8
    }
    cubeDirection = dir;

    //焦点标识
    htmlRefresh('both');
}

function switchCubeRegion(index) {                              //选择魔方存储域
    var no = cubeRegionNo[index];                         //转化为适合魔方旋转的编号方式
    if (cubeDirection == 'undefined') {
        alert("请先指定魔方朝向。");
        return;
    }
    if (no == activeRegionArray[0]) {
        alert("魔方必须使用这个域作为通道与外界交换。");
        return;
    }
    if (!isRegionChangeable()) {
        alert("魔方存储空间已固定");
    }

    var flag = false;                               //表示该区域是激活的
    var haveAjacentRegion = false;
    for (var i in activeRegionArray) {
        if (activeRegionArray[i] == no) {
            flag = true;
        }
        if (flag && i < activeRegionArray.length - 1)
            activeRegionArray[i] = activeRegionArray[parseInt(i) + 1];
        if (beingAjacentRegions(no, activeRegionArray[i]))
            haveAjacentRegion = true;
    }
    if (flag) {
        activeRegionArray.length--;
    }
    else if (activeRegionArray.length >= currentEnergy)
        alert("没有足够能量激发更多魔方区域了！");
    else if (!haveAjacentRegion)
        alert("激活的魔方区域必须连成一块！");
    else activeRegionArray[activeRegionArray.length++] = no;

    htmlRefresh('storageRegion');

}

// 刷新网页
function htmlRefresh(type) {
    
    if (type == 'direction' || type == 'both') {
        var directionIconsOrder = { 'right': 1, 'up': 3, 'left': 2, 'down': 0 };
        for(var i = 0; i < 4; i++){
            $('img.directionIcon')[i].style.border = "2px dotted gray";
            $('img.directionIcon')[i].style.opacity = 0;
        }
        if (cubeDirection != 'undefined'){
            $('img.directionIcon')[directionIconsOrder[cubeDirection]].style.border = "2px solid blue";
            $('img.directionIcon')[directionIconsOrder[cubeDirection]].style.opacity = 1;
        }
    } 
    if(type == 'storageRegion' || type == 'both') {
        var storageDivs = $('div.storageRegion');
        for (i = 0; i < 9; i++)
            storageDivs[i].style.background = '';
        for(i in activeRegionArray)
            storageDivs[cubeRegionNotoIndex(activeRegionArray[i])].style.background = 'gray';
    }
    if (isCubeEmpty) {
        $('canvas.storage').css("background","none");
    }
    else $('canvas.storage').css("background", "black");
}

// 重置状态
function resetCube() {
    isCubeEmpty = true;
    activeRegionArray = [];
    cubeSpace.clearRect(0, 0, 60, 60);
    cubeDirection = 'undefined';

    htmlRefresh('both');
}


// 内部函数
function cubeRegionNotoIndex(no) {
    var tmp = [0, 3, 6, 7, 8, 5, 2, 1, 4];  
    return tmp[no];
}

function reverseImage(image) {
    for (var i in image.data) {
        if (i % 4 != 3)
            image.data[i] = 255 - image.data[i];
        else if (image.data[i] > 0) image.data[i] = 255;
    }
    return image;
}



function cubeRegionOrdinates(no) {                 // 根据魔方区域编号 返回 相对画布坐标。
    var rslt = {};
    rslt.left = cubeRegionNotoIndex(no) % 3 * lengthUnit;
    rslt.top = parseInt(cubeRegionNotoIndex(no) / 3) * lengthUnit;
    return rslt;
}

function transport(targetCanvas, target_leftTop, refCanvas, ref_leftTop) {
    var imageData;

    for (i in activeRegionArray) {
        var no = activeRegionArray[i];
        var ord = cubeRegionOrdinates(no);
        imageData = refCanvas.getImageData(ord.left + ref_leftTop.x - 1 ,
                                            ord.top + ref_leftTop.y - 1 ,
                                             lengthUnit + 2, lengthUnit + 2);
        targetCanvas.putImageData(reverseImage(imageData), ord.left + target_leftTop.x - 1,
                                                            ord.top + target_leftTop.y - 1);
        
    }
    for (i in activeRegionArray) {
        no = activeRegionArray[i];
        ord = cubeRegionOrdinates(no);
        refCanvas.clearRect(ord.left + ref_leftTop.x - 2,
                             ord.top + ref_leftTop.y - 2,
                              lengthUnit + 4, lengthUnit + 4);
    }
}

function posCorrection(dir) {
    switch (dir) {
        case 'right': return { x: lengthUnit, y: (-2 * lengthUnit) };
        case 'left': return { x: -3 * lengthUnit, y: -2 * lengthUnit};
        case 'up': return {x: -1 * lengthUnit, y: -4 * lengthUnit};
        case 'down': return { x: -1 * lengthUnit, y: 0 };
        default : alert("不合法的方向！");
    }
}

function calEnergyCost() {
    return activeRegionArray.length;
}

function isRegionChangeable() {
    return isCubeEmpty;
}


function beingAjacentRegions(n1, n2) {
    if (Math.abs(n1 - n2) == 1) return 1;
    if (n1 == 0 && n2 == 7) return 1;
    if ((n1 == 8 && n2 % 2 == 1)||(n2 == 8 && n1 %2 ==1)) return 1;
    return 0;
}


/*Abandoned Codes:        
var point = {};
point.x = activeRegionArray[i].left;
point.y = .top;
var cnt = getDirectionNo(point);
cnt += 2 * (dirHash[dir] - dirHash[cubeDirection]) + 8;
activeRegionArray[i] = getPositionbyDirectionNo( cnt % 8);



function getDirectionNo(point) {
    if (point.x == 0) return (point.y) / lengthUnit;
    if (point.x == lengthUnit) 
        if(point.y == lengthUnit) return 10;
        else return (point.y == 0) ? 7 : 3;
    if (point.x == 2 * lengthUnit) return 6 - (point.y) / lengthUnit;
}

function getPositionbyDirectionNo(no) {
    var point = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 },
                  { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 1 },
                   { x: 2, y: 0 }, { x: 1, y: 0 }];
    var rst = {};
    rst.left = point[no].x * lengthUnit;
    rst.top = point[no].y * lengthUnit;
    return rst; htmlRefresh
}





*/
