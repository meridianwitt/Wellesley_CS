public class OddEvenSums extends IntListOps{
  
  public static IntList indexEven(IntList list){
    IntList newEven = empty();
    list = tail(list);
    if(tail(list).isEmpty()){
      return empty();
    }else {
      newEven = prepend(head(list), newEven);
      list = tail(list);
      if(tail(list).isEmpty()){
        return empty();
      }else {
        newEven = prepend(head(tail(list)), newEven);
        list = tail(list);
        return append(indexEven(list),newEven);
      }
    }
  }
  
  public static IntList indexOdd(IntList list){
    IntList newOdd = empty();
    if(tail(list).isEmpty()){
      return empty();
    }else {
      newOdd = prepend(head(list), newOdd);
      list = tail(list);
      if(tail(list).isEmpty()){
        return empty();
      }else {
        newOdd = prepend(head(tail(list)), newOdd);
        list = tail(list);
        return append(indexOdd(list), newOdd);
      } 
    }
  }
  
 public static IntList oeSums1(IntList list){ //return sum of odd indexed and sum of even indexed  
     int result = 0;
     IntList even = indexEven(list);
     IntList odd = indexOdd(list);
     result = result + even[1] + even[2] + even[3];
     int oddSum = odd[1] + odd[2];
     
     return prepend(oddSum, prepend(evenSum, empty()));
    
}
  
  public static void main(String[] args ){ //a string array
     IntList listA = fromString("[8,121,-17,8,0,5]");
     IntList listB = fromString("[]");
     IntList listC = fromString("[7]");
     IntList listD = fromString("[7,2]");
     IntList listE = fromString("[7,2,-3]");
     IntList listF = fromString("[7,2,-3,13]");
     IntList listG = fromString("[7,2,-3,13,-10]");

     System.out.println("Odd even sums:");
     System.out.println("indexing even" + indexEven(listG));
     System.out.println("indexing odd" + indexOdd(listG));
//     System.out.println("listA " + oeSums1(listA));
//     System.out.println("listB " + oeSums1(listB));
//     System.out.println("listC " + oeSums1(listC));
//     System.out.println("listD " + oeSums1(listD));
//     System.out.println("listE " + oeSums1(listE));
//     System.out.println("listF " + oeSums1(listF));
//     System.out.println("listG " + oeSums1(listG));
  }
  
  
}