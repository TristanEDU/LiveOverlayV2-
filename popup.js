const btn = document.querySelector("button");
btn.addEventListener("click", () => {
	chrome.runtime.sendMessage({ action: "openOverlay" });
});
