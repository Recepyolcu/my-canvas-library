import { printCanv, Agent } from "./canvas.js";

const agent = new Agent();

agent.createRandomPosAgents(30, canvas.width, canvas.height);


const animate = () => {
    
    printCanv('white', canvas);
    agent.lineBetweenAgents(canvas.context);

    agent.agents.forEach(obj => {    
        obj.draw(canvas.context);
        obj.update();
        obj.bounce();
    });


    requestAnimationFrame(animate);
}

animate();




