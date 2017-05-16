/* 
 * Author      : FITROX
 * Description : based on testobjects.js by Kasper Peulen @ euclidthegame.com under MIT License
 * Edited by   : Fitrox for GeoGame.com
 */

var primitives = true;
var tip = false;
var objType = "";
var status = "0%";

var setVisible = ggbApplet.setVisible;
var count = 'Text["Count = 0",'+abspos("0.85","-0.032915")+']';
var strLength = 1000;


function ggbOnInit() {
    //ggbApplet.setWidth(width);
    var element = document.getElementsByClassName("toolbar_button")[0]; 
    element.setAttribute("isselected", "false"); 
    ggbApplet.debug("ggbOnInit");
    ggbApplet.registerAddListener("newObjectListener");
    ggbApplet.registerUpdateListener("updateListener");
        
    Command('progresso = 0');
    //Command('Progressotext = Text["Progresso: "progresso"%",'+abspos("0.011","-0.032915")+']');
    Command('countnumber = 0');
    Command ('count0 = Text["Passos: "countnumber"",'+abspos("0.011","-0.032915")+']');
    Command('W = (-10,-10)'); 
    ggbApplet.setVisible("W",false);
    //Command('welldone = Text["Correto!", W]'); 		
    ggbApplet.setVisible("welldone",false);	
    printConstructionState();
}

//parses command to console
function Command(cmd){
    ggbApplet.debug(cmd);
    ggbApplet.evalCommand(cmd);
}

//return absolute position of object
function abspos(x,y){
    return "Corner[4] + ("+x+"*(x(Corner[3])-x(Corner[4])),"+y+"*(x(Corner[2])-x(Corner[1])))";
}

//Check if object is drawn
function drawn(object){
    return ggbApplet.getVisible('f_'+object);
}

function updateListener(objName) {
	//strVal = document.ggbApplet.getValueString(objName);
	//document.listenerForm.textarea2.value = strVal + "\n" + document.listenerForm.textarea2.value.substring(0, strLength );
        printConstructionState();
}

//Print current list of objects
function printConstructionState() {
	var objNumber = ggbApplet.getObjectNumber();
        var strState = "";
        var objList = 0;
	for (i=0; i < objNumber; i++) {
            strName = ggbApplet.getObjectName(i);
            strType = ggbApplet.getObjectType(strName);
            strCaption = ggbApplet.getCaption(strName);
            if (strType === "boolean" || strType === "text" || strType === "numeric" || strCaption == "sys" || strName == "W") {
                //do nothing
            }
            else{               
                strCommand = ggbApplet.getCommandString(strName);
                strTypeTrad = translate(strType);
                if(strCommand == ''){
                    strState += strTypeTrad + " " + strName + "\n";   
                }
                else{
                    strState += strTypeTrad + " " + strName + ", " + strCommand + "\n";  
                }
                objList += 1;
            }
	}
        var strNumber = "Número de Objetos: " + objList + "\n";
        var strList = strNumber.concat(strState);
        //console.log(strState);
	document.listenerForm.consState.value = strList;
}

//Translate object types to portuguese
function translate(objEn) {
    switch(objEn){            
        case "segment":
            objPt = "segmento"; 
            break;
        case "circle":
            objPt = "círculo"; 
            break;
        case "point":
            objPt = "ponto";
            break;
        case "ray":
            objPt = "semirreta";
            break;
        case "triangle":
            objPt = "triângulo";
            break;            
        default:
            objPt = objEn;
            break;
        }    
    return objPt;
}

function getCoord(obj,cmdString){ 
    if (ggbApplet.getObjectType(obj) === "point" ) {
        var x = ggbApplet.getXcoord(obj);
        var y = ggbApplet.getYcoord(obj);
        return "("+x+","+y+")";
    }
    else if (ggbApplet.getObjectType(obj)==="segment" || ggbApplet.getObjectType(obj)==="ray" ){
        Command("xx = x(Point["+obj+",0.5])");
        Command("yy = y(Point["+obj+",0.5])");
        var x = ggbApplet.getValue("xx");
        var y = ggbApplet.getValue("yy");
        return "("+x+","+y+")";
    }
    else if (ggbApplet.getObjectType(obj)==="circle"){
        var x = ggbApplet.getXcoord(cmdString.substring(7,8));
        var y = ggbApplet.getYcoord(cmdString.substring(7,8));
        return "("+x+","+y+")";
    }
}

