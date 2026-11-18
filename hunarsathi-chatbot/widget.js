/* ==========================================================================
   HunarSathi — Buyer Chatbot Frontend Widget for HunarLink Main Page
   Connects to LangChain + Gemini (gemini-3.8-flash) FastAPI Backend
   ========================================================================== */
(function () {
  const API_BASE = "http://127.0.0.1:5050";
  const SESSION_KEY = "hunarsathi_session_id";

  function getSessionId() {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = "buyer-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  }

  let isLiveGemini = false;
  let isBusy = false;

  const WELCOME_MSG =
    "Namaste! I am HunarSathi, your dedicated HunarLink buyer assistant.\n\n" +
    "Ask me anything about our GI-certified Kashmiri crafts (Pashmina, Walnut Woodcarving, Papier-Mâché, Silk Rugs, Kani & Sozni), prices, GI Tag verification, escrow payments, or order tracking!";

  const OFF_TOPIC_MSG =
    "I am HunarSathi, the dedicated assistant for HunarLink. I can only answer questions related to the HunarLink platform — such as Kashmiri crafts, prices, artisans, GI Tag verification, orders, escrow payments, and delivery. How can I help you on HunarLink today?";

  /* Strict HunarLink-only offline fallback when local Python backend isn't started yet */
  function offlineHunarLinkFallback(text) {
    const q = text.toLowerCase();
    const isHunarLinkRelated = /(hunarlink|hunarsathi|pashmina|shawl|kani|sozni|walnut|wood|papier|mache|mâché|silk|rug|carpet|craft|artisan|ustad|kashmir|srinagar|budgam|anantnag|gi |gi-jk|tag|verify|verification|purity|micron|price|cost|order|track|ship|deliver|escrow|cod|pay|upi|cart|wishlist|return|refund|wholesale|b2b|seller|register|hi|hello|namaste|help)/i.test(q);

    if (!isHunarLinkRelated) {
      return OFF_TOPIC_MSG;
    }
    if (/^(hi|hello|hey|namaste|salam)\b/i.test(q.trim())) {
      return "Namaste! Welcome to HunarLink — Valley Craft Guild. How can I help you explore our GI-certified Kashmiri crafts, check prices, or verify a GI Tag today?";
    }
    if (/pashmina|shawl|stole/i.test(q)) {
      return "All 20 GI-certified Kashmiri Pashmina & Kani shawls on HunarLink are priced between ₹1,050 and ₹1,980 (MRPs up to ₹2,000), crafted from authentic sub-16-micron Changthangi fleece by Srinagar & Budgam master artisans. Popular picks include Royal Khudrang Pashmina (₹1,650 • GI-JK-PASH-8821) and Jamawar Heirloom Stole (₹1,850 • GI-JK-PASH-8810).";
    }
    if (/gi|verify|verification|authentic|fake|micron|lab|passport/i.test(q)) {
      return "Every HunarLink craft passes our 3-Step Valley Verification Flow:\n1. Artisan Geo-Verification (GPS-logged J&K workshop)\n2. Material Purity Lab Review (sub-16µm Pashmina & 99.4% purity test)\n3. GI Tag & Tamper-Proof QR Laser Seal\n\nYou can test any code live in the 'Verify GI Tag' box (try GI-JK-PASH-8821 or GI #JK-WNT-1180).";
    }
    if (/order|track|ship|deliver|escrow|pay|cod|upi|refund|return/i.test(q)) {
      return "HunarLink protects every purchase with UPI/Card Escrow and Verify-on-Delivery (COD) Escrow — you can scan the physical GI QR tag at your doorstep before payment release. Track all 5 stages (Confirmed → GI Seal Verified → Packed at Loom → Insured Transit → Delivered) anytime from your profile Orders modal.";
    }
    if (/walnut|papier|mache|mâché|silk|rug|carpet|sozni|kani/i.test(q)) {
      return "HunarLink curates 5 Heritage Craft Guilds direct from J&K workshops with 100% artisan payout:\n• Pashmina & Kani Shawls (₹1,050–₹1,980)\n• Walnut Woodcarving (Anantnag seasoned walnut, e.g., Openwork Chinar Chest ₹14,800)\n• Papier-Mâché Art (₹500–₹980, 24K gold leaf Naqash)\n• Silk-on-Silk Rugs (up to 900 knots/sq.in)\n• Kani Jamawar & Sozni Needlework";
    }
    if (/wholesale|b2b|bulk/i.test(q)) {
      return "HunarLink's B2B Hospitality Trade Desk offers direct guild pricing with tiered discounts (12% for 10+ units, 18% for 25+, 25% for 50+) and batch GI export seals. Click 'Wholesale' in the top navigation bar to generate an instant quote.";
    }
    return "On HunarLink, you can shop 100+ GI-certified Kashmiri crafts directly from 2,400+ verified J&K artisans with zero middleman cut. Ask me about Pashmina prices, GI verification, Walnut/Papier-Mâché/Silk Rugs, escrow payments, or order tracking!";
  }

  function injectWidget() {
    if (document.getElementById("hunarsathi-launcher")) return;

    const launcher = document.createElement("button");
    launcher.id = "hunarsathi-launcher";
    launcher.type = "button";
    launcher.className = "hunarsathi-launcher";
    launcher.setAttribute("aria-label", "Open HunarSathi Buyer Assistant");
    launcher.innerHTML = `
      <span class="hs-launcher-inner">
        <span class="hunarsathi-launcher-avatar">✦</span>
        <span class="hunarsathi-launcher-text">HunarSathi</span>
        <span class="hunarsathi-launcher-pulse" aria-hidden="true"></span>
      </span>
    `;

    const win = document.createElement("section");
    win.id = "hunarsathi-window";
    win.className = "hunarsathi-window";
    win.setAttribute("aria-label", "HunarSathi Buyer Chatbot");
    win.innerHTML = `
      <div class="hs-header">
        <div class="hs-header-left">
          <div class="hs-bot-badge">✦</div>
          <div>
            <div class="hs-bot-name">HunarSathi</div>
            <div class="hs-bot-sub">
              <span class="hs-status-dot" id="hs-status-dot"></span>
              <span id="hs-status-text">HunarLink Assistant</span>
            </div>
          </div>
        </div>
        <div class="hs-header-actions">
          <button type="button" class="hs-icon-btn" id="hs-reset-btn" title="Reset Chat">↺</button>
          <button type="button" class="hs-icon-btn" id="hs-close-btn" title="Close">✕</button>
        </div>
      </div>

      <div class="hs-scope-bar">
        <span>🛡️ HunarLink Buyer Guide Only</span>
      </div>

      <div class="hs-messages" id="hs-messages"></div>

      <div class="hs-chips-bar">
        <button type="button" class="hs-chip" data-q="What are the Pashmina prices on HunarLink?">🧣 Pashmina Prices</button>
        <button type="button" class="hs-chip" data-q="How does HunarLink GI verification work?">🛡️ GI Verification</button>
        <button type="button" class="hs-chip" data-q="How do escrow payment and order tracking work?">📦 Orders &amp; Escrow</button>
        <button type="button" class="hs-chip" data-q="Tell me about Walnut woodcarving and Papier-Mâché crafts.">🪵 Crafts Guide</button>
      </div>

      <form class="hs-composer" id="hs-composer">
        <div class="hs-input-wrap">
          <input type="text" id="hs-input" class="hs-input" placeholder="Ask HunarSathi about HunarLink..." autocomplete="off" required>
        </div>
        <button type="submit" id="hs-send-btn" class="hs-send-btn">
          <span class="hs-send-inner">Ask</span>
        </button>
      </form>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(win);

    appendMessage("bot", WELCOME_MSG);

    launcher.addEventListener("click", () => {
      win.classList.toggle("open");
      if (win.classList.contains("open")) {
        checkBackendHealth();
        document.getElementById("hs-input")?.focus();
      }
    });

    document.getElementById("hs-close-btn").addEventListener("click", () => {
      win.classList.remove("open");
    });

    document.getElementById("hs-reset-btn").addEventListener("click", async () => {
      const box = document.getElementById("hs-messages");
      if (box) box.innerHTML = "";
      appendMessage("bot", WELCOME_MSG);
      try {
        await fetch(`${API_BASE}/api/reset`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: getSessionId() })
        });
      } catch (e) {}
    });

    win.querySelectorAll(".hs-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        sendUserMessage(chip.dataset.q);
      });
    });

    document.getElementById("hs-composer").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("hs-input");
      const msg = (input?.value || "").trim();
      if (!msg || isBusy) return;
      input.value = "";
      sendUserMessage(msg);
    });

    checkBackendHealth();
  }

  async function checkBackendHealth() {
    const dot = document.getElementById("hs-status-dot");
    const txt = document.getElementById("hs-status-text");
    try {
      const res = await fetch(`${API_BASE}/api/health`, { method: "GET" });
      if (!res.ok) throw new Error("not ok");
      const data = await res.json();
      isLiveGemini = !!data.gemini_key_configured;
    } catch (e) {
      isLiveGemini = false;
    }
    if (dot) dot.classList.remove("offline");
    if (txt) txt.textContent = "HunarLink Assistant • Online";
  }

  function appendMessage(role, text, extraClass) {
    const box = document.getElementById("hs-messages");
    if (!box) return null;
    const div = document.createElement("div");
    div.className = `hs-msg ${role}${extraClass ? " " + extraClass : ""}`;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
  }

  async function sendUserMessage(message) {
    if (isBusy) return;
    isBusy = true;

    const sendBtn = document.getElementById("hs-send-btn");
    if (sendBtn) sendBtn.disabled = true;

    appendMessage("user", message);
    const typingEl = appendMessage("bot", "HunarSathi is thinking...", "typing");

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          session_id: getSessionId()
        })
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reply) {
        if (typingEl) typingEl.remove();
        appendMessage("bot", data.reply);
      } else {
        // Fallback cleanly if API key is still placeholder or backend returns 503
        if (typingEl) typingEl.remove();
        appendMessage("bot", offlineHunarLinkFallback(message));
      }
    } catch (err) {
      if (typingEl) typingEl.remove();
      appendMessage("bot", offlineHunarLinkFallback(message));
    } finally {
      isBusy = false;
      if (sendBtn) sendBtn.disabled = false;
      document.getElementById("hs-input")?.focus();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectWidget);
  } else {
    injectWidget();
  }
})();

