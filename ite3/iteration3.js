console.log(mazes);

const displayMaze = (width) => {
    // debugger;
    const ex = "ex-0";
    const root = document.documentElement;
    root.style.setProperty('--maze-width', width);
    root.style.setProperty('--maze-ex', ex);

    let maze = mazes[width][ex]
    const cont = document.getElementById('base')
    cont.innerHTML = '';
    for (let i = 0; i < maze.length; i++){
        const cell = maze[i];
        let div = document.createElement('div');
        div.className = 'little';
        cont.appendChild(div);

       cell.entrance === true && (div.style.background = 'orange');
       cell.exit === true && (div.style.background = 'green');
       cell.walls[0] === true && (div.style.borderTop = 'solid 1px red');
       cell.walls[1] === true && (div.style.borderRight = 'solid 1px red');
       cell.walls[2] === true && (div.style.borderBottom = 'solid 1px red');
       cell.walls[3] === true && (div.style.borderLeft = 'solid 1px red');
    }
}
displayMaze(3);

let selectSize = document.getElementById('sizeSelect');
selectSize.addEventListener('change', function (){
    let test = selectSize.value;
    displayMaze(test);
})
// displayMaze();