/**
 * Created by Zane Wang on 2016/12/2.
 */
var canvas = document.getElementById("mainCanvas");
var cxt = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function initSpirit(){
    cxt.fillStyle="#FF0000";
    cxt.beginPath();
    cxt.arc(70,18,15,0,Math.PI*2,true);
    cxt.closePath();
    cxt.fill();
}

function start() {
    initSpirit();
}

start();