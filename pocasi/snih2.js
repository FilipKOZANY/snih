const { Engine, Render, Runner, World, Bodies, Events } = Matter;

// vytvoření světa
const engine = Engine.create();
const world = engine.world;

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
let isRaindrop = false;

// proměnná pro uložení síly větru
let windForce = { x: -0.01, y: 0 };

// loop pro vytvoření sněhových vloček
setInterval(() => {
    for (let i = 0; i < 50; i++) {
        // vytvoření kruhového těla s bílou barvou
        let snowflake = Bodies.circle(
            Math.random() * 800,
            -50,
            5,
            {
                render: {
                    fillStyle: 'white'
                },
                friction: 0.01,
                frictionAir: 0.01
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
});

// posluchač události pro uvolnění klávesy d
window.addEventListener('keyup', event => {
    if (event.keyCode === 68) {
        isKeyDPressed = false;
        isRaindrop = !isRaindrop;
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
            body.mass = 0.1;
            } else {
            // vrátit sněhovou vločku zpět na původní stav
            body.render.fillStyle = 'white';
            body.circleRadius = 5;
            body.label = 'snowflake';
            body.friction = 0.01;
            body.frictionAir = 0.01;
            body.mass = 0.5;
            }
            }
            }
            };
            
            // volání funkce pro aktualizaci vlastností sněhových vloček při každém kroku simulace
            Events.on(engine, 'beforeUpdate', updateSnowflakes);
            
            // vytvoření těla pro slunce a měsíc
            let sun = Bodies.circle(100, 100, 50, { isStatic: true });
            let moon = Bodies.circle(600, 100, 50, { isStatic: true });
            
            // nastavení pozadí
            render.options.background = "black";
            
            World.add(world, moon);
            
            // funkce pro zobrazování slunce a měsíce
            const displaySunAndMoon = () => {
            if (isKeyDPressed) {
            World.remove(world, moon);
            World.add(world, sun);
            sun.render.fillStyle = 'yellow';
            sun.mass = 0;
            } else {
            World.remove(world, sun);
            World.add(world, moon);
            moon.render.fillStyle = 'white';
            moon.mass = 0;
            }
            };
            
            // volání funkcepro zobrazování slunce a měsíce při každém kroku simulace
Events.on(engine, 'beforeUpdate', displaySunAndMoon);

// funkce pro simulaci větru
const simulateWind = () => {
if (isKeySPressed) {
windForce = { x: -0.05, y: 0 };
} else {
windForce = { x: 0, y: 0 };
}
};

// volání funkce pro simulaci větru při každém kroku simulace
Events.on(engine, 'beforeUpdate', simulateWind);