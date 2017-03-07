/* 
 * Author      : FITROX
 * Description : based on testobjects.js by Kasper Peulen @ euclidthegame.com under MIT License
 * Edited by   : Fitrox for GeoGame.com
 */

var level = 1;
var mincount = 6;
var step = 0;  
var objType = "";
var target = false;
var circleL = "null";
var circleR = "null";
var pointTop = "null";
var pointBottom = "null";
var pointLeft = "null";
var pointRight = "null";
var rayLeft = "null";
var rayRight = "null";
var segmentBase = "null";
var segmentRT = "null";
var segmentLT = "null";   
var segmentRB = "null";
var segmentLB = "null";   
var index = 0;
var listSize = 4;

//Shows question for validation
function showValidation(){
    var strValidation = "<p><ol>"
    strValidation += "<li>Ambos " + createObjList(1) + " e " + createObjList(2) + " possuem o mesmo raio (segmento AB).</li>";
    strValidation += "<li>Como " + intPoint + " pertence à intersecção entre os círculos, então " + createObjList(3) + " e " + createObjList(4) + " são congruentes.</li>";
    strValidation += "<li>Logo, o triângulo AB"+intPoint+" é equilátero (possui os lados iguais).</li>";
    strValidation += "</ol></p>";
    //console.log("\\"+strValidation);
    document.getElementById('validation_questions').innerHTML = strValidation;   
}

//this function checks the steps of the level
function checkStep(){
    if (drawn("segmentBase") && step < 1) {  
        Command('progresso = 33');
        //intPoint = showIntersection();
        step = 1;
    }
    if ((drawn("segmentLT") || drawn("segmentLB") || drawn("segmentRB") ||  drawn("segmentRT")) && step < 2){
        Command('progresso = 66');
        step = 2;
    }      
    if(((drawn("segmentRT") && drawn("segmentRB")) || (drawn("segmentLT") && drawn("segmentLB"))) && step < 3){
        step = 3;
        $.ajax({
            url:LevelCompleted(),
            success:function(){
                ggbApplet.showToolBar(false);
                //ggbApplet.setCustomToolBar("0");
                ggbApplet.setMode(0);         
                //ggbApplet.enableUndoRedo(false);        
            }
        });         
        showValidation();
    }
}

function newObjectListener(obj){
    if (ggbApplet.getObjectType(obj) === "boolean" || ggbApplet.getObjectType(obj) === "text" || ggbApplet.getObjectType(obj) === "numeric" || obj == "W") {
        return;
    }
    else{
        //console.log(obj);
        //addListener2(obj);
        //objType = checkType(obj);
        objType = ggbApplet.getObjectType(obj);
        console.log("--------------------------");
        console.log("obj Type: " + objType);
        objectCheckout(obj);
        ggbApplet.setVisible("welldone",false);	
        if(objType == "triangle"){
            //target = ggbApplet.getObjectName(obj);
            //target = obj;
            //console.log("target: " + target);
//            checkobject(obj,"triangletop",-0.4,-0.3);
//            checkobject(obj,"trianglebotton",-0.4,-0.3);            
            target = true;
        }                 
        else{
            target = false;
        }
        printConstructionState(); 
        switch(objType){
            case "point":
                pointTop = checktarget(obj,"point","pointtop",pointTop,-0.4,0.3);
                pointBotton = checktarget(obj,"point","pointbottom",pointBotton,-0.4,-0.3);
                pointLeft = checktarget(obj,"point","pointleft",pointLeft,-0.4,0.3);
                pointRight = checktarget(obj,"point","pointright",pointRight,-0.4,0.3);
                checkIntersection();
                break;
            case "segment":    
                segmentBase = checktarget(obj,"segment","segmentBase",segmentBase,-1.1,0);                
                segmentLT = checktarget(obj,"segment","segmentLT",segmentLT,-1.1,0);
                segmentRT = checktarget(obj,"segment","segmentRT",segmentRT,0,0);
                segmentLB = checktarget(obj,"segment","segmentLB",segmentLB,-1.1,0);
                segmentRB = checktarget(obj,"segment","segmentRB",segmentRB,0,0);                
                break;
            case "circle":
                circleL = checktarget(obj,"circle","circleleft",circleL,0,0);
                circleR = checktarget(obj,"circle","circleright",circleR,0,0);                
                break;
            case "ray":  
                rayLeft = checktarget(obj,"ray","rayleft",rayLeft,-1.1,0);     
                rayRight = checktarget(obj,"ray","rayright",rayRight,-1.1,0);                 
                break;
        }                                                 
        checkStep();    
    } 
}

