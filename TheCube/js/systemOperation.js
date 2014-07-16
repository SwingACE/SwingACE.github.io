/*
    ��ҳ�����Ͻǵ�ϵͳ�����ĺ�����
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
    helper.html("<tr><td>����һ���ά������Ϸ���ռ���ɫˮ���������յ������һ��<td></tr>"+
                "<tr><td>����ȥ��ʵ�޻���ħ��������ɫˮ����������һ����ԵĿռ䣨��ݼ�C��<td></tr>"+
                "<tr><td>�ٴδ������ÿռ��ͷŵ�ָ��λ�ã�����ԭ�е�һ�С�<td><tr>" +
                "<tr><td>ͨ�����½ǵĲ���������ħ����ʹ�á�<td><tr>"+
                "<tr><td>��WASD�����ͷŷ��򣬾Ź���ѡȡ�����ռ�����λ�ã�<td><tr>"
                );
}

function restart() {
    loadMap(currentLevel);
    start();
}

function returnMenu() {
    alert("���澯�桪������������������ǰ������ ���������������޻���ģʽ����");
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
    ok.setAttribute("value", "ȷ��");
    ok.onclick = function () { document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("help")[0]); };
    //ok.setAttribute("onclick","function(){document.getElementsByTagName("body")[0].removeChild(document.getElementsByClassName("help")[0]);}");
    var p1 = document.createElement("p");
    p1.innerHTML = "���������ƣ����������ƣ���������Ծ";
    var p2 = document.createElement("p");
    p2.innerHTML = "W����ħ�����ϣ�A����ħ������D����ħ�����ң�S����ħ������";
    var p3 = document.createElement("p");
    p3.innerHTML = "�ո������ħ�������������ٴ�ʹ�û����ħ���ķ����ͷ�����";
    //help.innerHTML = "��������";
    help.appendChild(p1);   
    help.appendChild(p2);
    help.appendChild(p3);
    help.appendChild(ok);
    body.appendChild(help);
*/