const iterations = 10; // todo: user input in UI
const numberTests = 10; // todo: user input in UI

// Define custom promise function
const addData = async (testNum) => {
  const response = await fetch("/.netlify/functions/writeRestAPI", {
    method: "POST",
    body: testNum,
  });
  const responseBody = await response.json();
};

async function timeTest(iteration, numTests) {
  const base = [...Array(numTests).keys()];
  // to make test numbers 20, 21, ... 29 (etc)
  const tests = base.map((x) => iteration * numTests + x);
  const results = await Promise.all(
    tests.map(async (test) => {
      const result = await addData(test);
    })
  );
  return results;
}

async function runGoodTests(iterations, numberTests) {
  var newDiv = document.createElement("div");
  var currentDiv = document.getElementById("main");
  var newContent = document.createTextNode(
    "Iteration | # API Calls | Start Time | End Time | Total Time "
  );
  newDiv.appendChild(newContent);
  newDiv.innerHTML += "<br>";
  for (i = 0; i < iterations; i++) {
    var startTime = new Date();
    results = await timeTest(i, numberTests).then(() => {
      var finishTime = new Date();
      var timeTaken = finishTime - startTime;
      var newContent = document.createTextNode(
        i +
          " | " +
          numberTests +
          " | " +
          startTime.toISOString() +
          " | " +
          finishTime.toISOString() +
          " | " +
          timeTaken
      );
      newDiv.appendChild(newContent);
      newDiv.innerHTML += "<br>";
      // Adding the newly created element and its content into the DOM
      document.body.appendChild(newDiv, currentDiv);
    });
  }
}

function runBadTests(iterations, numberTests) {
  var newDiv = document.createElement("div");
  var currentDiv = document.getElementById("main");
  var newContent = document.createTextNode(
    "Iteration | # API Calls | Start Time | End Time | Total Time "
  );
  newDiv.appendChild(newContent);
  newDiv.innerHTML += "<br>";
  for (i = 0; i < iterations; i++) {
    var startTime = new Date();
    results = timeTest(i, numberTests).then(() => {
      var finishTime = new Date();
      var timeTaken = finishTime - startTime;
      var newContent = document.createTextNode(
        i +
          " | " +
          numberTests +
          " | " +
          startTime.toISOString() +
          " | " +
          finishTime.toISOString() +
          " | " +
          timeTaken
      );
      newDiv.appendChild(newContent);
      newDiv.innerHTML += "<br>";
      // Adding the newly created element and its content into the DOM
      document.body.appendChild(newDiv, currentDiv);
    });
  }
}