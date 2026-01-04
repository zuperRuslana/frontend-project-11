import i18next from "i18next";

export default function initStaticTranslations() {
  const header = document.querySelector(".headerRss");
  if (header) {
    header.textContent = i18next.t("page.header");
  }

  const label = document.querySelector("#label-url");
  if (label) {
    label.textContent = i18next.t("page.rss-url");
  }
  const sendBtn = document.querySelector("#submit-button");
  if (sendBtn) {
    sendBtn.textContent = i18next.t("buttons.add");
  }
}
