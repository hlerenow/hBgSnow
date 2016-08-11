hBgSnow=(function($){

        // 获取随机数,或者字符
        function getRand(){
          var arg=arguments;
          var rand=Math.random();
          if(arg.length==2){
              arg[0]=parseInt(arg[0]);
              arg[1]=parseInt(arg[1]);

              if(arg[0]==arg[1])
                return arg[0];

             if(!isNaN(arg[0])&&!isNaN(arg[1])&&(arg[1]>arg[0]))
             {
              rand=arg[0]+rand*(arg[1]-arg[0]);
              return Math.round(rand);
             }
             else{
              throw new Error("args error");  
              return 0;          
             }
          }
          else if(arg.length==1&&(arg[0] instanceof Array)){
            return arg[0][Math.floor(rand*arg[0].length)];
          }
          else{
            throw new Error("args count error");
            return 0;
          }
        }
      //全局
      var canvas;//画布对象
      var snowHandle;//控制雪花更新
      var painter;//画布上下文
      var allSnows=[];//所有的雪花对像
      var colors=["white"];//雪花颜色随即组
      var snowsCount=50; //雪花数量
      var snowSize=5;//雪花大小
      var shadowSize=3;//阴影大小
      var spedMaxX=0.5;//雪花垂直移动最大速度
      var spedMaxY=0.5;//雪花水平最大引动速度
      var freshTime=80;//每帧刷新时间，毫秒为单位
      var mouseX=0;
      var mouseY=0;
      var getRadious=100;//收缩半径

      // 画布自适应
      if (window.addEventListener) {
        window.addEventListener('resize', resizeCanvas, false); 
      } else if (window.attachEvent)  {
        window.attachEvent('resize', resizeCanvas);
      }    

      function resizeCanvas(){
        canvas.width = $(canvas).parent().width();
        canvas.height = $(canvas).parent().height();
        hSnow.prototype.maxX = canvas.width;
        hSnow.prototype.maxY = canvas.height;
      }


      // 雪花对象
      var hSnow=function(){
        this.alive=true;
        this.x=getRand(0,this.maxX);
        this.y=getRand(0,this.maxY);
        this.currentSize=0;
        this.color=getRand(colors);
        this.size=getRand(1,snowSize);
        this.spedX=parseFloat(getRand(["+","-"])+getRand(1,3)*spedMaxX);
        this.spedY=parseFloat(getRand(["+","-"])+getRand(1,3)*spedMaxY);
      }; 
      hSnow.prototype.maxX=300; 
      hSnow.prototype.maxY=400; 
      hSnow.prototype.haveGoal=false;
      hSnow.prototype.checkSnow=function(){
        if(this.x>(this.maxX+this.size)||this.x<(0-this.size)){
          this.alive=false;
          return;
        }
        else if(this.y>(this.maxY+this.size)||this.y<(0-this.size)){
          this.alive=false;
          return ;
        }
      };
      hSnow.prototype.getNextSnowPos=function(){
        var times=5;
        var distance=Math.sqrt(Math.pow(mouseX-this.x,2)+Math.pow(mouseY-this.y,2));          
        var haveGoalSped=5;
        // 有移动目标时
        if(this.haveGoal){
          if(distance<3)
          {
            this.x=mouseX;
            this.y=mouseY;
            this.alive=false;
          }
          else{
            this.x=((mouseX-this.x)/distance)*haveGoalSped+this.x;
            this.y=((mouseY-this.y)/distance)*haveGoalSped+this.y;            
          }
        }
        else{
          var aX=arguments[0]||this.spedX;
          var aY=arguments[1]||this.spedY;

          if(aX==0&&aY==0){
            //console.log(aX,aY);
          }
          this.x=this.x+aX;
          this.y=this.y+aY;
          if(this.currentSize<this.size){
            this.currentSize+=0.3;
          }       
        }
      }

      hSnow.prototype.drawSnow=function(){
        painter.beginPath();
        painter.fillStyle=this.color;
        painter.shadowColor = this.color;
        painter.shadowBlur = shadowSize;
        painter.arc(this.x,this.y,this.currentSize,0,2*Math.PI);
        painter.closePath();
        painter.fill();
      }

     function getSnows(x,y){
          function mouseMovePos(e){
            if(e.offsetX||e.layerX)
            {
              mouseX=e.offsetX==undefined?e.LayerX:e.offsetX;
              mouseY=e.offsetY==undefined?e.LayerY:e.offsetY;
              //console.log(mouseX+":"+mouseY);
            }
            for(var i=0;i<allSnows.length;i++){

              var lengTemp=Math.sqrt(Math.pow(allSnows[i].x-mouseX,2)+Math.pow(allSnows[i].y-mouseY,2));
              //console.log(lengTemp);
              if(lengTemp<getRadious)
              {
                //console.log("true");
                allSnows[i].haveGoal=true;
                
              }
              else{
                allSnows[i].haveGoal=false;              
              }
            }          
          }

        if (canvas.addEventListener) {
          canvas.addEventListener('mousemove', mouseMovePos, false);
          canvas.addEventListener('mouseover', function() {


          }, false);
          canvas.addEventListener('mouseout', function() {
            //console.log("false");
            for(var i=0;i<allSnows.length;i++){
              allSnows[i].haveGoal=false;
            }          
          }, false);

        } else if (canvas.attachEvent) {
          canvas.attachEvent('mousemove', mouseMovePos);
          canvas.attachEvent('mouseover', function() {
            hSnow.prototype.haveGoal = true;

          });
          canvas.attachEvent('mouseout', function() {
            //console.log(message);
            hSnow.prototype.haveGoal = false;
          });
        }
      }      


    return function(){
      canvas=document.getElementById(arguments[0]["canvas"]);
      if(!canvas.getContext) return ;
      painter=canvas.getContext("2d");

      var arg=arguments[0];
      colors=arg["colors"]||colors;
      snowsCount=arg["snowsCount"]||snowsCount;
      snowSize=arg["snowSize"]||snowSize;
      shadowSize=arg["shadowSize"]||shadowSize;
      spedMaxX=arg["spedMaxX"]||spedMaxX;
      spedMaxY=arg["spedMaxY"]||spedMaxY;
      freshTime=arg["freshTime"]||freshTime;

      if(arg["onmousemove"]){

      getRadious=arg["onmousemove"]["getRadious"]||getRadious;
      }

      canvas.width=$(canvas).parent().width();
      canvas.height=$(canvas).parent().height(); 
      hSnow.prototype.maxX=canvas.width; 
      hSnow.prototype.maxY=canvas.height;            

      // 初始化雪花
      for(var i=0;i<snowsCount;i++){
        allSnows[i]=new hSnow();
        allSnows[i].drawSnow();
      }   

      snowHandle=setInterval(function(){
        painter.clearRect(0, 0, canvas.width, canvas.height);;
        for(var i=0;i<allSnows.length;i++){
          allSnows[i].checkSnow();
          //console.log(allSnows[i].alive);
          if(allSnows[i].alive){
            allSnows[i].getNextSnowPos(); 
           //console.log("活着");           
          }
          else{
            allSnows[i]=new hSnow();
          }
          allSnows[i].drawSnow();
        }        
      },freshTime);  

      if(arg["onmousemove"]&&arg["onmousemove"]["run"]){
          getSnows();
      }


    };

    })($);