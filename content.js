// // Function to log prompt and response
// function logInteraction() {
//   const challengeName = document
//     .querySelector("h1")
//     .innerText.trim()
//     .replace(/\s+/g, "_");
//   const fileName = `${challengeName}.md`;

//   const entireField = document.querySelector('class="my-8 lg:flex lg:gap-x-8"');
//   const promptField = document.querySelector("#user_prompt");
//   const outputField = document.querySelector(".whitespace-pre-wrap");

//   if (promptField && outputField) {
//     const prompt = promptField.value;
//     const output = outputField.innerText;
//     console.log(Date.now());
//     console.log(prompt);
//     console.log(output);
//     console.log("Logger: Prompt and response logged.");
//   } else {
//     console.log("Failed to find elements.");
//   }
// }

// function observeResponse() {
//   logInteraction();
// }

// // Function to attach event listener to the submit button
// function attachSubmitListener() {
//   const submitButton = document.querySelector("button");
//   console.log("Logger: Trying to attach listener to submit button...");

//   if (submitButton) {
//     console.log("Logger: Submit button found, adding event listener.");
//     submitButton.addEventListener("click", (event) => {
//       console.log("Logger: Submit button clicked.");
//       observeResponse();
//     });
//   } else {
//     console.log("Logger: Submit button not found. Exiting.");
//   }
// }

function go() {
  // This grabs both form and response
  var container = document.querySelector(
    'div[class="my-8 lg:flex lg:gap-x-8"]',
  );
  console.log(container.textContent);

  // create an observer instance with callback function that acts on a list of mutations
  var observer = new MutationObserver(function (mutations) {
    // console.log("Mutations detected");
    mutations.forEach(function (mutation) {
      // console.log("Mutation");
      // determine if response has arrived
      const response = container.lastChild.children[1].textContent;
      // console.log("Response:", container.lastChild.children[1].textContent);
      if (response == "Thinking…") {
        // console.log("Waiting for response...");
      } else {
        // console.log("Response recieved:");
        const prompt = container.firstChild.firstChild.children[1].value;
        console.log("Prompt:", prompt);
        console.log("Response:", response);
      }
    });
  });

  // configuration of the observer:
  var config = {
    characterData: true,
    attributes: false,
    childList: false,
    subtree: true,
  };

  // pass in the target node, as well as the observer options
  observer.observe(container, config);
  console.log("Observing");

  // // later, you can stop observing
  // console.log("Disconnecting");
  // observer.disconnect();
}

// Wait for the DOM to fully load before running the script
window.addEventListener("load", () => {
  setTimeout(go, 1000);
});
