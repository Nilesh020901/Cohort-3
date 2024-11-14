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
  
  function calculateTime(t1, t2, t3) {
    const st = Date.now(); //starttime
  
    //chain promise call
    return wait1(t1) //1st fun call 
    .then(()=>wait2(t2)) //after done then 2nd fun call
    .then(()=>wait3(t3)) //after done then 3rd fun call
    .then(()=>{
      const et = Date.now(); //endtime
      const total = et - st;
      const totalSec = total / 1000;
      console.log('All promises resolved sequentially');
      console.log('Total time taken: ' + totalSec + 's');
      return total;
    })
    .catch((error)=>{
      console.error('One of the promises rejected:', error);
    })
  }

module.exports = calculateTime;
