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
  var target = document.querySelector('div[class="my-8 lg:flex lg:gap-x-8"]');
  // console.log(target.textContent);

  // create an observer instance
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      console.log("Mutation change");
      console.log(mutation.type);
      // if (
      //   document.querySelector('div[class="lg:w-1/2 max-w-xl"] > p').textContent
      // ) {
      // }
    });
  });

  // configuration of the observer:
  var config = { attributes: true, childList: true, characterData: true };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);

  // // later, you can stop observing
  // console.log("Disconnecting");
  // observer.disconnect();
}

// Wait for the DOM to fully load before running the script
window.addEventListener("load", () => {
  setTimeout(go, 3000);
  console.log("Stopped");
});
