var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var path = [];
var pathIndex = 0;
var startx = 1;
var starty = 1;

var maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 1, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 0, 2, 1, 2, 0, 2, 1, 0, 1],
    [1, 0, 1, 0, 1, 2, 0, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 0, 2, 0, 2, 1, 2, 0, 2, 1, 0, 1, 2, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 2, 0, 2, 0, 2, 0, 2, 1, 2, 1, 0, 1, 0, 1, 2, 0, 2, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1, 2, 0, 2, 1, 2, 0, 2, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 0, 0, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 1, 2, 0, 2, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 2, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var cellArray = [];

var mazeFeature = {
    EMPTY: 0,
    WALL: 1,
    INTERSECTION: 2,
    DEADEND: 3
}

class Cell {
    constructor(row, col, color) {
        this.row = row;
        this.col = col;
        this.color = color;

    }

    show() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.row*50, this.col*50, 50, 50);
    }
}

function allocatedMaze() {
    for (var y = 1; y < maze.length - 1; y++) {
        for (var x = 1; x < maze[0].length - 1; x++) {
            
            var left = 0;
            var right = 0;
            var up = 0;
            var down = 0;
            var sum = 0;
    
            if(maze[y + 1][x] == 0 || maze[y + 1][x] == 2)
            {
                up = 1;
                sum++;
            }

            if(maze[y-1][x] == 0 || maze[y-1][x] == 2)
            {
                down = 1;
                sum++;
            }

            if(maze[y][x + 1] == 0 || maze[y][x + 1] == 2) 
            {
                right = 1;
                sum++;
            }

            if(maze[y][x - 1] == 0 || maze[y][x - 1] == 2)
            {
                left = 1;
                sum++;
            }

            if(sum > 2 && maze[y][x] == 2) {
                maze[y][x] = mazeFeature.DEADEND;
            }
    
        }
    
    }
}

function makeMaze() {

    allocatedMaze();

    console.log('{')

    for (var y = 0; y < maze.length; y++) {
        console.log('{')
        for (var x = 0; x < maze[0].length; x++) {

    
            if(maze[y][x] == 1)
            {
                var cell = new Cell(x, y, "red");
            }
            else if(maze[y][x] == 0)
            {
                var cell = new Cell(x, y, "snow");
            }
            else if(maze[y][x] == 2)
            {
                var cell = new Cell(x, y, "grey");
            } else if(maze[y][x] == mazeFeature.DEADEND) {
                var cell = new Cell(x, y, "black");
            }

            console.log(maze[y][x]);

            

            cellArray.push(cell);
    
        }

        console.log('}, \n')
    
    }

}



function draw() {

    for(var i = 0; i < cellArray.length; i++) {
        cellArray[i].show();
    }

}


function getPath() {
    var pathInput = document.getElementById("form");
    var pathString = pathInput[0].value;
    var pathIndices = pathString.split(",");
    console.log(pathIndices);
    for(var g = 0; g < pathIndices.length; g++) {
        path.push(pathIndices[g].split(" "));
    }
    console.log(path);
}

function getDirections() {
    var pathInput = document.getElementById("form2");
    path = pathInput[0].value.split(" ");

    console.log(path);
}

function getMap() {
    var pathInput = document.getElementById("form3");
    path = pathInput[0].value.split(" ");

    console.log(path);
}

function nextMove() {

    var coord = path[pathIndex];

    cellArray.forEach(cell => {
        if(cell.row == coord[1] && cell.col == coord[0]) {

            if(cell.color == "yellow") {
                cell.color = "purple";
            } else if(cell.color == "purple") {
                cell.color = "green";
            } else if(cell.color == "green") {
                cell.color = "blue";
            } 
            else {
                cell.color = "yellow";
            }
            pathIndex++;
        }
    });

    draw();
    
}

function nextDirection() {

    var direction = path[pathIndex]


    if(direction == "0") {
        starty--;
    }

    if(direction == "1") {
        starty++;
    }

    if(direction == "2") {
        startx--;
    }

    if(direction == "3") {
        startx++;
    }

    console.log(pathIndex, direction, startx, starty);


    if(direction != "5") {
        cellArray.forEach(cell => {
            if(cell.row == startx && cell.col == starty) {
    
                if(cell.color == "yellow") {
                    cell.color = "purple";
                } else if(cell.color == "purple") {
                    cell.color = "green";
                } else {
                    cell.color = "yellow";
                }
            }
    
        });
    }

    pathIndex++;
        

    draw();
    
}

function autoComplete() {

    setInterval(nextMove, 100);

}

function autoDirection() {

    setInterval(nextDirection, 100);

}

makeMaze();

draw();
