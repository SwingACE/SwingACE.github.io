/*
    ħ�������Ľű�
*/

// ��������
var lengthUnit = 20;
var dirHash = { 'right': 0, 'up': 1, 'left': 2, 'down': 3, 'undefined': -1};
var cubeRegionNo = [0, 7, 6, 1, 8, 5, 2, 3, 4];
var activeRegionArray = [];

// ħ������
function useCube(map) {                                                     // ʹ��ħ��  
    if (isCubeEmpty) {
        if (currentEnergy == 0) {
            alert("û���㹻����ʹ��ħ���ˣ�");
            return;
        }
        if (cubeDirection == "undefined") {
            alert('�������ұ�ѡ��ħ������');
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

function setCubeDirection(dir) {                                            //ѡ��ħ������
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

    //ħ����ת
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

    //�����������
    for (var i in activeRegionArray) {
        if (activeRegionArray[i] == 8) continue;
        activeRegionArray[i] = ((dirHash[dir] - dirHash[cubeDirection]) * 2 + activeRegionArray[i] + 8) % 8
    }
    cubeDirection = dir;

    //�����ʶ
    htmlRefresh('both');
}

function switchCubeRegion(index) {                              //ѡ��ħ���洢��
    var no = cubeRegionNo[index];                         //ת��Ϊ�ʺ�ħ����ת�ı�ŷ�ʽ
    if (cubeDirection == 'undefined') {
        alert("����ָ��ħ������");
        return;
    }
    if (no == activeRegionArray[0]) {
        alert("ħ������ʹ���������Ϊͨ������罻����");
        return;
    }
    if (!isRegionChangeable()) {
        alert("ħ���洢�ռ��ѹ̶�");
    }

    var flag = false;                               //��ʾ�������Ǽ����
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
        alert("û���㹻������������ħ�������ˣ�");
    else if (!haveAjacentRegion)
        alert("�����ħ�������������һ�飡");
    else activeRegionArray[activeRegionArray.length++] = no;

    htmlRefresh('storageRegion');

}

// ˢ����ҳ
function htmlRefresh(type) {
    
    if (type == 'direction' || type == 'both') {
        var directionIconsOrder = { 'right': 1, 'up': 3, 'left': 2, 'down': 0 };
        for(var i = 0; i < 4; i++)
            $('img.directionIcon')[i].style.border = "2px dotted gray";
        if (cubeDirection != 'undefined')
            $('img.directionIcon')[directionIconsOrder[cubeDirection]].style.border = "2px solid blue";
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

// ����״̬
function resetCube() {
    isCubeEmpty = true;
    activeRegionArray = [];
    cubeSpace.clearRect(0, 0, 60, 60);
    cubeDirection = 'undefined';

    htmlRefresh('both');
}


// �ڲ�����
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



function cubeRegionOrdinates(no) {                 // ����ħ�������� ���� ��Ի������ꡣ
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
        default : alert("���Ϸ��ķ���");
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