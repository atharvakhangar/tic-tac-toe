let turn = randomiser(2);
// let turn = 1;
let symbol = []; //access is like symbol[horizontal rows][vertical colum]
let i = 0; //for loops or temp variable
let count = 0; // to detect draw
let board_size = 3;
let arr = []; //to make rows 
let game_status='p'; // f== freeze, p = playable
let winn;
let loser;
let blue = 0;
let red = 0;
let draw = 0;
let winner_sts=false;

//---varibles declared---//
function win_quotes(win, loss)
{
    const winQuotes = [
        `${win}, you secured the victory!`,
        `Well played, ${win}!`,
        `${win} takes the win!`,
        `Victory belongs to ${win}!`,
        `${win} was one step ahead.`,
        `That's how you finish a game, ${win}!`,
        `${win} played that beautifully.`,
        `${win} claims the crown!`,
        `${win} saw the winning move.`,
        `Too slow, ${loss}.`,
        `Is that all you've got, ${loss}?`,
        `${loss}, better luck next time!`,
        `${win} wins. ${loss} falls.`,
        `The board has spoken. ${win} wins!`,
        `${win} came, played, and conquered!`
    ];
    return winQuotes[randomiser(winQuotes.length)];
}

const drawQuotes = [
    "It's a draw!",
    "Nobody takes the victory this time.",
    "What a battle! Neither player gave in.",
    "Dead even!",
    "The board refuses to choose a winner.",
    "Neither side could break through.",
    "A perfect stalemate!",
    "Blue and Red are evenly matched.",
    "No winner this time!",
    "The battle ends in a draw.",
    "Both players held their ground.",
    "The board remains undecided.",
    "Neither of you could finish it!",
    "So... nobody wins. 😏",
    "You both fought hard. It's a draw!"
];

const aiWinQuotes = [
    "You challenged the machine. Bold choice.",
    "The AI wasn't even worried.",
    "Maybe next time, human.",
    "The machine wins. Again.",
    "You thought you had it. You didn't.",
    "The AI predicted your move.",
    "That's one for the machines.",
    "Human intelligence needs an update.",
    "The AI has outsmarted you!",
    "You made the move. The AI made the plan.",
    "The machine takes the crown!",
    "Better strategy wins.",
    "The AI played the long game.",
    "You were playing Tic-Tac-Toe. The AI was calculating.",
    "Perhaps underestimate the machine less next time. 🤖"
];

const aiDrawQuotes = [
    "A perfect draw. Neither side could break through.",
    "The AI couldn't beat you. You couldn't beat the AI.",
    "Looks like we're evenly matched.",
    "You survived the machine!",
    "The AI remains undefeated... but not victorious.",
    "Neither side gave an inch.",
    "A flawless stalemate!",
    "You held your ground against the AI.",
    "The machine found no winning move.",
    "No winner this time. Well played!",
    "The AI couldn't crack your defense.",
    "You kept the AI at bay!",
    "Perfectly balanced. As all Tic-Tac-Toe boards should be.",
    "The board has reached a deadlock.",
    "Neither of us could finish the job.",
    "The AI predicted everything... and still couldn't win.",
    "You and the AI are evenly matched!",
    "No mistakes, no victory.",
    "The machine accepts a draw. 🤖",
    "You stopped the AI from winning!",
    "The AI tried. The board said no.",
    "A battle of perfect defense!",
    "Nobody wins. Nobody loses.",
    "The AI remains unbeaten. You remain unbroken.",
    "Well played, human. We call that a draw."
];

const humanWinQuotes = [
    "YOU BEAT THE AI! 🤯",
    "Impossible... the machine has fallen!",
    "Human intelligence wins!",
    "You actually defeated the AI!",
    "The AI made a mistake. You didn't.",
    "Victory over the machine!",
    "Well played, human. 🤖💀",
    "The impossible just happened!",
    "You found the weakness!",
    "Remember this moment. The AI won't. 😏"
];

//---quotes---//

const URL = location.search;
const url = new URLSearchParams(URL);
let vol_status = url.get('vol');
let gamemode = url.get('vs')

//---Url variables declared---//

let boxes = document.querySelectorAll("td");

//---connected to board---//

for(let len=0; len<board_size ; len++){arr.push("a");}
for(i=0; i<board_size ; i++){symbol.push(Array(...arr));}

//---created a similar array to board---//

function event_flow(event)
{
    if(game_status == 'p')
    {
        alot(event);
        game_status = 'f';
        setTimeout(static_win_check, 0);
    }
}

if(vol_status=="mute")
    document.querySelector("#music").play();

if(turn == 0 && gamemode == "ai")
{
    ai_play();
    turn++;
    count++;
}

