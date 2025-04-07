/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(n) {
  return new Promise(function (resolve, reject) {
    const start = Date.now();
    while (Date.now() - start < n) {
      // Busy wait
    }
    resolve(`Slept for ${n} milliseconds`);
  })
}


function callback(value) {
  console.log(value);
}

sleep(5000).then(callback);