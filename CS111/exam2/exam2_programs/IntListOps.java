import java.applet.*;

public class IntListOps 
{
     // Operations built on top of the IntList class
 
    // Returns the number of elements in list L.
     public static int length (IntList L) 
     {
          if (isEmpty(L)) {
               return 0;
          } else {
               return 1 + length(tail(L));
          }
     }
     
    // Returns the sum of the number of elements in list L.
     public static int sumList (IntList L) 
     {
          if (isEmpty(L)) {
               return 0;
          } else {
               return head(L) + sumList(tail(L));
          }
     }
     
     public static int prodList (IntList L) 
     {
          // Returns the product of the number of elements in list L.
          if (isEmpty(L)) {
               return 1;
          } else {
               return head(L) * prodList(tail(L));
          }
     }
     
    // Returns the minimal number in L (or Integer.MAX_VALUE if L is empty)
     public static int minList (IntList L) 
     {
          if (isEmpty(L)) {
               return Integer.MAX_VALUE;
          } else {
               return Math.min(head(L), minList(tail(L)));
          }
     }
     
    // Returns the maximal number in L (or Integer.MIN_VALUE if L is empty)
     public static int maxList (IntList L) 
     {
          if (isEmpty(L)) {
               return Integer.MIN_VALUE;
          } else {
               return Math.max(head(L), maxList(tail(L)));
          }
     }
     
    // Returns true if all the elements of L are positive, and false otherwise
     public static boolean areAllPositive (IntList L) 
     {
          if (isEmpty(L)) {
               return true;
          } else {
               return (head(L) > 0) && areAllPositive(tail(L));
          }
     }
     
    // Returns true if at least one elements of L is positive, 
    // and false otherwise.
     public static boolean isSomePositive (IntList L) 
     {
          if (isEmpty(L)) {
               return false;
          } else {
               return (head(L) > 0) || isSomePositive(tail(L));
          }
     }
     
     // Mappers: transform one list to another in an elementwise fashion.
     
     public static IntList mapSquare (IntList L) 
     {
          if (isEmpty(L)) {
               return empty();
          } else {
               return prepend(head(L) * head(L), mapSquare(tail(L)));
          }
     }
     
     public static IntList mapDouble (IntList L) 
     {
          if (isEmpty(L)) {
               return empty();
          } else {
               return prepend(2 * head(L), mapDouble(tail(L)));
          }
     }
     
     // Filters: transform one list to another by keeping only those elements 
     // satisfying a predicate. 
     
     public static IntList filterPositive (IntList L) 
     {
          if (isEmpty(L)) {
               return empty();
          } else if (head(L) > 0)  {
               return prepend(head(L),  filterPositive(tail(L)));
          } else {
               return filterPositive(tail(L));
          }
     }
     
     public static IntList filterEven (IntList L) 
     {
          if (isEmpty(L)) {
               return empty();
          } else if ((head(L) % 2) == 0) {
               return prepend(head(L),  filterEven(tail(L)));
          } else {
               return filterEven(tail(L));
          }
     }
     
     // Generators: produce lists from non-lists.
     
     public static IntList fromTo (int lo, int hi) 
     {
          // Returns a list of the integers from lo up to hi. 
          if (lo > hi) {
               return empty();
          } else {
               return prepend(lo, fromTo(lo + 1, hi));
          }
     }
     
     // Programs written in the "signal processing style" as a composition of
     // components that produce and consume lists. 
     
     public static int factorial(int n) 
     {
          return prodList(fromTo(1,n));
     }
     
     public static int sumOfSquaredEvens (int lo, int hi) 
     {
          return sumList(mapSquare(filterEven(fromTo(lo,hi))));
     }
     
     // List combination operations
     
    // Returns a list whose elements are those of L1 followed by those of L2.
     public static IntList append(IntList L1, IntList L2) 
     {
          if (isEmpty(L1)) {
               return L2;
          } else {
               return prepend (head(L1), append(tail(L1), L2));
          }
     }
     
    // Returns a list whose elements are those of L followed by i.
     public static IntList postpend(IntList L, int i) 
     {
          return append(L, prepend(i, empty()));
     }
     
