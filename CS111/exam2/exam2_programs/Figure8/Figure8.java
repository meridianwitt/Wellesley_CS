/* FILE NAME: Figure8.java
 *
 * 
 * 
 * CS111 Exam 2 Fall 2013
 * 
 */

import java.awt.*;  

public class Figure8 extends TurtleWorld {
  
  String parameterNames [] = {"size", "level"};
  String resultNames [] = {"numFig8s"};
  protected ParameterFrame params;
  
  public void setup() {
    params = new ParameterFrame("Figure8 Parameters",200, 125, parameterNames, resultNames);
    params.setVisible(true);
    java.awt.EventQueue.invokeLater(new Runnable() {
          @Override
          public void run() {
            params.toFront();
            params.repaint();
          }
        });
  }
  
  public void run() {
    EightMaker pea = new EightMaker();
    // The three lines below put the turtle in a good starting position
    pea.pu();
    pea.bd(220);
    pea.pd();
    //pea.drawOneFigure8(params.getDoubleParam("size"));
    //pea.makePattern(params.getDoubleParam("size"),
    //                        params.getIntParam("level"));
    //pea.makePatternWithColors(params.getDoubleParam("size"),
    //                        params.getIntParam("level"), Color.green, Color.red, Color.blue);
    
    //pea.pu();
    //pea.setColor(Color.blue); // changing Turtle's pen color
    
    //int total = (int)Math.pow(9, params.getIntParam("level")-1);
    
    // You can comment out the makePattern() invocation, when testing drawOneFigure8() or
    // the method makePatternWithColors().
    
    // the line below displays the variable total in the cyan parameter window labeled "numFig8s"
    
    //params.setIntResult("numFig8s", pea.makePatternWithColors(params.getDoubleParam("size"),
    //                      params.getIntParam("level"))); 
    
    params.setIntResult("numFig8s", pea.makePatternWithColors(params.getDoubleParam("size"),
                            params.getIntParam("level"), Color.green, Color.red, Color.blue)); 
    
  }
  
  //------------------------------------------------------------------------------
  // The following main method is needed to run the applet as an application
  
  public static void main (String[] args) {
    runAsApplication(new Figure8(), "Figure8"); 
  }
  
}

// Write your EightMaker class here
  class EightMaker extends Turtle {
    
    public void drawOneFigure8(double sizelargest){
     double len = sizelargest;
     fd(len);
     lt(90.0);
     fd(len);
     rt(90.0);
     fd(len);
     rt(90.0);
     fd(len);
     rt(90.0);
     fd(len);
     lt(90.0);
     fd(len);
     lt(90.0);
     fd(len);
     lt(90.0);
     fd(len);
     rt(90.0);
     fd(len);
    }
    
    public int makePattern(double sizelargest, int levels){
      int total = 0;
      double largestseg = sizelargest/3;
      if (levels == 0){
        return total;
      }else if (levels == 1){
        drawOneFigure8(sizelargest);
        total = 1;
        return total;
      } else {
        makePattern(largestseg, levels -1);
        lt(90);
        makePattern(largestseg, levels -1);
        rt(90);
        makePattern(largestseg, levels -1);
        rt(90);
        makePattern(largestseg, levels -1);
        rt(90);
        makePattern(largestseg, levels -1);
        lt(90);
        makePattern(largestseg, levels -1);
        lt(90);
        makePattern(largestseg, levels -1);
        lt(90);
        makePattern(largestseg, levels -1);
        rt(90);
        makePattern(largestseg, levels -1);
        total = (int)Math.pow(9, levels-1); //this is not allowed, look at the pset and recursion notes
        return total; //gives a lot of numbers before the right answer at the end
      }
    }
    public int makePatternWithColors(double sizelargest, int levels, Color c1, Color c2, Color c3){
    int total = 0;
      double largestseg = sizelargest/3;
      if (levels == 0){
        return total;
      }else if (levels == 1){
        drawOneFigure8(sizelargest);
        total = 1;
        return total;
      } else {
        setColor(c1);
        makePatternWithColors(largestseg, levels -1, c1, c2, c3);
        
        lt(90);
        setColor(c1);
        makePatternWithColors(largestseg, levels -1, c1, c2, c3);
        //total = total + 9;
        rt(90);
        setColor(c1);
        makePatternWithColors(largestseg, levels -1, c1, c2, c3);
        //total = total + 9;
        rt(90);
        setColor(c2);
        makePatternWithColors(largestseg, levels -1, c1, c2, c3);
        //total = total + 9;
        rt(90);
        setColor(c2);
        makePatternWithColors(largestseg, levels -1, c1, c2, c3);
        //total = total + 9;
        lt(90);
        setColor(c2);
        makePatternWithColors(largestseg, levels -1, c1, c2, c3);
        //total = total + 9;
        lt(90);
        setColor(c3);
        makePatternWithColors(largestseg, levels -1, c1, c2, c3);
        //total = total + 9;
        lt(90);
        setColor(c3);
        makePatternWithColors(largestseg, levels -1, c1, c2, c3);
        //total = total + 9;
        rt(90);
        setColor(c3);
        total = makePatternWithColors(largestseg, levels -1, c1, c2, c3);
        //total = (int)Math.pow(9.0, levels-1);
        return total*9; 
      }
    }

  }
  
