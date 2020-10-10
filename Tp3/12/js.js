document.addEventListener("DOMContentLoaded",()=>{
    let indiceScroll = 0;
    let sol = document.querySelector("#sol");
    const vwSol = 80;
    
    window.addEventListener('wheel', function(event) {
        let sol = document.querySelector("#sol");
        let parallax = document.querySelector("#parallax");
        const MAX_SCROLL = 4200;
        let corrimiento;
        corrimiento = indiceScroll / 100;
/*
        if (event.deltaY < 0) {
            if (indiceScroll > 0) {
                indiceScroll -= 100;
                sol.style.transform = "translateX(" + (corrimiento + vwSol) + "vw)";
                console.log('scrolling up');
            }
        }
        else if (event.deltaY > 0) {
            if (indiceScroll < MAX_SCROLL) {
                indiceScroll += 100;
                console.log('scrolling down');
                sol.style.transform = "translateX(" + (corrimiento + vwSol) + "vw)";
            }
        }
        */
        /*
        if (event.deltaY < 0) {
            if (indiceScroll > 0) {
                indiceScroll -= 100;
                corrimiento = (indiceScroll + (indiceScroll / 10 + 50));
                sol.style.transform = "translateX(" + corrimiento + "px)";
                console.log('scrolling up');
            }
        }
        else if (event.deltaY > 0) {
            if (indiceScroll < MAX_SCROLL) {
                indiceScroll += 100;
                console.log('scrolling down');
                corrimiento = (indiceScroll - (indiceScroll / 10 + 50) );
                sol.style.transform = "translateX(" + corrimiento + "px)";
            }
        }*/
        console.log("indice: "+indiceScroll + " corrimiento: " + corrimiento);
    });
});