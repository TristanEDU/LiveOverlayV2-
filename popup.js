document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("urlInput");
  const launchBtn = document.getElementById("launchBtn");
  const opacityRange = document.getElementById("opacityRange");
  const opacityVal = document.getElementById("opacityVal");
  const invertToggle = document.getElementById("invertToggle");
  const gridToggle = document.getElementById("gridToggle");
  const passToggle = document.getElementById("passToggle");
  const presetChips = document.getElementById("presetChips");

  function normalizeUrl(input) {
    if (!input) return null;
    let val = String(input).trim();
    if (!/^https?:\/\//i.test(val)) {
      val = "https://" + val;
    }
    try {
      const u = new URL(val);
      return u.protocol === "http:" || u.protocol === "https:" ? u.href : null;
    } catch (e) {
      return null;
    }
  }

  // Prefill state from storage
  try {
    chrome.storage?.local?.get(["lastUrl", "overlaySettings"], (res) => {
      if (res?.lastUrl && urlInput) urlInput.value = res.lastUrl;
      const s = res?.overlaySettings || {};
      if (typeof s.opacity === "number" && opacityRange && opacityVal) {
        opacityRange.value = String(s.opacity);
        opacityVal.textContent = `${s.opacity}%`;
      }
      if (invertToggle && typeof s.invert === "boolean") invertToggle.checked = s.invert;
      if (gridToggle && typeof s.grid === "boolean") gridToggle.checked = s.grid;
      if (passToggle && typeof s.passThrough === "boolean") passToggle.checked = s.passThrough;
    });
  } catch {}

  if (opacityRange && opacityVal) {
    opacityRange.addEventListener("input", () => {
      opacityVal.textContent = `${opacityRange.value}%`;
    });
  }

  if (presetChips) {
    presetChips.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      const u = btn.getAttribute("data-url");
      if (u && urlInput) {
        urlInput.value = u;
        urlInput.setCustomValidity("");
        urlInput.reportValidity?.();
        urlInput.focus();
      }
    });
  }

  function doLaunch() {
    const normalized = normalizeUrl(urlInput?.value || "");
    if (!normalized) {
      if (urlInput) {
        urlInput.setCustomValidity("Enter a valid URL starting with http(s)://");
        urlInput.reportValidity?.();
      }
      return;
    }

    if (urlInput) urlInput.setCustomValidity("");

    const settings = {
      opacity: opacityRange ? Number(opacityRange.value) : 60,
      invert: !!(invertToggle && invertToggle.checked),
      grid: !!(gridToggle && gridToggle.checked),
      passThrough: !!(passToggle && passToggle.checked),
    };

    try {
      chrome.storage?.local?.set({ lastUrl: normalized, overlaySettings: settings });
    } catch {}

    try {
      chrome.runtime?.sendMessage({ action: "openOverlay", url: normalized });
    } catch {}

    // Optional: close popup after launching
    window.close?.();
  }

  if (launchBtn) launchBtn.addEventListener("click", doLaunch);
  if (urlInput) {
    urlInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doLaunch();
    });
  }
});
