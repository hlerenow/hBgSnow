# hBgSnow
hBgSnow插件Demo简介：

利用html5的canvas标签制作的一款jQuery动态背景插件,彩色小球无规则运动，可以跟随鼠标移动，最后消失，但是小球总数不会改变，使用简单、方便，压缩后体积只有4k.

使用方法：

将下面三部分代码放入对应位置，即可运行。

html:

 <div id="snowContainer">
 <canvas id="canvas"></canvas> 
 </div>
css:


  #snowContainer{
    background-color: black;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #canvas{
    position: fixed;
  }

javascript:


    hBgSnow({
      "canvas": "canvas",
      "colors": ["#00BCD4", "#CDDC39", "#E91E63", "#009688", "#FF6600", "white"],
      "snowsCount": 100,
      "snowSize": 5,
      "shadowSize": 3,
      "spedMaxX": 0.3,
      "spedMaxY": 0.3,
      "freshTime": 80,
      "onmousemove": {
        "run": true,
        "getRadious": 100
      }
    });

参数：

“canvas”: 一个字符串，画布容器<canvas>的id,只限id名.

“colors”: 一个颜色字符串数组，支持rgb,rgba,十六进制颜色值，颜色英文名，默认值为[“white”].

“snowsCount”:  一个Number 值，背景小球数量，默认值50.

“snowSize”:  一个Number 值，背景小球半径最大值，默认值5.

“shadowSize”: 一个Number 值，背景小球的边缘模糊值，默认值3.

“spedMaxX”:  一个Number 值，垂直方向最大移动速度值，单位px.

“spedMaxY”:  一个Number 值，水平方向最大移动速度值，单位px.

“freshTime”:  一个Number 值，每帧刷新时间，毫秒为单位，默认值80.

“onmousemove”: 设置鼠标移动时，小球是否跟随鼠标移动.

“run”: 一个boolean值，true时，小球跟随鼠标移动，false则不跟随鼠标移动，默认值false.

“getRadious”: 一个Number 值，设置跟随鼠标移动的小球范围，范围为以鼠标坐标为原点，半径为getRadious的圆的范围.

注意事项：

运行后若发现，没有效果，请查看dom的z-index,检查canvas 是否被其他dom元素遮挡。这是一个jQuery插件，使用时需提前引入jQuery文件。
