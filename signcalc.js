


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

    //Work out which orientation gives best nest (smallest offcut)

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

let sheetQuickOptions;

function SheetQuickOptions(width,length) {
    this.width = width;
    this.length = length;  
}

let SheetQuickSelect = {
    setDimentions: function () {
        getSelectedSize=document.getElementById("sheetSelect").value;

        switch (getSelectedSize) {
            case "3000x2000":
                    dimentions = new SheetQuickOptions(3000,2000);
                    break;
            case ("3000x1500"):
                    dimentions = new SheetQuickOptions(3000,1500);
                    break;
            case ("2440x1220"):
                    dimentions = new SheetQuickOptions(2440,1220);
                    break;
            case ("2000x1000"):
                    dimentions = new SheetQuickOptions(2000,1000);
                    break;
            default:
                    dimentions = new SheetQuickOptions("","");
                    break;
        }

        console.log(dimentions.width, dimentions.length);

        document.getElementById("swidth").value = dimentions.width;
        document.getElementById("sheight").value = dimentions.length;
        
    }

}

//End Sheet quick select


//Start Section quick select

let sectQuickSelect = function () {
    getSectionLength = document.getElementById("sectionSelect").value;
    switch (getSectionLength){
        case ("6000"):
            document.getElementById("secLength").value = "6000";
            break;
        case ("5000"):
            document.getElementById("secLength").value = "5000";
            break;
        case ("3000"):
            document.getElementById("secLength").value = "3000";
            break;
        case ("2000"):
            document.getElementById("secLength").value = "2000";
            break;
        case ("1000"):
            document.getElementById("secLength").value = "1000";
            break;
        default:
            document.getElementById("secLength").value = "";
            break;

    }
}

//End Section quick select

//Start Vinyl Calculations

let vinylCalc = function () {
    console.log("Start Vinyl Calculations");

    let rollWidth = document.getElementById("vinRollWidth").value ;
    let rollLength = 1000;
    let vpieceWidth = document.getElementById("vinPieceWidth").value ;
    let vpieceLength = document.getElementById("vinPieceLength").value ; 

    console.log("rollw=", rollWidth, " pieceW=", vpieceWidth, " pieceL=", vpieceLength );

    //test if piece comes out of 1lm

    let rwidthvwidth = rollWidth/vpieceWidth;
    let rwidthvlength = rollWidth/vpieceLength;
    console.log("rwidthvwidth=", rwidthvwidth, " rwidthvlength=", rwidthvlength);

    if (rwidthvwidth <1 && rwidthvlength>=1) {
        let calcW = vpieceWidth/1000;
        let calcL = (rollWidth/vpieceLength);
        console.log("Path 1");

        let vinylPortion = calcL/Math.floor(calcW);
        console.log("VinylPortion=",vinylPortion);
        document.getElementById("vinylResult").textContent = vinylPortion;


    }
    else if (rwidthvlength <1 && rwidthvwidth>=1) {
        let calcW = vpieceLength/1000;
        let calcL = (rollWidth/vpieceWidth);
        console.log("Path 2");

       
        let vinylPortion = calcL/Math.floor(calcW);
        console.log("VinylPortion=",vinylPortion);
        document.getElementById("vinylResult").textContent = vinylPortion;
    }    
    else if (rwidthvlength <1 && rwidthvwidth<1) {
       
        console.log("Path 3");
        let vinylPortion = "Your piece wont fit onto the roll ";
        console.log("VinylPortion=",vinylPortion);
        document.getElementById("vinylResult").textContent = vinylPortion;

    }
    else {
        console.log("Path 4");        
        let vOffcutL = Math.trunc(rwidthvlength);
        let vOffcutW = Math.trunc(rwidthvwidth);
        console.log("vOffCutW=",vOffcutW," vOffCutL=",vOffcutL);

        if (vOffcutL > vOffcutW)
        {
            let calcW = (rollWidth/vpieceWidth);
            let calcL = 1/(1000/vpieceLength);

            let vinylPortion = calcL/Math.floor(calcW);
            console.log("VinylPortion=",vinylPortion);
            document.getElementById("vinylResult").textContent = vinylPortion;
        }       
        else {
            let calcW = (rollWidth/vpieceLength);
            let calcL = 1/(1000/vpieceWidth);
            
            let vinylPortion = calcL/Math.floor(calcW);
            console.log("VinylPortion=",vinylPortion);
            document.getElementById("vinylResult").textContent = vinylPortion;
        }            

    }      

}

// Start router cut text calculations

