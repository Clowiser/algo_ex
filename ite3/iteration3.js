console.log(mazes);
let maze;
const displayMaze = (width, way) => {
    // debugger;
    const root = document.documentElement;
    root.style.setProperty('--maze-width', width);
    root.style.setProperty('--maze-ex', way);

    let entrance;
    maze = mazes[width][way]

    const cont = document.getElementById('base')
    cont.innerHTML = '';
    for (let i = 0; i < maze.length; i++){
        const cell = maze[i];
        let div = document.createElement('div');
        div.className = 'little';
        div.setAttribute('id', '' + i);
        cont.appendChild(div);

       cell.entrance === true && (div.style.background = 'orange', entrance = cell );
       cell.exit === true && (div.style.background = 'green');
       cell.walls[0] === true && (div.style.borderTop = 'solid 2px red');
       cell.walls[1] === true && (div.style.borderRight = 'solid 2px red');
       cell.walls[2] === true && (div.style.borderBottom = 'solid 2px red');
       cell.walls[3] === true && (div.style.borderLeft = 'solid 2px red');
       cell.div = div;

    }
    test(maze, entrance)
}

let selectSize = document.getElementById("sizeSelect");
let selectWay = document.getElementById("waySelect");

for (let i in mazes) {
    let option = document.createElement('option');
    option.textContent = i;
    option.value = i;
    selectSize.appendChild(option);
}

let way = "ex-0", size = 3;
displayMaze(size, way);

selectSize.addEventListener('change', function (){
    size = selectSize.value;
    displayMaze(size, way);
})

selectWay.addEventListener('change', function (){
    way = selectWay.value;
    displayMaze(size,way);
})

function test (maze, entrance) {
    let S = [];
    let number = 0;
    let path = [];

    S.push(entrance);

    while(S.length !== 0){
        let v = S.pop();

        if (v.visited !== true){
            v.visited = true;
            v.div.innerHTML = number++;
        }

        if (v.exit === true){
            return console.log(path);
        }

        for (const w of getNeighbours(v) ){
            console.log(w);
            if (w.visited !== true){

                S.push(w);
            }
        }
    }
}

function getNeighbours(cell){
    const neighbours = [];

    if (cell.walls[0] !== true){
        neighbours.push(getTop(cell))
    }
    if (cell.walls[1] !== true){
        neighbours.push(getRight(cell))
    }
    if (cell.walls[2] !== true){
        neighbours.push(getBottom(cell))
    }
    if (cell.walls[3] !== true){
        neighbours.push(getLeft(cell))
    }

    return neighbours;
}

function getTop(cell){
    let x = cell.posX -1;
    let y = cell.posY;

    return maze[x*size+y];
}
function getRight(cell){
    let x = cell.posX;
    let y = cell.posY +1;

    return maze[x*size+y];
}
function getBottom(cell){
    let x = cell.posX +1;
    let y = cell.posY;

    return maze[x*size+y];
}
function getLeft(cell){
    let x = cell.posX;
    let y = cell.posY -1;

    return maze[x*size+y];
}