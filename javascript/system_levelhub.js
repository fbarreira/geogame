/* 
 * Author      : FITROX
 * Description : level navigation
 * Edited by   : Fitrox for GeoGame.com
 */

maxLevel = 20;
maxChallenge = 16;

function showLevelInfo(level,stage,obj,min_moves,img,moves){
    document.getElementById('level_title').innerHTML = level.toString();   
    document.getElementById('stage_title').innerHTML = stage; 
    document.getElementById('obj').innerHTML = obj;  
    document.getElementById('min_moves').innerHTML = min_moves.toString();   
    document.getElementById('moves').innerHTML = moves.toString();
    document.getElementById('level_image').innerHTML = img;     
}

function returnLevelInfo(level,moves){
    level = parseInt(level);
    var s = "<b>Nível</b>: ";
    switch(level){
        case 0:
            // tutorial 
            obj = "Conhecer as ferramentas básicas do Geogebra para construções geométricas";
            img = '<img src="img/tutorial2.png" alt="triangle">';
            showLevelInfo("Tutorial",s + 1,obj,5,img,moves);
            break;
        case 1:
            // level 1
            obj = "Construir um triângulo equilátero.";
            img = '<img src="img/level1b.png" alt="triangle">';
            showLevelInfo(1,s + 1,obj,5,img,moves);
            break;
        case 2:
            // level 2
            obj = "Construir egoagekg gaegdgslgdgldfg. eadoff fae ef, gaska foa qweqqqazp. gtlhrpweq gsr few, osdo erw.";
            img = '<img src="img/level2.png" alt="triangle2">';
            showLevelInfo(1,s + 2,obj,6,img,moves);           
            break;
        case 3:
            obj = "Construir mais coisa ainda...";
            showLevelInfo(1,s + 3,obj,15,img,moves);     
            break;       
    }
}

function returnChallengeInfo(challenge,moves){
    challenge = parseInt(challenge);
    var s = "<b>Desafio</b>: ";    
    switch(challenge){
        case 1:
            //challenge 1
            obj = "Construir um triângulo inscrito na circunferência.";
            img = '<img src="img/level1b.png" alt="triangle">';
            showLevelInfo(1,s + 1,obj,6,img,moves);            
            break;
        case 2:
            //challenge 2
            break;
        case 3:
            //challenge 3
            break;        
    }
}