// 1: 10, 3: 30, 4: 40
// 1: 20, 3: 60, 6: 120
// => 1: 10, 3: 30, 4: 40, 6:120
// 1: 20: 30: 60: 6: 120: 4: 40
// function getSumSequence(values) {
//   const result = [];
//   values.forEach((val, index) => {
//     if (!result.length) {
//       result.push(val);
//     } else {
//       result.push(result[index - 1] + val)
//     }
//   });
//   return result;
// }
