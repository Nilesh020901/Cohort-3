/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function delay1(t1) {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      resolve(`Resolved after ${t1} seconds`)
    }, t1*1000);
  });
};

function delay2(t2) {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      resolve(`Resolved after ${t2} seconds`)
    }, t2*1000);
  });
};

function delay3(t3) {
  return new Promise(function (resolve, reject) {
    return setTimeout(function () {
      resolve(`Resolved after ${t3} seconds`)
    }, t3*1000);
  });
};

function callback(value) { 
  console.log(value);
}

Promise.all([
  delay1(5),
  delay2(10),
  delay3(15),
]).then(callback);
