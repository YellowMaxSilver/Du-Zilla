"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = __importDefault(require("./compiler"));
let mainView = document.getElementById("preview");
class Text {
    constructor(text, size, color, positionX, positionY, width, height) {
        let htmlEdit = `<h1 id="123456" style="position:absolute;top:0;left:0;
        margin-left:${positionX}px;
        margin-top:${positionY}px;
        font-size:${size}px;">${text}</h1>`;
        mainView.innerHTML += htmlEdit;
        const element = document.getElementById("123456");
        element.addEventListener("mouseover", () => {
            element.style = "border: 2px solid green";
        });
    }
}
//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{width}{height}{/!}
const mainTemplate = "{!}{text}{hello World}{30}{#00000}{100}{200}{100}{100}{/!}{!}{text}{hello World again}{30}{#00000}{100}{200}{100}{100}{/!}";
var widgets = (0, compiler_1.default)(mainTemplate);
new Text("hello", 52, "#ffff", 100, 120, 120, 120);
console.log(widgets);
