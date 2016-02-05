import java.awt.*;  
public class TrippySnowflakesAnimation extends Animation{
  
  //constructor
  public TrippySnowflakesAnimation(){
    
    this.addSprite(new ColorBackground()); //blue background
   
   
    
    this.addSprite(new Snowflakes(0,80,  460,320, 0, 10, Color.blue, Color.magenta)); //levels, length, x, y, dx, dy, color1, color2
    this.addSprite(new Snowflakes(0,80,  460,320, 0, -10, Color.blue, Color.magenta));
    this.addSprite(new Snowflakes(0,80,  460,320, 5, 5, Color.blue, Color.magenta));
    this.addSprite(new Snowflakes(0,80,  460,320, 5, -5, Color.blue, Color.magenta));
    this.addSprite(new Snowflakes(0,80,  460,320, -5, 5, Color.blue, Color.magenta));
    this.addSprite(new Snowflakes(0,80,  460,320, -5, -5, Color.blue, Color.magenta));
    this.addSprite(new Snowflakes(0,80,  460,320, 10, 0, Color.blue, Color.magenta));
    this.addSprite(new Snowflakes(0,80,  460,320, -10, 0, Color.blue, Color.magenta));
    this.setNumberRepeats(300);    
    this.setNumberFrames(Animation.NO_MAX_FRAMES);
    //this.setFps(8);
    
    
  }
}