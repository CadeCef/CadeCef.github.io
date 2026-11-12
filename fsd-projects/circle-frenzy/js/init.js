alert("Right click to spawn in circles. you can also drag them and they collide. have fun!")

var init = function(window) {
    'use strict';
    var
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,

        app = window.opspark.makeApp(),
        canvas = app.canvas,
        view = app.view,
        fps = draw.fps('#000');


    window.opspark.makeGame = function() {

        window.opspark.game = {};
        var game = window.opspark.game;

        ///////////////////
        // PROGRAM SETUP //
        ///////////////////

        // TODO 1 : Declare and initialize our variables

        var circles = []

        // TODO 2 : Create a function that draws a circle 

        function drawCircle() {
            var circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
            physikz.addRandomVelocity(circle, canvas, 5, 5);
            view.addChild(circle);
            circles.push(circle);
            circle.dragging = false;

            circle.on("mousedown", function(event) {
                circle.dragging = true;
                circle.dragOffsetX = circle.x - event.stageX;
                circle.dragOffsetY = circle.y - event.stageY;

                circle.dragLastX = event.stageX;
                circle.dragLastY = event.stageY;
                circle.dragLastTime = Date.now();

                circle.velocityX = 0;
                circle.velocityY = 0;
            });

            circle.on("pressmove", function(event) {
                var now = Date.now();
                var elapsedMs = now - circle.dragLastTime;

                if (elapsedMs > 0) {
                    // Convert pointer movement into pixels per frame (about 60 frames/second)
                    circle.velocityX =
                        (event.stageX - circle.dragLastX) / elapsedMs * (1000 / 60);
                    circle.velocityY =
                        (event.stageY - circle.dragLastY) / elapsedMs * (1000 / 60);
                }

                circle.dragLastX = event.stageX;
                circle.dragLastY = event.stageY;
                circle.dragLastTime = now;

                circle.x = event.stageX + circle.dragOffsetX;
                circle.y = event.stageY + circle.dragOffsetY;
            });

            circle.on("pressup", function() {
                circle.dragging = false;
            });
        }

        // TODO 3 : Call the drawCircle() function

        // TODO 7 : Use a loop to create multiple circles

        window.oncontextmenu = () => {
            console.log('right click');
            drawCircle()
            return false // cancel default menu
        }




        ///////////////////
        // PROGRAM LOGIC //
        ///////////////////

        /* 
        This Function is called 60 times/second, producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the position of each circle using physikz.updatePosition()
            for (var i = 0; i < circles.length; i++) {
                if (!circles[i].dragging) {
                    physikz.updatePosition(circles[i]);
                }
            }


            // TODO 5 : Call game.checkCirclePosition() on your circles
            for (var i = 0; i < circles.length; i++) {
                game.checkCirclePosition(circles[i]);
            }



            // TODO 8 / TODO 9 : Iterate over the array


            for (var i = 0; i < circles.length; i++) {
                for (var j = i + 1; j < circles.length; j++) {
                    var a = circles[i];
                    var b = circles[j];

                    var dx = b.x - a.x;
                    var dy = b.y - a.y;
                    var minDistance = a.radius + b.radius;
                    var distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > 0 && distance <= minDistance) {
                        var nx = dx / distance;
                        var ny = dy / distance;

                        var relativeNormalSpeed =
                            (b.velocityX - a.velocityX) * nx +
                            (b.velocityY - a.velocityY) * ny;

                        if (relativeNormalSpeed < 0) {
                            var restitution = 0.9;
                            var impulse = -(1 + restitution) * relativeNormalSpeed / 2;

                            a.velocityX -= impulse * nx;
                            a.velocityY -= impulse * ny;
                            b.velocityX += impulse * nx;
                            b.velocityY += impulse * ny;
                        }

                        var overlap = minDistance - distance;
                        a.x -= nx * overlap / 2;
                        a.y -= ny * overlap / 2;
                        b.x += nx * overlap / 2;
                        b.y += ny * overlap / 2;
                    }
                }
            }
        }

        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if (circle.x > canvas.width) {
                circle.velocityX *= -1;
            }

            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if (circle.x < 0) {
                circle.velocityX *= -1;
            }

            if (circle.y > canvas.height) {
                circle.velocityY *= -1;
            }

            if (circle.y < 0) {
                circle.velocityY *= -1;
            }




            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }

        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////

        view.addChild(fps);
        app.addUpdateable(fps);

        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;

        app.addUpdateable(window.opspark.game);
    }
};

// DO NOT REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
} // here, export any references you need for tests //
module.exports = init;