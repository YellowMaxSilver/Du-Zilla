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
class Widget {
    constructor(widgetType, text, size, color, positionX, positionY, width, height) {
        let elementId = (0, idGenerete_1.elementRandomId)();
        let active = false;
        let htmlEdit = `<${widgetNameToHtmlTag(widgetType)} id="${elementId}" 
        style="position:absolute;top:0;left:0;
        margin-left:${positionX}px;
        margin-top:${positionY}px;
        font-size:${size}px;
        width:${width}px;
        height:${height}px;
        color:${color};
        ">${text}</${widgetNameToHtmlTag(widgetType)}>`;
        mainView.insertAdjacentHTML('beforeend', htmlEdit);
        let element = mainView.querySelector(`#${elementId}`);
        if (element) {
            element.addEventListener("click", () => {
                onWidgetClicked(elementId, positionX, positionY, width, height);
                active = true;
            });
            element.addEventListener("mouseenter", () => {
                onWidgetMouseOver(positionX, positionY, width, height);
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
function onWidgetMouseOver(positionX, positionY, width, height) {
    overBox.style = `display:flex;margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
}
function onWidgetClicked(widgetId, positionX, positionY, width, height) {
    let widget = document.getElementById(widgetId);
    clickedBox.style = `margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
}
//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{width}{height}{/!}
const mainTemplate = "{!}{text}{hello World}{30}{#00000}{100}{200}{100}{100}{/!}{!}{text}{hello World again}{30}{#00000}{100}{200}{100}{100}{/!}";
var widgets = (0, compiler_1.default)(mainTemplate);
new Widget("text", "hello", 52, "#00000", 0, 0, 120, 120);
new Widget("text", "hello again", 52, "#00000", 300, 120, 120, 120);
new Widget("text", "hello again", 32, "#00000", 190, 160, 220, 120);
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
