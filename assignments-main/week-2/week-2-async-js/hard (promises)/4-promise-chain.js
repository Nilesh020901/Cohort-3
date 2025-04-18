/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(`First promise resolved after ${t} seconds`);
      }, t*1000);
    });
  }
  
  function wait2(t) {
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(`Second promise resolved after ${t} seconds`);
      }, t*1000);
    });
  }
  
  function wait3(t) {
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(`Third promise resolved after ${t} seconds`);
      }, t*1000);
    });
  }
  
  function rundelays(t1, t2, t3) {
    return wait1(t1)
    .then((result) => {
      console.log(result);
      return wait2(t2);
    })
    .then((result) => {
      console.log(result);
      return wait3(t3);
    })
    .then((result) => {
      console.log(result);
      console.log(`All promises resolved sequentially`);
      return;
    })
  }

  rundelays(5, 10, 7).then(() => {
    console.log("All done!");
  });