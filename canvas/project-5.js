import { printCanv, TypeCanvas } from "./canvas.js";


printCanv('black', canvas);


const changeText = (e) => {

    printCanv('black', canvas);
    
    let text = e.key.toUpperCase();
    
    // cell parametresi pixel sıklığını ifade eder, ne kadar küçük olursa pixeller o kadar sıklaşır ve küçülür 
    const typecanvas = new TypeCanvas(10, 'poppins', text);
     
    typecanvas.font(typecanvas.context, typecanvas.cols);
    typecanvas.centerText(typecanvas.context);
    typecanvas.bitmap(typecanvas.context, canvas.context, 'glyph', 10);

}

document.addEventListener('keyup', changeText);