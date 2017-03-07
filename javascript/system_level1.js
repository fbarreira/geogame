/* 
 * Author      : FITROX
 * Description : based on testobjects.js by Kasper Peulen @ euclidthegame.com under MIT License
 * Edited by   : Fitrox for GeoGame.com
 */

var level = 1;
var mincount = 4;
var step = 0;  
var objType = "";
var target = false;
var circleL = "null";
var circleR = "null";
var pointTop = "null";
var pointBottom = "null";
var intPoint = "null";
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
    if ((drawn("pointtop") || drawn("pointbottom")) && step < 1) {  
        Command('progresso = 33');
        intPoint = showIntersection();
        step = 1;
    }
    if ((drawn("segmentLT") || drawn("segmentLB") || drawn("segmentRB") ||  drawn("segmentRT")) && step < 2){
        Command('progresso = 66');
        step = 2;
    }      
    if(((drawn("segmentLT") && drawn("segmentRT")) || (drawn("segmentLB") && drawn("segmentRB"))) && step < 3){
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
            checkobject(obj,"triangletop",-0.4,-0.3);
            checkobject(obj,"trianglebotton",-0.4,-0.3);            
            target = true;
        }                 
        else{
            target = false;
        }
        printConstructionState(); 
        switch(objType){
            case "point":
                pointTop = checktarget(obj,"point","pointtop",pointTop,-0.4,0.3);
                pointBottom = checktarget(obj,"point","pointbottom",pointBottom,-0.4,-0.3);
                checkIntersection();
                break;
            case "segment":    
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
                checkwrongsegment(obj,"rayLB",-1.1,0);
                checkwrongsegment(obj,"rayRB",0,0);
                checkwrongsegment(obj,"rayLT",-1.1,0);
                checkwrongsegment(obj,"rayRT",0,0);                  
                break;
        }
                                      
        if (drawn("rayLT") || drawn("rayLB") || drawn("rayRB") ||  drawn("rayRT")){
            step = 1.5;
        }        
        
        checkStep();
        
        //LevelCompleted((drawn("segmentLT") && drawn("segmentRT")) || (drawn("segmentLB") && drawn("segmentRB")),4);        
    } 
}

//this function checks each step for the hint
function checkExercise(){ 
    if(target){
        if (drawn("triangletop") || drawn("trianglebottom")) {  
            console.log("Wataboy!");
        }                                            
        else{
            step = 4;
        }
    }
    else{
        switch(objType){
            case "point":
                if (drawn("pointtop") || drawn("pointbottom")) {  
                    //Command('progresso = 33');
                    step = 1;
                }            
                else{
                    //step = 0.5;
                }
                break;
            case "circle":
                //step = 0;
                break;
            case "segment":
                if (drawn("segmentLT") || drawn("segmentLB") || drawn("segmentRB") ||  drawn("segmentRT")){
                    //Command('progresso = 66');
                    step = 2;
                }      
                else{
                    //step = 5;
                }
                break;
            case "ray":
                if (drawn("rayLT") || drawn("rayLB") || drawn("rayRB") ||  drawn("rayRT")){
                    step = 1.7;
                }                                                            
                break; 
            default:
                //step = 0;

        }                                                    
    }
    switch(step){
        case 0: //initial state - nothing build
            document.getElementById('feedback').innerHTML = "Procure construir novos pontos relacionados com ambos A e B.";
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
        //console.log("condition: " + condition);
        var strHelp = "Observe os segmentos construídos e sua relação com o segmento AB.";
        displayResult(condition,level,mincount,strHelp,'1');
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
    intPoint = "null";    
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