//---kinda like main function---//

boxes.forEach(function(box){
    box.addEventListener("click", event_flow)
});

//---alloted every div a listner---//

function restart_btn()
{
    game_status='p';
    count = 0;
    turn = randomiser(2);
    blue = 0;
    red = 0;
    draw = 0;
    symbol = [];
    arr = [];
    winner_sts=false;
    boxes = document.querySelectorAll("td");
    document.querySelector("dialog").close();
    document.querySelector("#win_line").style.display="none";
    boxes.forEach(function(box){
        box.querySelector(".x").style.display="none";
        box.querySelector(".o").style.display="none";
        box.addEventListener("click", event_flow); 
    });
    for(let len=0; len<board_size ; len++){arr.push("a");}
    for(i=0; i<board_size ; i++){symbol.push(Array(...arr));}
        count = 0;
    if(turn == 0)
    {
        ai_play();
        turn++;
        count++;
    }
    document.querySelector("#score_o").innerHTML=blue;
    document.querySelector("#score_x").innerHTML=red;
    document.querySelector("#score_d").innerHTML=draw;
}

function rematch_btn()
{
    game_status='p';
    count = 0;
    turn = randomiser(2);
    symbol = [];
    arr = [];
    winner_sts=false;
    boxes = document.querySelectorAll("td");
    document.querySelector("dialog").close();
    document.querySelector("#win_line").style.display="none";
    boxes.forEach(function(box){
        box.querySelector(".x").style.display="none";
        box.querySelector(".o").style.display="none";
        box.addEventListener("click", event_flow); 
    });
    for(let len=0; len<board_size ; len++){arr.push("a");}
    for(i=0; i<board_size ; i++){symbol.push(Array(...arr));}
    if(turn == 0)
    {
        ai_play();
        turn++;
        count++;
    }   
}

//---Buttons Function---//

//functions
function static_win_check()
{
    let row = 0;
    let colum = 0;
    //horizontal checks
    for(row=0, colum=1;row<3;row++)
    {
        if(symbol[row][colum-1]!='a' && symbol[row][colum]!='a' && symbol[row][colum+1]!='a')
        if(symbol[row][colum-1]==symbol[row][colum] && symbol[row][colum]==symbol[row][colum+1])
        {
            switch(row)
            {
                case 0: winner([row, colum],[0, 't']); return;
                case 1: winner([row, colum],[0, 'm']); return;
                case 2: winner([row, colum],[0, 'b']); return;
            }
        }
    }
    //vertical checks
    for(row=1, colum=0;colum<3;colum++)
    {
        if(symbol[row-1][colum]!='a' && symbol[row][colum]!='a' && symbol[row+1][colum]!='a')
        if(symbol[row-1][colum]==symbol[row][colum] && symbol[row][colum]==symbol[row+1][colum])
        {
            switch(colum)
            {
                case 0: winner([row, colum],[90, 'l']); return;
                case 1: winner([row, colum],[90, 'm']); return;
                case 2: winner([row, colum],[90, 'r']); return;
            }
        }
    }
    //diagonal checks
    {
        if(symbol[1][1]!='a')
        if(symbol[0][0]==symbol[1][1] && symbol[1][1]==symbol[2][2])
        {
            winner([1, 1],[45, 'm']); 
            return;
        }

        if(symbol[1][1]!='a')
            if(symbol[0][2]==symbol[1][1] && symbol[1][1]==symbol[2][0])
        {
            winner([1, 1],[-45, 'm']);
            return;
        }
    }
    if(count==9)
    {
        winner([undefined, undefined], [0, 'd']);
        return;
    }
    game_status='p';
}

function alot(box)
{
    box = box.currentTarget;
    // console.log(box.dataset.row);
    // console.log(box.dataset.colum);
    // console.log(box);
    let row = Number(box.dataset.row);
    let colum = Number(box.dataset.colum);
        if(turn==0 && gamemode!="ai")
        {
            box.querySelector(".o").style.display="block";
            turn++;
            count++;
            symbol[row][colum]='o';
        }
        else if(turn==1)
        {
            box.querySelector(".x").style.display="block";
            turn--;        
            count++;
            symbol[row][colum]='x'; 
            static_win_check();
            if(gamemode == "ai" && count != 9 && !winner_sts)
            {
                count++;
                ai_play(symbol); 
                turn++;
                static_win_check();
            }
        }
        // console.log(symbol);
        box.removeEventListener("click", event_flow);
}

