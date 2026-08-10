function deepFlatten(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    console.log(key);
    let newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFlatten(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

const obj = {
  a: {
    b: {
      c: 1,
    },
  },
  d: 1,
};

// console.log(deepFlatten(obj));
function deepFlattenArr(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...deepFlattenArr(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

const arr = [1, [2, [3, [4, 5]], 6], 7];

console.log(deepFlattenArr(arr));
