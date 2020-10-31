import Helper from "./Helper.js";

export default class CountDown extends Helper {
    static instance = new CountDown();
    FECHA_ESTRENO = new Date("11/28/2020/15:00");

    static getInstance() {
        return this.instance;
    }

    start() {
        super.start();
    }

    onLoad() {
        let bttf = document.querySelector(".countdown img");
        let countdown = document.querySelector(".countdown .counter");
        let section = document.querySelector("section.countdown");
        
        section.classList.add("active");
        bttf.classList.add("active");
        countdown.classList.add("active");
        
        setInterval(this.actualizarEstreno.bind(this), 1000);
        this.actualizarEstreno();
    }

    actualizarEstreno() {
        let tiempoRestante = this.getTiempoRestante();
        document.querySelector(".display.sec").innerHTML = tiempoRestante.segundosRestantes;
        document.querySelector(".display.min").innerHTML = tiempoRestante.minutosRestantes;
        document.querySelector(".display.hour").innerHTML = tiempoRestante.horasRestantes;
        document.querySelector(".display.day").innerHTML = tiempoRestante.diasRestantes;
        document.querySelector(".display.month").innerHTML = tiempoRestante.mesesRestantes;
        document.querySelector(".display.year").innerHTML = tiempoRestante.aniosRestantes;
    }

    getTiempoRestante() {
        let dateNow = new Date();
        let tiempoRestanteSegundos = (this.FECHA_ESTRENO - dateNow) / 1000;
        let segundosRestantes = ("0" + Math.floor(tiempoRestanteSegundos % 60)).slice(-2);
        let minutosRestantes = ("0" + Math.floor(tiempoRestanteSegundos / 60 % 60)).slice(-2);
        let horasRestantes = ("0" + Math.floor(tiempoRestanteSegundos / 3600 % 24)).slice(-2);
        let diasRestantes = ("0" + Math.floor(tiempoRestanteSegundos / (3600 * 24) % 30)).slice(-2);
        let mesesRestantes = ("0" + Math.floor(tiempoRestanteSegundos / (3600 * 24 * 30) % 12)).slice(-2);
        let aniosRestantes = ("000" + Math.floor(tiempoRestanteSegundos / (3600 * 24 * 365))).slice(-4);
        return {
            segundosRestantes,
            minutosRestantes,
            horasRestantes,
            diasRestantes,
            mesesRestantes,
            aniosRestantes
        }
    }
}

document.addEventListener("DOMContentLoaded",()=>CountDown.getInstance().start());
