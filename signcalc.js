
function calcSheet() {

//Start Sheet Calculations

    console.log('Run Sheet Calculations');
    let sheetWidth = 0;
    let sheetHeight = 0;
    let pieceWidth = 0;
    let pieceHeight = 0;
    
    sheetWidth = document.getElementById("swidth").value;
    sheetHeight = document.getElementById("sheight").value;
    pieceWidth = document.getElementById("pwidth").value;
    pieceHeight = document.getElementById("pheight").value;

    console.log("sWidth=",sheetWidth, " sHeight=", sheetHeight," pWidth=", pieceWidth," pHeight=", pieceHeight);

    //Work out with orientation gives best nest (smallest offcut)

    const sratio = [];
    if (sheetWidth > 0 && sheetHeight > 0 && pieceWidth > 0 && pieceHeight > 0) {
      
        if ((sheetWidth/pieceWidth) > 1){
            sratio[0] = (sheetWidth/pieceWidth) - Math.trunc(sheetWidth/pieceWidth);
            console.log("Offcut ratio=", sratio[0], "Path= 0 (sW/pW)");
        }

        if ((sheetHeight/pieceHeight) > 1){
            sratio[1] = (sheetHeight/pieceHeight) - Math.trunc(sheetHeight/pieceHeight);
            console.log("Offcut ratio=",sratio[1], "Path= 1 (sH/pH)");
        }

        if ((sheetWidth/pieceHeight) > 1){
            sratio[2] = (sheetWidth/pieceHeight) - Math.trunc(sheetWidth/pieceHeight);
            console.log("Offcut ratio=", sratio[2], "Path= 2 (sW/pH)");
        }

        if ((sheetHeight/pieceWidth) > 1){
            sratio[3] = (sheetHeight/pieceWidth) - Math.trunc(sheetHeight/pieceWidth);
            console.log("Offuct ratio=", sratio[3], "Path= 3 (sH/pW)");
        }

        
    }

    let minArray = Math.min(...sratio);
    console.log("smallest offcut ratio=", minArray);
    let minArrayIndex = sratio.indexOf(Math.min(...sratio));
    console.log("index of smallest offcut=",minArrayIndex);

    //Work out portion of sheet based on best nest

        let yieldX = 0;
        let yieldY = 0;

     
        if (minArrayIndex == 0) {
            yieldX = sheetWidth/pieceWidth;
            yieldY = sheetHeight/pieceHeight;
            console.log("yieldX=",yieldX);
            console.log("yieldY=",yieldY);
        }

        if (minArrayIndex == 1) {
            yieldX = sheetHeight/pieceHeight;
            yieldY = sheetWidth/pieceWidth;
            console.log("yieldX=",yieldX);
            console.log("yieldY=",yieldY);
        }

        if (minArrayIndex == 2) {
            yieldX = sheetWidth/pieceHeight;
            yieldY = sheetHeight/pieceWidth;
            console.log("yieldX=",yieldX);
            console.log("yieldY=",yieldY);
        }

        if (minArrayIndex == 3) {
            yieldX = sheetHeight/pieceWidth;
            yieldY = sheetWidth/pieceHeight;
            console.log("yieldX=",yieldX);
            console.log("yieldY=",yieldY);
        }

        let portion = (1/(yieldX * yieldY)).toFixed(2);
        let yield = Math.floor(yieldX * yieldY);
        console.log("portion of sheet=",portion)
        
        document.getElementById("sheetPortion").textContent="Portion of Sheet = "+ portion;
        document.getElementById("sheetYield").textContent="Yield per sheet = "+ yield;
        
//End Sheet Calculations

}


function calcSectAdd(){
//Start add items to section list
        
    console.log("Start Add item to section list");
    let pieceLengthAdd = 0;
    pieceLengthAdd = document.getElementById("secPieceLength").value;
    console.log("Piece Length Added = " + pieceLengthAdd);

   var option = document.createElement("option");
   option.text = pieceLengthAdd;
   document.getElementById("secListBox").add(option);   

//End add items to section list
}


function calcSection(){
//Start Section Calculations

    console.log("Start Section Calculations")
    let sectLength = 0;
    let pieceLength = 0;

    sectLength = document.getElementById("secLength").value;
    pieceLength = document.getElementById("secPieceLength").value;   

    console.log("section length= ",sectLength);
    console.log("piece length= ",pieceLength);

    selectList = document.getElementById("secListBox");
    console.log("Select List = " + selectList);
    console.log("List Length = " + selectList.options.length);
    
    let linecount = 0;
    let totalMM = 0;
    let totalPortion = 0;
    let totalLengthAdj = 0;
    let lengthUsed = 0;
    let currentCut = 0;
    
    for (var i=0; i < selectList.options.length; i++){

        currentCut = parseFloat(selectList.options[i].value);
        console.log("Current Cut = " + currentCut);

            if ((lengthUsed + currentCut) > sectLength){
                totalPortion = totalPortion + 1/(sectLength/((sectLength - lengthUsed)+currentCut));
                lengthUsed = 0;
                console.log("Path 1")
                console.log("totalPortion so far = " + totalPortion)
            }
            else if ((lengthUsed + currentCut) == sectLength) {
                lengthUsed = 0;
                totalPortion = totalPortion + 1/(sectLength/currentCut);  
                console.log("Path 2")    
                console.log("totalPortion so far = " + totalPortion)          

            }
            else if ((lengthUsed + currentCut) < sectLength) {
                lengthUsed = lengthUsed + currentCut;
                totalPortion = totalPortion + 1/(sectLength/currentCut);
                console.log("Path 3")
                console.log("totalPortion so far = " + totalPortion)
            }
            else {
                alert("oooops something went wrong");
            }

        
        linecount = linecount+1;
        totalMM = totalMM + parseFloat(selectList.options[i].value);
        
        
    }
    
    document.getElementById("sectionResult").textContent = "Total Portion = " + totalPortion;
    totalPortion = totalPortion.toFixed(2);
    console.log("linecount=",linecount);
    console.log("Total Length=",totalMM);
    console.log("Total Portion Final = ",totalPortion);
  
//End Section Calculations
}

function calcSectRemove() {

//Start Remove section select items

    selectList = document.getElementById("secListBox");

  
    for (var i=0; i < selectList.options.length; i++){
        if (selectList.options[i].selected) {
            selectList.remove(selectList.i);
        }
    }

//End Remove section select items
}

function calcSectClear() {

//Start Clear section list

    selectList = document.getElementById("secListBox");

    while (selectList.options.length > 0) {
        selectList.remove(0);
    }   
  
//End Clear Section List
}


//Start Sheet quick select
function sheetSelect3x2() {
    document.getElementById("swidth").value = "3000";
    document.getElementById("sheight").value = "2000";
}

function sheetSelect3x15() {
    document.getElementById("swidth").value = "3000";
    document.getElementById("sheight").value = "1500";
}

function sheetSelect24x12() {
    document.getElementById("swidth").value = "2440";
    document.getElementById("sheight").value = "1220";
}

function sheetSelect2x1() {
    document.getElementById("swidth").value = "2000";
    document.getElementById("sheight").value = "1000";
}
//End Sheet quick select


//Start Section quick select

let sec6000 = function () {
    document.getElementById("secLength").value = "6000";

}

let sec5000 = function () {
    document.getElementById("secLength").value = "5000";

}

let sec3000 = function () {
    document.getElementById("secLength").value = "3000";

}

let sec1000 = function () {
    document.getElementById("secLength").value = "1000";

}

//End Section quick select