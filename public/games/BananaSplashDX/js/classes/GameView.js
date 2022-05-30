

/////////////UI class////////////////////

function GameView(viewContainer,setObj){

this._view=new PIXI.Container();
	
var self=this;

var objArr=new Array();	

var tx=PIXI.Texture.fromFrame('top');
objArr['top']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('foreground0');
objArr['foreground0']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('bottom');
objArr['bottom']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('foreground1');
objArr['foreground1']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle0');
objArr['middle0']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle1');
objArr['middle1']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle2');
objArr['middle2']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle3');
objArr['middle3']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle4');
objArr['middle4']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle5');
objArr['middle5']=new PIXI.Sprite(tx);


objArr['top'].x=setObj['top'].x;		
objArr['top'].y=setObj['top'].y;

objArr['foreground0'].x=setObj['foreground0'].x;		
objArr['foreground0'].y=setObj['foreground0'].y;

objArr['bottom'].x=setObj['bottom'].x;		
objArr['bottom'].y=setObj['bottom'].y;

objArr['foreground1'].x=setObj['foreground1'].x;		
objArr['foreground1'].y=setObj['foreground1'].y;

objArr['middle0'].x=setObj['middle0'].x;		
objArr['middle0'].y=setObj['middle0'].y;

objArr['middle1'].x=setObj['middle1'].x;		
objArr['middle1'].y=setObj['middle1'].y;

objArr['middle2'].x=setObj['middle2'].x;		
objArr['middle2'].y=setObj['middle2'].y;

objArr['middle3'].x=setObj['middle3'].x;		
objArr['middle3'].y=setObj['middle3'].y;

objArr['middle4'].x=setObj['middle4'].x;		
objArr['middle4'].y=setObj['middle4'].y;

objArr['middle5'].x=setObj['middle5'].x;		
objArr['middle5'].y=setObj['middle5'].y;	

	
var tx=PIXI.Texture.fromFrame('topInFreeSpins');	
objArr['topInFreeSpins']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('bottomInFreeSpins');	
objArr['bottomInFreeSpins']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle0InFreeSpins');	
objArr['middle0InFreeSpins']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle1InFreeSpins');	
objArr['middle1InFreeSpins']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle2InFreeSpins');	
objArr['middle2InFreeSpins']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle3InFreeSpins');	
objArr['middle3InFreeSpins']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle4InFreeSpins');	
objArr['middle4InFreeSpins']=new PIXI.Sprite(tx);

var tx=PIXI.Texture.fromFrame('middle5InFreeSpins');	
objArr['middle5InFreeSpins']=new PIXI.Sprite(tx);


objArr['topInFreeSpins'].x=setObj['topInFreeSpins'].x;		
objArr['topInFreeSpins'].y=setObj['topInFreeSpins'].y;

objArr['bottomInFreeSpins'].x=setObj['bottomInFreeSpins'].x;		
objArr['bottomInFreeSpins'].y=setObj['bottomInFreeSpins'].y;

objArr['middle0InFreeSpins'].x=setObj['middle0InFreeSpins'].x;		
objArr['middle0InFreeSpins'].y=setObj['middle0InFreeSpins'].y;

objArr['middle1InFreeSpins'].x=setObj['middle1InFreeSpins'].x;		
objArr['middle1InFreeSpins'].y=setObj['middle1InFreeSpins'].y;

objArr['middle2InFreeSpins'].x=setObj['middle2InFreeSpins'].x;		
objArr['middle2InFreeSpins'].y=setObj['middle2InFreeSpins'].y;

objArr['middle3InFreeSpins'].x=setObj['middle3InFreeSpins'].x;		
objArr['middle3InFreeSpins'].y=setObj['middle3InFreeSpins'].y;

objArr['middle4InFreeSpins'].x=setObj['middle4InFreeSpins'].x;		
objArr['middle4InFreeSpins'].y=setObj['middle4InFreeSpins'].y;

objArr['middle5InFreeSpins'].x=setObj['middle5InFreeSpins'].x;		
objArr['middle5InFreeSpins'].y=setObj['middle5InFreeSpins'].y;
	
objArr['topInFreeSpins'].visible=false;
objArr['bottomInFreeSpins'].visible=false;
objArr['middle0InFreeSpins'].visible=false;
objArr['middle1InFreeSpins'].visible=false;
objArr['middle2InFreeSpins'].visible=false;
objArr['middle3InFreeSpins'].visible=false;
objArr['middle4InFreeSpins'].visible=false;
objArr['middle5InFreeSpins'].visible=false;	

this._view.addChild(objArr['top']);
this._view.addChild(objArr['foreground0']);
this._view.addChild(objArr['bottom']);
this._view.addChild(objArr['foreground1']);
this._view.addChild(objArr['middle0']);
this._view.addChild(objArr['middle1']);
this._view.addChild(objArr['middle2']);
this._view.addChild(objArr['middle3']);
this._view.addChild(objArr['middle4']);
this._view.addChild(objArr['middle5']);
		
this._view.addChild(objArr['topInFreeSpins']);
this._view.addChild(objArr['bottomInFreeSpins']);
this._view.addChild(objArr['middle0InFreeSpins']);
this._view.addChild(objArr['middle1InFreeSpins']);
this._view.addChild(objArr['middle2InFreeSpins']);
this._view.addChild(objArr['middle3InFreeSpins']);
this._view.addChild(objArr['middle4InFreeSpins']);
this._view.addChild(objArr['middle5InFreeSpins']);	
	
viewContainer.addChild(this._view);	
	
this.gamePosition={x:this._view.x,y:this._view.y,width:tx._frame.width,height:tx._frame.height};



this.GetGamePosition=function(){
	
return this.gamePosition;	
};

this.ShowBonus=function(){
	
objArr['topInFreeSpins'].visible=true;
objArr['bottomInFreeSpins'].visible=true;
objArr['middle0InFreeSpins'].visible=true;
objArr['middle1InFreeSpins'].visible=true;
objArr['middle2InFreeSpins'].visible=true;
objArr['middle3InFreeSpins'].visible=true;
objArr['middle4InFreeSpins'].visible=true;
objArr['middle5InFreeSpins'].visible=true;
	
};
	

	
	
this.EndBonus=function(){

objArr['topInFreeSpins'].visible=false;
objArr['bottomInFreeSpins'].visible=false;
objArr['middle0InFreeSpins'].visible=false;
objArr['middle1InFreeSpins'].visible=false;
objArr['middle2InFreeSpins'].visible=false;
objArr['middle3InFreeSpins'].visible=false;
objArr['middle4InFreeSpins'].visible=false;
objArr['middle5InFreeSpins'].visible=false;	
	
	
};
	

	

	

addEventListener(SLOT_EVENT_STARTBONUS,function(){self.ShowBonus();});	

addEventListener(SLOT_EVENT_ENDBONUS,function(){self.EndBonus();});	
	

	
return this;	
	
}