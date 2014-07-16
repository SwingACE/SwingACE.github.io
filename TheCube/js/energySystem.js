var energySize = { width: 20, height: 20 };

function resetEnergy() {
    //energyBar.remove();
    energyBar.children('img').remove();
    energys = [];
    currentEnergy = 0;
}
function setEnergys() {
    for (var i in energys) {
        drawEnergy(map, energys[i].x, energys[i].y, true);
    }
    drawEnergyBar();
}

function drawEnergy(map, leftBottom_x, leftBottom_y, display) {           //����������  displayΪtrue��ʾ�ڻ�������ӣ������ʾĨȥ��
    map.save();
    if (display == true) map.fillStyle = 'blue';
    else {
        map.globalCompositeOperation = 'destination-out';
    }
    map.beginPath();
    map.moveTo(leftBottom_x + 10, leftBottom_y - 3);
    map.lineTo(leftBottom_x + 6, leftBottom_y - 6);
    map.lineTo(leftBottom_x + 6, leftBottom_y - 12);
    map.lineTo(leftBottom_x + 10, leftBottom_y - 18);
    map.lineTo(leftBottom_x + 14, leftBottom_y - 12);
    map.lineTo(leftBottom_x + 14, leftBottom_y - 6);
    map.lineTo(leftBottom_x + 10, leftBottom_y - 3);
    map.closePath();
    map.fill();

    map.restore();
}

function isEnergyConnected(x, y) {                                    // ���������Ӧ��������ţ��������ڻ����Ѿ������շ���-1
    for (var i in energys) {
        if (energys[i].x < x && energys[i].x + energySize.width > x)
            if (energys[i].y > y && energys[i].y - energySize.height < y) {
                if (energys[i].validity == 'uncollected')
                    return i;
            }
    }
    return -1;                                                                  //����ʧ��
}
function touchEnergy(index) {                                        //�Ӵ�����������Ĵ���������ײ�����ꡣ
    getEnergy(index);
    updateEnergyBar();
    return 1;     
}

function getEnergy(index) {                                         //���յ�����������������������š�
    drawEnergy(map, energys[index].x, energys[index].y, false);
    energys[index].validity = 'ready';
    currentEnergy++;
} 

function drawEnergyBar() {
    for (var i = 0; i < energys.length; i++) {
        var newIcon = $('<img class="energyIcon" src="ext/crystal.ico"/>');
        newIcon.css('opacity', 0.2);                                                //͸����ʾ��û�ռ�����
        energyBar.append(newIcon[0]);
    }
}

function updateEnergyBar() {
    for (var i = 0; i < energys.length; i++) {
        var icon = $('img.energyIcon')[i];
        if (energys[i].validity == 'used') { icon.style.opacity = 0; }
        if (energys[i].validity == 'ready') icon.style.opacity = 1;
        if (energys[i].validity == 'uncollected') icon.style.opacity = 0.2;
    }
}

function costEnergy(number) {
    for (i in energys) {
        if (energys[i].validity == 'ready') {
            number--;
            energys[i].validity = 'used';
            currentEnergy--;
        }
        if (number == 0) {
            updateEnergyBar();
            return 1;
        }
    }
    return 0;
}