//this function checks each step for the hint
function checkExercise(){ 
    switch(step){
        case 0: //initial state - nothing build
            document.getElementById('feedback').innerHTML = "Incie com o círculo que será a base da construção.";
            break;
        case 0.5: //wrong point
            document.getElementById('feedback').innerHTML = "Este ponto não é dependente de A nem B.";
            break;                                                        
        case 1: //intersect point
            document.getElementById('feedback').innerHTML = "O que é possível de construir com 2 pontos?";
            break;
        case 1.5: //wrong segment
            document.getElementById('feedback').innerHTML = " null ";
            break; 
        case 1.7: //ray build
            document.getElementById('feedback').innerHTML = "Tente construir um segmento no lugar da semirreta.";
            break;                         
        case 2: //right segment build
            document.getElementById('feedback').innerHTML = "Existe outro segmento de medida igual a este?";
            break;
        case 3: //finished construction
            document.getElementById('feedback').innerHTML = "Parabéns, este é um triângulo equilátero.";
            break;
        case 4: //wrong triangle
            document.getElementById('feedback').innerHTML = "Este não é um triângulo de lados iguais.";
            break;                                                     
        default: 
            document.getElementById('feedback').innerHTML = " default ";
            break;
    }
}

//check if validation awnser is correct
function checkValidation(){
    var list = createSelectedList(listSize);
    //console.log("response: " + list);
    if(list == "null"){
        alert('Por favor selecionar um objeto de cada lista.');
    }
    else{
        var condition = ((list[0] == circleL && list[1] == circleR) || (list[1] == circleL && list[0] == circleR))
                        && ((list[2] == segmentLT && list[3] == segmentRT) || (list[3] ==  segmentLT && list[2] == segmentRT)
                        ||  (list[2] == segmentLB && list[3] == segmentRB) || (list[3] ==  segmentLB && list[2] == segmentRB));
        //var condition = (condition1 && (condition2 || condition3 ));
        //console.log("condition: " + condition);
        displayResult(condition,level,mincount);
    }
}

//reset variables for level
function resetLevel(){
    ggbApplet.showToolBar(true);
    step = 0;  
    objType = "";
    target = false;
    circleL = "null";
    circleR = "null";
    pointTop = "null";
    pointBottom = "null";  
    pointLeft = "null";
    pointRight = "null";    
    rayLeft = "null";
    rayRight = "null";
    segmentBase = "null";    
    segmentRT = "null";
    segmentLT = "null";   
    segmentRB = "null";
    segmentLB = "null";  
    document.getElementById('validation').innerHTML = "";    
}
  
//Updates text with right name for intersection point
function checkIntersection(){
    if (drawn("pointTop") && step >= 1){
        //IntPos = "top";
        if(intersectionPoint != pointTop){
            intersectionPoint = pointTop; 
            updateIntersection(intersectionPoint);        
        }
    }
    else if (drawn("pointBottom") && step >= 1){
        //IntPos = "bottom";    
        if(intersectionPoint != pointBottom){
            intersectionPoint = pointBottom; 
            updateIntersection(intersectionPoint);        
        }        
    }
}

function showIntersection(){
    intPoint = (pointTop === "null") ? pointBottom : pointTop;
    console.log("intersection: point "+intPoint);
//    console.log("Top: " + pointTop);
//    console.log("Bottom: " + pointBottom);
    //ggbApplet.setFixed(intPoint,true);
    return intPoint;        
}