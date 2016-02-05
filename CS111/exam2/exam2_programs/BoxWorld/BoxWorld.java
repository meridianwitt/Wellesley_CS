import java.awt.*;

// CS111 Fall 2013 Take Home Exam

public class BoxWorld extends BuggleWorld {
  
    //------------------------------------------------------------------------------
    // The following main method is needed to run the applet as an application
  
    public static void main (String[] args) {
        runAsApplication(new BoxWorld(), "BoxWorld"); 
    }
  
    // Instance variables
    String parameterNames [] = {"boxSize", "firstColor","secondColor"};
    String resultNames [] = {"droppedBagels"};
    protected ParameterFrame params;
    
    public void setup () {
      // Set up parameter window
      params = new ParameterFrame("BoxWorld", 300, 200, parameterNames, resultNames);
      params.setIntParam("boxSize", 16);
      params.setColorParam("firstColor", Color.red);
      params.setColorParam("secondColor", Color.blue);
      params.setVisible(true);
      java.awt.EventQueue.invokeLater(new Runnable() {
          @Override
          public void run() {
            params.toFront();
            params.repaint();
          }
        });

    }
    
    public void reset () {
      int boxSize = params.getIntParam("boxSize");
      int gridSize = (boxSize > 0) ? 2 * boxSize : 4;
      setDimensions(gridSize, gridSize);
      params.setIntResult("droppedBagels", 0);
      super.reset();
    }
    
    public void run () {
      BoxBuggle rocky = new BoxBuggle();
      rocky.brushUp();
      rocky.setColor(params.getColorParam("firstColor"));
      params.setIntResult("droppedBagels",
                          rocky.drawAllBoxes(params.getIntParam("boxSize"),
                                             params.getColorParam("firstColor"),
                                             params.getColorParam("secondColor")));
//      rocky.drawBox(params.getIntParam("boxSize"));
//      rocky.drawAllBoxes(params.getIntParam("boxSize"),
//                        params.getColorParam("firstColor"), 
//                        params.getColorParam("secondColor"));
      
    } // end of the run() method
    
} // class BoxWorld

// Add your BoxBuggle class definition below.
// Your class should include an instance method, "drawAllBoxes",
// that has three parameters: 1) an integer parameter, n, corresponding to the side length
// of the initial box in the first row, 2) the first color and 3) the second color.  The method should 
// return the total number of bagels dropped.
class BoxBuggle extends Buggle{

  
  public void drawBoxSide(int n){ //to draw one side of a bagel box
    if (n==0){
    //do nothing
    } else {
    dropBagel();
    forward();
    drawBoxSide(n-1);
   }
  }
  
  public void colorPathSide1(int n, Color c1){ //draw one side of the color box
    if (n==0){
    //do nothing
    } else {
    setColor(c1);
    brushDown();
    forward();
    colorPathSide1(n-1, c1);
    }
  }
  
  public void drawBox(int n){ //draws bagel box 
    if(n>2){
   brushUp();
   drawBoxSide(n-1);
   left();
   drawBoxSide(n-1);
   left();
   drawBoxSide(n-1);
   left();
   drawBoxSide(n-1);
   left();
    }
  }
  
  public void colorPath1(int n, Color c1){ //draws color box
   colorPathSide1(n-1, c1);
   left();
   colorPathSide1(n-1, c1);
   left();
   colorPathSide1(n-1, c1);
   left();
   colorPathSide1(n-1, c1);
   left();
  }
  
  public void moveIn(){ //to move into the innersquare
   forward();
   left();
   forward();
   right();
  }
  
  public void moveOut(int n){ //to make the position invariant, is the opposite 
                              //of nestedBox
    brushUp();
    if (n<=3){ 
      backward();
      left();
      backward();
      right();
    }else{
      backward();
      left();
      backward();
      right();
      backward();
      left();
      backward();
      right();
    }
  }
 
  public void nestedBox(int n, Color c1){ //creates the bagel and color box 
    drawBox(n);
    n = n - 2;
    if (n<2){
    //do nothing
    } else {
    moveIn();
    colorPath1(n,c1);
   } 
  }
   
  public int nestedBoxesWhole(int n, Color c1, Color c2){ //recursive action for 
                                                          //nesting boxes
    int bagels=0;
    if(n<=2){
      //moveOut1();
      return 0;
    } else {
      nestedBox(n, c1);
      bagels = (((n-2)*4) + 4);
      moveIn();
      bagels = nestedBoxesWhole(n-4,c2, c1) + bagels;
      moveOut(n);
      return bagels;
    }
  }
  
  public void nextRow(int n){ //moves to next row
      backward(n+n/2+n/4+n/8);
      left();
      forward(n);
      right();
  }
  
  public void orgPos(int n){ //returns to original position after draw all boxes
      brushUp();
      left();
      backward(n-(n/32));
      right();
  }
  
  public int drawAllBoxes(int n, Color c1, Color c2){ 
    int bagels=0;
    if(n<6){
      bagels = nestedBoxesWhole(n, c1, c2);
    } else {
      bagels = bagels + nestedBoxesWhole(n, c1,c2);
      forward(n);
      bagels = bagels + nestedBoxesWhole(n/2, c1,c2); 
      //way to make code shorter? the division as part of the recursive action?   
      forward(n/2);
      bagels = bagels + nestedBoxesWhole(n/4, c1,c2);
      forward(n/4); 
      bagels = bagels + nestedBoxesWhole(n/8, c1,c2); 
      forward(n/8); 
      bagels = bagels + nestedBoxesWhole(n/16, c1,c2);      
      
      nextRow(n);//moves to the next row
      bagels = bagels+drawAllBoxes(n/2, c1, c2);
      orgPos(n);//returns bagel to original position
     
      
    } return bagels;
  }
  
}















