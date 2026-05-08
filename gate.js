(async function () {
  var HASH = "21e30c36a1e3abe706578583595d23fda6063f36f6652c375b9b7cbac33c09f1";
  var KEY = "airnest-shared.unlocked";

  if (sessionStorage.getItem(KEY) === HASH) return;

  document.documentElement.style.visibility = "hidden";

  function build() {
    var overlay = document.createElement("div");
    overlay.innerHTML =
      '<style>' +
      '@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400&display=swap");' +
      '.gate{position:fixed;inset:0;background:#0c1420;display:flex;align-items:center;justify-content:center;font-family:"JetBrains Mono",monospace;color:#edf5fc;z-index:999999;visibility:visible!important;}' +
      '.gate-card{background:#111c2c;border:1px solid #1e3048;border-radius:12px;padding:36px 40px;min-width:300px;text-align:center;}' +
      '.gate-tag{font-size:9px;letter-spacing:.3em;color:#00AADD;text-transform:uppercase;margin-bottom:12px;}' +
      '.gate-title{font-family:"DM Serif Display",serif;font-size:24px;margin-bottom:20px;color:#edf5fc;}' +
      '.gate input{width:100%;padding:11px 14px;box-sizing:border-box;background:#0c1420;border:1px solid #1e3048;border-radius:6px;color:#edf5fc;font-family:inherit;font-size:13px;outline:none;}' +
      '.gate input:focus{border-color:#00AADD;}' +
      '.gate-err{color:#ff7066;font-size:11px;margin-top:10px;min-height:16px;}' +
      '.gate-hint{font-size:10px;color:#3a5068;margin-top:14px;}' +
      '</style>' +
      '<div class="gate"><div class="gate-card">' +
      '<div class="gate-tag">Airnest Shared</div>' +
      '<div class="gate-title">Restricted</div>' +
      '<form id="gate-form">' +
      '<input type="password" id="gate-pw" placeholder="Password" autofocus autocomplete="current-password"/>' +
      '<div class="gate-err" id="gate-err"></div>' +
      '</form>' +
      '<div class="gate-hint">Press Enter to unlock</div>' +
      '</div></div>';
    document.body.appendChild(overlay);

    document.getElementById("gate-form").addEventListener("submit", async function (e) {
      e.preventDefault();
      var v = document.getElementById("gate-pw").value;
      var buf = new TextEncoder().encode(v);
      var hashBuf = await crypto.subtle.digest("SHA-256", buf);
      var hex = Array.from(new Uint8Array(hashBuf))
        .map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
      if (hex === HASH) {
        sessionStorage.setItem(KEY, HASH);
        overlay.remove();
        document.documentElement.style.visibility = "";
      } else {
        document.getElementById("gate-err").textContent = "Wrong password.";
        document.getElementById("gate-pw").value = "";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
