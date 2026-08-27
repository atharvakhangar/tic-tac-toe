var gamemode;
var vol_status = "vol";

function volume_btn()
{
    if(vol_status=="vol")
    {
        document.querySelector(".mute").style.display="block";
        document.querySelector(".vol").style.display="none";
        vol_status="mute";
    }
    else
    {
        document.querySelector(".vol").style.display="block";
        document.querySelector(".mute").style.display="none";
        vol_status="vol";
    }
}


var pop = document.querySelector("#popup");
function credits()
{
    pop.showModal();
}

function drop()
{
    pop.close();
}

function start(players)
{
    switch(players){
        case 1:
            // location.assign("main.html");
            location.reload();
            gamemode = "ai";
            break;
        case 2:
            location.assign("main.html");
            gamemode = "human";
            break;
    }
    

}