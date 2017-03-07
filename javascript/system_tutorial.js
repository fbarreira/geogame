/* Created on  : 09/02/2017
 * Author      : FITROX
 * Description : custom javascript for tutorial
 */

var level = 0;
var step = 0;  
var objType = "";
var target = false;
var circleL = "null";
var circleR = "null";
var pointTop = "null";
var pointBottom = "null";
var segmentTL = "null";
var segmentTR = "null";   
var segmentBL = "null";
var segmentBR = "null";   
var triangleTop = "null";
var triangleBottom = "null";
var IntersectionPoint = "null";


//Shows question for validation
function showValidation(){
    var strValidation = "<p>";
    //strValidation += createOrderList(3);
    strValidation += "Quando ";
    strValidation += createObjList(1);
    strValidation += " coincide com ";
    strValidation += createObjList(2);
    strValidation += ", as circuferências possuem o mesmo raio.</p>";
    document.getElementById('validation_questions').innerHTML = strValidation;

}

//this function checks the steps of the level
function checkStep(){
    if ((drawn("circleLeft")) && step < 1) {  
        Command('progresso = 17');
        $( "#circle1" ).show();
        $( "#hidden1" ).show();
        step = 1;
    }
    if ((drawn("circleRight")) && step < 2) {  
        Command('progresso = 34');
        $( "#circle2" ).show();
        $( "#hidden2" ).show();
        step = 2;
    }    
    if ((drawn("pointTop") || drawn("pointBottom")) && step < 3) {  
        Command('progresso = 50');
        //showIntersection();
        intersectionPoint = showIntersection();
        document.getElementById('showPoint').innerHTML = intersectionPoint;  
        $( "#intersection" ).show();
        $( "#hidden3" ).show();
        step = 3;
    }  
    if ((drawn("segmentTopLeft") || drawn("segmentBottomLeft")) && step < 4) {  
        Command('progresso = 67');
        intersectionPoint = showIntersection();
        document.getElementById('showPoint2').innerHTML = intersectionPoint;
        $( "#segment1" ).show();
        $( "#hidden4" ).show();
        step = 4;
    }    
    if ((drawn("segmentTopRight") || drawn("segmentBottomRight")) && step < 5) {  
        Command('progresso = 67');
        document.getElementById('showPoint3').innerHTML = intersectionPoint;
        $( "#segment2" ).show();
        $( "#hidden5" ).show();
        step = 5;
    }        
    if((drawn("triangleTop") || drawn("triangleBottom")) && step < 6){
        $( "#triangle" ).show();
        ggbApplet.setFixed("C",false);
        step = 6;
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

//This function registers the object listener
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

        printConstructionState(); 

        switch(objType){
            case "triangle":
                triangleTop = checktarget(obj,"triangle","triangleTop",triangleTop,-0.4,0.3);
                triangleBottom = checktarget(obj,"triangle","triangleBottom",triangleBottom,-0.4,0.3);
                break;
            case "point":
                pointTop = checktarget(obj,"point","pointTop",pointTop,-0.4,0.3);
                pointBottom = checktarget(obj,"point","pointBottom",pointBottom,-0.4,-0.3);
                checkIntersection();
                break;
            case "segment":    
                segmentTL = checktarget(obj,"segment","segmentTopLeft",segmentTL,-1.1,0);
                segmentTR = checktarget(obj,"segment","segmentTopRight",segmentTR,0,0);
                segmentBL = checktarget(obj,"segment","segmentBottomLeft",segmentBL,-1.1,0);
                segmentBR = checktarget(obj,"segment","segmentBottomRight",segmentBR,0,0);                
                break;
            case "circle":
                circleL = checktarget(obj,"circle","circleLeft",circleL,0,0);
                circleR = checktarget(obj,"circle","circleRight",circleR,0,0);                
                break;
            case "ray":        
                break;
        }                                           
        checkStep();     
    } 
}

