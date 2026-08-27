var turn = 0;
var symbol = []; //access is like symbol[horizontal rows][vertical colum]
var i = 0; //for loops or temp variable
var count = 0; // to detect draw
var board_size = 3;
let arr = []; //to make rows 

//---varibles declared---//

var boxes = document.querySelectorAll("td");

//---connected to board---//

for(let len=0; len<board_size ; len++){arr.push("a");}
for(i=0; i<board_size ; i++){symbol.push(Array(...arr));}
//console.log(symbol);

//---created a similar array to board---//

function event_flow(event)
{
    alot(event);
    // setTimeout(static_win_check, 500);
}

//---kinda like main function---//

boxes.forEach(function(box){
    box.addEventListener("click", event_flow)
});

//---alloted every div a listner---//

//functions
function static_win_check()
{
    count++;
    //---horizontal check---//
    for(i=0;i<3;i++)
    {
        for(let j = 0 ; j<3 ; j++)
        {
            if(symbol[i-1]!='a' && symbol[i]!='a' && symbol[i+1]!='a')
            if(symbol[i-1]==symbol[i] && symbol[i]==symbol[i+1])
            {
                alert("you win");
                return;
            }
        }

    }
    //vertical check
    for(i=3; i<7 ; i++)
    {
        if(symbol[i-3]!='a' && symbol[i]!='a' && symbol[i+3]!='a')
        if(symbol[i-3]==symbol[i] && symbol[i]==symbol[i+3])
        {
            alert("you win");
            return;
        }
    }
    //diagonal check
    {
        i=4;
        if(symbol[i-4]!='a' && symbol[i]!='a' && symbol[i+4]!='a')
        if(symbol[i-4]==symbol[i] && symbol[i]==symbol[i+4])
        {
            alert("you win");
            return;
        }
        if(symbol[i-2]!='a' && symbol[i]!='a' && symbol[i+2]!='a')
        if(symbol[i-2]==symbol[i] && symbol[i]==symbol[i+2])
        {
            alert("you win");    
            return;
        }
    }
    if(count==9)
        alert("its a draw")
}

function alot(box)
{
    box = box.currentTarget;
    // console.log(box.dataset.row);
    // console.log(box.dataset.colum);
    // console.log(box);
    let row = box.dataset.row;
    let colum = box.dataset.colum;
        if(turn==0)
        {
            box.querySelector(".o").style.display="block";
            turn++;
            symbol[row] [colum]='o';
        }
        else if(turn==1)
        {
            box.querySelector(".x").style.display="block";
            turn--;        
            symbol[row][colum]='x';     
        }
        console.log(symbol);
        box.removeEventListener("click", event_flow);
}