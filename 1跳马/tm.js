//得到棋盘大小 以及初始的棋子位置

//一共有8个方向
var dxy = new Array;
var trace = new Array;
dxy = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
//stepNum是步数，allRoad是对所有的路线进行存储，count是路线的条数
var stepNum = 1;
var allRoad = new Array;
var count = 0;
//m,n分别是棋盘的大小，initX,initY是棋子最初的位置
//

var initX;
var initY;
var m;
var n;
var cb = new Array();

//初始化变量，并输出结果
function getResult() {
    allRoad.splice(0,allRoad.length);
    count=0;
    m = parseInt(document.getElementById("chessboardM").value);
    n = parseInt(document.getElementById("chessboardN").value);
    initX = parseInt(document.getElementById("originX").value);
    initY = parseInt(document.getElementById("originY").value);
   
 
   //对所有棋盘上位置赋值，初始值为0
    var finalRoad = new Array;
    for (var i = 0; i < m; i++) {
        cb[i] = new Array();
        for (var j = 0; j < n; j++) {
            cb[i][j] = 0;
        }
    }
    finalRoad = findRoad()
    document.getElementById("result").innerHTML = "一共有 " + count + "条" + "<br>";
    
    for (var i = 0; i < count; i++) {
        for (var j = 1; j < finalRoad[i].length; j++) {
            if (j == finalRoad[i].length - 1) {
                document.getElementById("result").innerHTML += finalRoad[i][j];
            } else {
                document.getElementById("result").innerHTML += finalRoad[i][j] + "--";
            }

        }
        document.getElementById("result").innerHTML += "<br>";

    }

}


//判断下一步能否走
function trueDiret(x, y, i) {
    //未超过边界
    if ((x + dxy[i][0]) < m && (x + dxy[i][0]) >= 0 && y + dxy[i][1] < n && y + dxy[i][1] >= 0) {
        //下一步未走过或者抵达起点
        var tempx = 0;
        var tempy = 0;
        tempx = x + dxy[i][0];
        tempy = y + dxy[i][1];
        if (cb[tempx][tempy] == 0 || (x + dxy[i][0] == initX && y + dxy[i][1] == initY)) {
            return true;
        }
        return false;
    }
    return false;
}


//判断是否到达边界
function receiveEdge() {
    for (var i = 0; i < m; i++) {
        if (cb[i][0] != 0 || cb[i][n - 1] != 0) {
            return true;
        }
    }
    for (var i = 0; i < n; i++) {
        if (cb[0][i] != 0 || cb[m - 1][i] != 0) {
            return true;
        }
    }
    return false;
}
//找路线 并返回。
function findRoad() {
    Iteration(initX, initY, stepNum);
    return allRoad;
}
//递归遍历
function Iteration(x, y, t) {

    if (x == initX && y == initY && t != 1) {
        //判断是否到达过边界
        if (receiveEdge()) {
            var tempTrace = new Array();
            count++;
            for (var i = 1; i < stepNum; i++) {
                var tempx = trace[i][0];
                var tempy = trace[i][1];
                tempTrace[i] = new Array();
                tempTrace[i][0] = tempx;
                tempTrace[i][1] = tempy;
            }
            //加上最后一个点
            tempTrace[stepNum] = new Array();
            tempTrace[stepNum][0] = initX;
            tempTrace[stepNum][1] = initY;
            allRoad.push(tempTrace);
        }
    }
    else {
        for (var i = 0; i < 8; i++) {
            if (trueDiret(x, y, i)) {
                trace[stepNum] = new Array();
                trace[stepNum][0] = x;
                trace[stepNum][1] = y;
                cb[x][y] = stepNum;
                stepNum++;
                Iteration(x + dxy[i][0], y + dxy[i][1], stepNum);
                stepNum--;
                //cb[x]=new Array();
                cb[x][y] = 0;
                trace[stepNum][0] = 0;
                trace[stepNum][1] = 0;
            }
        }

    }
}