//This function checks object's type
function checkType(obj){       
    switch(obj){
        case ggbApplet.getObjectType(obj) == "point":
            objType = "point";
            break;
        case ggbApplet.getObjectType(obj) == "circle":
            objType = "circle";
            break;
        case ggbApplet.getObjectType(obj) == "segment":
            objType = "segment";
            break;        
        case ggbApplet.getObjectType(obj) == "ray":
            objType = "ray";
            break;   
        case ggbApplet.getObjectType(obj) == "line":
            objType = "line";
            break;              
        case ggbApplet.getObjectType(obj) == "triangle":
            objType = "triangle";
            break;         
        default:
            objType = "";
            break;            
    }
    return objType;
}

//this funcion returns object with a given name -- stupid but necessary for some reason
function getObjectName(obj){
    var objNumber = ggbApplet.getObjectNumber();       
    var objList = 0;
    for (i=0; i < objNumber; i++) {
        strName = ggbApplet.getObjectName(i);
        strType = ggbApplet.getObjectType(strName);
        strCaption = ggbApplet.getCaption(strName);        
            objList += 1;
            if(obj == strName){
                return ggbApplet.getObjectName(i);
            }            
    }
    //console.log("obj list: " + objList);
}

function objectCheckout(obj){   
    isPrimitive(objType, primitives);
    if (ggbApplet.getObjectType(obj) == "segment" || ggbApplet.getObjectType(obj) == "circle" || ggbApplet.getObjectType(obj) == "ray" || ggbApplet.getObjectType(obj) == "line") 
    {   
        ggbApplet.setColor(obj,30,178,46);   
    }
    else if(ggbApplet.getObjectType(obj) == "point"){
        ggbApplet.setColor(obj,198,12,232);
    }
    else{
        ggbApplet.setColor(obj,20,140,217);
    }
   
    var cmdString = ggbApplet.getCommandString(obj);
    var defString = ggbApplet.getDefinitionString(obj);
//    console.log(cmdString);
//    console.log(ggbApplet.getObjectType(obj));
//    console.log(obj);
//    console.log("defString: " + defString);

    if (ggbApplet.getObjectType(obj) == "point" && cmdString == "")
    {
        //console.log(ggbApplet.getXcoord(obj));
        var x = ggbApplet.getXcoord(obj) + 0.01;
        //console.log(x);
        var y = ggbApplet.getYcoord(obj) - 0.01;
        Command( obj +"= ("+x+","+y+")");
    }        
    
    if(ggbApplet.getObjectType(obj) != "point"){
        Command('countnumber = countnumber + 1');
        if(defString.substring(0,3) == "Pol"){
//            console.log("defString size: "+defString.substring(0,3));
            var countString = defString.length;
            var aux = Math.floor((countString - 9)/3);
            var sideCount = countString - 9 - 2*aux;
            console.log("polygon number of sides: " + sideCount);
            Command('countnumber = countnumber -'+sideCount);
        }    
    }
    
function isPrimitive(objType,primitives){
    console.log("primitives: " + primitives);
    if(!(objType == 'point' || objType =='segment' || objType == 'ray' || objType == 'circle') && primitives){
        primitives = false;
    }
}
    
//    if (cmdString.substring(0,3) == "Ray" || (cmdString.substring(0,2) == "Eq" && ggbApplet.getObjectType(obj)=="point") || cmdString.substring(0,3) == "Seg" ||cmdString.substring(0,3) == "Cír" || cmdString.substring(0,3) == "Mid" || cmdString.substring(0,13) == "AngleBisector" || cmdString.substring(0,4) == "Perp" || cmdString.substring(0,4) == "Line" || (cmdString.substring(0,5) == "Trans" && ggbApplet.getObjectType(obj)=="point")){
//        //Command('countnumber = countnumber + 1');
//        if (!(cmdString.substring(0,3) == "Ray" || cmdString.substring(0,3) == "Seg" || cmdString.substring(0,3) == "Cir") && primitives) {
//            primitives = false;
//        }
//
//        function isLowerCase(myString) { 
//            return (myString == myString.toLowerCase()); 
//        }
//
//        var lastcomma = cmdString.indexOf(",");
//        if(cmdString.substring(0,3) == "Cir" && (isLowerCase(cmdString.substring(lastcomma+2,lastcomma+3)) || cmdString.substring(lastcomma+2,lastcomma+4) =="Se" || cmdString.substring(lastcomma+2,lastcomma+4) =="Ra"))
//        {
//            primitives = false;
//        }	
//    }    

    if (cmdString.substring(0,13) == "AngleBisector"){
        var obj1 = cmdString.substring(14,15);
        if (ggbApplet.getObjectType(obj1) === "point"){
            var obj2 = cmdString.substring(17,18);
            var obj3 = cmdString.substring(20,21);
            var a = ggbApplet.getXcoord(obj1);
            var b = ggbApplet.getYcoord(obj1);
            var m = ggbApplet.getXcoord(obj2);
            var n = ggbApplet.getYcoord(obj2);
            var x = ggbApplet.getXcoord(obj3);
            var y = ggbApplet.getYcoord(obj3);

            function round(value) {
                return(Math.round(value * 100000) / 100000);
            }
            if ( round((n-b)*(x-m)) === round((y-n)*(m-a))){
                Command('Delete['+obj+']');
                Command('Text["You can\'t use the bisecting tool if the angle is 180 degrees !",'+abspos("0.02","-0.632915")+']');
            }
        }
    }    
    
}

