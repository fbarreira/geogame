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
        document.write('<meta http-equiv="refresh" content="1; url=/game_test1/level'+lastLevel+'.html" />');
        //document.write('<meta http-equiv="refresh" content="1; url=/geogame/level'+lastLevel+'.html" />');
    } else {
        // Sorry! No Web Storage support..
        var levelList = createarray(maxLevel, 0);
        var primitiveList = createarray(maxLevel, false);
        localStorage.setItem("moveList", JSON.stringify(levelList));
        localStorage.setItem("primitiveList", JSON.stringify(primitiveList));
        console.log("going to tutorial...");
        localStorage.setItem('lastLevel','0');
        localStorage.setItem('lastChallenge','0');                    
        document.write('<meta http-equiv="refresh" content="1; url=/game_test1/tutorial.html" />'); 
        //document.write('<meta http-equiv="refresh" content="1; url=/geogame/tutorial.html" />'); 
    }
}

function createarray(size,value){
    var templist = new Array();
    
    for(i=0;i<size;i++){
        templist.push(value);
    }
    
    return templist;
}


