//Meridian Witt and Michelle N.

import java.awt.*;


class Snowflakes extends TurtleSpriteNew{
  //Turtle Sprite code was making it really difficult to bounce
  //editted it such that 0 0 is in the UL corner, but now it will not resize

//instance variables 
  private int levels;
  private int length;
  private int dLevels;
  private double x; //location
  private double initx;
  private double inity;
  private double dx; //use the same way we used radius in spinner
  private double dy;
  private double y; //location
  private Color initColor1;
  private Color color1;
  private Color color2; //color changed to
  //private double radius;
  private int counter;
  private int counter2;
 
  //constructor, does it go here?
  public Snowflakes(int levels, int length, int x, int y, int dx, int dy, Color color1, Color color2){
   this.levels = 0;
   this.length = length;
   this.dLevels = 1;
   this.x = x; //overlay all the snowflakes and burst them out in a star shape
   this.y = y; //all start at 0
   initx = x;
   inity = y;
   this.dx = dx;
   this.dy= dy;
   initColor1 = color1;
   this.color1 = color1;
   this.color2 = color2;  
   //radius = 54;
   
   setColor(initColor1);
   
   //setBounds(100,100);
  }
  
  //drawState
  public void drawState(Graphics g){
   initGraphics(g);
   //g.setBackground(Color.blue);
   //SmallStar();
   snowflake(levels, length);
  }
  
  //updateState
  public void updateState(){
    counter2 = counter2 + 1;
    this.levels = levels + dLevels;
    x=x-dx;//
    y=y-dy;//moves on a diagonal
    counter = counter + 1;
    if(counter >20){
     dx = -dx;
     dy = -dy;
     counter = 0;
    }
   
    if(this.levels >= 3){ //we want the levels to stop at 3, where it looks like a snowflake
      setColor(color2);
      dLevels = -dLevels; //how to make sure it does not go to negative levels?
    } else if (this.levels <=0){
      setColor(initColor1);
      dLevels = -dLevels;
    }  
  }
  //reset
  public void resetState(){
   setColor(initColor1);
   levels=0;
   x = initx;
   y=inity;
   counter = 0;
  }
  
  //how to draw snowflake
  public void snowside (int levels, double length)
  {
    if (levels == 0) {
      fd(length);
    } else {
      snowside(levels - 1, length / 3.0);
      lt(60);
      snowside(levels - 1, length / 3.0); //stack overflow error occurs here?
      rt(120);
      snowside(levels - 1, length / 3.0);
      lt(60);
      snowside(levels - 1, length / 3.0);
    }
  }
  
  public void snowflake (int levels, double length)
  {
     //for(int i=0; i<299; i++){
    setPosition(x, y);
   
    snowside(levels, length);
    rt(120);
    snowside(levels, length);
    rt(120);
    snowside(levels, length);
    rt(120);
    //}
    }
  
 
}