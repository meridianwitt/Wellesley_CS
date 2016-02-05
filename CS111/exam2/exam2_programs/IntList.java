// A version of IntLists that uses a subclass to represent empty lists.
//
// Note that empty lists still require space for the head and tail.
// Negligible here, particularly since there is only empty list.

public class IntList
{
    // Class variables
    // Optimization:  there is only one empty list in the world.

    private static IntList theEmptyList = new EmptyIntList();  

    // Instance variables

    private int head;
    private IntList tail;

    // Constructor methods

    // protected because we want clients to use empty() and prepend()
    // to make lists.
    protected IntList (int head, IntList tail)
    {
        this.head = head;
        this.tail = tail;
    }

    // Nullary constructor not necessary if subclass does super() call.
    //
    private IntList ()
    {
    }

    // Class methods
    public static IntList empty ()
    {
        return (IntList) theEmptyList;
    }
     
    public static IntList prepend (int n, IntList lst)
    {
        return new IntList(n, lst);
    }
     
    public static boolean isEmpty (IntList lst)
    {
        return lst.isEmpty();
    }
     
    public static int head (IntList lst)
    {
        return lst.head();
    }
     
    public static IntList tail (IntList lst)
    {
        return lst.tail();
    }
     
    public static boolean equals (IntList lst1, IntList lst2)
    {
        return lst1.equals(lst2);
    }
     
    public static String toString (IntList lst)
    {
        return lst.toString();
    }
     
    // Parsing and unparsing from/to Strings 
    // copied from older implementation.
    public static IntList fromString (String s)
    {
        if (s.charAt(0) != '[') {
            throw new IntListException("IntList.fromString:  "
                                       + "string does not begin with '[': "
                                       + "\"" + s + "\"");
        } else if ((s.charAt(s.length() - 1)) != ']') {
            throw new IntListException("IntList.fromString:  "
           + "string does not end with ']': "
                                       + "\"" + s + "\"");
        } else if (isAllWhitespace(s.substring(1, s.length()))) {
            return IntList.empty();
        } else {    
            return fromStringHelp (s, 1);
        }
    }

    private static IntList fromStringHelp (String s, int lo) 
    {
        int commaIndex = s.indexOf(',', lo);
        if (commaIndex == -1) { // last element
            return prepend(toInt(s, lo, s.length() - 2), empty());
        } else {
            return prepend(toInt(s, lo, commaIndex - 1),
      fromStringHelp(s, commaIndex + 1));
        }
    }
     
    // Extract an int from the substring in s between lo and hi (inclusive).
    // Strip any leading/trailing whitespace. 
    private static int toInt (String s, int lo, int hi) 
    {
        while (isWhitespace(s.charAt(lo))) {
            lo++;
        }
        while (isWhitespace(s.charAt(hi)))
     hi--;

        return Integer.parseInt(s.substring(lo, hi + 1));
    }
     
    private static boolean isAllWhitespace (String s) 
    {
        for (int k = 0; k < s.length() - 1; k++) {
            if (!isWhitespace(s.charAt(k)))
                return false;
        }
        return true;
    }
     
    private static boolean isWhitespace (char c) 
    {
        return (c == ' ') || (c == '\t') || (c == '\n') || (c == '\r');
    }

     
    // Instance methods
     
    boolean isEmpty ()
    {
        return false;
    }
     
    int head ()
    {
        return head;
    }
     
    IntList tail ()
    {
        return tail;
    }
     
    boolean equals (IntList lst)
    {
        if (this.isEmpty())
            return lst.isEmpty();
        else if (lst.isEmpty())
            return false;
        else
            return (this.head() == lst.head())
     && this.tail().equals(lst.tail());
    }
     
    public String toString () 
    {
        if (this.isEmpty()) {
            return "[]";
        } else {
            StringBuffer sb = new StringBuffer();
            sb.append("[");
            sb.append(head);
            IntList toDo = tail;
            while (!isEmpty(toDo)) {
                sb.append(", ");
                sb.append(toDo.head);
                toDo = toDo.tail;
            }
            sb.append("]");
            return sb.toString();
        }
    }
}

class EmptyIntList extends IntList
{
    protected EmptyIntList()
    {
 super(0, null);
    }

     // Instance Methods
     
     boolean isEmpty ()
     {
          return true;
     }
     
     int head ()
     {
          throw new IntListException("Cannot take head of empty list");
     }
     
     IntList tail ()
     {
          throw new IntListException("Cannot take tail of empty list");
     }
     
     boolean equals (IntList lst)
     {
          return lst.isEmpty();
     }
     
     public String toString ()
     {
          return "[]";
     }
}

class IntListException extends RuntimeException 
{
     public IntListException (String message) 
     {
          super(message);
     }
}