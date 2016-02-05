// ----------------------------------------------------------------------
// Meridian Witt
// ----------------------------------------------------------------------
// This is the skeleton for CS111 PS1 Task 2. 
// Flesh out the run() method to draw the Buggle Olympics symbol.

import java.awt.*;

public class Rings extends BuggleWorld
{
        public void setup ()
        {
                setDimensions(31, 31);   //set up 31 x 31 grid
        } 
  
        public void run () {

                // ------------------------------------------------------------
                // Create and initialize the five buggle Olympians. 
                // Do not modify this code!

                Buggle rex = new Buggle();
                rex.setPosition(new Location(8, 11));

                Buggle cy = new Buggle();
                cy.setColor(Color.cyan);
                cy.setPosition(new Location(7, 15));

                Buggle maggie = new Buggle();
                maggie.setColor(Color.magenta);
                maggie.setPosition(new Location(17, 7));
                maggie.setHeading(Direction.NORTH);

                Buggle blithe = new Buggle();
                blithe.setColor(Color.blue);
                blithe.setPosition(new Location(11, 17));

                Buggle yelena = new Buggle();
                yelena.setColor(Color.yellow);
                yelena.setPosition(new Location(9, 23));
                yelena.setHeading(Direction.SOUTH);

                // ------------------------------------------------------------
                // Put your code here:

                  rex.forward(7); //red starts, goes right
                  yelena.forward(14); //yellow over red, going down
                  yelena.left();
                  yelena.forward(11); //bottom of yellow square
                  maggie.forward(7); //pink over yellow, going up
                  cy.forward(14); //top of cy square, going right
                  cy.right();
                  cy.forward(8); //cy going down
                  maggie.forward(7); //pink over cy
                  maggie.right();
                  maggie.forward(7); //start top of pink square
                  blithe.forward(6); //start blue
                  rex.left();
                  rex.forward(12); //red over blue, going up
                  yelena.forward(3); //yellow over cy, still right
                  yelena.left();
                  yelena.forward(14); //yellow over pink, going up
                  yelena.left();
                  yelena.forward(11); //most of top of yellow square
                  cy.forward(6); //right side of cy square
                  cy.right();
                  cy.forward(14); //bottom of cy square
                  cy.right();
                  cy.forward(14); 
                  cy.right();//completed cy square
                  blithe.forward(8); //blue over pink and yellow
                  blithe.left();
                  blithe.forward(14); //right side of blue side
                  blithe.left();
                  blithe.forward(14); //top of blue square
                  blithe.left();
                  blithe.forward(14); 
                  blithe.left();//finish blue square
                  yelena.forward(3);
                  yelena.left(); //finish yellow square with yellow over blue, going left
                  rex.forward(2); //red over yellow, going up
                  rex.left();
                  rex.forward(14); //red over blue, top of red square 
                  rex.left();
                  rex.forward(14); //left side of red square
                  rex.left();
                  rex.forward(7); //finish red square with red over cy, going right
                  maggie.forward(7); //pink over blue, top of pink square
                  maggie.right();
                  maggie.forward(14); //right side of pink square, going down
                  maggie.right();
                  maggie.forward(14); //bottom of pink square, going left
                  maggie.right(); //finish pink square
                  
    
        } // end of the run() method

        //---------------------------------------------------------------------
        // The following main() method allows this applet to run as an application

        public static void main (String[] args)
        {
                runAsApplication(new Rings(), "Rings"); 
        }

  
} // class Rings
