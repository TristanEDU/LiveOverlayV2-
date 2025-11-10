// --- Utilities
const $ = (sel) => document.querySelector(sel);

// Small storage adapter: prefer chrome.storage.local if available, otherwise fall back to localStorage
const storageAdapter = (() => {
	// chrome.storage.local (MV3) style promise wrappers
	if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
		return {
			async get(defaults = {}) {
				return new Promise((resolve) => {
					chrome.storage.local.get(defaults, (items) => resolve(items || {}));
				});
			},
			async set(obj = {}) {
				return new Promise((resolve) => {
					chrome.storage.local.set(obj, () => resolve());
				});
			},
		};
	}
	// Fallback to localStorage
	return {
		async get(defaults = {}) {
			const result = { ...defaults };
			try {
				for (const key of Object.keys(defaults)) {
					const raw = localStorage.getItem(key);
					if (raw !== null) result[key] = JSON.parse(raw);
				}
			} catch (e) {
				// ignore parse errors and keep defaults
			}
			return result;
		},
		async set(obj = {}) {
			try {
				for (const [k, v] of Object.entries(obj)) {
					localStorage.setItem(k, JSON.stringify(v));
				}
			} catch (e) {
				// ignore storage errors
			}
		},
	};
})();

// --- Default settings
const DEFAULT_SETTINGS = {
	lastUrl: "",
	opacity: 60,
	invert: false,
	grid: false,
	passthrough: false,
};

// Defer until DOM ready
window.addEventListener("DOMContentLoaded", async () => {
	// --- Elements
	const elements = {
		urlInput: $("#urlInput"),
		launchBtn: $("#launchBtn"),
		chips: $("#presetChips"),
		opacityRange: $("#opacityRange"),
		opacityVal: $("#opacityVal"),
		invertToggle: $("#invertToggle"),
		gridToggle: $("#gridToggle"),
		passToggle: $("#passToggle"),
		veil: $("#veil"),
		gridLayer: $("#gridLayer"),
		minBtn: $("#minBtn"),
		closeBtn: $("#closeBtn"),
	};

	// --- Load saved state
	(async () => {
		const saved = await storageAdapter.get(DEFAULT_SETTINGS);

		if (saved.lastUrl && elements.urlInput)
			elements.urlInput.value = saved.lastUrl;
		if (elements.opacityRange)
			elements.opacityRange.value = String(
				saved.opacity ?? DEFAULT_SETTINGS.opacity
			);
		if (elements.opacityVal)
			elements.opacityVal.textContent = `${
				saved.opacity ?? DEFAULT_SETTINGS.opacity
			}%`;
		if (elements.invertToggle)
			elements.invertToggle.checked = Boolean(saved.invert);
		if (elements.gridToggle) elements.gridToggle.checked = Boolean(saved.grid);
		if (elements.passToggle)
			elements.passToggle.checked = Boolean(saved.passthrough);

		applySettings(saved);
	})();

	// --- URL launch
	async function launch(url) {
		try {
			const normalized = normalizeUrl(url);
			await storageAdapter.set({ lastUrl: normalized });
			if (
				typeof chrome !== "undefined" &&
				chrome.runtime &&
				chrome.runtime.sendMessage
			) {
				chrome.runtime.sendMessage({
					type: "OPEN_OVERLAY_FOR_URL",
					url: normalized,
				});
			}
		} catch (e) {
			alert("Please enter a valid URL.");
		}
	}

	function normalizeUrl(u) {
		if (!u) throw new Error("empty");
		let url = u.trim();
		if (!/^https?:\/\//i.test(url)) url = "https://" + url;
		// validate
		new URL(url);
		return url;
	}

	// --- Apply settings
	function applySettings(settings) {
		applyOpacity(settings.opacity);
		applyInvert(settings.invert);
		applyGrid(settings.grid);
		applyPassthrough(settings.passthrough);
	}

	function applyOpacity(val) {
		if (!elements.veil) return;
		const num = Number.isFinite(Number(val))
			? Number(val)
			: DEFAULT_SETTINGS.opacity;
		elements.veil.style.opacity = Math.max(0, Math.min(1, num / 100));
		if (elements.opacityVal) elements.opacityVal.textContent = `${num}%`;
		if (elements.opacityRange) elements.opacityRange.value = String(num);
	}

	function applyInvert(on) {
		document.documentElement.style.filter = on ? "invert(1)" : "";
		if (elements.invertToggle) elements.invertToggle.checked = Boolean(on);
	}

	function applyGrid(on) {
		if (elements.gridLayer) elements.gridLayer.hidden = !on;
		if (elements.gridToggle) elements.gridToggle.checked = Boolean(on);
	}

	function applyPassthrough(on) {
		const pointerEvents = on ? "none" : "auto";
		if (elements.veil) elements.veil.style.pointerEvents = pointerEvents;
		if (elements.gridLayer)
			elements.gridLayer.style.pointerEvents = pointerEvents;
		document.body.style.pointerEvents = pointerEvents;

		// Keep interactive elements clickable if they exist
		$(".topbar")?.style && ($(".topbar").style.pointerEvents = "auto");
		$(".dock")?.style && ($(".dock").style.pointerEvents = "auto");
		$(".footer")?.style && ($(".footer").style.pointerEvents = "auto");

		if (elements.passToggle) elements.passToggle.checked = Boolean(on);
	}

	// --- Event Listeners
	elements.chips?.addEventListener("click", (e) => {
		const btn = e.target.closest?.(".chip");
		if (!btn) return;
		if (elements.urlInput) {
			elements.urlInput.value = btn.dataset.url || "";
			elements.urlInput.focus();
		}
	});

	elements.launchBtn?.addEventListener("click", () =>
		launch(elements.urlInput?.value)
	);
	elements.urlInput?.addEventListener("keydown", (e) => {
		if (e.key === "Enter") launch(elements.urlInput?.value);
	});

	elements.opacityRange?.addEventListener("input", async (e) => {
		const value = Number(e.target.value);
		if (elements.opacityVal) elements.opacityVal.textContent = `${value}%`;
		applyOpacity(value);
		await storageAdapter.set({ opacity: value });
	});

	elements.invertToggle?.addEventListener("change", async (e) => {
		applyInvert(e.target.checked);
		await storageAdapter.set({ invert: e.target.checked });
	});

	elements.gridToggle?.addEventListener("change", async (e) => {
		applyGrid(e.target.checked);
		await storageAdapter.set({ grid: e.target.checked });
	});

	elements.passToggle?.addEventListener("change", async (e) => {
		applyPassthrough(e.target.checked);
		await storageAdapter.set({ passthrough: e.target.checked });
	});

	// --- Window controls
	elements.minBtn?.addEventListener("click", () => {
		if (
			typeof chrome !== "undefined" &&
			chrome.runtime &&
			chrome.runtime.sendMessage
		) {
			chrome.runtime.sendMessage({ type: "HIDE_OVERLAY" });
		}
	});

	elements.closeBtn?.addEventListener("click", () => window.close());

	// --- Hotkeys
	const HOTKEYS = {
		o: () => elements.opacityRange?.focus(),
		i: () => elements.invertToggle && triggerToggle(elements.invertToggle),
		g: () => elements.gridToggle && triggerToggle(elements.gridToggle),
		v: () => document.body.classList.toggle("hidden"),
	};

	function triggerToggle(element) {
		element.checked = !element.checked;
		element.dispatchEvent(new Event("change", { bubbles: true }));
	}

	window.addEventListener("keydown", (e) => {
		if (!e.altKey) return;
		const handler = HOTKEYS[e.key?.toLowerCase?.()];
		if (handler) handler();
	});
});
