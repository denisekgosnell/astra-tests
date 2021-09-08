const iterations = 10; 
const numberTests = 10; 

// a promise function that links to the writeRestAPI.js function
const addData = async (testNum) => {
  const response = await fetch("/.netlify/functions/writeRestAPI", {
    method: "POST",
    body: testNum,
  });
  const responseBody = await response.json();
};

// a function that will make <numTests> of asyncronous API calls
// and wait for all calls to return via the promise.all()
async function timeTest(iteration, numTests) {
  const dataPromises = [];
  for (let i = 0, ilen = numTests; i < ilen; i++) {
    dataPromises.push(addData(i + iteration * numTests));
  }
  return await Promise.all(dataPromises);
}

// an incorrectly defined function because 
// it doesn't wait for each group of API calls to complete
function runBadTests(iterations, numberTests) {
  var currentDiv = document.getElementById("badOutput");
  var newContent = document.createTextNode(
    "Round | #Calls |        Start Time        |         End Time         | Total Time "
  );
  currentDiv.appendChild(newContent);
  currentDiv.innerHTML += "<br>";
  for (i = 0; i < iterations; i++) {
    var startTime = new Date();
    results = timeTest(i, numberTests).then(() => {
      var finishTime = new Date();
      var timeTaken = finishTime - startTime;
      var newContent = document.createTextNode(
        "  " +
          i +
          "  |   " +
          numberTests +
          "   | " +
          startTime.toISOString() +
          " | " +
          finishTime.toISOString() +
          " |    " +
          timeTaken
      );
      currentDiv.appendChild(newContent);
      currentDiv.innerHTML += "<br>";
    });
  }
}

// a properly defined function because 
// it does wait for each group of API calls to complete 
// before issuing the next set of asychronous calls
async function runGoodTests(iterations, numberTests) {
  var currentDiv = document.getElementById("goodOutput");
  var newContent = document.createTextNode(
    "Round | #Calls |        Start Time        |         End Time         | Total Time "
  );
  currentDiv.appendChild(newContent);
  currentDiv.innerHTML += "<br>";
  for (i = 0; i < iterations; i++) {
    var startTime = new Date();
    results = await timeTest(i, numberTests).then(() => {
      var finishTime = new Date();
      var timeTaken = finishTime - startTime;
      var newContent = document.createTextNode(
        "  " +
          i +
          "   |   " +
          numberTests +
          "   | " +
          startTime.toISOString() +
          " | " +
          finishTime.toISOString() +
          " |    " +
          timeTaken
      );
      currentDiv.appendChild(newContent);
      currentDiv.innerHTML += "<br>";
    });
  }
}
