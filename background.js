console.log("The Service worker is ready!");

chrome.windows.getCurrent((win) => {
	const { top, height, left, width } = win;
	console.log(`Top: ${top}, Height: ${height}, Left: ${left}, Width: ${width}`);

	function operationOverlay() {
		chrome.windows.create(
			{
				url: "src/ui/overlay.html",
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
	}
});

// const btn = document.querySelector("button");

// btn.addEventListener("click", operationOverlay);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "openOverlay") operationOverlay();
});
