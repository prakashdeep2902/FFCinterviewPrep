//Implement a polyfill for Array.prototype.map()

Array.prototype.myMap = function (cb) {
  let result = [];
  const n = this.length;
  for (let i = 0; i < n; i++) {
    result.push(cb(this[i], i, this));
  }
  return result;
};

const arr = [2, 5, 8];

const myRes = arr.myMap((num) => {
  return num * 2;
});

console.log(myRes);

// Implement a polyfill for Array.prototype.map()

Array.prototype.Myfillter = function (cb) {
  const n = this.length;
  const result = [];
  for (let i = 0; i < n; i++) {
    if (cb(this[i], i, this)) result.push(this[i]);
  }

  return result;
};

const Farr = [2, 5, 10.6, 9, 12, 8, 2, 9];

console.log(
  Farr.filter((num) => {
    return num % 2 == 0;
  }),
);
console.log(
  "cutom Filter=>",
  Farr.Myfillter((num) => num % 2 === 0),
);

// Implement a polyfill for Array.prototype.reduce()

const Rarr = [2, 4, 6, 7, 8];

const r = Rarr.reduce((sum, curr) => {
  return (sum = sum + curr);
}, 0);
console.log(r);

Array.prototype.Myreducer = function (cb, intialvalue) {
  const n = this.length;
  let acc = intialvalue;

  for (let i = 0; i < n; i++) {
    acc = acc ? cb(acc, this[i]) : this[i];
  }

  return acc;
};

console.log(
  Rarr.Myreducer((acc, curr) => {
    return (acc = acc + curr);
  }, 0),
);

// polyfill call()

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("reject after 1sec ❌");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("reject after 2sec ❌");
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("reject after 3sec ❌");
  }, 3000);
});

Promise.myAll = function (promises) {
  return new Promise((reslove, reject) => {
    let result = [];
    let completed = 0;

    if (promises.length === 0) {
      reslove([]);
    }

    promises.forEach((promise, indx) => {
      Promise.resolve(promise)
        .then((value) => {
          result[indx] = value;
          completed++;

          if (completed === promises.length) {
            reslove(result);
          }
        })
        .catch(reject);
    });
  });
};

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      reject([]);
    }
    for (const promise of promises) {
      Promise.resolve(promise).then(resolve).catch(reject);
    }
  });
};

//   polyfill

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let rejectionCount = 0;

    if (promises.length === 0) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }

    promises.forEach((promise, indx) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((err) => {
          errors[indx] = err;
          rejectionCount++;

          if (rejectionCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
};

await Promise.myAny([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
