"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = __importDefault(require("./compiler"));
const idGenerete_1 = require("./idGenerete");
const mainView = document.getElementById("createPreviewContent");
var clickedBox = document.getElementById("clickedBox");
var overBox = document.getElementById("selectedBox");
const attributesPanel = document.querySelector('#attributesPanel');
const attributesPanelTextInput = attributesPanel.querySelector('#textInput');
const attributesPanelFontSizeInput = attributesPanel.querySelector('#fontSizeInput');
const attributesPanelColorInput = attributesPanel.querySelector('#colorInput');
const attributesPanelCloseButton = document.querySelector("#attributesPanelCloseButton");
var widgetIdOfAttributePanel = undefined;
attributesPanelCloseButton.addEventListener('click', () => {
    attributesPanel.style.display = "none";
});
class Widget {
    constructor(widgetType, text, size, color, positionX, positionY, width, height) {
        let elementId = (0, idGenerete_1.elementRandomId)();
        let active = false;
        let htmlEdit = `<${widgetNameToHtmlTag(widgetType)} id="${elementId}" 
        style="
        margin-left:${positionX}px;
        margin-top:${positionY}px;
        font-size:${size}px;
        color:${color};
        width:auto;
        height:auto;
        ">${text}</${widgetNameToHtmlTag(widgetType)}>`;
        mainView.insertAdjacentHTML('beforeend', htmlEdit);
        let element = mainView.querySelector(`#${elementId}`);
        if (element) {
            element.addEventListener("click", () => {
                onWidgetClicked(elementId);
                active = true;
            });
            element.addEventListener("mouseenter", () => {
                onWidgetMouseOver(elementId);
            });
        }
        function refresh(widgetId) {
            let widgetFound = mainView.querySelector(`#${widgetId}`);
            if (widgetFound)
                widgetFound.remove();
            mainView.insertAdjacentHTML('beforeend', htmlEdit);
        }
    }
}
function onWidgetMouseOver(widgetId) {
    let widget = document.getElementById(widgetId);
    let positionX = widget.offsetLeft;
    let positionY = widget.offsetTop;
    let width = widget.offsetWidth;
    let height = widget.offsetHeight;
    overBox.style = `display:flex;margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
}
function onWidgetClicked(widgetId) {
    let widget = document.getElementById(widgetId);
    let positionX = widget.offsetLeft;
    let positionY = widget.offsetTop;
    let width = widget.offsetWidth;
    let height = widget.offsetHeight;
    clickedBox.style = `margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
    attributesPanel.style.display = "block";
    widgetIdOfAttributePanel = widgetId;
    setAttributePanel();
    //console.log(widget.textContent);
}
function refresh(widgetId) {
    let widget = document.getElementById(widgetId);
}
function setAttributePanel() {
    if (widgetIdOfAttributePanel == undefined) {
        return;
    }
    let widget = document.getElementById(widgetIdOfAttributePanel);
    attributesPanelTextInput.value = widget.textContent;
    setInterval(() => {
        if (widgetIdOfAttributePanel == undefined) {
            return;
        }
        document.getElementById(widgetIdOfAttributePanel)
            .innerHTML = attributesPanelTextInput.value;
    }, 1000);
}
//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{width}{height}{/!}
const mainTemplate = "{!}{text}{hello World}{30}{#00000}{100}{200}{100}{100}{/!}{!}{text}{hello World again}{30}{#00000}{100}{200}{100}{100}{/!}";
var widgets = (0, compiler_1.default)(mainTemplate);
new Widget("text", "Title", 52, "#00000", 40, 40, 100, 100);
new Widget("text", "Subtitle", 52, "#00000", 40, 0, 100, 100);
new Widget("text", "Description", 32, "#00000", 40, 0, 100, 100);
new Widget("form", "form1", 32, "#00000", 40, 0, 100, 100);
console.log(widgets);
// .faca{color:red;
// position:absolute;
// top:0;
// left:0;margin-left:100px;margin-top:100px;width:100px;height:100px;}
function widgetNameToHtmlTag(widgetName) {
    switch (widgetName) {
        case "text":
            return "h1";
            break;
        default:
            return "div";
            break;
    }
}
