// Find the second largest unique number in an array.

function find2ndLargestnumber(arr) {
  let l = -Infinity;
  let sl = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > l) {
      sl = l;
      l = arr[i];
    } else if (arr[i] > sl && arr[i] !== l) {
      sl = arr[i];
    }
  }

  return sl;
}

const arr = [10, 5, 20, 20, 8, 15, 10];

// console.log(find2ndLargestnumber(arr)); // 15

const arr1 = [
  { name: "John", age: 25 },
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "David", age: 30 },
];

const res = arr1.reduce((acc, curr) => {
  if (!acc[curr.age]) {
    acc[curr.age] = [];
  }
  acc[curr.age].push(curr);

  return acc;
}, {});

console.log(res);

function mergeSortedArrays(arr1, arr2) {
  let i = 0;
  let j = 0;
  let n = arr1.length;
  let m = arr2.length;
  let result = [];

  while (i < n && j < m) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else if (arr1[i] > arr2[j]) {
      result.push(arr2[j]);
      j++;
    } else {
      console.log("Enter in ==");
      result.push(arr1[i], arr2[j]);
      i++;
      j++;
    }
  }

  while (i < n) {
    result.push(arr1[i]);
    i++;
  }
  while (j < m) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

const arr2 = [1, 3, 5, 7];
const arr3 = [2, 4, 6];

console.log(mergeSortedArrays(arr2, arr3));

// Implement a function to find duplicate elements in an array.

function FindDupEle(dupArr) {
  let seen = {};

  for (let i = 0; i < dupArr.length; i++) {
    seen[dupArr[i]] = (seen[dupArr[i]] || 0) + 1;
  }

  const result = Object.entries(seen)
    .filter(([key, value]) => value > 1)
    .map(([key, value]) => Number(key));

  console.log(
    Object.entries(seen)
      .filter(([key, value]) => value > 1)
      .map(([key, value]) => Number(key)),
  );

  return result;
}

const dupArr = [1, 2, 3, 4, 2, 5, 1, 6, 3];

// console.log(FindDupEle(dupArr));

//

function FindDupEleuingSet(arr) {
  let duplicate = new Set();
  let seen = new Set();

  for (let item of arr) {
    if (seen.has(item)) {
      duplicate.add(item);
    } else {
      seen.add(item);
    }
  }
  return [...duplicate].sort((a, b) => a - b);
}

console.log(FindDupEleuingSet(dupArr));

async function FetchData(params) {
  const res = await fetch("https://jsonplaceholder.typicode.com/todo");

  if (!res.ok) {
    throw new Error(`HTTPS Error:${res.status}`);
  }
  return res;
}

async function Retry(fn, MaxTry) {
  let count = 1;
  while (count <= MaxTry) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Attempt ${count} Failed`);
      if (count === MaxTry) {
        throw new Error(`All attemeted has been fail`);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      count++;
    }
  }
}

// Retry(FetchData, 3)
//   .then((data) => data.json())
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.error(err.message));

async function concurrencyLimit(tasks, limit) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const currentIndex = index++;

      try {
        results[currentIndex] = await tasks[currentIndex]();
      } catch (error) {
        results[currentIndex] = error;
      }
    }
  }

  const workers = [];

  for (let i = 0; i < limit; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);

  return results;
}

const tasks = [
  () => new Promise((resolve) => setTimeout(() => resolve("Task 1"), 2000)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 2"), 1000)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 3"), 1500)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 4"), 500)),
  () => new Promise((resolve) => setTimeout(() => resolve("Task 5"), 1000)),
];

const limit = 2;

concurrencyLimit(tasks, 2).then((result) => console.log(result));
