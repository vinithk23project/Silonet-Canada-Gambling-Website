
function WinSpriteSymbol(jsonData,setObj){


var self=this;

this.animData="";	
this.setData=setObj;	
this._view;
	

this.GetAnimData=function(){
	
return this.animData;
};
this.GetSprite=function(){
	

return self.newSprite;		
};	
this.GetSetData=function(){
	
return this.setData;	
};
	
	
var mainSlotSet = new XMLHttpRequest();

mainSlotSet.onreadystatechange = function(ev) {




	if (this.readyState == 4 && this.status == 200) {
		
	console.log("Load AnimSprite: ",jsonData);		
		
	self.animData=JSON.parse(String(ev.currentTarget.responseText));
var tFrames=self.animData.frames.length;
var frm=((CANVAS_FPS/100)/(CANVAS_FPS/self.animData.framerate))*2;

self.animData.animations={anim:[0,tFrames-1,"anim",frm]};	
var spriteSheet = new createjs.SpriteSheet(self.animData);
self.newSprite = new createjs.Sprite(spriteSheet, "");	

		
		
	}
	
};
mainSlotSet.open("GET", jsonData, true);
mainSlotSet.send();	

	

return this;


}


	
	
	
function WinSymbol(viewContainer,animData,sName,sSprite){

this._view=new createjs.Container();	

var self=this;	
	
this.StartAnim=function(aSet){



console.log("Create AnimSprite: ",sSprite,sName,animData);	

var newSprite = sSprite.clone();	

	
	
newSprite.gotoAndPlay("anim");	
	
self._view.addChild(newSprite);
viewContainer.addChild(self._view);
self._view.x=aSet.x;	
self._view.y=aSet.y;	
		
	
};
	
/*
	
	отключить анимацию, и убрать из отображения
	
	*/		
	
this.StopAnim=function(){
	
	
	
viewContainer.removeChild(self._view);

	
};	
	
	
/*
	
	поднимаем символ наверх, что бы был поверх рамки линии, при отображении выигрышной линии
	
	*/		
	
this.ResetAnim=function(){
	
	
	
viewContainer.removeChild(self._view);
viewContainer.addChild(self._view);
	
	
};	
	
	return this;
	
	
}

	
function WinSymbol2(viewContainer,animData,sName,advAnim){

this._view=new createjs.Container();	
var aIntr;
var self=this;	
	
this.StartAnim=function(aSet,tFrames){


var frm=((CANVAS_FPS/100)/(CANVAS_FPS/animData.framerate))*2;

animData.animations={anim:[0,tFrames,"anim",frm]};	

	
var spriteSheet = new createjs.SpriteSheet(animData);
var newSprite = new createjs.Sprite(spriteSheet, "");	

	
	
newSprite.gotoAndPlay("anim");	
	
self._view.addChild(newSprite);
viewContainer.addChild(self._view);
self._view.x=aSet.x;	
self._view.y=aSet.y;	
		
	
};
	
	
this.StartAnimDelay=function(aSet,tFrames,sFrame,ic){


var frm=((CANVAS_FPS/100)/(CANVAS_FPS/animData.framerate))*2;

animData.animations={anim2:[tFrames,tFrames,"anim2",frm],anim:[sFrame,tFrames,"anim2",frm]};	

	
var spriteSheet = new createjs.SpriteSheet(animData);
var newSprite = new createjs.Sprite(spriteSheet, "");	

newSprite.on('animationend',function(){
	
	self.StopAnim();

if(ic>=15){
dispatchEvent(new Event("stopBonusSym"));	
}
	
	
});	
	
newSprite.gotoAndPlay("anim");	
	
	
	
self._view.removeChild(newSprite);
self._view.addChild(newSprite);
viewContainer.addChild(self._view);
self._view.x=aSet.x;	
self._view.y=aSet.y;	
	
//setTimeout(self.StopAnim,endDelay);	
	
};	
	
/*
	
	отключить анимацию, и убрать из отображения
	
	*/		
	
this.StopAnim=function(){
	
	
	
viewContainer.removeChild(self._view);

	
};	
	
	
/*
	
	поднимаем символ наверх, что бы был поверх рамки линии, при отображении выигрышной линии
	
	*/		
	
this.ResetAnim=function(){
	
	
	
viewContainer.removeChild(self._view);
viewContainer.addChild(self._view);
	
	
};	
	
	return this;
	
	
}

/////////////Lines class////////////////////

