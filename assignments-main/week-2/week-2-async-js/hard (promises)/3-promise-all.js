/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(`First promise resolved after ${t} time`);
      }, t*1000);
    });
  }
  
  function wait2(t) {
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(`Second promise resolved after ${t} time`);
      }, t*1000);
    });
  }
  
  function wait3(t) {
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(`Third promise resolved after ${t} time`)
      }, t*1000);
    });
  }
  
  function calculateTime(t1, t2, t3) {
    const st = Date.now(); //start time
  
    return Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then(()=>{
      const et = Date.now(); //end time
      const total = et - st;
      const totalSec = total / 1000;
      console.log('All promises resolved');
      console.log('Total time taken: ' + totalSec + 's');
      return total;
    }).catch((error)=>{
      console.error('One of the promises rejected:', error);
    });
  }

module.exports = calculateTime;
