/* 
 * Author      : FITROX
 * Description : based on testobjects.js by Kasper Peulen @ euclidthegame.com under MIT License
 * Edited by   : Fitrox for GeoGame.com
 */

var level = 2;
var mincount = 4;
var step = 0;  
var objType = "";
var target = false;
var circleL = "null";
var circleR = "null";
var pointTop = "null";
var pointBotton = "null";
var midpoint = "null";
var bisectorSeg = "null";
var bisectorLine = "null";
var index = 0;

//Shows question for validation
function showValidation(){
    var strValidation = "<p><ol>"
    strValidation += "<li>Ambos " + createObjList(1) + " e " + createObjList(2) + " possuem o mesmo raio (segmento AB).</li>";
    strValidation += "<li>Como " + intPoint + " pertence à intersecção entre os círculos, então " + createObjList(3) + " e " + createObjList(4) + " são congruentes.</li> à AB";
    strValidation += "<li>Logo, o triângulo AB"+intPoint+" é equilátero (possui os lados iguais).</li>";
    strValidation += "</ol></p>";
    //console.log("\\"+strValidation);
    document.getElementById('validation_questions').innerHTML = strValidation;   
}

//this function checks the steps of the level
function checkStep(){
    if ((drawn("pointtop") && drawn("pointbottom")) && step < 1) {  
        Command('progresso = 33');
        step = 1;
    }
    if ((drawn("bisectorSeg") || drawn("bisectorLine")) && step < 2) {  
        Command('progresso = 66');
        step = 1;
    }    
    if((drawn("midpoint")) && step < 3){
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
                pointBotton = checktarget(obj,"point","pointbottom",pointBotton,-0.4,-0.3);
                midpoint = checktarget(obj,"point","midpoint",midpoint,-0.4,-0.3);
                break;
            case "segment":    
                bisectorSeg = checktarget(obj,"segment","bisectorSeg",bisectorSeg,-1.1,0);             
                break;
            case "circle":
                circleL = checktarget(obj,"circle","circleleft",circleL,0,0);
                circleR = checktarget(obj,"circle","circleright",circleR,0,0);                
                break;
            case "line":
                bisectorLine = checktarget(obj,"line","bisectorLine",bisectorLine,-1.1,0);
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
   
}

//check if validation awnser is correct
function checkValidation(){
    var e1 = document.getElementById("objlist1");
    var strvalue1 = e1.options[e1.selectedIndex].value;
    var strtext1 = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById("objlist2");
    var strvalue2 = e2.options[e2.selectedIndex].value;
    var strtext2 = e2.options[e2.selectedIndex].text;     
    var count = ggbApplet.getValue("countnumber");
    if(strvalue1 != "" && strvalue2 != ""){
        console.log("Your choice is: "+strtext1+" and "+strtext2+".");
        //document.getElementById('feedback').innerHTML = "Your choice is "+strtext;
        //$( "#answer" ).toggle();    
        /*if((strvalue1 == circleL && strvalue2 == circleR) || (strvalue2 == circleL && strvalue1 == circleR)){
            setNextLevel(level);
            var strWin = "Parabéns. Você concluiu o nível 1! Vá para o <a href='level2.html'>Nível 2</a><br>";
            if (count === mincount){
                strWin += "Você realizou a construção com o menor número de passos possíveis!<br>";
            }     
            if(!tip){
                strWin += "Você realizou a construção sem a dica.<br>"
            }
            document.getElementById('awnser').innerHTML = strWin;
        }
        else{
            document.getElementById('awnser').innerHTML = "Observe os segmentos constrúidos e sua relação com o segmento AB.";
        }*/
    }
    else{
        alert('Please select a object from all the drop down lists.');
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
    pointBotton = "null";
    midpoint = "null";
    bisectorSeg = "null";
    bisectorLine = "null";    
    document.getElementById('validation').innerHTML = "";    
}
  