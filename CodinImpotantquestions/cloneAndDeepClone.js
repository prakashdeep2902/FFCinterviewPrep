const person = {
  name: "prakash",
  Job: true,
  Title: "SD1",
  address: {
    city: "Nawada",
    pincode: 805110,
  },
};

const shollowClone = { ...person };
shollowClone.address.city = "delhi";
shollowClone.address.pincode = 123456;

console.log("shollowClone", shollowClone);
console.log("person", person);

// const DeepClone = structuredClone(person);
// DeepClone.address.pincode = 123423;
// DeepClone.address.city = "delhi";

// console.log("deepClone", DeepClone);
// console.log("person", person);
