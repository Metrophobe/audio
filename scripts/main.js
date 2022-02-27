import { Bar } from "./bar.js";
import { Audio } from "./audio.js";

let bars, canvas, ctx, mic;

let main = () => {
    canvas = document.getElementById("main");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    bars = [];
    mic = new Audio();
    for (let i = 0; i <= 256; i++) {
        bars.push(new Bar(i*7.5,canvas.height/2,0,0, i));
    }
}

let animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(mic.initialized){
        bars.forEach((b, i) => {
            b.update(mic.getSamples()[i]);
            b.draw(ctx);
        });
    }
    requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", () => {
    main();
    animate();
})