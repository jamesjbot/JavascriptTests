
/*jshint esversion:8*/

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

let testNumber = 11;

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
      concurrentPromises();
      break;
    }

  case 11:
    {
      sequentialPromises();
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

function concurrentPromises() {
  Promise.all([conventionalPromiseFactory(3), conventionalPromiseFactory(10)])
    .then(() => { console.log('all concurrent processing complete'); });
}

function sequentialPromises() {
  conventionalPromiseFactory(10)
    .then(() => conventionalPromiseFactory(3))
    .then(() => console.log('complete sequential processing'));
}

async function conventionalPromiseFactory(delay) {
  return await new Promise((resolve, reject) => {
    if (delay == 3) {
      let threesecondreturn = threeSecondDelayedFunctionWithPromiseProcessing(resolve, reject, 'Conventional Promise Factory');
    } else {
      let tensecondreturn = tenSecondDelayedFunctionWithPromiseProcessing(resolve, reject, 'Conventional Promise Factory');
      // Should run immediately
    }

    //console.log(`Immediately log state of promise ${threesecondreturn} ${tensecondreturn}`);
  });
}


function threeSecondDelayedFunction() {
  console.log('Three Second Delayed Function called');
  let properParameter = 'properParameter';
  setTimeout(messageFromImportantWork, 3000, 'three seconds');
}

function threeSecondDelayedFunctionWithPromiseProcessing(promiseResolveMethod, promiseRejectMethod, extraMessage) {
  console.log('Three Second Delayed Function');
  setTimeout(messageFromImportantWork, 3000, 'three seconds', promiseResolveMethod, promiseRejectMethod, extraMessage);
}


function tenSecondDelayedFunction(promiseResolveMethod, promiseRejectMethod) {
  console.log('Ten Second Delayed Function called');
  setTimeout(messageFromImportantWork, 10000, 'ten seconds');
}

function tenSecondDelayedFunctionWithPromiseProcessing(promiseResolveMethod, promiseRejectMethod, extraMessage) {
  console.log('Ten Second Delayed Function called');
  setTimeout(messageFromImportantWork, 10000, 'ten seconds', promiseResolveMethod, promiseRejectMethod, extraMessage);
}


function messageFromImportantWork(wrappingParentId, resolveMethod, rejectMethod, messageToPass) {
  let package = 'hello world';
  console.log(`'${wrappingParentId}' Delay\'s Work Completed and package:${package} and extra message ${messageToPass}`);
  resolveMethod('42');
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
