var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var path = [];
var pathIndex = 0;
var startx = 1;
var starty = 1;

var maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

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

            if (maze[y][x] == 0) {

                var left = 0;
                var right = 0;
                var up = 0;
                var down = 0;
                var sum = 0;

                if (maze[y + 1][x] != 1) {
                    up = 1;
                    sum++;
                }

                if (maze[y - 1][x] != 1) {
                    down = 1;
                    sum++;
                }

                if (maze[y][x + 1] != 1) {
                    right = 1;
                    sum++;
                }

                if (maze[y][x - 1] != 1) {
                    left = 1;
                    sum++;
                }

                if (sum == 2 && !(left && right || up && down)) {
                    maze[y][x] = mazeFeature.INTERSECTION;
                }

                if (sum == 1) {
                    maze[y][x] = mazeFeature.INTERSECTION;
                }

                if (sum > 2) {
                    maze[y][x] = mazeFeature.INTERSECTION;
                }

            }
    
        }
    
    }
}

function makeMaze() {

    allocatedMaze();

    cellArray = [];

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

            cellArray.push(cell);
    
        }
    
    }

    displayMap();

}



function draw() {

    for(var i = 0; i < cellArray.length; i++) {
        cellArray[i].show();
    }

}


function getPath() {
    path = [];
    pathIndex = 0;
    var pathInput = document.getElementById("form");
    var pathString = pathInput[0].value;
    var pathIndices = pathString.split(",");
    console.log(pathIndices);
    for(var g = 0; g < pathIndices.length; g++) {
        path.push(pathIndices[g].split(" "));
    }

    makeMaze();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();



    console.log(path);
}

function getDirections() {
    var pathInput = document.getElementById("form2");
    path = pathInput[0].value.split(" ");

    console.log(path);
}

function getMap() {
    var mazeInput = document.getElementById("form3");
    var inputMazeScramble = mazeInput[0].value;
    console.log(inputMazeScramble);

    var newMaze = [];
    var newRow = [];


    for (var i = 0; i < inputMazeScramble.length; i++) {

        var character = inputMazeScramble.charAt(i);
        var num = parseInt(character);


        if (character == "{") {


            if (newRow.length != 0) {
                newMaze.push(newRow)
                newRow = [];
            }

        } else if (num == 1 || num == 0) {

            newRow.push(num);
        }

    }

    newMaze.push(newRow);

    maze = newMaze;
    makeMaze();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}

function displayMap() {

    var mapString = "{";

    for (var y = 0; y < maze.length; y++) {
        mapString+="{";
        for (var x = 0; x < maze[0].length; x++) {

            mapString += maze[y][x].toString();

            if (x != maze[0].length - 1) {
                mapString += ",";
            }

        }

        mapString += "}";

        if (y != maze.length - 1) {
            mapString += ",";
        }

    }

    mapString += "};";

    console.log(mapString);
    document.getElementById("map").innerHTML = mapString;

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

            console.log("This is x: %d, this is y: %d", cell.col, cell.row);
        }
    });

    draw();
    
}


function autoComplete() {

    setInterval(nextMove, 100);

}


makeMaze();

draw();
