/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function delay(n) {
  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      resolve(`Resolved after ${n} seconds`)
    }, n*1000);
  });
}

function callback(value) {
  console.log(value);
}

delay(5).then(callback);
