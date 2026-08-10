// write a code of debouncing and throttle() and  debouncing

function search(query) {
  console.log(`you are searching for this ${query}`);
}

function debouncing(fn, delay) {
  let time;
  return function (...arg) {
    clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
}

const callDebouncing = debouncing(search, 500);

document.getElementById("input").addEventListener("input", (e) => {
  const value = e.target.value;
  callDebouncing(value);
});

let count = 1;
function throttle(q) {
  count = count + 1;
  const scrolledHeight = window.scrollY;

  //   console.log("Scrolled height:", scrolledHeight + "px");
  console.log(`hight you have scrolled upto ${count}`);
}

function handelThrottling(fn, delay) {
  let lastCall = 0;
  return function (...arg) {
    let now = Date.now();
    console.log("sub", now - lastCall);
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, arg);
    }
  };
}
const Throttle = handelThrottling(throttle, 2000);

window.addEventListener("scroll", Throttle);
