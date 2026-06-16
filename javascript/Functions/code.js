// higer order Function
const greet = function (name) {
  return `${name}`;
};

function person(personName, fn) {
  console.log(`Hello My name is ${personName} , how are you ${fn}`);
}

person("prakash", greet("vikash"));

// higer order function returning it

const calulations = function (num) {
  return function (value) {
    return num + value;
  };
};

const u = calulations(2);

console.log(u(5));

//  callback function

const greet1 = function (name) {
  return `hello ${name}`;
};

function excute(callback) {
  const r = callback("prakash");
  console.log(r);
}

excute(greet1);

//  pure and impure function

function add(a, b) {
  console.log(a + b);
}

add(1, 3); // this is pure function beacuse it will give same output for same input it doe/nt has side effec

let c = 24;

// impure function
function count(n) {
  c = c + n;

  console.log(c);
}

count(12);