function winner([i, j], win_line)  
{
    if(!winner_sts)
    {
        winner_sts=true;
        let sss;
        game_status= 'f';
        if(i!=undefined)
            sss=symbol[i][j];
        else
            sss='k'
        switch(sss){
            case 'x':{ red++; winn="Red"; text('x'); break;}
            case 'o':{ blue++; winn="Blue"; text('o'); break;}
            default:{ draw++; text('d'); break;}
        }
        if(win_line!=undefined)
        line(win_line);
        setTimeout(() => {document.querySelector("dialog").showModal()}, 2000);
    }
}

function text(sym)
{
    if(sym == 'x' && gamemode == "human")
    {
        document.querySelector("#jsdiv").innerHTML="Red Wins This Round";
        document.querySelector("#jsdiv").style['color']="red";
        document.querySelector("#comment").innerHTML=win_quotes("Red", "Blue");
        document.querySelector("#score_x").innerHTML=red;
    }
    else if(sym == 'o' && gamemode == "human")
    {
        document.querySelector("#jsdiv").innerHTML="Blue Wins This Round";
        document.querySelector("#jsdiv").style['color']="Blue";
        document.querySelector("#comment").innerHTML=win_quotes("Blue", "Red");
        document.querySelector("#score_o").innerHTML=blue;
    }  
    else if(sym == 'x' && gamemode == "ai")
    {
        document.querySelector("#jsdiv").innerHTML="Human Wins This Round";
        document.querySelector("#jsdiv").style['color']="red";
        document.querySelector("#comment").innerHTML=humanWinQuotes[randomiser(humanWinQuotes.length)];
        document.querySelector("#score_x").innerHTML=red;
    }
    else if(sym == 'o' && gamemode == "ai")
    {
        document.querySelector("#jsdiv").innerHTML="Ai Wins This Round";
        document.querySelector("#jsdiv").style['color']="Blue";
        document.querySelector("#comment").innerHTML=aiWinQuotes[randomiser(aiWinQuotes.length)];
        document.querySelector("#score_o").innerHTML=blue;
    }
    else if(sym == 'd' && gamemode == "human")
    {
        document.querySelector("#jsdiv").innerHTML="This round is draw";
        document.querySelector("#comment").innerHTML=drawQuotes[randomiser(drawQuotes.length)];
        document.querySelector("#score_d").innerHTML=draw;
    } 
    else if(sym == 'd' && gamemode == "ai")
    {
        document.querySelector("#jsdiv").innerHTML="This round is draw";
        document.querySelector("#comment").innerHTML=aiDrawQuotes[randomiser(aiDrawQuotes.length)];
        document.querySelector("#score_d").innerHTML=draw;
    }      
}

function line(info)
{
    console.log(info);
    let line = document.querySelector("#win_line").style;
    let pos = {top : "8vmin", bottom : "38vmin", right : "15vmin", left : "-15vmin"};
    if(count != 9)
    line.display="block";
    line.rotate=info[0]+"deg";
    switch(info[1])
    {
        case 'l': line.left=pos["left"]; break;
        case 'r': line.left=pos["right"]; break;
        case 't': line.top=pos["top"]; break;
        case 'b': line.top=pos["bottom"]; break;
        default: break;
    }
}

function randomiser(n)
{
    let seed = Math.random()*n;
    return Math.trunc(seed);
}


// document.querySelector("dialog").showModal();

function static_ai()
{
    let aimoves = [], humanmoves = [];
    // console.log(symbol);
    for(let v=0;v<board_size;v++)
    {
        for(let c=0; c<board_size; c++)
        {
            // console.log(symbol[v][c]);
            if(symbol[v][c]=='o')
                aimoves.push(Array(v, c));
            else if(symbol[v][c]=='x')
                humanmoves.push(Array(v, c));
        }
    }
    // console.log(aimoves, humanmoves);
    if(symbol[1][1]=='a')
        return [1, 1];

    if(humanmoves.length==1)
    {
        if((humanmoves[0][0]==0 || humanmoves[0][0]==2)&&(humanmoves[0][1]==0 || humanmoves[0][1]==2))
        {
            // console.log(humanmoves);
            if(humanmoves[0][0]==humanmoves[0][1])
            {
                if(humanmoves[0][0]==0)
                    return [2,2];
                else
                    return [0,0];
            }
            else
            {
                return [humanmoves[0][1], humanmoves[0][0]]
            }
        }
    }
    let move = [];
    move = pick_move(aimoves);
    if(move != undefined)
        return move;
    move = pick_move(humanmoves);
    if(move != undefined)
        return move;
    if(move == undefined)
    {
        if(symbol[0][0]=='a')
            return [0,0];
        else if(symbol[0][2]=='a')
            return [0,2];
        else if(symbol[2][2]=='a')
            return [2, 2];
        for(let v=0;v<board_size;v++)
        {
            for(let c=0; c<board_size; c++)
            {
                if(symbol[v][c]=='a')
                    return [v, c];
            }
    } 
    }
}

