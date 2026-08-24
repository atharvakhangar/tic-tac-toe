var sign = 0;
var arr = [];

var boxes = document.querySelectorAll("td");
for(var len=0;len<boxes.length; len++) {arr.push(1);}

boxes.forEach(function(box){

        box.addEventListener("click", function(event){
            if(arr[(box.id)-1]==1)
            {
                if(sign==0)
                {
                    event.target.querySelector(".o").style.display="block";
                    sign++;
                }
                else if(sign==1)
                {
                    event.target.querySelector(".x").style.display="block";
                    sign--;                    
                }
                arr[(box.id)-1]=0;
                // console.log(arr);
            }
            else;
        })
});