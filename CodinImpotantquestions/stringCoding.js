const map = new Map();

map.set("name", "John");
map.set("age", 25);

console.log(map);

console.log(map.get("name")); // John
console.log(map.get("age")); // 25

console.log(map.has("name")); // true

map.delete("age");

console.log(map.size); // 1
