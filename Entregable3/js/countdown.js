document.addEventListener("DOMContentLoaded",()=>{
    const FECHA_ESTRENO = new Date("10/28/2020/15:00");

    setInterval(actualizarEstreno, 1000);
    actualizarEstreno();
    function actualizarEstreno() {
        let tiempoRestante = getTiempoRestante();
        document.querySelector(".display.sec").innerHTML = tiempoRestante.segundosRestantes;
        document.querySelector(".display.min").innerHTML = tiempoRestante.minutosRestantes;
        document.querySelector(".display.hour").innerHTML = tiempoRestante.horasRestantes;
        document.querySelector(".display.day").innerHTML = tiempoRestante.diasRestantes;
        document.querySelector(".display.month").innerHTML = tiempoRestante.mesesRestantes;
        document.querySelector(".display.year").innerHTML = tiempoRestante.aniosRestantes;
    }

    function getTiempoRestante() {
        let dateNow = new Date();
        let tiempoRestanteSegundos = (FECHA_ESTRENO - dateNow) / 1000;
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

    function getMes(numero) {
        switch(numero) {
            case 0: return "ENE";
            case 1: return "FEB";
            case 2: return "MAR";
            case 3: return "ABR";
            case 4: return "MAY";
            case 5: return "JUN";
            case 6: return "JUL";
            case 7: return "AGO";
            case 8: return "SEP";
            case 9: return "OCT";
            case 10: return "NOV";
            case 11: return "DIC";
        }
    }
});