function GameLines(viewContainer,imgSource,setObj){

/*
	
	класс отвечает за линии и анимацию выигрышей.
	
	*/		
	
	
this._view=new createjs.Container();

var currentWinLine=0;	
var isMainShow=true;	
var isMainScatters=true;	
var self=this;	

var timeoutShow;	
	
var objArr=new Array();	
var libArr=new Array();	
var winArr=new Array();	
var borderArr=new Array();	

var animData=slotSpriteSource.linesGame.config;
animData.images=[slotSpriteSource.linesGame.sprite];	
var spriteSheet = new createjs.SpriteSheet(animData);
var mainSprite = new createjs.Sprite(spriteSheet, "");		
	

var animDataGame2=slotSpriteSource.viewGame.config;
animDataGame2.images=[slotSpriteSource.viewGame.sprite];	
var spriteSheetGame2 = new createjs.SpriteSheet(animDataGame2);
var mainSpriteGame2 = new createjs.Sprite(spriteSheetGame2, "");
	
objArr['counterMpl']=mainSpriteGame2.clone();
objArr['counterMpl'].gotoAndStop("X");
this._view.addChild(objArr['counterMpl']);
objArr['counterMpl'].visible=false;		

winArr=new Array([],[],[],[],[],[]);	
	
for(objId in setObj){	

var cObj=setObj[objId];	


	
if(cObj.type=="bitmap"){	
	
objArr[objId]=mainSprite.clone();
	objArr[objId].gotoAndStop(""+cObj.res[0]);
this._view.addChild(objArr[objId]);	
	
objArr[objId].set({x:cObj.x,y:cObj.y});	
	
}else if(cObj.type=="symbol_sprite_lib"){	


libArr[objId]=new WinSpriteSymbol(cObj.config,cObj);

	
	

	
}else if(cObj.type=="symbol_anim_lib"){	


libArr[objId]=[this._view,imgSource,cObj,objId];

	
	

	
}else if(cObj.type=="bitmap_lib"){	
	
	

	
	
libArr[objId]=mainSprite.clone();
	libArr[objId].gotoAndStop(""+cObj.res[0]);	
	
	
	
}else if(cObj.type=="text"){	

objArr[objId]=new createjs.Text(cObj.defaultText, cObj.fontText, cObj.colorText)	

objArr[objId].textAlign=cObj.alignText;

this._view.addChild(objArr[objId]);	
	
objArr[objId].set({x:cObj.x+17,y:cObj.y+9});	

}else if(cObj.type=="text_g"){	

objArr[objId]=new createjs.Text(cObj.defaultText, cObj.fontText, "#FF0000");

objArr[objId].textAlign=cObj.alignText;

this._view.addChild(objArr[objId]);	
	
objArr[objId].set({x:cObj.x,y:cObj.y,gradient:true});	
objArr[objId].shadow=new createjs.Shadow("#000000", 0, 0, 4);

}
	
	

	
	
	
}
objArr['counterMpl'].visible=false;	
	
viewContainer.addChild(this._view);	


	
this.ChangeScatters=function(sym,reelId){

var rtn=sym;	

if(sym!="SCAT"){
return rtn;	
}
	
if(bonusMode){

if(reelId==1){
rtn="SCAT_1_FS";	
}else if(reelId==3){
rtn="SCAT_2_FS";	
}else if(reelId==5){
rtn="SCAT_3_FS";	
}
	
}else{

if(reelId==1){
rtn="SCAT_1";	
}else if(reelId==3){
rtn="SCAT_2";	
}else if(reelId==5){
rtn="SCAT_3";	
}	
	
	
}
return rtn;	
};
	
/*показать анимацию всех выигрышных символов*/	
	
this.ShowAllWinSym=function(){

if(slotSettings.Jackpots['jackType']!=undefined && slotSettings.Jackpots['jackType']!='standartType'){	
gameLines.HideJackSym();
slotSettings.Jackpots['jackType']=undefined;
}


	
isMainScatters=true;
isMainShow=true;	
	
var rPos=gameReels.GetPositions();	
	
winArr=new Array([],[],[],[],[],[]);	
	
currentWinLine=0;	
	
for(var i=0; i<slotSpinResult.winLines.length;i++){

for(var j=1;j<=5;j++){

var cSym=slotSpinResult.winLines[i]['winReel'+j][1];	
var cPos=parseInt(slotSpinResult.winLines[i]['winReel'+j][0]);	

	
	
	if(cSym=="none"){
	continue;	
	}
	
	if(winArr[j][cPos]==undefined ){
		
	cSym=self.ChangeScatters(cSym,j);	
		
	var cprop=libArr['lnWinSym_'+cSym];	
		
	winArr[j][cPos]=new WinSymbol(this._view,cprop.GetAnimData(),cSym,cprop.GetSprite());
		
	winArr[j][cPos].StartAnim({x:rPos[j-1].x,y:rPos[j-1].y+(symHeight*cPos)});	

	}
		
	
}
	
}

clearTimeout(timeoutShow);	
	
if(slotSpinResult.bonusInfo.scattersType=="bonus" && slotSpinResult.winLines.length<=0){

self.ShowScattersAnim();
	
}else{
	
timeoutShow=setTimeout(self.ShowCurrentWinLine,200);	
	
}
	

	
	
	
};	
/*-----------*/
	
this.ShowMultiplierStep=function(){

	
clearTimeout(slotStateData.mplTimeout);	
		
var rPos=gameReels.GetPositions();		
	
self.StopWinLine();
self.HideLines();	

if(bonusMode && currentSound['FS']!=undefined){
	
	currentSound['FS'].volume=0;	
		
	}	
	
winArr=new Array([],[],[],[],[],[]);		
	
/*-------------------*/	

	var cMpl=slotSpinResult.freeMultiplier[slotStateData.mplCurrent];
	var rNum=slotSpinResult.freeMultiplier[slotStateData.mplCurrent][5];

	
	
var cprop=libArr['lnWinSym_'+cMpl[0]];	


	
	winArr[rNum][cMpl[1]]=new WinSymbol(self._view,cprop.GetAnimData(),cMpl[1],cprop.GetSprite());
		
	winArr[rNum][cMpl[1]].StartAnim({x:rPos[rNum-1].x,y:rPos[rNum-1].y+(symHeight*cMpl[1])});			
	
//изображение х2 выставляется в центер символа, mOffsetX/ mOffsetY для смещения изображения
	
var mOffsetX=-47;
var mOffsetY=2;

objArr['counterMpl'].set({x:rPos[rNum-1].x+(symHeight/2)+mOffsetX,y:rPos[rNum-1].y+(symHeight*cMpl[1])+mOffsetY});

dispatchEvent(new Event(SLOT_EVENT_SOUNDMPL));	
	
self._view.removeChild(objArr['counterMpl']);	
self._view.addChild(objArr['counterMpl']);			
	
objArr['counterMpl'].visible=true;
objArr['counterMpl'].alpha=1;
	
setTimeout(function(){
	
var winEvent=new CustomEvent(SLOT_EVENT_SHOWINMPL,{detail:{stepwin:cMpl[3],currentWin:cMpl[4]}});		
dispatchEvent(winEvent);	
},2000);	
	
createjs.Tween.get(objArr['counterMpl']).wait(1000).to({x:200,y:450,visible:false}, 1000);		
	
	
/*-------------------*/	
	
	
slotStateData.mplCurrent++;	
	
if(slotStateData.mplCurrent>slotStateData.mplTotal-1){

setTimeout(function(){	
	

self.StopWinLine();		
	
if(slotSpinResult.respinMode){	

dispatchEvent(new Event(SLOT_EVENT_STARTRESPIN));	
	
}else if(slotSpinResult.bonusInfo.scattersType=="bonus" || slotSpinResult.bonusInfo.scattersType=="win"){	

winArr=new Array([],[],[],[],[],[]);		
	
self.ShowScattersAnim();

}else{
	
slotState=SLOT_STATE_AFTERWIN;	
dispatchEvent(new Event(SLOT_EVENT_ENDWINLINE));	
	
}
	
},2200);
		   
		   
	
}else{

slotStateData.mplTimeout=setTimeout(self.ShowMultiplierStep,2200);	
	
}
	
	
	
};
	
this.ShowMultiplier=function(){

clearTimeout(timeoutShow);	
if(bonusMode && currentSound['FS']!=undefined){
	
	currentSound['FS'].volume=0;	
		
	}
	
slotStateData.mplTimeout=setTimeout(self.ShowMultiplierStep,500);
slotStateData.mplTotal=slotSpinResult.freeMultiplier.length-1;
slotStateData.mplCurrent=0;

	
};	
	
	
	
/*показать анимацию всех выигрышных символов*/	
	
this.ShowAdvancedRoll=function(){
winArr=new Array([],[],[],[],[],[]);
	
var rCount=0;	
var rPos=gameReels.GetPositions();	
	
	
	
for(var i=0; i<3;i++){

for(var j=1;j<=5;j++){

var cSym="FS";	
var cPos=i;	

	
	
	
	
		
	var cprop=libArr['lnWinSym_'+cSym];	
		
	winArr[j][cPos]=new WinSymbol2(this._view,cprop.GetAnimData(),cSym);
	
	winArr[j][cPos].StartAnim({x:rPos[j-1].x,y:rPos[j-1].y+(symHeight*cPos)},cprop.GetSetData().advanced_set[0][cprop.GetSetData().advanced_set[0].length-1]);	

	
		
	
}
	
}


	
};
	
this.ShowAdvancedRollOpen=function(){

var rollIntr;	
	
var jc=1;
var ic=-1;	
	

var totalSym=0;	
var rCount=0;	
var rPos=gameReels.GetPositions();		
	
rollIntr=setInterval(function(){	

	
	
ic++;

var cSym="FS";	
var cPos=ic;		
var cprop=libArr['lnWinSym_'+cSym];		
winArr[jc][cPos].StopAnim();	
winArr[jc][cPos]=new WinSymbol2(self._view,cprop.GetAnimData(),cSym);
	
var sFrame=cprop.GetSetData().advanced_set[1][0];	
var tFrame=cprop.GetSetData().advanced_set[1][1];	
totalSym++;	
winArr[jc][ic].StartAnimDelay({x:rPos[jc-1].x,y:rPos[jc-1].y+(symHeight*cPos)},tFrame,sFrame,totalSym);		
	
if(ic>=2){
		
	
ic=-1;
jc++;	
	

	
}
	
if(jc>=6){
clearInterval(rollIntr);	
	
}
	
},200);		
	
};
	
this.StopBonusSymAnim=function(){
	
self.StopWinLine();	
dispatchEvent(new Event(SLOT_EVENT_AFTERSPIN));		
	
};

/*----------отображение бонусных символов-------------*/
	
this.ShowScattersAnim=function(){

var rPos=gameReels.GetPositions();		
	
for(var j=1;j<=5;j++){

if(slotSpinResult.bonusInfo['winReel'+j]==undefined){
continue;	
}
	
var cSym=slotSpinResult.bonusInfo['winReel'+j][1];
var cPos=parseInt(slotSpinResult.bonusInfo['winReel'+j][0]);	

cSym=self.ChangeScatters(cSym,j);	

var cSymTmp=cSym.split("_");	

cSym=cSymTmp[0]+'_2_'+cSymTmp[1];
	
if(bonusMode){
cSym+='_FS';	
}
	
console.log(cSym,cSymTmp);	
var cprop=libArr['lnWinSym_'+cSym];	
	
	
	if(winArr[j][cPos]!=undefined){
		winArr[j][cPos].StopAnim();
	}
	
	winArr[j][cPos]=new WinSymbol(this._view,cprop.GetAnimData(),cSym,cprop.GetSprite());
		
	winArr[j][cPos].StartAnim({x:rPos[j-1].x,y:rPos[j-1].y+(symHeight*cPos)});		
}
	


isMainShow=false;
this.ShowScattersWin();	


	


}
/*----------отображение выигрыша по бонусным символам-------------*/
	
this.ShowScattersWin=function(){

var rPos=gameReels.GetPositions();		
	
self.HideLines();
	
for(var i=0;i<=5;i++){
	
if(borderArr[i]!=undefined){	
self._view.removeChild(borderArr[i]);
	
}
	
}
borderArr=new Array();		
	
var scCount=0;	
	
for(var j=1;j<=5;j++){

if(slotSpinResult.bonusInfo['winReel'+j]==undefined){
continue;	
}

scCount++;	
	
var cSym=slotSpinResult.bonusInfo['winReel'+j][1];
var cPos=parseInt(slotSpinResult.bonusInfo['winReel'+j][0]);	

borderArr[j]=libArr['lnBorder'+8].clone();
	winArr[j][cPos].ResetAnim();	
	self._view.addChild(borderArr[j]);
		
	borderArr[j].set({x:winArr[j][cPos]._view.x,y:winArr[j][cPos]._view.y,scaleX:1.01,scaleY:1.004});	
		
	
}	

if(isMainScatters){	
	
var winEvent=new CustomEvent(SLOT_EVENT_WINSCATTERS,{detail:{cnt:scCount}});		
dispatchEvent(winEvent);	

}
	
isMainScatters=false;	

clearTimeout(timeoutShow);	
	
timeoutShow=setTimeout(function(){


	
if(slotSpinResult.bonusInfo.scattersType=="bonus" && slotSettings.slotBonus){

	

	
self.StopWinLine();	
	
dispatchEvent(new Event(SLOT_EVENT_STARTBONUS));	
	

	
}else{

if(bonusMode && currentSound['FS']!=undefined && soundMode){
	
	currentSound['FS'].volume=1;	
		
	}		
	
if(slotSpinResult.winLines.length>0){
	
if(slotSpinResult.freeMultiplier!=undefined){
	
self.ShowMultiplier();	
}else if(slotSpinResult.respinMode){	

dispatchEvent(new Event(SLOT_EVENT_STARTRESPIN));	
	
}else{	
slotState=SLOT_STATE_AFTERWIN;	
dispatchEvent(new Event(SLOT_EVENT_ENDWINLINE));	
timeoutShow=setTimeout(self.ShowCurrentWinLine,1000);	
	
}
	
}else{

if(slotSpinResult.freeMultiplier!=undefined){
	
self.ShowMultiplier();	
}else if(slotSpinResult.respinMode){	

dispatchEvent(new Event(SLOT_EVENT_STARTRESPIN));	
	
}else{		
	
slotState=SLOT_STATE_AFTERWIN;	
dispatchEvent(new Event(SLOT_EVENT_ENDWINLINE));	

}
	
}
	
	
}

},currentSound['SCAT'].duration);		
	
};
	
/*----------отображение выигрышных линий-------------*/	
this.ShowCurrentWinLine=function(){


	
if(bonusMode && currentSound['FS']!=undefined && soundMode){
	
	currentSound['FS'].volume=1;	
		
	}	
	
self.HideLines();	

if(currentWinLine>slotSpinResult.winLines.length-1){

if(isMainShow){
isMainShow=false;
	
if(slotSpinResult.bonusInfo.scattersType!="bonus" && slotSpinResult.bonusInfo.scattersType!="win"){		

if(slotSpinResult.freeMultiplier!=undefined){
	
self.ShowMultiplier();	
}else if(slotSpinResult.respinMode){	

dispatchEvent(new Event(SLOT_EVENT_STARTRESPIN));	
return;	
}else{		
	
slotState=SLOT_STATE_AFTERWIN;	
dispatchEvent(new Event(SLOT_EVENT_ENDWINLINE));
	
}
	
}
	
}
currentWinLine=0;	
	
}	
	
var cLine=parseInt(slotSpinResult.winLines[currentWinLine].Line)+1;	
	
	
self._view.addChild(objArr['lnLine'+cLine]);	
	
for(var i=0;i<=5;i++){
	
if(borderArr[i]!=undefined){	
self._view.removeChild(borderArr[i]);
	
}
	
}
borderArr=new Array();	
	
for(var j=1;j<=5;j++){



	
	var cPos=slotSpinResult.winLines[currentWinLine]['winReel'+j][0];	

	if(cPos!="none"){
	
	
		
	
		
		
	borderArr[j]=libArr['lnBorder'+cLine].clone();
	winArr[j][cPos].ResetAnim();	
	self._view.addChild(borderArr[j]);
		
	borderArr[j].set({x:winArr[j][cPos]._view.x,y:winArr[j][cPos]._view.y,scaleX:1.01,scaleY:1.004});	


	
	}
		
	
}
	
	
if(isMainShow){
	
var winEvent=new CustomEvent(SLOT_EVENT_WINLINE,{detail:{stepwin:slotSpinResult.winLines[currentWinLine].stepWin,win:slotSpinResult.winLines[currentWinLine].Win,line:slotSpinResult.winLines[currentWinLine].Line,count:slotSpinResult.winLines[currentWinLine].Count}});		
dispatchEvent(winEvent);	

	
}else{

var winEvent=new CustomEvent(SLOT_EVENT_WINLINE_WAIT,{detail:{stepwin:slotSpinResult.winLines[currentWinLine].stepWin,win:slotSpinResult.winLines[currentWinLine].Win,line:slotSpinResult.winLines[currentWinLine].Line}});		
dispatchEvent(winEvent);	
	
}
	
currentWinLine++;	
	
	
	
	

	
clearTimeout(timeoutShow);	
	
if(isMainShow){
	

	
	
}else{

/////////	
if(slotSpinResult.bonusInfo.scattersType=="bonus" || slotSpinResult.bonusInfo.scattersType=="win"){	

if(slotSpinResult.freeMultiplier!=undefined){
	
self.ShowMultiplier();	
}else{		
	
self.ShowScattersAnim();
}
	
	
}else{
	
	timeoutShow=setTimeout(self.ShowCurrentWinLine,1000);	
}
//////////	
	
	
}
	
};		
	
	
/*

убираем выигрышную анимация и линии

*/	
	
this.StopWinLine=function(){

if(bonusMode && currentSound['FS']!=undefined && soundMode){
	
	currentSound['FS'].volume=1;	
		
	}	
	
self.HideLines();	
clearTimeout(timeoutShow);

for(var i=0;i<=5;i++){
	
if(borderArr[i]!=undefined){	
self._view.removeChild(borderArr[i]);
	
}
	
}
borderArr=new Array();	
	
for(var j=1;j<=5;j++){


for(var i=0;i<=2;i++){
	
	var cPos=i;	

	if(winArr[j]!=undefined){
	
	if(winArr[j][i]!=undefined){
	
	
	winArr[j][i].StopAnim();	
	
	
	}
		
	}
}	
	
}
	
	
winArr=new Array();
	
clearTimeout(timeoutShow);	

	
};			
	
/*убрать все линии*/	
	
	
this.HideLines=function(){
clearTimeout(timeoutShow);
for(var i=1; i<=9; i++){
self._view.removeChild(objArr['lnLine'+i]);	
}
	
};
	
	
/*установка линий*/
	
this.SetLines=function(){

for(var i=1; i<=9; i++){
this._view.removeChild(objArr['lnLine'+i]);	
	
this._view.removeChild(objArr['lnBox'+i+'_0']);	
this._view.removeChild(objArr['lnBox'+i+'_1']);	
	
this._view.removeChild(objArr['lnBoxText'+i+'_0']);	
this._view.removeChild(objArr['lnBoxText'+i+'_1']);	
	

}
	
for(var i=1; i<=slotStateData.lines; i++){
	
	
this._view.addChild(objArr['lnBox'+i+'_0']);	
this._view.addChild(objArr['lnBox'+i+'_1']);		
	
this._view.addChild(objArr['lnLine'+i]);
	
	
this._view.addChild(objArr['lnBoxText'+i+'_0']);	
this._view.addChild(objArr['lnBoxText'+i+'_1']);		
	
objArr['lnBoxText'+i+'_0'].text=NumFormat(slotStateData.betline);
objArr['lnBoxText'+i+'_1'].text=NumFormat(slotStateData.betline);
	
}	
clearTimeout(timeoutShow);	
timeoutShow=setTimeout(this.HideLines,1000);	
};	

this.HideLines();	
	

/*подписываемся на события*/	
	
addEventListener("stopBonusSym",function(){self.StopBonusSymAnim();});

addEventListener(SLOT_EVENT_STARTRESPIN,function(){

clearTimeout(timeoutShow);		
self.HideLines();	
self.StopWinLine();


});	
	
addEventListener(SLOT_EVENT_START,function(){self.SetLines();});
addEventListener(SLOT_EVENT_BET,function(){self.SetLines();});
addEventListener(SLOT_EVENT_LINES,function(){self.SetLines();});	
addEventListener(SLOT_EVENT_STARTSPIN,function(){self.HideLines();});	
addEventListener(SLOT_EVENT_RESULTSPIN,function(){
	
	if(slotSettings.slotBonusType==1 && bonusMode){
	
	self.ShowAdvancedRollOpen();
	}
		
});	
addEventListener(SLOT_EVENT_STARTADDWIN,function(){
	self.StopWinLine();

});	
addEventListener(SLOT_EVENT_WINLINENEXT,function(ev){timeoutShow=setTimeout(self.ShowCurrentWinLine,ev.detail.delay);});		
addEventListener(SLOT_EVENT_GAMBLESTART,function(){self.StopWinLine();});	
addEventListener(SLOT_EVENT_SPINBONUS,function(){self.StopWinLine();self.HideLines();});	
addEventListener(SLOT_EVENT_ADVANCEDSPINBONUS,function(){
	

	
	self.ShowAdvancedRoll();});	
addEventListener(SLOT_EVENT_ENDBONUS,function(){self.StopWinLine();self.HideLines();});	
	

	
return this;	
	
}