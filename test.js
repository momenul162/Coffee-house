// const canDivideEvenly = (w) => {
//   if (w % 2 === 0 && w !== 2) {
//     console.log("YES");
//   } else {
//     console.log("NO");
//   }
// };

// const input = require("fs").readFileSync("/dev/stdin", "utf8").trim();
// const w = parseInt(input, 8);
// canDivideEvenly(w);

// const deleteDuplicates = (head) => {
//   const uniqueSet = new Set(head);

//   const uniqueArray = Array.from(uniqueSet);

//   return uniqueArray;
// };

// const array = [1, 2, 3, 2, 4, 1, 5, 3];
// const uniqueArray = deleteDuplicates(array);
// console.log(uniqueArray);

// var map = function (arr, fn) {
//   let result = [];
//   for (let i = 0; i < arr.length; i++) {
//     const func = fn(arr[i], i);
//     if (func) {
//       result.push(arr[i]);
//     }
//   }
//   return result;
// };

// function greaterThan10(n) {
//   return n > 10;
// }

// const arr = [0, 10, 20, 30];
// const newArray = map(arr, greaterThan10);
// console.log(newArray);

var commonPrefix = function (arr) {
  for (let i = 0; i < arr[0].length; i++) {
    const char = arr[0][i];
    for (let j = 1; j < arr.length; j++) {
      console.log(i);
      console.log(arr[j][i]);
    }
  }
};

const x = commonPrefix(["flower", "flow", "flight"]);
console.log(x);
