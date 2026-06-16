var prakash = "2";
var prakash = 2;

// let vikash = 2;

console.log(prakash);
// console.log(vikash);

// closer example

function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const result = outer();
console.log("result:::==>", result());
console.log("result:::==>", result());
console.log("result:::==>", result());
console.log("result:::==>", result());
console.log("result:::==>", result());

function setupButton() {
  let clicks = 0;

  document.getElementById("btn").addEventListener("click", function () {
    clicks++;
    console.log(`Clicked ${clicks} times`);
  });
}

setupButton();

function multiplyBy(num) {
  return function (value) {
    return value * num;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
