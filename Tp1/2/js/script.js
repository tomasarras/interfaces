document.addEventListener("DOMContentLoaded", ()=>{
    let ctx = document.querySelector("#myCanvas").getContext('2d');
    ctx.fillStyle = "#FF0000";  
    ctx.fillRect(30, 30, 100, 100); 
});