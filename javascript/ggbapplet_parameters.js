/*
 * General Parameters for geobegra applet
 */

var parameters = {
    "id":"ggbApplet",
    //"width":width,
    //"height":480,
    "showToolBar":true,
    "showMenuBar":false,
    "showAlgebraInput":false,
    "showResetIcon":false,
    "enableLabelDrags":false,
    "enableShiftDragZoom":true,
    "enableRightClick":false, 
    "showToolBarHelp":false,
    "errorDialogsActive":true,
    "useBrowserForJS":true, 
    "language":"pt",
    "country":"BR",
    "isPreloader":false,
    "screenshotGenerator":false,
    "preventFocus":false,
    "showLogging":false,
    "enableUndoRedo": true
};

/** is3D=is 3D applet using 3D view, 
 * AV=Algebra View, 
 * SV=Spreadsheet View, 
 * CV=CAS View, 
 * EV2=Graphics View 2, 
 * CP=Construction Protocol, 
 * PC=Probability Calculator, 
 * DA=Data Analysis, 
 * FI=Function Inspector, 
 * PV=Python, 
 * macro=Macro View */
var views = {
    "is3D":false,
    "AV":false,
    "SV":false,
    "CV":false,
    "EV2":false,
    "CP":false,
    "PC":false,
    "DA":false,
    "FI":false,
    "PV":false,
    "macro":true
};

var applet = new GGBApplet('5.0', parameters, views);
//applet.setPreviewImage('','load.png');
window.onload = function() {
    applet.inject('applet_container', 'PREFERHTML5');
};
