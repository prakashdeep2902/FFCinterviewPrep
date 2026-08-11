import React from "react";
import { useState } from "react";
import "./index.css";
import { useMemo } from "react";

const users = [
  { id: 1, name: "Prakash Sharma", email: "prakash@gmail.com" },
  { id: 2, name: "Rahul Kumar", email: "rahul@gmail.com" },
  { id: 3, name: "Amit Singh", email: "amit@gmail.com" },
  { id: 4, name: "Neha Verma", email: "neha@gmail.com" },
  { id: 5, name: "Rohit Sharma", email: "rohit@gmail.com" },
  { id: 6, name: "Priya Patel", email: "priya@gmail.com" },
  { id: 7, name: "Ankit Gupta", email: "ankit@gmail.com" },
  { id: 8, name: "Sneha Reddy", email: "sneha@gmail.com" },
  { id: 9, name: "Vikas kumar", email: "vikas@gmail.com" },
  { id: 10, name: "Pooja kumar", email: "pooja@gmail.com" },
];

function debounc(fn, delay) {
  let timer;
  return function (...arg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
}

const Debouncing = () => {
  const [data, setData] = useState([]);
  function search(searchQuery) {
    const filterData = users.filter((user) => {
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    console.log(filterData);

    setData(filterData);
  }

  const debouncing = useMemo(() => {
    return debounc(search, 1000);
  }, []);

  const handelInput = (e) => {
    const Text = e.target.value;
    debouncing(Text);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Enter any msg"
        onInput={handelInput}
        className="search-input"
      />

      {data && (
        <div className="user-list">
          {data.map((ele, indx) => (
            <div className="user-card" key={indx}>
              <h3>{ele.name}</h3>
              <h4>{ele.email}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Debouncing;
