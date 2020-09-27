document.addEventListener("DOMContentLoaded",()=>{
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
const mitadX = canvas.width / 2;
const mitadY = canvas.height / 2;
const radioReloj = 200;
const colorSegundos = "#FF0000";
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let date = new Date();
    let horas = date.getHours();
    let minutos = date.getMinutes();
    let segundos = date.getSeconds();
    dibujarCirculo();
    dibujarLineaHoras(horas);
    dibujarLineaMinutos(minutos);
    dibujarLineaSegundos(segundos);
}, 1000);


function dibujarCirculo() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(mitadX, mitadY, radioReloj, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function dibujarLineaSegundos(segundos) {
    let espacio = 10;
    segundos = segundos * 6;

    ctx.save();
    ctx.beginPath();
    ctx.translate(mitadX,mitadY);
    ctx.moveTo(0,0);
    ctx.rotate(segundos * Math.PI / 180);
    ctx.lineTo(0, -radioReloj + espacio);
    ctx.strokeStyle = colorSegundos;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

function dibujarLineaMinutos(minutos) {
    let espacio = 20;
    minutos = minutos * 6;
    ctx.save();
    ctx.beginPath();
    ctx.translate(mitadX, mitadY);
    ctx.rotate(minutos * Math.PI / 180);
    ctx.moveTo(0,0);
    ctx.lineTo(0,-radioReloj + espacio);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
}

function dibujarLineaHoras(horas) {
    let espacio = 30;
    horas = horas * 30;
    ctx.save();
    ctx.beginPath();
    ctx.translate(mitadX, mitadY);
    ctx.rotate(horas * Math.PI / 180);
    ctx.moveTo(0,0);
    ctx.lineTo(0, - radioReloj + espacio);
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();
}


});