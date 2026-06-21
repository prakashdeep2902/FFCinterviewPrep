function removeDuplicates(arr) {
  let seen = {};
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (seen[arr[i]] !== true) {
      seen[arr[i]] = true;
      result[result.length] = arr[i];
    }
  }

  console.log(seen);
  return result;
}

console.log(
  removeDuplicates([
    1, 2, 3, 2, 4, 1, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2,
    11, 123,
  ]),
);

function convertIntoObj(arr) {
  const result = {};

  for (let i = 0; i < arr.length; i++) {
    result[arr[i].name] = arr[i];
  }

  return result;
}

const arr = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
];
const a = convertIntoObj(arr);

console.log(a);

const users = {
  john: 25,
  peter: 17,
  sam: 30,
};

const result = Object.keys(users).filter((keys) => users[keys] < 18);

console.log(result);

console.log(Object.entries(users).map(([key, value]) => `${key}:${value}`));

console.log(
  Object.fromEntries(
    Object.entries(users).map(([key, value]) => [Number(value), key]),
  ),
);

function charFrequency(str) {
  const freq = {};

  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  return freq;
}

console.log(charFrequency("banana"));

// const users = [
//   { name: "John", city: "Delhi" },
//   { name: "Peter", city: "Mumbai" },
//   { name: "Sam", city: "Delhi" },
// ];

// const grouped = users.reduce((acc, user) => {
//   if (!acc[user.city]) {
//     acc[user.city] = [];
//   }

//   acc[user.city].push(user);

//   return acc;
// }, {});

// console.log(grouped);

const inventory = [
  { name: "Apples", category: "Fruit" },
  { name: "Carrots", category: "Vegetable" },
  { name: "Bananas", category: "Fruit" },
  { name: "Broccoli", category: "Vegetable" },
  { name: "Oranges", category: "Fruit" },
];

const result1 = inventory.reduce((acc, ele) => {
  if (!acc[ele.category]) {
    acc[ele.category] = [];
  }

  acc[ele.category].push(ele);

  return acc;
}, {});

console.log(result1);

const developerSkills = [
  ["JavaScript", "React"],
  ["Node.js", "JavaScript"],
  ["HTML", "CSS", "React"],
];

console.log([...new Set(developerSkills.flat())]);

const r = developerSkills.reduce((acc, skill) => {
  acc = skill;

  console.log(acc);

  return acc;
}, []);

console.log(r);

const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 12 },
  { name: "Charlie", age: 17 },
  { name: "David", age: 30 },
];

const res = people.reduce(
  (acc, curr) => {
    if (curr.age > 18) {
      acc["adult"].push(curr.name);
    } else {
      acc["Minors"].push(curr.name);
    }

    return acc;
  },
  { adult: [], Minors: [] },
);

console.log(res);

const userslogs = [
  { id: "u1", name: "John", role: "Admin" },
  { id: "u2", name: "Peter", role: "User" },
  { id: "u3", name: "Sam", role: "Moderator" },
];

const res1 = userslogs.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

console.log(res1);

const expenses = [
  { category: "Food", amount: 50 },
  { category: "Transport", amount: 15 },
  { category: "Food", amount: 30 },
  { category: "Entertainment", amount: 100 },
  { category: "Transport", amount: 25 },
];

const ex = expenses.reduce((acc, cur) => {
  console.log(Object.keys(cur));

  if (acc["category"] == cur["category"]) {
    acc["amount"] = acc["amount"] + cur["amount"];
  } else {
    acc[cur["category"]] = cur["amount"];
  }

  return acc;
}, {});

console.log(ex);
