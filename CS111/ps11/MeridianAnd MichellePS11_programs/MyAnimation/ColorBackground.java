//Meridian Witt and Michelle N.

import java.awt.*; // use graphics
import  java.awt.Image;


// This Sprite fills the background with the given color.
public class ColorBackground extends Sprite {

  // Instance Variables  
  protected Color color;
  private int counter;
  private Color blue;
  
  // Constructors
  public ColorBackground() {
    blue = new Color(176,224,230);
    this.color = blue; // blue background
    counter = 0;
  }

  public ColorBackground(Color c) {
    this.color = c;
  }

  // Required Sprite methods
  protected void drawState (Graphics g) {
  
    g.setColor(this.color); //draws the blue background
    g.fillRect(0,0,this.width,this.height); 
    

      
    
    g.setColor(Color.gray);
    g.fillRect(400,500, 200,100); //snowglobe stand
    g.setColor(Color.white);
    g.fillOval(250,50,500,500); //snowglobe 
  }
    
  protected void updateState () {
   color = color.darker();
   counter = counter + 1;
   if (counter > 10) {
     color = blue.darker();
     counter = 0;
   }
  }
 

  protected void resetState () {
   color = blue;
}
}
