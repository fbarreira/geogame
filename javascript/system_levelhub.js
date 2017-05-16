/* 
 * Author      : FITROX
 * Description : level navigation
 * Edited by   : Fitrox for GeoGame.com
 */

maxLevel = 20;
maxChallenge = 16;
maxTools = 10;
gameprogress = 0;
levelprogress = 0;
medals = 0;
currentbutton = -1;
unlockedtools = 0;

function showStatus(min_moves,moves,primitives,tip){
    var levelstatus = 25;
    
    if(moves == min_moves){
        levelstatus += 20;
    }
    if(primitives){
        levelstatus += 20;
    }
    if(tip){
        levelstatus += 10;
    }
    
    return levelstatus,"%";
}

function returnProgress(lastlevel, lastchallenge, statuslist, goldlist, toollist){
    var sumprogress = 0;
    for(i=1; i<lastlevel+1; i++){
        sumprogress += statuslist[i];
    }
    levelprogress = sumprogress/lastlevel;

    for(i=1; i<lastlevel+1; i++){
        if(goldlist[i] == true){
            medals += 1;
        }
    }  
    
    var s = "";
    
    for(i=0; i<maxTools; i++){
        if(toollist[i] == true){
            var index = i+1;
            s += '<img src="img/tool'+index+'a.png" alt="text">';
        }
    }  
    
    var clearChallenges = (lastchallenge - 1 < 0) ? 0 : (lastchallenge - 1);
    
    showPlayerInfo(lastlevel-1,clearChallenges,s);
}

function showLevelInfo(level, type, stage, obj, min_moves, moves, primitives, tip, status, img){    
    document.getElementById('level_title').innerHTML = level.toString();   
    document.getElementById('level_type').innerHTML = type; 
    document.getElementById('level_number').innerHTML = stage; 
    document.getElementById('obj').innerHTML = obj;  
    document.getElementById('min_moves').innerHTML = min_moves.toString();   
    document.getElementById('moves').innerHTML = moves.toString();
    document.getElementById('primitives').innerHTML = primitives.toString();  
    document.getElementById('tip').innerHTML = tip; 
    document.getElementById('status').innerHTML = status.toString()+"%";  
    document.getElementById('level_image').innerHTML = img;     
}

function showPlayerInfo(lastlevel,lastchallenge,s){
    document.getElementById('level_clear').innerHTML = lastlevel+'/'+maxLevel;  
    document.getElementById('challenge_clear').innerHTML = lastchallenge+'/'+maxLevel;
    document.getElementById('medals').innerHTML = medals+'/'+maxLevel;  
    document.getElementById('tools').innerHTML = s;
    
    
}

function returnLevelInfo(level, moves, primitives, tip, status){
    level = parseInt(level);
    var s = "<b>Nível</b>: ";
    primitives = (primitives) ? 'Sim' : 'Não';
    tip = (tip) ? 'Sim' : 'Não'; 
    switch(level){
        case 0:
            // tutorial 
            obj = "Conhecer as ferramentas básicas do Geogebra para construções geométricas";
            img = '<img src="img/tutorial2.png" alt="triangle">';
            showLevelInfo("Tutorial",s,1,obj,5,moves,primitives,tip,status,img);
            break;
        case 1:
            // level 1
            obj = "Construir um triângulo equilátero.";
            img = '<img src="img/level1b.png" alt="triangle">';
            showLevelInfo(1,s,1,obj,4,moves,primitives,tip,status,img);
            break;
        case 2:
            // level 2
            obj = "Construir ponto reta mediatriz e ponto médio de segmento.";
            img = '<img src="img/level2c.png" alt="triangle2">';
            showLevelInfo(1,s,2,obj,3,moves,primitives,tip,status,img);          
            break;
        case 3:
            obj = "Dados segmento e um ponto fora, traçar a reta perpendicular ao segmento que passa pelo ponto dada.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s,3,obj,3,moves,primitives,tip,status,img);    
            break; 
        case 4:
            obj = "Dados reta e um ponto fora, traçar a reta perpendicular à reta dada que passa pelo ponto.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s,4,obj,4,moves,primitives,tip,status,img);    
            break;    
        case 5:
            obj = "Dados reta e um ponto dela, traçar a reta perpendicular à reta dada que passa pelo ponto.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s,5,obj,4,moves,primitives,tip,status,img);   
            break; 
        case 5:
            obj = "Dados reta e um ponto dela, traçar a reta perpendicular à reta dada que passa pelo ponto.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s,5,obj,4,moves,primitives,tip,status,img);   
            break;   
        case 6:
            obj = "Construir a reta paralela que passa por um ponto fora de uma reta dada.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s,6,obj,4,moves,primitives,tip,status,img);     
            break;    
        case 7:
            obj = "Construir a bissetriz de um ângulo dado.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s,7,obj,4,moves,primitives,tip,status,img);    
            break;          
        default:
            obj = "Construir...";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(0,s,0,obj,0,moves,primitives,tip,status,img);     
            break;          
    }
}

function returnChallengeInfo(challenge,moves,primitives,tip,status){
    challenge = parseInt(challenge);
    var s = "<b>Desafio</b>: ";    
    switch(challenge){
        case 1:
            //challenge 1
            obj = "Construir um triângulo inscrito na circunferência.";
            img = '<img src="img/level1b.png" alt="triangle">';
            showLevelInfo("Tutorial",s,1,obj,5,moves,primitives,tip,status,img);            
            break;
        case 2:
            //challenge 2
            break;
        case 3:
            //challenge 3
            break;        
    }
}

function returnGameProgress(statusList){
    var sumPartial = 0;
    var sumMedals = 100*medals/(maxLevel+maxChallenge);
    
    console.log("medals: "+sumMedals);
    
    for(i=1;i<maxLevel;i++){
        sumPartial += statusList[i];
        //console.log(sumPartial);
    }
    
    levelprogress = sumPartial/(maxLevel+maxChallenge);
    
    console.log("sumPartial: "+levelprogress);
        
    gameprogress = Math.round((levelprogress + 2*sumMedals)/3);
    console.log("progress: "+gameprogress);
}