console.log("Overlay.js ready to go!");

let allIdsExist = true;

const ids = [
	"urlInput",
	"launchBtn",
	"opacityRange",
	"opacityVal",
	"invertToggle",
	"gridToggle",
	"passToggle",
	"veil",
	"gridLayer",
	"minBtn",
	"closeBtn",
];
ids.forEach((id) => {
	const element = document.getElementById(id);
	if (element !== null) {
		console.log(`Element with id "${id}" exists.`);
		if (allIdsExist !== false) {
			allIdsExist = true;
		} else {
			allIdsExist = false;
		}
	} else {
		console.log(`Element with id "${id}" does not exist.`);
		allIdsExist = false;
	}
	if (allIdsExist === true) {
		console.log("Overlay UI ready");
	} else {
		console.log("We have a issue, there are missing IDs");
	}
});
