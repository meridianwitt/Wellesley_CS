//Meridian Witt and Michelle N.

import java.awt.*; // use colors

public class MyShowcase extends AnimationShowcase {

  public MyShowcase () {
    // Add any animations for your PS10 Task 2 Animation here
    // You should change the string and class name "MyAnimation"
    // to be something that reflects the nature of your project. 
    
    addAnimation("TrippySnowflakesAnimation", new TrippySnowflakesAnimation());
    //addAnimation("BouncingBallAnimation", new BouncingBallAnimation());
    //addAnimation("NightBackgroundAnimation"), new NightBackgroundAnimation());
  }
    
  public static void main (String[] args) {
    runAsApplication(new MyShowcase(), "MyShowcase"); 
  }
}
                                  