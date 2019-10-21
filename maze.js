var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var path = [];

var maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 1, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 0, 2, 1, 0, 0, 2, 1, 0, 1],
    [1, 0, 1, 0, 1, 2, 0, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 0, 2, 0, 2, 1, 2, 0, 2, 1, 0, 1, 2, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 2, 0, 2, 0, 2, 0, 2, 1, 2, 1, 0, 1, 0, 1, 2, 0, 2, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1, 2, 0, 2, 1, 0, 0, 2, 1],
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
    INTERSECTION: 2
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

function makeMaze() {

    for (var y = 0; y < maze.length; y++) {
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
            }

            cellArray.push(cell);
    
        }
    
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
    path = pathString.split(" ");
    console.log(path);
}

makeMaze();

draw();
