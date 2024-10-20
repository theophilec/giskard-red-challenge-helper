document.addEventListener("DOMContentLoaded", function () {
  const challengeSelect = document.getElementById("challengeSelect");
  const exportButton = document.getElementById("exportButton");
  const tableBody = document.getElementById("tableBody");
  let allData = [];

  // Request data from content script
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getData" },
      function (response) {
        if (response && response.data) {
          allData = response.data;
          populateChallengeSelect();
        } else {
          console.error(
            "Failed to retrieve data:",
            response ? response.error : "Unknown error",
          );
        }
      },
    );
  });

  // Populate challenge select dropdown
  function populateChallengeSelect() {
    const challenges = [...new Set(allData.map((item) => item.challenge))];

    challenges.forEach((challenge) => {
      const option = document.createElement("option");
      option.value = challenge;
      option.textContent = challenge;
      challengeSelect.appendChild(option);
    });
  }

  // Display data for selected challenge
  challengeSelect.addEventListener("change", function () {
    const selectedChallenge = this.value;
    if (!selectedChallenge) return;

    const filteredData = allData.filter(
      (item) => item.challenge === selectedChallenge,
    );

    tableBody.innerHTML = "";
    filteredData.forEach((item) => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = item.prompt;
      row.insertCell(1).textContent = item.response;
    });
  });

  // Export all data as JSON
  exportButton.addEventListener("click", function () {
    const jsonString = JSON.stringify(allData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "challenge_data.json";
    a.click();

    URL.revokeObjectURL(url);
  });
});