//this function verifies if target is drawn
function verifyobject(obj,target,type,x,y){
    var status = false;
    switch(type){
        case "point":
           status = checkobject(obj,target,x,y);
           break;
        case "circle":
           status = checkobjectcircle(obj,target,x,y);
           break;    
        case "segment":
           status = checksegment(obj,target,x,y);
           break;      
        case "ray":
           status = checksegment(obj,target,x,y);
           break; 
        case "line":
           status = checksegment(obj,target,x,y);
           break;            
       case "triangle":
           status = checkobject(obj,target,x,y);
           break;
    }
    //console.log("status: " + status);
    return status;
}

// this functions can check all general objects
function checkobject(obj,target,x,y) {
    Command("finished = (" + obj + "== " + target + ")");
    //console.log("finished = (" + obj + "== " + target + ")");
    finished = ggbApplet.getValueString("finished");
    //console.log(finished);
    if (finished.indexOf("true") > -1) {
        Command('f_'+target+'= Text["", (0,0)]');
        Command("W = "+getCoord(target)+"+("+x+","+y+")");
        ggbApplet.setVisible("welldone",true);	
        return true;
    } 
    else{return false};
}

// this functions checks circles
function checkobjectcircle(obj,target,x,y) {
    Command("finished = (" + obj + "== " + target + ")");
    //console.log("finished = (" + obj + "== " + target + ")");
    finished = ggbApplet.getValueString("finished");
    //console.log(finished);
    if (finished.indexOf("true") > -1) {
        Command('f_'+target+'= Text["", (0,0)]');
        //Command("W = "+getCoord(target)+"+("+x+","+y+")");
        //ggbApplet.setVisible("welldone",true);	
        return true;
    } 
    else{return false};
}

// this function checks wrong objects
function checkwrongobject(obj,target,x,y) {
    Command("finished = (" + obj + "== " + target + ")");
    finished = ggbApplet.getValueString("finished");
    if (finished.indexOf("true") > -1) {
        Command('f_'+target+'= Text["", (0,0)]');
        Command("W = "+getCoord(target)+"+("+x+","+y+")");
        ggbApplet.setVisible("welldone",false);		
        //return true;
    } 
}

