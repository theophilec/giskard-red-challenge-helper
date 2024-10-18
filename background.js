// Function to save the log entry as a markdown file in the Downloads folder
function saveToFileInDownloads(fileName, logEntry) {
  const blob = new Blob([logEntry], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  // Create an invisible link to trigger the download
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  // Append the link to the document and click it
  document.body.appendChild(link);
  link.click();

  // Clean up by removing the link and revoking the object URL
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "saveToDownloads") {
    const { fileName, logEntry } = message.data;
    saveToFileInDownloads(fileName, logEntry);
  }
});
