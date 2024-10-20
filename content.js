function go() {
  // This grabs both form and response
  var container = document.querySelector(
    'div[class="my-8 lg:flex lg:gap-x-8"]',
  );

  const splitURL = window.location.toString().split("/");
  const challengeName = splitURL[splitURL.length - 1];
  console.log("Challenge name:", challengeName);

  // open DB
  const dbName = "llmDB";
  const dbVersion = 1;
  let db;

  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.error);
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("IndexedDB opened successfully");
  };

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore("triesStore", {
      keyPath: "id",
      autoIncrement: true,
    });
    console.log("Object store created");
  };
  let lastUrl = location.href;

  var observer = new MutationObserver(function (mutations, obs) {
    mutations.forEach(function (mutation) {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        obs.disconnect();
        setTimeout(go, 1000);
      }
      // determine if response has arrived
      const response = container.lastChild.children[1].textContent;
      if (response == "Thinking…") {
      } else {
        // console.log("Response recieved:");
        const prompt = container.firstChild.firstChild.children[1].value;
        console.log("Prompt:", prompt);
        console.log("Response:", response);
        const dataToAdd = {
          timestamp: new Date().toISOString(),
          challenge: challengeName,
          prompt: prompt,
          response: response,
        };

        // Add data to IndexedDB
        const transaction = db.transaction(["triesStore"], "readwrite");
        const objectStore = transaction.objectStore("triesStore");
        const request = objectStore.add(dataToAdd);

        request.onerror = (event) => {
          console.error("Error adding data to IndexedDB:", event.target.error);
        };

        request.onsuccess = (event) => {
          console.log("Data added to IndexedDB successfully");
        };
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
  const splitURL = window.location.toString().split("/");
  if (splitURL.length == 6) {
    console.log("On a challenge page -> starting script.");
    setTimeout(go, 1000);
  } else {
    console.log("Ignoring page.");
  }
});
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    const splitURL = window.location.toString().split("/");
    if (splitURL.length == 6) {
      console.log("On a challenge page -> starting script.");
      setTimeout(go, 1000);
    } else {
      console.log("Ignoring page.");
    }
  }
}).observe(document, { subtree: true, childList: true });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getData") {
    const dbName = "llmDB";
    const dbVersion = 1;
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
      sendResponse({ error: "Failed to open database" });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["triesStore"], "readonly");
      const objectStore = transaction.objectStore("triesStore");
      const getAllRequest = objectStore.getAll();

      getAllRequest.onerror = (event) => {
        console.error("Error getting data:", event.target.error);
        sendResponse({ error: "Failed to retrieve data" });
      };

      getAllRequest.onsuccess = (event) => {
        sendResponse({ data: event.target.result });
      };
    };

    return true; // Indicates that the response is sent asynchronously
  }
});