// this functions check line segments
function checksegment(obj,target,x,y) {
    if (ggbApplet.getObjectType(obj) == "segment" || ggbApplet.getObjectType(obj) == "ray" || ggbApplet.getObjectType(obj) == "line") {
        var beginpointobject = "Point["+obj+",0]";
        var endpointobject = "Point["+obj+",1]";
        var beginpointtarget = "Point["+target+",0]";
        var endpointtarget = "Point["+target+",1]";
        //here it checks if endpoints of line segment are equal
        if (obj != "finished") {
            Command("finished =((("+beginpointobject+"=="+beginpointtarget+")||("+beginpointobject+"=="+endpointtarget+"))&&(("+endpointobject+"=="+beginpointtarget+")||("+endpointobject+"=="+endpointtarget+")))");
            finished = ggbApplet.getValueString("finished");
            if (finished.indexOf("true") > -1) {
                Command('f_'+target+'= Text["", (0,0)]');
                if (typeof x !== 'undefined'){
                    Command("W = "+getCoord(target)+"+("+x+","+y+")")};	
                    ggbApplet.setVisible("welldone",true);		  
                    return true;
            }
            else{return false};
        }
    }
    //else{return false};
}

// this function checks wrong line segments --- probably can be merged with checksegment()
function checkwrongsegment(obj,target,x,y) {
    if (ggbApplet.getObjectType(obj) == "segment" || ggbApplet.getObjectType(obj) == "ray" || ggbApplet.getObjectType(obj) == "line") {
        var beginpointobject = "Point["+obj+",0]";
        var endpointobject = "Point["+obj+",1]";
        var beginpointtarget = "Point["+target+",0]";
        var endpointtarget = "Point["+target+",1]";
        //here it checks if endpoints of line segment are equal
        if (obj != "finished") {
            Command("finished =((("+beginpointobject+"=="+beginpointtarget+")||("+beginpointobject+"=="+endpointtarget+"))&&(("+endpointobject+"=="+beginpointtarget+")||("+endpointobject+"=="+endpointtarget+")))");
            finished = ggbApplet.getValueString("finished");
            if (finished.indexOf("true") > -1) {
                Command('f_'+target+'= Text["", (0,0)]');
                if (typeof x !== 'undefined'){
                    Command("W = "+getCoord(target)+"+("+x+","+y+")")};	
                    ggbApplet.setVisible("welldone",false);	
                    //return false;
            }
        }
    }
}

// this functions can check if line segment has right direction
function checkdirection(obj,target,x,y) {
    if (ggbApplet.getObjectType(obj) == "segment" || ggbApplet.getObjectType(obj) == "ray" || ggbApplet.getObjectType(obj) == "line") { 
        Command("finished = (("+obj+"(1)=="+target+"(1))&&("+obj+"(-1)=="+target+"(-1)))");
        finished = ggbApplet.getValueString("finished");
        if (finished.indexOf("true") > -1) {
            Command('f_'+target+'= Text["", (0,0)]');
            if (typeof x !== 'undefined'){
                Command("W = "+getCoord(target)+"+("+x+","+y+")");
            }	
            ggbApplet.setVisible("welldone",true);		
        }
    }
}

// this functions check if the new point is on the targetline
function checkpointontarget(obj,target,x,y) {
    if (ggbApplet.getObjectType(obj) == "point") {
        Command("finished = ("+target+"(x("+obj+"))==y("+obj+"))");
        finished = ggbApplet.getValueString("finished");
        if (finished.indexOf("true") > -1) {
            Command('f_p'+target+'= Text["", (0,0)]');
            if (typeof x !== 'undefined'){
                Command("W = "+getCoord(obj)+"+("+x+","+y+")");};	
            ggbApplet.setVisible("welldone",true);		 
        }
    }
}

