/* 
 * Author      : FITROX
 * Description : system to redirect pages
 * Edited by   : Fitrox for GeoGame.com
 */

maxLevel = 20;
maxChallenge = 16;

console.log("lastLevel(local): " + localStorage.lastLevel);
var lastLevel = localStorage.getItem('lastLevel');
loadLastLevel();

function loadLastLevel() {    
    console.log("lastlevel: " + lastLevel);
    if (typeof(localStorage.lastLevel) !== "undefined" && lastLevel != '0') {
        // Code for localStorage/sessionStorage.
        console.log("going to level...");
        //document.write('<meta http-equiv="refresh" content="1; url=/game_test1/level'+lastLevel+'.html" />');
        document.write('<meta http-equiv="refresh" content="1; url=/geogame/level'+lastLevel+'.html" />');
    } else {
        // Sorry! No Web Storage support..      
        var boolList = createarray(maxLevel, false);
        var intList = createarray(maxLevel,0);
        var toolList = createarray(10,false);
        
        localStorage.setItem("moveList",        JSON.stringify(intList));
        localStorage.setItem("primitiveList",   JSON.stringify(boolList));
        localStorage.setItem("statusList",      JSON.stringify(intList));
        localStorage.setItem("tipList",         JSON.stringify(boolList));
        localStorage.setItem("goldList",        JSON.stringify(boolList));
        localStorage.setItem("toolList",        JSON.stringify(toolList));
        localStorage.setItem('lastLevel','0');
        localStorage.setItem('lastChallenge','0');   
        console.log("going to tutorial...");
        //document.write('<meta http-equiv="refresh" content="1; url=/game_test1/tutorial.html" />'); 
        document.write('<meta http-equiv="refresh" content="1; url=/geogame/tutorial.html" />'); 
    }
}

function createarray(size,value){
    var templist = new Array();
    
    for(i=0;i<size;i++){
        templist.push(value);
    }
    
    return templist;
}


