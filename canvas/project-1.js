import { Canvas, Pattern, printCanv, CanvasUtil } from "./canvas.js";

// Parameters
const mainP = {
    color: {r: 255, g: 255, b:255},
    cell: 10,
    size: 0.9,
    freq: 0.5,
    reload: true,
    keepIt: false,
}

const rectP = {
    fillType: 'fill',
    lineWidth: 1,
    padding: 0,
    color: {r: 255, g: 255, b: 255},
}

const arcP = {
    fillType: 'fill',
    lineWidth: 1,
    radius: 5,
    startAngle: 0,
    endAngle: Math.PI * 2,
    color: {r: 255, g: 255, b: 255},
}

// Setup
const canvasSize = 600;
const x = new Canvas(0, canvasSize, canvasSize);
const canvas = x.canvas;
const context = x.getContext();
const canvases = [];
const colorToString = new CanvasUtil().colorToString;
printCanv('white', canvas, context);

// User Interface
const createPane = () => {
    const pane = new Tweakpane.Pane();

    const btn1 = pane.addButton({title: 'Project-1'});
    const btn2 = pane.addButton({title: 'Project-2'});
    const btn3 = pane.addButton({title: 'Project-3'});
    const btn4 = pane.addButton({title: 'Project-4'});
    const btn5 = pane.addButton({title: 'Project-5'});

    btn1.on('click', project1Pane);
    // btn2.on('click', project2Pane);
    // btn3.on('click', project3Pane);
    // btn4.on('click', project4Pane);
    // btn5.on('click', project5Pane);

}
const project1Pane = () => {
    const pane = new Tweakpane.Pane();
    
    const main       = pane.addFolder({title: 'Main'});
    const rect       = pane.addFolder({title: 'Rect'});
    const arc        = pane.addFolder({title: 'Arc'});
    const createRect = pane.addButton({title: 'Create Rect'});
    const createArc  = pane.addButton({title: 'Create Arc'});
    const Save       = pane.addButton({title: 'Save Canvas'});
    const Reset      = pane.addButton({title: 'Reset'});
    const Download   = pane.addButton({title: 'Download'});
    const Back       = pane.addButton({title: 'Go Back'});
    
    main.addInput(mainP, 'cell',     {min: 1, max: 100, step: 1});
    main.addInput(mainP, 'size',     {min: 0.1, max:1});
    main.addInput(mainP, 'freq',     {min: 0, max: 1, step: 0.1});
    main.addInput(mainP, 'reload');
    main.addInput(mainP, 'color');

    
    rect.addInput(rectP, 'fillType',  {options: {fill: 'fill', stroke: 'stroke'}});
    rect.addInput(rectP, 'lineWidth', {min: 0.3, max: 30});
    rect.addInput(rectP, 'padding',   {min: 0, max: 30});
    rect.addInput(rectP, 'color');
    
    arc.addInput(arcP,   'fillType',   {options: {fill: 'fill', stroke: 'stroke'}});
    arc.addInput(arcP,   'lineWidth',  {min: 0.3, max: 30});
    arc.addInput(arcP,   'radius',     {min: 1, max: 100});
    arc.addInput(arcP,   'startAngle', {min: 0, max: Math.PI * 2});
    arc.addInput(arcP,   'endAngle',   {min: 0, max: Math.PI * 2});
    arc.addInput(arcP,   'color');

    createRect.on('click', () => {
        const pattern = new Pattern(canvas, mainP.cell, mainP.cell, mainP.size); 

        if (mainP.reload) printCanv(colorToString(mainP.color), canvas, context);
        if (mainP.freq > 0) pattern.randomRect(context, rectP.fillType, rectP.lineWidth, colorToString(rectP.color), rectP.padding, mainP.freq);
        if (mainP.freq == 0) pattern.rect(context, rectP.fillType, rectP.lineWidth, colorToString(rectP.color), rectP.padding);
    });

    createArc.on('click', () => {
        const pattern = new Pattern(canvas, mainP.cell, mainP.cell, mainP.size); 

        if (mainP.reload) printCanv(colorToString(mainP.color), canvas, context);
        if (mainP.freq > 0) pattern.randomArc(context, arcP.fillType, arcP.lineWidth, colorToString(arcP.color), arcP.radius, arcP.startAngle, arcP.endAngle, mainP.freq);
        if (mainP.freq == 0) pattern.arc(context, arcP.fillType, arcP.lineWidth, colorToString(arcP.color), arcP.radius, arcP.startAngle, arcP.endAngle);
    });

    Reset.on('click', () => {
        printCanv(colorToString(mainP.color), canvas, context);
    });

    Save.on('click', () => {
        const savedCansDiv = document.getElementById('saved');
        const can = document.createElement('canvas');
        const ctx = can.getContext('2d'); 

        can.width  = canvas.width;
        can.height = canvas.height;
        
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        const storeCan = can;
        
        can.addEventListener('mouseenter', () => {
            context.drawImage(can, 0, 0, canvas.width, canvas.height);
        });
        can.addEventListener('mouseleave', () => {
            context.drawImage(storeCan, 0, 0, canvas.width, canvas.height);
        });

        savedCansDiv.appendChild(can);
        
    });

    Download.on('click', () => {
        let canvasURL = canvas.toDataURL();
        const a = document.createElement('a');
        a.download = 'canvas';
        a.href = canvasURL;
        a.click();
        a.remove();
    });

    Back.on('click', () => {
        pane.hidden = !pane.hidden;
        createPane();
    });

};
createPane();

const preBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');

preBtn.addEventListener('click', () => {

});

