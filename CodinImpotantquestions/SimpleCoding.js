/*

 write a function it will take an array as input and return an object like 

 how many times a number has been repated into array

 input = [1,2,3,1,1,3,3,2]

 output= {1:3,2:2,3:3}


*/

function countOccurrences(arr) {
  const result = {};

  for (const num of arr) {
    result[num] = (result[num] || 0) + 1;
  }

  return result;
}

console.log(
  countOccurrences([
    1, 2, 3, 2, 4, 1, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2,
    11, 123,
  ]),
);

function removeDuplicates(arr) {
  const result = {};

  for (const num of arr) {
    result[num] = (result[num] || 0) + 1;
  }

  console.log(Object.keys(result));

  return Object.keys(result).map(Number);
}

console.log(removeDuplicates([1, 2, 3, 1, 1, 3, 3, 2]));
