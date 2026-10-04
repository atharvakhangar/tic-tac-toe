var gamemode;
var vol_status = "vol";
var audio = document.querySelector("#music");

function volume_btn()
{
    if(vol_status=="vol")
    {
        document.querySelector(".vol").style.display="block";
        document.querySelector(".mute").style.display="none";
        vol_status="mute";
        audio.play();
    }
    else
    {
        document.querySelector(".mute").style.display="block";
        document.querySelector(".vol").style.display="none";
        vol_status="vol";
        audio.pause();
    }
}

function credits(val)
{
    let pop = document.querySelector("#"+val);
    pop.showModal();
}

function drop(val)
{
    let pop = document.querySelector("#"+val);
    pop.close();
}

function start(players)
{
    switch(players){
        case 1:
            gamemode = "ai";
            break;
        case 2:
            gamemode = "human";
            break;
    }
    location.assign(`main.html?vs=${gamemode}&vol=${vol_status}`);
}

document.querySelector("#play").showModal();
