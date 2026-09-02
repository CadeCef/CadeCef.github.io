$(function() {
    // initialize canvas and context when able to
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("load", loadJson);

    function setup() {
        if (firstTimeSetup) {
            halleImage = document.getElementById("player");
            projectileImage = document.getElementById("projectile");
            cannonImage = document.getElementById("cannon");
            $(document).on("keydown", handleKeyDown);
            $(document).on("keyup", handleKeyUp);
            firstTimeSetup = false;
            //start game
            setInterval(main, 1000 / frameRate);
        }

        // Create walls - do not delete or modify this code
        createPlatform(-50, -50, canvas.width + 100, 50); // top wall
        createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "rgb(118, 0, 233)"); // bottom wall
        createPlatform(-50, -50, 50, canvas.height + 500); // left wall
        createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

        //////////////////////////////////
        // ONLY CHANGE BELOW THIS POINT //
        //////////////////////////////////

        // TODO 1 - Enable the Grid
        toggleGrid();


        // TODO 2 - Create Platforms
        createPlatform(800, 625, 200, 50, "gray")
        createPlatform(1100, 525, 200, 50, "gray", 1100, 1100, 0, 400, 550, .5)
            // createPlatform(1100, 400, 200, 50, "gray")
        createPlatform(800, 300, 50, 440, "gray")
        createPlatform(600, 0, 50, 500, "gray")
        createPlatform(350, 625, 200, 50, "gray")
        createPlatform(100, 525, 200, 50, "gray")
        createPlatform(500, 400, 100, 50, "gray")
        createPlatform(750, 350, 50, 25, "gray")
        createPlatform(650, 475, 50, 25, "gray")
        createPlatform(250, 350, 100, 25, "gray", 100, 450, 1, 100, 350, .2)
        createPlatform(200, 0, 50, 200, "gray")


        // TODO 3 - Create Collectables
        createCollectable("database", 100, 100, )



        // TODO 4 - Create Cannons
        createCannon("left", 600, 1100, 60, 60)
        createCannon("left", 400, 1500, 24, 24)



        //////////////////////////////////
        // ONLY CHANGE ABOVE THIS POINT //
        //////////////////////////////////

        //Restart with R, to skip death animation, js got annoying when testing
        document.addEventListener('keyup', (event) => {
            if (event.key == 'r') {
                window.location.reload();
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.key == 'f') {
                player.winConditionMet = true; // Set win condition to true
            }
        });
    }

    registerSetup(setup);
});