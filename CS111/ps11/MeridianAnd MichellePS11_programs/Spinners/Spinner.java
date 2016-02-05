import java.awt.*;

class Spinner extends Sprite 
{
    // flesh out this class

    // Declare your instance variables here:    
     private int x; //center position
     private int y; //center position
     private int radius; //initial horizontal radius and constant height
     private int dRadius; //change in horizontal radius, delta radius
     protected int height;
     private Color initColor1;
     private Color color1; //side1
     private Color color2; //side 2
     
     
  
        
    public Spinner(int x, int y, int radius, int dRadius, Color color1, Color color2)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        height = radius;
        this.dRadius = dRadius;
        initColor1 = color1;
        this.color1 = color1;
        this.color2 = color2;  
    }
    
    public void resetState()
    {
        this.radius = height;
        initColor1 = color1;
    }
    public void updateState()
    {
        // flesh out this stub
      this.radius = radius - dRadius;
      
      if(this.radius <= 0){ //0 or radius?
       //this.radius = radius;
        if(this.initColor1 == color2){
         initColor1 = color1;
        } else {
         initColor1 = color2;
        }
       dRadius = -dRadius;
      } else if ( this.radius >= height){ 
        //this.initColor1 = color1;
        dRadius = -dRadius;
      } 
    }
    public void drawState(Graphics g)
    {
        // flesh out this stub, set color and fill
      g.setColor(initColor1);
      g.fillOval(x-radius, y-height, 2*radius, 2*height);
      g.setColor(Color.black);
      g.drawLine(x,0,x,y-height);
    }
        
    // Declare any auxiliary methods here:

}

