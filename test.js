// var sortBy = function (arr, fn) {
//   const sortedArray = fn(arr);

//   return sortedArray;
// };

// // function bubbleSort(arr) {
// //   for (var i = 0; i < arr.length; i++) {
// //     for (var j = 0; j < arr.length; j++) {
// //       if (arr[i] < arr[j]) {
// //         var temp = arr[i];
// //         arr[i] = arr[j];
// //         arr[j] = temp;
// //       }
// //     }
// //   }
// //   return arr;
// // }

// // Example usage:
// var unsortedArray = [0, 9, 4, 5, 3, 8, 1, 2];
// var sortedArray = bubbleSort(unsortedArray, bubbleSort);
// console.log("Sorted Array:", sortedArray);

function ListNode(value, next) {
  this.value = value === undefined ? 0 : value;
  this.value = next === undefined ? null : next;
}

var mergeTwoLists = function (list1, list2) {
  const head = new ListNode(list1, list2);
  console.log(head);
  // for (var i = 0; i < head.length; i++) {
  //   for (var j = 0; j < head.length; j++) {
  //     if (head[i] < head[j]) {
  //       var temp = head[i];
  //       head[i] = head[j];
  //       head[j] = temp;
  //     }
  //   }
  // }

  // return head;
};

console.log(mergeTwoLists([1, 2, 4], [1, 3, 4]));
