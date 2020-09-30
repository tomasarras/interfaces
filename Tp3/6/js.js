document.addEventListener("DOMContentLoaded",()=>{
    let btn = document.querySelector("#btn-google");
    btn = document.addEventListener("click",()=>{
        let divLoading = document.querySelector("#div-loading");
        divLoading.classList.add("loading");
        setTimeout(() => {
            window.location.href = "http://www.google.com";
        }, 5000);
    })
});