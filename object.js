
var Rod = function(length,thickness, canvas,left=[0,0],right=[0,0]){
    this.ctx = canvas.getContext('2d');
    this.length=length;
    this.thickness=thickness;
    this.left=left;
    this.right=right;
    };
  Rod.prototype.rotate = function(angle = 0, drawCircumference = true){
    this.ctx.lineWidth = this.thickness*ratio;
    this.ctx.translate(this.left[0], this.left[1]);
    this.ctx.rotate(convertToRadian(angle));
    this.ctx.beginPath();
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(this.length*ratio,0);
    this.ctx.stroke();
    this.ctx.closePath();
    if(drawCircumference == true){
      this.ctx.beginPath();
      this.ctx.arc(0,0,this.length*ratio, 0, 2*Math.PI, false);
      this.ctx.lineWidth = this.thickness/2;
      this.ctx.stroke();
      this.ctx.closePath();
    }
    this.right=[this.left[0]+ratio*this.length*Math.cos (convertToRadian(angle)),this.left[1]+ratio*this.length*Math.sin (convertToRadian(angle))];
    resetOrigin();
    };
Rod.prototype.attachLeft = function(point = [0,0]){
    this.left =point;
    };
var Slider = function(length,breadth, canvas, centre = [0,0]){
    this.ctx = canvas.getContext('2d');
    this.length=length;
    this.breadth=breadth;
    this.centre = centre;
    this.left = this.centre-this.length/2;
    this.right = this.centre+this.length/2
    };
Slider.prototype.attachCentre = function(point = [0,0]){
    this.centre = point;
    };

Slider.prototype.attachLeft = function(point){
        this.left=point;
        this.centre=[this.left[0]+this.length/2*ratio,this.left[1]];
        //this.right = [this.left[0]+this.length*ratio,this.left[1]];
    };

Slider.prototype.attachCentre = function(point){
    this.centre=point;
};

Slider.prototype.rotateCentre = function(angle = 0){
    this.ctx.translate(this.centre[0], this.centre[1]);
    this.ctx.rotate(convertToRadian(angle));
    this.ctx.strokeRect(- this.length/2*ratio, - this.breadth/2*ratio, this.length*ratio, this.breadth*ratio);
    resetOrigin();
    };
var angle = 0.0;
var fps=60;
    var aspectRatio=16/9;
    var f=1; //controls how slider and text box gets updated
    var flag=1; //controls whether angle is incremented
    //var ratio=canvas.width/1280;


    function convertToRadian(degree){
        return degree*(Math.PI/180);
    }
    function convertToDegree(radian){
        return radian/(Math.PI/180);
    }
    function incrementAngle(){

      if(dirRev.checked==0){
        angle = angle + parseFloat(omega2Slider.value);
      }
      else {
        angle = angle - parseFloat(omega2Slider.value);
      }  //parseInt converts the string returned by omega2Slider.value to an int
      if(angle > 360){
        angle = angle - 360;
      }
      else if (angle<0) {
        angle = angle+360;
      }
    }
    function calculatePhi(angle){
        return Math.asin((crank.length * Math.sin(convertToRadian(360 - angle)))/ connectingRod.length)
    }
    function sliderPositionFromCrank(angle){
        return Math.sqrt(Math.pow(connectingRod.length,2) - Math.pow(crank.length*Math.sin(convertToRadian(360 - angle)),2)) + crank.length*Math.cos(convertToRadian(360 - angle))
    }
    function resetOrigin(){
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    //starts updating text box values from slider
        function f1(){
        	f=1;
        }
    //stops updating text box from slider
        function f2(){
        	f=0;
        }
    //stops incrementing the value of angle
        function stop(){
          flag=0;
          angle=360-parseFloat(setAngle.value)%360;
          omega2Slider.value=0;
        }
    //gets slider value from text box
        function set1(){
          crankSlider.value=crankLengthText.value;
          connectingRodSlider.value=connectingRodText.value;
          omega2Slider.value=omega2Text.value;
          f=1;
        }
