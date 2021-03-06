//Meridian Witt and Michelle N. 
//borrowed from Lab

import java.awt.*; // use graphics

public class SmallStar extends Sprite { //appear as snow
 int x; //(x,y) is the initial position for the center of the star
 int y;
 int radius;
 int appearTime;  
 Randomizer r; //to produce  random numbers.
 int width;
 int height;
 // add more instance variables if needed
 int frameNumber;
 
 public SmallStar() {
   width = 1000; //size to fill the entire screen with snow
   height = 1000;
  r = new Randomizer();
  frameNumber = 0;
  // generate random parameters
  x = r.IntBetween(0, width);
  y = r.IntBetween(0, height);
  radius = r.IntBetween(1, 5);
  appearTime = r.IntBetween(1, 100);
 }
 
 public void drawState(Graphics g) {
  // if the star has not appeared yet, do nothing
  // otherwise draw the star, using x,y, and radius
  // add your code here
   if (frameNumber > appearTime) { //if star has already appeared...
     //draw it
     g.setColor(Color.white);
     g.fillOval(x-radius, y+radius, 2*radius, 2*radius); 
   }
 }
   
  public void updateState() {

    frameNumber = frameNumber + 1;
 }
 
 public void resetState() {
  // generate random parameters
  x = r.IntBetween(0, width);
  y = r.IntBetween(0, height);
  radius = r.IntBetween(1, 5);
  appearTime = r.IntBetween(0, 100);
  
  // add more code here if needed
 }
 

}