     // Recursive reverse
     public static IntList reverse(IntList L) 
     {
          if (isEmpty(L)) {
               return L;
          } else {
               return postpend(reverse(tail(L)), head(L));
          }
     }
     
     // ----------------------------------------------------------
     // Main
     
     public static void main (String [] args) 
     {
          IntList L1 = fromString("[7,1,4]");
          IntList L5 = fromString("[6,-5,2]");
          IntList L6 = fromString("[-3, -8]");
          System.out.println("L1 = " + L1);
          System.out.println("L5 = " + L5);
          System.out.println("L6 = " + L6);
          System.out.println("sumList(L1) = " + sumList(L1));
          System.out.println("prodList(L1) = " + prodList(L1));
          System.out.println("maxList(L1) = " + maxList(L1));
          System.out.println("minList(L1) = " + minList(L1));
          System.out.println("areAllPositive(L1) = " + areAllPositive(L1));
          System.out.println("areAllPositive(L5) = " + areAllPositive(L5));
          System.out.println("isSomePositive(L1) = " + isSomePositive(L1));
          System.out.println("isSomePositive(L5) = " + isSomePositive(L5));
          System.out.println("isSomePositive(L6) = " + isSomePositive(L6));
          System.out.println("mapSquare(L1) = " + mapSquare(L1));
          System.out.println("mapDouble(L1) = " + mapDouble(L1));
          System.out.println("filterPositive(L1) = " + filterPositive(L1));
          System.out.println("filterPositive(L5) = " + filterPositive(L5));
          System.out.println("filterPositive(L6) = " + filterPositive(L6));
          System.out.println("filterEven(L1) = " + filterEven(L1));
          System.out.println("fromTo(3,7) = " + fromTo(3,7));
          System.out.println("factorial(5) = " + factorial(5));
          System.out.println("sumOfSquaredEvens(3,7) = "
        + sumOfSquaredEvens(3,7));
          System.out.println("append(L6,L1) = " + append(L6,L1));
          System.out.println("postpend(L6,9) = " + postpend(L6, 9));
          System.out.println("reverse(L1) = " + reverse(L1));
          IntList ans = F(fromString("[1,2,3,4]"));
          System.out.println("F([1,2,3,4] = " + ans);
     }
     
     public static IntList F (IntList L) 
     {
          System.out.println("Entering F(" + L + ")");
          IntList result = tail(G(0, L));
          System.out.println("Exiting F(" + L + ") with value " + result);
          return result;
     }
     
     
     public static IntList G (int n, IntList L) 
     {
          System.out.println("Entering G(" + n + "," + L + ")");
          if (isEmpty(L)) {
               System.out.println("Exiting G(" + n + "," + L
      + ") with value [0].");
               return prepend(0, L);
          } else {
               IntList subResult = G(n + head(L), tail(L));
               System.out.println("subresult in G(" + n + "," + L
      + ") is "+ subResult);
               IntList result = prepend(head(L) + head(subResult),
                                        prepend(head(L) * (n + head(subResult)),
                                                tail(subResult)));
               System.out.println("Exiting G(" + n + "," + L
      + ") with value " + result);
               return result;
          }
     }
     
     
     
     
     // ----------------------------------------------------------
     // Local abbreviations
     
     public static IntList empty() 
     {
          return IntList.empty();
     }
     
     public static boolean isEmpty (IntList L) 
     {
          return IntList.isEmpty(L);
     }
     
     public static IntList prepend (int n, IntList L) 
     {
          return IntList.prepend(n, L);
     }
     
     public static int head (IntList L) 
     {
          return IntList.head(L);
     }
     
     public static IntList tail (IntList L) 
     {
          return IntList.tail(L);
     }
     
     public static boolean equals (IntList L1, IntList L2) 
     {
          return IntList.equals(L1, L2);
     }
     
     public static String toString (IntList L) 
     {
          return IntList.toString(L);
     }
     
     public static IntList fromString (String s) 
     {
          return IntList.fromString(s);
     }
}
