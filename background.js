console.log("The Service worker is ready!");

function operationOverlay(prodUrl) {
  const urlToOpen = typeof prodUrl === "string" && prodUrl.length > 0 ? prodUrl : "https://example.com";

  chrome.windows.getCurrent((win) => {
    const { top, height, left, width } = win;
    console.log(`Top: ${top}, Height: ${height}, Left: ${left}, Width: ${width}`);

    chrome.windows.create(
      {
        // url: "src/ui/overlay.html",
        url: urlToOpen,
        type: "popup",
        height: height,
        width: width,
        top: top,
        left: left,
      },
      (createdWindow) => {
        console.log("Created window:", createdWindow);
      }
    );
  });
}

// const btn = document.querySelector("button");

// btn.addEventListener("click", operationOverlay);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.action === "openOverlay") {
    operationOverlay(message.url);
  }
});
