const { Engine, Render, Runner, World, Bodies, Events } = Matter;

// vytvoření světa
const engine = Engine.create();
const world = engine.world;
world.gravity.y = 0.1;

// vytvoření renderu
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// proměnná pro uložení stavu klávesy d
let isKeyDPressed = false;
let isKeySPressed = false;
let isKeyMPressed = false;
let isRaindrop = false;

// proměnná pro uložení síly větru
let windForce = { x: -0.01, y: 0 };

// loop pro vytvoření sněhových vloček
setInterval(() => {
    for (let i = 0; i < 7; i++) {
        // vytvoření kruhového těla s bílou barvou
        let snowflake = Bodies.circle(
            Math.random() * 800,
            -50,
            5,
            {
                render: {
                    fillStyle: 'white'
                }
            }
        );
        World.add(world, snowflake);
    }
}, 100);

// posluchač události pro stisknutí klávesy d
window.addEventListener('keydown', event => {
    if (event.keyCode === 68) {
        isKeyDPressed = true;
    }
    if (event.keyCode === 83) {
        isKeySPressed = true;
    }
    if (event.keyCode === 77) {
        isKeyMPressed = true;
    }
});

// posluchač události pro uvolnění klávesy d
window.addEventListener('keyup', event => {
    if (event.keyCode === 68) {
        isKeyDPressed = false;
        isRaindrop = !isRaindrop;
        }
        if (event.keyCode === 83) {
        isKeySPressed = false;
        }
        if (event.keyCode === 77) {
        isKeyMPressed = false;
        }
        });
        
        // funkce pro aktualizaci vlastností sněhových vloček
        const updateSnowflakes = () => {
        for (let body of world.bodies) {
        if (body.label === 'snowflake' || body.label === 'raindrop') {
        // aplikování síly větru na tělo
        body.force = windForce;
        if (isRaindrop) {
        // proměna sněhové vločky v kapku deště s modrou barvou
        body.render.fillStyle = 'blue';
        body.circleRadius = 2;
        body.label = 'raindrop';
        body.friction = 0;
        body.frictionAir = 0;
        } else {
        // vrátit sněhovou vločku zpět na původní stav
        body.render.fillStyle = 'white';
        body.circleRadius = 5;
        body.label = 'snowflake';
        body.friction = 0.01;
        body.frictionAir = 0.01;
        }
        }
        }
        };
        
        // volání funkce pro aktualizaci vlastností sněhových vloček při každém kroku simulace
        Events.on(engine, 'beforeUpdate', updateSnowflakes);
        
        // vytvoření těla pro slunce a měsíc
        let sun = Bodies.circle(100, 100, 50);
        let moon = Bodies.circle(600, 100, 50);
        
        // funkce pro zobrazování slunce aměsíce
const displaySunAndMoon = () => {
    if (isKeySPressed) {
    World.add(world, sun);
    sun.render.fillStyle = 'yellow';
    } else {
    World.remove(world, sun);
    }
    
    if (isKeyMPressed) {
        World.add(world, moon);
        moon.render.fillStyle = 'white';
    } else {
        World.remove(world, moon);
    }
};

// volání funkce pro zobrazování slunce a měsíce při každém kroku simulace
Events.on(engine, 'beforeUpdate', displaySunAndMoon);

// nastavení pozadí
const setBackground = () => {
if (isKeySPressed) {
render.options.background = "lightblue";
} else {
render.options.background = "black";
}
};

// volání funkce pro nastavení pozadí při každém kroku simulace
Events.on(engine, 'beforeUpdate', setBackground);        
