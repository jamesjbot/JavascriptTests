
/*jshint esversion:8*/

const { reject, delay } = require("q");

// Goal Explore Promises and timers in Node.js

/* setTime type signature
*
* setTimeout(function_name, delayINmilliseconds, parametersTOfunction, ...)
*
*/


// What are the resolve and reject functions on a Promise?
// These methods that the Promise constructor injects into the supplied function.

/*
*
* event loop
*
*/

let testNumber = 16;

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
      promiseAll();
      break;
    }

  case 12:
    {
      promiseAllSettled();
      break;
    }

  // case 13:
  //   {
  //     // Only supported in Node.js 15.0.0
  //     promiseAny();
  //     break;
  //   }

  case 14:
    {
      promiseRace();
      break;
    }


  case 15:
    {
      asyncWrapper();
      break;
    }

  case 16:
    {
      asyncWithCallback();
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

    console.log(`Not waiting for response ${response}`);
    console.log(`Also not waiting for response ${response}`);

  } catch (error) {
    // TODO create a long running function to blowck and see if the message is printed first.
    console.log('You generated an error:', error);
  }
}

function asyncWithCallback() {
  funcWithCallback(callback);
}

async function funcWithCallback(func) {
  let response = await func('Jude');
  displayConsolelog(response);
}

function displayConsolelog(message) {
  console.log(message);
}

function callback(message) {
  console.log(`Hey ${message}!`);
  return 'hello world';
}

function asyncWrapper() {
  asyncAwaitPromises();
}

async function asyncAwaitPromises() {
  //(true == false) ? console.log('Hello') : throw 'oops';
  try {
    console.log('before first');
    let firstprom = await conventionalPromiseFactory(3, true); // <--- This is waiting
    console.log('between 1st and 2nd', firstprom);
    let secondprom = await conventionalPromiseFactory(firstprom - 40, true);
    console.log('between 2nd and 3rd <--', secondprom);
    console.log('between 2nd and 3rd <---', thirdprom);
    //if (secondprom == 42) throw 'we have the answer to life!';
    let thirdprom = await conventionalPromiseFactory(secondprom - 37, true);
    console.log('final', await thirdprom);
  } catch (error) {
    console.log('You have an error:', error);
  }
  // console.log('Before Await');
  // console.log('waiting promise:',await prom);
  // let somethingelse = await prom; // <-- this is waiting for resolution
  // console.log('promise:',prom);
  // console.log('non waiting promise:',prom);
  // let longpromise = conventionalPromiseFactory( somethingelse - 32, true);
  // await console.log('somethingelse:',somethingelse);
  // console.log('non waiting somethingelse:',somethingelse);
  // //somethingelse.then(console.log('hello'))
  // //.catch( error => {console.log('error occured',error);});
  // await console.log('long promise',longpromise);
  // console.log('After Await');
  // console.log('long promise',longpromise);
  // console.log('Never wait');
}

async function queryAll3APIBuildJSONOfUserData(from_placename, dateStats) {
  console.log('queryAll3 called');

  console.log(`Query all3 received these dateStats:$`, dateStats);

  let USEROUTPUTDATA = {};

  getLatLongLocationPromise(from_placename) // Query 1
    .then(res => res.json())
    .then(json_Location => {
      //TODO Remove
      console.log('Getting Weather promise');
      if (json_Location.exists == false || json_Location.exists == null) {
        USEROUTPUTDATA = createErrorUserData();
        throw 'Unknown location';
      }
      // convert latitude and longitude to get weather
      return getWeatherPromise(json_Location, dateStats.typeOfWeathercast, dateStats.month_day); //Query 2
    })
    .then(weather_data => {
      // TODO Store weather data and labels
      console.log('Received weather data from getWeatherPromise');
      console.log('Error neturalizing output');
    })
    .then(() => {
      // Get image
      // TODO REMOVE
      console.log('Getting Pixabay Image URL ');
      return fetchPixabayImageURLFromServer(from_placename); // Query 3
    })
    .then(imageURL => {
      // store image data
      // TODO REMOVE
      console.log('populating useroutdata');
      if (imageURL != null) {
        USEROUTPUTDATA.imageURL = imageURL;
      } else {
        USEROUTPUTDATA.caption = 'No Image Available';
      }
    })
    .catch(function (error) {
      console.log('Sorry error with getting location or weather', error);
    });
  return USEROUTPUTDATA;
}

function promiseAll() {
  // Promise.all waits for all promises to be resolved, or for any to be rejected
  // If it resolves an array containing all the return values for the promises is returned
  // If it rejects then the reason for rejection in in the return value.

  // The result is that all three promises complete in their own time
  // but the second promise ended up in the catch body and no other processing occures.

  // Use this when you want all promises to complete or reject when anyone of them rejects

  Promise.all([conventionalPromiseFactory(3, true),
  conventionalPromiseFactory(10, false),
  conventionalPromiseFactory(19, true)])
    .then(array => { console.log(`\nAll Concurrent Processing complete ${array}`); })
    .catch(array => { console.log(`\nConcurrent Processes at least 1 rejection; reason: ${array}`); });
}

function promiseAllSettled() {
  // All promises will be resolved and the then cod will be run and all results
  // Will be shown in the array.

  // Use when you want a resoponse fron every promise either resolved or rejected
  Promise.allSettled([conventionalPromiseFactory(3, true),
  conventionalPromiseFactory(10, false),
  conventionalPromiseFactory(19, true)])
    .then(array => { console.log(`\nAll Concurrent Processing complete ${array}`); })
    .catch(array => { console.log(`\nConcurrent Processes at least 1 rejection; reason: ${array}`); });
}

// function promiseAny() {
//   // Will stop on the first fullfilled promise and return a promise that returns its value

//   // Use when you want the first promise that fulfills and resolves
//   Promise.any([conventionalPromiseFactory(5, false),
//   conventionalPromiseFactory(8, true),
//   conventionalPromiseFactory(19, false)])
//     .then(array => { console.log(`\nAll Concurrent Processing complete ${array}`); })
//     .catch(array => { console.log(`\nConcurrent Processes at least 1 rejection; reason: ${array}`); });
// }

function promiseRace() {
  // Wait till one promise either resolves or rejects and return that first promises return value

  // Use when you want the first resolve or reject from all the promises.
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

function conventionalPromiseFactory(delay, eventuallyResolve) {
  return new Promise((resolve, reject) => {
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