//check cases of object and target
function checktarget(obj,type,target,container,x,y){
    //console.log("target: " + target + " | container = '" + container + "'.");
    var status = verifyobject(obj,target,type,x,y);
    //console.log("target: " + target);
    //console.log("in check status: " + status);
    if(status == true){                                // is right target
        //console.log("|| in function ---");
        if (drawn(target) && container == "null"){     //assign variable
            objTag = getObjectName(obj);
            ggbApplet.setLabelVisible(objTag, true);
            //console.log("obj name: " + objTag);  
            return objTag;
        }
        else if(drawn(target) && container == obj){    //name already assigned
            ggbApplet.setLabelVisible(objTag, true);
            //console.log("obj name (fix): " + objTag);    
            return container;        
        }
        else if(drawn(target) && container != obj && container != "null"){ //old name assigned
            objTag = getObjectName(obj);
            ggbApplet.setLabelVisible(objTag, true);
            //console.log("obj name (wrong): " + container + " | new name: " + objTag);    
            return objTag;        
        }    
        else{
            //console.log("obj name (same): " + container);  //same name assigned
            return container;
        }  
    }
    else { // is wrong target
        var status2 = drawn(target);
        //console.log("status2 = " +status2);
        if(status2 == false && container != "null"){    //target is not drawn so clear the assigned name
            //console.log("obj name (empty): " + "null"); 
            return "null";  
        }
        else{
            //console.log("obj name (diff): " + container); 
            return container;
        }
    }
}

//Stores next level
function setNextLevel(level,mincount){
    var nextLevel = level + 1;
    console.log("next level: " + nextLevel);
    var count = ggbApplet.getValue("countnumber");
    var moveList = JSON.parse(localStorage.getItem("moveList"));
    var primitiveList = JSON.parse(localStorage.getItem("primitiveList"));
    var tipList = JSON.parse(localStorage.getItem("tipList"));
    
    console.log("moves: " + count + " - movelist["+level+"]: " + moveList[level]);
    if(count < moveList[level] || moveList[level] == 0){
        console.log("check!");
        moveList[level] = count;
        localStorage.setItem("moveList", JSON.stringify(moveList));
    }
    
    if (localStorage.lastLevel < nextLevel.toString()) {
        localStorage.setItem("lastLevel", nextLevel.toString());
        console.log("lastlevel: " + localStorage.lastLevel);
    } else {
        console.log("lastlevel (fix): " + localStorage.lastLevel);
    }    
    
    if(primitiveList[level] == false && primitives){
        primitiveList[level] = primitives;
        localStorage.setItem("primitiveList", JSON.stringify(primitiveList));
    }
    
    if(tipList[level] && !tip){
        tipList[level] = tip;
        localStorage.setItem("tipList", JSON.stringify(tipList));
    }
    
    var mimmoves = (moveList[level] == mincount) ? true : false;
    
    setStatus(level,mimmoves,primitiveList[level],tipList[level]);
}

//Stores next challenge
function setLevelChallenge(levelChallenge){
    console.log("Challenge: " + levelChallenge);   
    if (localStorage.lastChallenge < levelChallenge) {
        localStorage.setItem("lastChallenge", levelChallenge);
        console.log("lastChallenge: " + localStorage.lastChallenge);
        //return "<br>Você liberou um novo desafio! Vá em <a href='level_hub.html'>Níveis</a> para jogar.";
        return true;
    } else {
        console.log("lastlastChallenge (fix): " + localStorage.lastChallenge);
        return false;
    }    
}

//Actived when construction is completed, displays bottom box
function LevelCompleted(){
        Command('progresso = 100');
        Command('Complete = Text["Construção Concluída!",  '+abspos("0.39","-0.032915")+']');   
        $( "#valid_box" ).toggle();
        window.scrollTo(0,document.body.scrollHeight); 
        document.getElementById("resetbutton").disabled = true;
}   