function ai_play()
{
    let play = static_ai();
    let move;
    console.log(play);
    switch (`${play[0]}${play[1]}`) {
        case '00': move = 1; break;
        case '01': move = 2; break;
        case '02': move = 3; break;
        case '10': move = 4; break;
        case '11': move = 5; break;
        case '12': move = 6; break;
        case '20': move = 7; break;
        case '21': move = 8; break;
        case '22': move = 9; break;
    }
    document.querySelector("#i"+move).querySelector(".o").style.display="block";
    document.querySelector("#i"+move).removeEventListener("click", event_flow);
    symbol[play[0]][play[1]]='o'
    // console.log("i reach end");
}

// document.querySelector("#i5 .o").style.display="block";

function pick_move(arr)
{
    let sort1 = [], sort2 = [], sort3 = [];
    arr.forEach(function(element){
        if(element[0]==0)
            sort1.push(element);
        else if(element[0]==1)
            sort2.push(element);
        else if(element[0]==2)
            sort3.push(element);
    })
    if(sort1.length==2)
        switch(sort1[0][1]+sort1[1][1])
        {
            case 1:{if(symbol[0][2]=='a') return [0,2];}
            case 2:{if(symbol[0][1]=='a') return [0,1];}
            case 3:{if(symbol[0][0]=='a') return [0,0];}
            default:{break}
        }
    if(sort2.length==2)
        switch(sort2[0][1]+sort2[1][1])
        {
            case 1:{if(symbol[1][2]=='a') return [1,2];}
            case 2:{if(symbol[1][1]=='a') return [1,1];}
            case 3:{if(symbol[1][0]=='a') return [1,0];}
            default:{break}
        }
    if(sort3.length==2)
        switch(sort3[0][1]+sort3[1][1])
        {
            case 1:{if(symbol[2][2]=='a') return [2,2];}
            case 2:{if(symbol[2][1]=='a') return [2,1];}
            case 3:{if(symbol[2][0]=='a') return [2,0];}
            default:{break}
        }
    sort1 = [], sort2 = [], sort3 = [];
    arr.forEach(function(element){
        if(element[1]==0)
            sort1.push(element);
        else if(element[1]==1)
            sort2.push(element);
        else if(element[1]==2)
            sort3.push(element);
    })
    if(sort1.length==2)
        switch(sort1[0][0]+sort1[1][0])
        {
            case 1:{if(symbol[2][0]=='a') return [2,0];}
            case 2:{if(symbol[1][0]=='a') return [1,0];}
            case 3:{if(symbol[0][0]=='a') return [0,0];}
            default:{break}
        }
    if(sort2.length==2)
        switch(sort2[0][0]+sort2[1][0])
        {
            case 1:{if(symbol[2][1]=='a') return [2,1];}
            case 2:{if(symbol[1][1]=='a') return [1,1];}
            case 3:{if(symbol[0][1]=='a') return [0,1];}
            default:{break}
        }
    if(sort3.length==2)
        switch(sort3[0][0]+sort3[1][0])
        {
            case 1:{if(symbol[2][2]=='a') return [2,2];}
            case 2:{if(symbol[1][2]=='a') return [1,2];}
            case 3:{if(symbol[0][2]=='a') return [0,2];}
            default:{break}
        }
    sort1 = [], sort2 = [], sort3 = [];
    arr.forEach(function(element){
        if(element[1]+element[0]==2)
            sort1.push(element);
        else if(element[1]-element[0]==0)
            sort2.push(element);
    })
    if(sort1.length==2)
        switch(sort1[0][0]+sort1[1][0])
        {
            case 1:{if(symbol[2][0]=='a') return [2,0];}
            case 2:{if(symbol[1][1]=='a') return [1,1];}
            case 3:{if(symbol[0][2]=='a') return [0,2];}
            default:{break}
        }
    if(sort2.length==2)
        switch(sort2[0][0]+sort2[1][0])
        {
            case 1:{if(symbol[2][2]=='a') return [2,2];}
            case 2:{if(symbol[1][1]=='a') return [1,1];}
            case 3:{if(symbol[0][0]=='a') return [0,0];}
            default:{break}
        }
        return undefined;
}

function pause_btn()
{
    document.querySelector("#jsdiv").innerHTML="Game Paused"; 
    document.querySelector("#comment").innerHTML="Go back to Game";
    document.querySelector("#resume").style.display="block";
    document.querySelector("dialog").showModal();
}

function resume_btn()
{
    document.querySelector('dialog').close(); 
    document.querySelector('#resume').style.display="none";
}