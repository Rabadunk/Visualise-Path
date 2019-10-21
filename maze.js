
function draw() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    
    var maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
    
    
    
    for (var y = 0; y < maze.length; y++) {
        for (var x = 0; x < maze.length; x++) {
    
            if(maze[y][x] == 1)
            {
                ctx.fillStyle="red";
                ctx.fillRect(x*50, y*50, 50, 50);
            }
            else if(maze[y][x] == 0)
            {
                ctx.fillStyle="grey";
                ctx.fillRect(x*50, y*50, 50, 50);
            }
    
        }
    
    }

}

draw();