//this function checks each step for the hint
function checkExercise(){                                                 
    switch(step){
        case 0: //initial state - nothing build
            document.getElementById('feedback').innerHTML = "Ao selecionar a ferramenta <b>Círculo dados Centro e Um de seus Pontos</b> \n\
                                                clique no ponto A para ser o centro e depois no ponto B.";
            break;
        case 1: //wrong point
            document.getElementById('feedback').innerHTML = "Assim como o passo anterior, clique no ponto B para ser o centro e depois clique no ponto C.";
            break;                                                        
        case 2: //intersect point
            document.getElementById('feedback').innerHTML = "O ponto de intersecção neste caso é onde as duas circunferências se <b>cruzam</b>. Escolha uma das duas opções para criar um ponto.";
            break;
        case 3: //wrong segment
            document.getElementById('feedback').innerHTML = "Para construir um segmento basta clicar em um ponto A que será o ínicio e depois no ponto "+intersectionPoint+" que será o fim.";
            break; 
        case 4: //ray build
            document.getElementById('feedback').innerHTML = "Semelhante ao último passo, clique nos dois pontos que serão as extremidades do segmento a ser construído.";
            break;                         
        case 5: //right segment build
            document.getElementById('feedback').innerHTML = "Para usar a ferramenta polígono é precisar clicar em todos os pontos que serão vértices, e por fim, clicando no vértice inicial outra vez.\n\
                                                             <br>Por exemplo, para fazer o triângulo clique em A,B,"+intersectionPoint+",A.";
            break;
        case 6: //finished construction
            document.getElementById('feedback').innerHTML = "Clique no ponto <span style='color:cornflowerblue'>ponto C</span> e arráste-o para os lados. Observe o que acontece com as circunferências.";
            break;                                         
        default: 
            document.getElementById('feedback').innerHTML = " default ";
            break;
    }
}

//check if validation awnser is correct
function checkValidation(){
    var e1 = document.getElementById("objlist1");
    var strvalue1 = e1.options[e1.selectedIndex].value;
    var strtext1 = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById("objlist2");
    var strvalue2 = e2.options[e2.selectedIndex].value;
    var strtext2 = e2.options[e2.selectedIndex].text;      
    if(strvalue1 != "" && strvalue2 != ""){
        console.log("Your choice is: "+strtext1+" and "+strtext2+".");
        //document.getElementById('feedback').innerHTML = "Your choice is "+strtext;
        //$( "#answer" ).toggle();    
        if(strvalue1 === "C" && strvalue2 === "A" || strvalue1 === "A" && strvalue2 === "C"){
            setNextLevel(level);
            document.getElementById('awnser').innerHTML = "Parabéns. Você concluiu o tutorial! Vá para o <a href='level1.html'>Nível 1</a>";
        }
        else{
            document.getElementById('awnser').innerHTML = "Tente outra vez.<br>Dica: Arraste o <span style='color:cornflowerblue'>ponto C</span> até os vertíces do segmento AB.";
        }
    }
    else{
        alert('Escolha um dos objetos em cada lista.');
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
    segmentTL = "null";
    segmentTR = "null";   
    segmentBL = "null";
    segmentBR = "null";   
    triangleTop = "null";
    triangleBotton = "null";   
    document.getElementById('validation').innerHTML = "";    
}

//check if intersection point is top or down
function showIntersection(){
    intPoint = (pointTop === "null") ? pointBottom : pointTop;
    console.log("intersection: point "+intPoint);
//    console.log("Top: " + pointTop);
//    console.log("Bottom: " + pointBottom);
    //ggbApplet.setFixed(intPoint,true);
    return intPoint;        
}

function updateIntersection(intPoint){
    document.getElementById('showPoint').innerHTML  = intPoint; 
    document.getElementById('showPoint2').innerHTML = intPoint;
    document.getElementById('showPoint3').innerHTML = intPoint;        
}

//Updates text with right name for intersection point
function checkIntersection(){
    if (drawn("pointTop") && step >= 3){
        //IntPos = "top";
        if(intersectionPoint != pointTop){
            intersectionPoint = pointTop; 
            updateIntersection(intersectionPoint);        
        }
    }
    else if (drawn("pointBottom") && step >= 3){
        //IntPos = "bottom";    
        if(intersectionPoint != pointBottom){
            intersectionPoint = pointBottom; 
            updateIntersection(intersectionPoint);        
        }        
    }
}
