Array.prototype.myMap = function (callback) {
  const result = [];
  console.log(this);
  console.log(callback());

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result;
};

const arr = [1, 2, 3];

const output = arr.myMap((num) => num * 2);

console.log(output);
