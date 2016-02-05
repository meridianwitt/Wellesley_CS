/* 
 *  Meridian Witt
 *  CS111 PS 1
 *  09/04/13
 *  Task 1
 *
 *  I discussed my program strategy with no one.
 */

import java.awt.*;
public class Writing extends BuggleWorld
{
  public void setup ()
  {
    setDimensions(21, 7);   //set up 21 x 7 grid
  } 
  
  public void run () {
  Buggle peter = new Buggle();
  peter.setColor(Color.blue); //blue letter P
  peter.brushUp(); //space over for P
  peter.forward(1);
  peter.brushDown();
  peter.left();
  peter.forward(6); //vertical line 
  peter.right();
  peter.forward(5); //top of curve
  peter.brushUp();
  peter.right();
  peter.forward();//empty space
  peter.brushDown();
  peter.forward(2);//easternmost part of curve
  peter.brushUp(); //empty space
  peter.right();
  peter.forward(1);
  peter.brushDown();
  peter.forward(4); //bottom of curve
  peter.brushUp();
  peter.left();
  peter.forward(3);
  peter.left();
  peter.forward(6);
  peter.dropBagel();
  peter.setColor(Color.magenta); 
  peter.left();      
  peter.forward();
  peter.right(); //begin S
  peter.forward(2);
  peter.brushDown();
  peter.right();
  peter.forward(); //beginning of bottom curve of S
  peter.left();
  peter.forward(5); //bottom of S
  peter.brushUp(); //trail to drop bagel
  peter.forward();
  peter.dropBagel(); //drop bagel
  peter.backward(); //back on the S
  peter.left(); 
  peter.brushDown(); //rest of lower S curve
  peter.forward(3);
  peter.left(); //right side of the bottom S curve
  peter.forward(5); //top of lower S curve
  peter.right(); //left side of upper curve
  peter.forward(3);
  peter.right();
  peter.forward(5); //top side of uppper curve 
  peter.right();
  peter.forward();
  peter.left();
  peter.forward();
  peter.brushUp();
  peter.backward();
  peter.left();
  peter.forward();
  peter.right();
  peter.forward(3); //beginning of I            
  peter.setColor(Color.yellow);
  peter.brushDown();
  peter.right();
  peter.forward(6);
  peter.backward(6);
  peter.left();
  peter.brushUp();
  peter.forward(2);
  peter.right();
  peter.setColor(Color.black);
  peter.brushDown();
  peter.forward(5);
  peter.brushUp();
  peter.forward();
  peter.brushDown();
  peter.forward();
    
    
  }
  
  public static void main (String[] args)
  {
    runAsApplication(new Writing(), "Writing"); 
  }
}
    