//Creates dropdown list of used objects
function createObjList(index){
    var objNumber = ggbApplet.getObjectNumber();
    console.log("list size: " + objNumber);
    var strList = '<select size="1" id="objlist'+index+'">';
    strList += '<option value=""> - selecione - </option>'
    //document.getElementById('validation').innerHTML = '<select>';
    for (i=0; i < objNumber; i++) {
        objName = ggbApplet.getObjectName(i);
        objType = ggbApplet.getObjectType(objName);
        objTypeTrad = translate(objType);
        objCaption = ggbApplet.getCaption(objName);
        if (objType === "boolean" || objType === "text" || objType === "numeric" || objName == "W" || objName == "finished" || objName == "yy" || objName == "xx" || objCaption == "sys"){
            //do nothing
        }   
        else{
            //document.getElementById('validation').innerHTML += '<option value='+objName+'>'+objType+' '+objName+'</option>';
            strList += '<option value='+objName+'>'+objTypeTrad+' '+objName+'</option>';
        }   
    }
    strList += '</select>';
    return strList;
}

function createToolList(){

}

function createOrderList(size){
    strValidation = '<select>';
    strValidation += '<option value=""> - </option>'
    for(i=1; i < size + 1; i++){
        strValidation += '<option value='+i+'>'+i+'</option>';  
    }
    strValidation += '</select>';
    return strValidation;
}

//Creates list of selected objects from all dropdown lists
function createSelectedList(listSize){
    var list = [];
    var aux = false;
    for(i=0; i<listSize; i++){
        var e = document.getElementById("objlist"+(i+1));
        var strvalue = e.options[e.selectedIndex].value;   
        if(strvalue != ""){
            list[i] = strvalue;
        }
        else{
            aux = true;
            break;
        }
    }
    //console.log("list: " + list);
    //console.log("aux: " + aux);
    return (aux) ? "null" : list;
}

//display the result of level
function displayResult(condition,level,mincount,strHelp,challenge,tool, toolname){
    if(condition){
        setNextLevel(level,mincount);
        var nextLevel = level + 1;
        var count = ggbApplet.getValue("countnumber");
     
        if(level == 0){
            var strWin = "Parabéns. Você concluiu o tutorial! Vá para o <a href='level1.html'>Nível 1</a>";    
        } else{
            var strWin = "Parabéns. Você concluiu o <b>nível "+level+"</b>! Vá para o <a href='level"+nextLevel+".html'>Nível "+nextLevel+"</a>";   
        }
        
        if (count === mincount){
            strWin += "<br>Você realizou a construção com o menor número de passos possíveis!";  
        }  
        
        //console.log("tip: " + tip);
        if(!tip){
            strWin += "<br>Você realizou a construção sem a dica.";
        }
        //console.log("primitives: " + primitives);
        if(primitives){
            strWin += "<br>Você realizou a construção apenas com ferramentas básicas.";
        }
        if(tool != -1){
            var toolList = JSON.parse(localStorage.getItem("toolList"));
            if(!toolList[tool]){
                toolList[tool] = true;
                localStorage.setItem("toolList",        JSON.stringify(toolList));
                strWin += "<br>Você liberou uma nova ferramenta: <b>"+toolname+"</b>";
            }
        }
        if(challenge != '0'){
            if(setLevelChallenge(challenge)){
                strWin += "<br>Você liberou um novo desafio! Vá em <a href='level_hub.html'>Níveis</a> para jogar.";
            }
        }
                
        strWin += "<br>Nível  completo com <b>"+status+"</b> de êxito.";
        
        document.getElementById('awnser').innerHTML = strWin;
        
    }
    else{
        document.getElementById('awnser').innerHTML = strHelp;
    }     
}

function setStatus(level,moves,primitives,tip){
    var statusList = JSON.parse(localStorage.getItem("statusList"));
    var levelstatus = 25;
    if(moves){
        levelstatus += 20;
    }
    if(primitives){
        levelstatus += 20;
    }
    if(!tip){
        levelstatus += 10;
    }
    
    statusList[level] = levelstatus; 
    localStorage.setItem("statusList", JSON.stringify(statusList));
    status =  levelstatus.toString() + "%";
}
