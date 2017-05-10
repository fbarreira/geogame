/* 
 * Author      : FITROX
 * Description : level navigation
 * Edited by   : Fitrox for GeoGame.com
 */

maxLevel = 20;
maxChallenge = 16;

function showLevelInfo(level,stage,obj,min_moves,moves,primitives,img){
    document.getElementById('level_title').innerHTML = level.toString();   
    document.getElementById('stage_title').innerHTML = stage; 
    document.getElementById('obj').innerHTML = obj;  
    document.getElementById('min_moves').innerHTML = min_moves.toString();   
    document.getElementById('moves').innerHTML = moves.toString();
    document.getElementById('primitives').innerHTML = primitives.toString();    
    document.getElementById('level_image').innerHTML = img;     
}

function returnLevelInfo(level,moves,primitives){
    level = parseInt(level);
    var s = "<b>Nível</b>: ";
    primitives = (primitives) ? 'Sim' : 'Não'; 
    switch(level){
        case 0:
            // tutorial 
            obj = "Conhecer as ferramentas básicas do Geogebra para construções geométricas";
            img = '<img src="img/tutorial2.png" alt="triangle">';
            showLevelInfo("Tutorial",s + 1,obj,5,moves,primitives,img);
            break;
        case 1:
            // level 1
            obj = "Construir um triângulo equilátero.";
            img = '<img src="img/level1b.png" alt="triangle">';
            showLevelInfo(1,s + 1,obj,4,moves,primitives,img);
            break;
        case 2:
            // level 2
            obj = "Construir ponto reta mediatriz e ponto médio de segmento.";
            img = '<img src="img/level2.png" alt="triangle2">';
            showLevelInfo(1,s + 2,obj,3,moves,primitives,img);          
            break;
        case 3:
            obj = "Dados segmento e um ponto fora, traçar a reta perpendicular ao segmento que passa pelo ponto dada.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s + 3,obj,3,moves,primitives,img);    
            break; 
        case 4:
            obj = "Dados reta e um ponto fora, traçar a reta perpendicular à reta dada que passa pelo ponto.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s + 4,obj,4,moves,primitives,img);    
            break;    
        case 5:
            obj = "Dados reta e um ponto dela, traçar a reta perpendicular à reta dada que passa pelo ponto.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s + 5,obj,4,moves,primitives,img);   
            break; 
        case 5:
            obj = "Dados reta e um ponto dela, traçar a reta perpendicular à reta dada que passa pelo ponto.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s + 5,obj,4,moves,primitives,img);   
            break;   
        case 6:
            obj = "Construir a reta paralela que passa por um ponto fora de uma reta dada.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s + 6,obj,4,moves,primitives,img);     
            break;    
        case 7:
            obj = "Construir a bissetriz de um ângulo dado.";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(1,s + 7,obj,4,moves,primitives,img);    
            break;          
        default:
            obj = "Construir...";
            img = '<img src="img/level2.png" alt="triangle2">'; 
            showLevelInfo(0,s + 0,obj,0,moves,primitives,img);     
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