let routerTextCalc = function() {
        let getRoutText = document.getElementById("routText").value;
        let getRoutHeight = document.getElementById("routHeight").value;
        let getRoutThickness = document.getElementById("routThickness").value;
        let getRoutFlange = document.querySelector('#routFlange').checked

        console.log("Router input=", getRoutText,getRoutHeight,getRoutThickness,getRoutFlange);

    

        // use / /g to remove all spaces from the string
        let textNoSpaces = getRoutText.replace(/ /g, "");
        // get the length of the string after removal
        let letterCount = textNoSpaces.length;
        console.log("Letter Count=",letterCount);

        let passCount = Math.ceil(getRoutThickness /5);

        if (getRoutFlange==true) {
            passCount=passCount+1;
        } 
        console.log("Pass Count=",passCount);

        let loadTime = 15; //in mins
        let cutSpeed = 10; //in mm per second
        let passLength = (getRoutHeight*7)*letterCount;
        let passTime = ((passLength)/cutSpeed)/60; //now converted to mins
        let totalTime = (passTime * passCount)+loadTime;

        totalTime = Math.round(totalTime);

        document.getElementById("routLettersAnswer").innerHTML = "Cut Time =" + Math.round(passTime * passCount) + "<br>Load Time =" + loadTime + "<br>Total Time = "+ totalTime;


}

// end router cut text calculations

//Metalshop Calculations  start 

let metalShopCalc = function() {
        let getWeldCount = document.getElementById("metalShopWelds").value;
        let getFoldCount = document.getElementById("metalShopFolds").value;
        const foldTime = 5;
        const weldTime = 10;

        let totalWeldTime = weldTime * getWeldCount;
        let totalFoldTime = foldTime * getFoldCount;

        document.getElementById("metalShopResults").innerHTML = "Total Weld Time =" + totalWeldTime + "<br>Total Fold Time="+ totalFoldTime + "<br>Total Overall Time=" + (totalFoldTime+totalWeldTime);
}
//Metalshop Calculations End 

//Scaling calculations start 

let scalingCalc = function() {

    let getKownSize = document.querySelector("#knownSize").value;
    let getPageMeasureSize = document.querySelector("#pageMeasureSize").value;
    let getItemToScaleSize = document.querySelector("#itemToScaleSize").value;

    let scale = getKownSize/getPageMeasureSize;
    let scaledSize = scale * getItemToScaleSize;
    
    document.getElementById("scaleResult").innerHTML = "Scale = 1/" + scale + "<br> Scaled Measure = " +scaledSize;

}

//Scaling calculations end


//open slide menu

let menuHoverMaterials = false;
let menuHoverLabour = false;
let menuHoverGeneral = false;
let menuOpenStatus = false;

let SlideMenu = {

    setMenuHoverMaterials: function() {                    
            menuHoverMaterials = true;
            menuHoverLabour = false;
            menuHoverGeneral = false;
            this.slideMenuOpen();
           
    },  
    setMenuHoverLabour: function() {
            menuHoverLabour = true;
            menuHoverMaterials = false;
            menuHoverGeneral = false; 
            this.slideMenuOpen();                   
            
    },    

    setMenuHoverGeneral: function() {
        menuHoverGeneral = true;
        menuHoverLabour = false; 
        menuHoverMaterials = false; 
        this.slideMenuOpen();                   
        
},    

    slideMenuOpen: function() {    


                    if (menuOpenStatus == false) {
                                                
                        getSlideMenu = document.querySelector(".slidingNav");
                        getSlideMenu.style.visibility = "visible";      
                        getSlideMenu.style.width = "300px";                      
                        menuOpenStatus = true;
                       
                    }

                    if (menuHoverMaterials == true){
                        document.getElementById("slidingNavUL").innerHTML = "<li><span>Select Option</span></li><li><a href='#' onclick='sheetLoad()'>Sheet Yield</a></li><li><a href='#' onclick='sectionLoad()'>Section Yield</a></li><li><a href='#' onclick='vinylLoad()'>Vinyl/Roll Materials</a></li>";
                    }

                    if (menuHoverLabour == true){
                        document.getElementById("slidingNavUL").innerHTML = "<li><span>Select Option</span></li><li><a href='#' onclick='routerLoad()'>Router Cutting</a></li><li><a href='#' onclick='metalshopLoad()'>Metal Shop</a></li>";
                    }

                    if (menuHoverGeneral == true){
                        document.getElementById("slidingNavUL").innerHTML = "<li><span>Select Option</span></li><li><a href='#' onclick=''>Margin & Markup</a></li><li><a href='#' onclick='scalingLoad()'>Scale</a></li>";
                    }
         },

    slideMenuClose: function() {        
            if (menuOpenStatus == true) {

                getSlideMenuLink = document.querySelectorAll(".slidingNav ul li a");
                console.log(getSlideMenuLink);
                arrayLength = getSlideMenuLink.length;
                for (let i=0; i < arrayLength; i++){
                     getSlideMenuLink[i].style.visibility = "hidden";  
                }

                getSlideMenuSpan = document.querySelector(".slidingNav ul li span");
                getSlideMenu = document.querySelector(".slidingNav");                
                getSlideMenuSpan.style.visibility = "hidden";
                getSlideMenu.style.visibility = "hidden"; 
                getSlideMenu.style.width = "0px";
               

        
                menuOpenStatus = false;
                menuHoverMaterials = false;
                menuHoverLabour = false;
                menuHoverGeneral = false;
            }
        }

}

