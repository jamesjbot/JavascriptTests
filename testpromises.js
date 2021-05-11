
/*jshint esversion:8*/

const { reject, delay } = require("q");

// Goal Explore Promises and timers in Node.js

/* setTime type signature
*
* setTimeout(function_name, delayINmilliseconds, parametersTOfunction, ...)
*
*/


// What are the resolve and reject functions on a Promise?


/*
*
* event loop
*
*/

let testNumber = 13;

switch (testNumber) {

  case 8: // Only time you can create a promise on the fly
    {
      conventionalPromiseFactory()
        .then(returnValue => { console.log(`Returnvalue: ${returnValue}`); });
      console.log(`I want this to show immediately`);
      console.log(`I'm hoping this write thru`);
      break;
    }

  case 9:
    {
      cleanLookingPromises();
      break;
    }

  case 10:
    {
      sequentialPromises();
      break;
    }

  case 11:
    {
      promiseAllTest();
      break;
    }

  case 12:
    {
      promiseAllSettled();
      break;
    }

  case 13:
    {
      promiseAny();
      break;
    }

  case 14:
    {
      promiseRace();
      break;
    }

  default:
    {
      break;
    }
}



/*
*
* functions
*
*/
/*
*
* A promise can only take a function(param1, param2)
*
*
********/

async function cleanLookingPromises() {
  try {
    // Will print
    console.log(`Prior to await conventionalPromiseFactory`);
    // Will block
    let response = await conventionalPromiseFactory();
    // Will block
    await console.log(`Awaiting response ${response}`);
    // Will block
    console.log(`Not waiting for response ${response}`);
    // Will block
    console.log(`Also not waiting for response ${response}`);

  } catch (error) {
    // TODO create a long running function to blowck and see if the message is printed first.
    console.log('You generated an error:', error);
  }
}

function promiseAllTest() {
  // Promise.all waits for all promises to be resolved, or for any to be rejected
  // If it resolves an array containing all the return values for the promises is returned
  // If it rejects then the reason for rejection in in the return value.

  // The result is that all three promises complete in their own time
  // but the second promise ended up in the catch body and no other processing occures.
  Promise.all([conventionalPromiseFactory(3, true),
  conventionalPromiseFactory(10, false),
  conventionalPromiseFactory(19, true)])
    .then(array => { console.log(`\nAll Concurrent Processing complete ${array}`); })
    .catch(array => { console.log(`\nConcurrent Processes at least 1 rejection; reason: ${array}`); });
}

function promiseAllSettled() {
  // All promises will be resolved and the then cod will be run and all results
  // Will be shown in the array.
  Promise.allSettled([conventionalPromiseFactory(3, true),
  conventionalPromiseFactory(10, false),
  conventionalPromiseFactory(19, true)])
    .then(array => { console.log(`\nAll Concurrent Processing complete ${array}`); })
    .catch(array => { console.log(`\nConcurrent Processes at least 1 rejection; reason: ${array}`); });
}

function promiseAny() {
  // Will stop on the first fullfilled promise and return a promise that returns its value
  Promise.any([conventionalPromiseFactory(5, false),
  conventionalPromiseFactory(8, true),
  conventionalPromiseFactory(19, false)])
    .then(array => { console.log(`\nAll Concurrent Processing complete ${array}`); })
    .catch(array => { console.log(`\nConcurrent Processes at least 1 rejection; reason: ${array}`); });
}

function promiseRace() {
  // Wait till one promise either resolves or rejects and return that first promises return value
  Promise.race([conventionalPromiseFactory(5, false),
  conventionalPromiseFactory(8, true),
  conventionalPromiseFactory(19, false)])
    .then(array => { console.log(`\nAll Concurrent Processing complete ${array}`); })
    .catch(array => { console.log(`\nConcurrent Processes at least 1 rejection; reason: ${array}`); });
}

function sequentialPromises() {
  conventionalPromiseFactory(10)
    .then(() => conventionalPromiseFactory(3))
    .then(conventionalPromiseFactory(10))
    .then(() => console.log('\nComplete Sequential Processing'));
}

async function conventionalPromiseFactory(delay, eventuallyResolve) {
  return await new Promise((resolve, reject) => {
    let returnObject =
      genericDelayedFunction(resolve, reject, delay,
        'Conventional Promise Factory',
        eventuallyResolve);
    console.log(`What is ${delay} second object are we resolving ${eventuallyResolve}`, returnObject);
  });
}


function genericDelayedFunction(promiseResolveMethod,
  promiseRejectMethod,
  delayTimeInSeconds,
  extraMessage,
  forceResolve) {
  console.log(`${delayTimeInSeconds} second delay function`);
  let timeInMS = delayTimeInSeconds * 1000;
  setTimeout(messageFromImportantWork,
    timeInMS,
    timeInMS.toString() + 'ms delay',
    promiseResolveMethod,
    promiseRejectMethod,
    extraMessage, forceResolve);
}


function messageFromImportantWork(wrappingParentId, resolveMethod,
  rejectMethod, messageToPass, forceResolve) {
  let package = 'hello world';
  console.log(`'${wrappingParentId}' seconds Delay\'s Work Completed and package:${package} and extra message ${messageToPass}`);
  if (forceResolve == false) {
    console.log('rejecting!');
    rejectMethod('Was told to reject');
  } else {
    console.log('resolving');
    resolveMethod('42');
  }
  return 'Some Important Work Done!';
}

function fetchLikeFunction(resolve, reject) {
  // Delay for 3 seconds
  console.log('testDelayReturnFunction called');
  setTimeout(contrivedFunction, 3000, 'alabel', 'https://cdn.pixabay.com/photo/2013/11/25/09/47/buildings-217878_150.jpg', resolve, reject);
}


function contrivedFunction(tag, imageLocation, resolve, reject) {
  let element = document.getElementById(tag).innerHTML = 'Changed';
  let img = document.getElementById('targetImage');
  if (img == null) {
    console.log('Hey element is null');
  } else {
    img.src = imageLocation;
    //console.log(`image innerhtml ${img.innerHTML}`); //Doesn't exist
    console.log(`imagelocation: ${imageLocation}`);
    reject();
  }
  return;
}


function actualReturn() {
  console.log('delayed returning data');
  return { data: 'some delayed data' };
}

//testDelayReturnFunction();
async function go() {
  // Definition of Delayed promise
  let delayedPromise = new Promise(
    (resolve, reject) => {
      console.log('Immediately called: We promise to use promised for good');
      fetchLikeFunction(resolve, reject);
      //resolve();
      //console.log(`fetchLikeFunction returned data ${fetchLikeFuction()}`);
    });
  // Activation of Delayed Promise.

  try {
    let returnvalue = await delayedPromise;
    console.log(returnValue);
    console.log('delayedPromise variable was resolved');
    console.log('first then');
    console.log("second then");
  } catch (error) {
    console.log('Catch processing:', error);
  }
}
