import java.awt.*; // use graphics

public class StarryNight extends ColorBackground {
 // delay is the number of frames the background stays 
 // the same before it gets one shade darker
 private int delay;
 
 // add instance variables if needed
 // New instance variable frameCounter to keep track of which frame we're on
 private int frameCounter = 0;

 
 public StarryNight(int delay) {
  super(Color.blue); //calls the constructor in ColorBackground
  this.delay = delay;
 }
 
 protected void updateState() {
   // makes the background darker when needed
   // add your code here
   frameCounter = frameCounter + 1;
   if (frameCounter % delay   == 0) { //every "delay" number of frames...
     color = color.darker(); //make the bg darker
   }
 }
 
 public void resetState() {
  // reset the instance variables to the initial state
   color = Color.blue;
  
 }

}