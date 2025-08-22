"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("./notification");
const templatePanel = document.getElementById("choseTemplatePanel");
const closeTemplatePanel = document.getElementById("choseTemplatePanelCloseButton");
const createOwnButton = document.getElementById("createOwnButton");
closeTemplatePanel.addEventListener("click", () => {
    templatePanel.style.display = "none";
});
createOwnButton.addEventListener("click", () => {
    templatePanel.style.display = "block";
    (0, notification_1.notification)("dzIcon", "you can chose a templete to start your portfolio");
});
