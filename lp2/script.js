/*
  Pre-lander settings
  1. Put your offer URL in index.html inside this link:
     <a id="continueLink" href="https://xo.smartsubzone.top/click/1">
  2. Upload index.html, styles.css, script.js, and the assets folder to your hosting.
  3. Send traffic to index.html with your tracker parameters, for example:
     https://yourdomain.com/prelander/?zone_id={zoneid}&subid={subid}

  This script does not store the main offer URL. It reads the URL from index.html,
  then appends tracking parameters to the link before the user clicks.
*/

const translations = {
  en: {
    headline: "You’re one step away!",
    body: "Tap CONTINUE to open your reward chest.",
    button: "CONTINUE"
  },
  pt: {
    headline: "Você está a um passo!",
    body: "Toque em CONTINUAR para abrir seu baú de recompensa.",
    button: "CONTINUAR"
  },
  th: {
    headline: "อีกเพียงขั้นตอนเดียว!",
    body: "แตะ ดำเนินการต่อ เพื่อเปิดหีบรางวัลของคุณ",
    button: "ดำเนินการต่อ"
  },
  ms: {
    headline: "Tinggal satu langkah lagi!",
    body: "Ketik TERUSKAN untuk membuka peti ganjaran anda.",
    button: "TERUSKAN"
  },
  tl: {
    headline: "Isang step na lang!",
    body: "I-tap ang CONTINUE para buksan ang reward chest mo.",
    button: "CONTINUE"
  }
};

function getLanguage() {
  const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  const languages = (navigator.languages || [browserLang]).map((lang) => String(lang).toLowerCase());
  const combined = [browserLang, ...languages].join(" ");

  if (combined.includes("pt") || combined.includes("pt-br") || combined.includes("pt-ao")) return "pt";
  if (combined.includes("th")) return "th";
  if (combined.includes("ms") || combined.includes("ms-my")) return "ms";
  if (combined.includes("tl") || combined.includes("fil")) return "tl";

  return "en";
}

function applyTranslations() {
  const lang = getLanguage();
  const copy = translations[lang] || translations.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (copy[key]) element.textContent = copy[key];
  });
}

function buildLinkUrl(baseHref) {
  const currentParams = new URLSearchParams(window.location.search);
  const target = new URL(baseHref, window.location.href);

  currentParams.forEach((value, key) => {
    if (!target.searchParams.has(key)) {
      target.searchParams.set(key, value);
    }
  });

  target.searchParams.set("prelander_click", "1");
  target.searchParams.set("prelander_lang", getLanguage());
  target.searchParams.set("prelander_ts", String(Date.now()));

  return target.toString();
}

function trackActiveClick() {
  const params = new URLSearchParams(window.location.search);
  const payload = {
    event: "prelander_continue_click",
    zone_id: params.get("zone_id") || params.get("zoneid") || "",
    subid: params.get("subid") || params.get("sub_id") || "",
    language: getLanguage(),
    timestamp: Date.now()
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (navigator.sendBeacon) {
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      navigator.sendBeacon("/track-click", blob);
    } catch (error) {
      // Ignore tracking endpoint errors so the link still opens.
    }
  }
}

function initActions() {
  const continueLink = document.getElementById("continueLink");
  const continueBtn = document.getElementById("continueBtn");
  const originalHref = continueLink.getAttribute("href");

  continueLink.href = buildLinkUrl(originalHref);

  continueLink.addEventListener("click", () => {
    continueBtn.disabled = true;
    continueBtn.style.opacity = "0.88";
    trackActiveClick();
  }, { once: true });
}

applyTranslations();
initActions();
