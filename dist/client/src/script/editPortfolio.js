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
const attrributesPanelFontWeightInput = attributesPanel.querySelector('#fontWeightInput');
const attributesPanelAlgnLeftButton = attributesPanel.querySelector('#attributePanelAlgnLeftButton');
const attributesPanelAlgnCenterButton = attributesPanel.querySelector('#attributesPanelAlgnCenterButton');
const attributesPanelAlgnRightButton = attributesPanel.querySelector('#attributesPanelAlgnRightButton');
const attributesPanelFontFamilyDropDownButton = attributesPanel.querySelector('#fontFamilyDropDownButton');
const attributesPanelFontFamilyDropDown = attributesPanel.querySelector('#fontFamilyDropDown');
//fonts buttons
const attributesPanelFontArialButton = attributesPanel.querySelector('#fontArialButton');
const attributesPanelFontVerdanaButton = attributesPanel.querySelector('#fontVerdanaButton');
const attributesPanelFontCambriaButton = attributesPanel.querySelector('#fontCambriaButton');
const attributesPanelFontTimesNewRomanButton = attributesPanel.querySelector('#fontTimesNewRomanButton');
const attributesPanelFontCourierButton = attributesPanel.querySelector('#fontCourierButton');
const attributesPanelFontLucidaConsoleButton = attributesPanel.querySelector('#fontLucidaConsoleButton');
const attributesPanelFontBrushScriptMTButton = attributesPanel.querySelector('#fontBrushScriptMTButton');
const attributesPanelFontLucidaHandwritingButton = attributesPanel.querySelector('#fontLucidaHandwritingButton');
const attributesPanelFontComicSansMSButton = attributesPanel.querySelector('#fontComicSansMSButton');
const attributesPanelFontImpactButton = attributesPanel.querySelector('#fontImpactButton');
const attributesPanelFontGeorgiaButton = attributesPanel.querySelector('#fontGeorgiaButton');
//const attributesPanelFontStyleInput = attributesPanel.querySelector('#fontStyleInput') as HTMLInputElement;
const formAttributesPanel = document.querySelector('#formAttributesPanel');
const formAttributesPanelFormNameInput = formAttributesPanel.querySelector('#formNameInput');
const formAttributesPanelFormDescriptionInput = formAttributesPanel.querySelector('#formDescriptionInput');
const attributesPanelCloseButton = document.querySelector("#attributesPanelCloseButton");
const formAttributesPanelCloseButton = document.querySelector("#formAttributesPanelCloseButton");
var widgetIdOfAttributePanel = undefined;
var formIdOfAttributePanel = undefined;
//drop down font family
attributesPanelFontFamilyDropDownButton.addEventListener('click', () => {
    if (attributesPanelFontFamilyDropDown.style.display == "block") {
        attributesPanelFontFamilyDropDown.style.display = "none";
    }
    else {
        attributesPanelFontFamilyDropDown.style.display = "block";
    }
    document.addEventListener('click', (event) => {
        if (!attributesPanelFontFamilyDropDown.contains(event.target) && event.target !== attributesPanelFontFamilyDropDownButton) {
            attributesPanelFontFamilyDropDown.style.display = "none";
        }
    });
});
attributesPanelCloseButton.addEventListener('click', () => {
    attributesPanel.style.display = "none";
});
formAttributesPanelCloseButton.addEventListener('click', () => {
    formAttributesPanel.style.display = "none";
});
const saveButton = document.querySelector("#saveButton");
saveButton.addEventListener('click', () => {
    const code = getCode();
    console.log(code);
});
var elementsList = undefined;
//form =>  {!}{form}{formId}{formName}{formDescription}
class Widget {
    constructor(widgetType, argument1, argument2, argument3, argument4, argument5, argument6, argument7) {
        let elementId = (0, idGenerete_1.elementRandomId)();
        let active = false;
        if (elementsList == undefined) {
            elementsList = [[widgetType, elementId]];
        }
        else {
            elementsList.push([widgetType, elementId]);
        }
        if (widgetType != 'form') {
            //text, image, video, audio, button, divider, spacer, social media icons
            //text -->
            //argument1 = text
            //argument2 = font size
            //argument3 = color
            //argument4 = alignment
            //argument5 = weight
            //argument6 = font style
            //argument7 = font family
            //argument8 = width
            //argument9 = height
            let htmlEdit = `<${widgetNameToHtmlTag(widgetType)} id="${elementId}" 
            style="
            font-size:${argument2}px;
            color:${argument3};
            text-align:${argument4};
            font-weight:${argument5};
            font-style:${argument6};
            font-family:${argument7};
            width:auto;
            height:auto;
            ">${argument1}</${widgetNameToHtmlTag(widgetType)}>`;
            mainView.insertAdjacentHTML('beforeend', htmlEdit);
            let element = mainView.querySelector(`#${elementId}`);
            if (element) {
                element.addEventListener("click", () => {
                    onWidgetClicked(elementId, "widget");
                    active = true;
                });
                element.addEventListener("mouseenter", () => {
                    onWidgetMouseOver(elementId);
                });
                element.addEventListener("mouseout", () => {
                    overBox.style = "display:none";
                });
            }
        }
        else {
            //form -->
            //argument1 = formId
            //argument2 = formName
            //argument3 = formDescription
            //=====> normal form
            let htmlEdit = `<div id="${elementId}" class="portfolioFormBox">
            <h2 class="normal_text" id="title">${argument2}</h2>
            <h3 class="formDescription normal_text" id="description">${argument3}</h3>
            <div class="accountBox">
                <div class="icon"></div>
                <h4 class="accountName normal_text">Account Name</h4>
                <h5 class="accountId normal_text">AccountId</h5>
            </div>
            <div class="attribute"> 
                <h3 class="normal_text">Contact:</h3>
                <input type="text" autocomplete="off" placeholder="Email or phone number">
            </div>
            <div class="attributeDescription"><h3 class="normal_text">Description:</h3><textarea class="normal_text" type="text" autocomplete="off" placeholder="Description"></textarea></div>
            <buttom class="submitButton normal_text">Submit</buttom>
            <div class="dzIcon"></div>
            </div>
            `;
            //====> not verified account form
            // let htmlEdit: string = `<div id="${elementId}" class="portfolioFormBox">
            // <h2 class="normal_text" id="title">${argument2}</h2>
            // <h3 class="formDescription normal_text" id="description">${argument3}</h3>
            // <div class="notVerifiedAccount">
            //     <div class="warningIcon"></div>
            //     <h3 class="normal_text">Your account is not verified. Please verify your account to receive form submissions. <a>Verify Now</a></h3>
            // </div>
            // <div class="accountBox">;
            //     <div class="icon"></div>
            //     <h4 class="accountName normal_text">Account Name</h4>
            //     <h5 class="accountId normal_text">AccountId</h5>
            // </div>
            // <div class="attribute"> 
            //     <h3 class="normal_text">Contact:</h3>
            //     <input type="text" autocomplete="off" placeholder="Email or phone number" readonly>
            // </div>
            // <div class="attributeDescription"><h3 class="normal_text">Description:</h3><textarea class="normal_text" type="text" autocomplete="off" placeholder="Description" readonly></textarea></div>
            // <div class="normal_text inactiveSubmitButton">Submit</div>
            // <div class="dzIcon"></div>
            // </div>
            // `;
            //====> no account sign in form
            // let htmlEdit: string = `<div id="${elementId}" class="portfolioFormBox">
            // <h2 class="normal_text" id="title">Form 1</h2>
            // <h3 class="formDescription normal_text" id="description">This is my web dz form description</h3>
            // <div class="formSignBox">
            //     <div class="dzIcon"></div>
            //     <h2 class="normal_text">Sign in Du-Zilla to snd your form</h2>
            //     <div class="formSignButtons">
            //         <div class="signInButton normal_text">Sign In</div>
            //         <div class="signUpButton normal_text">Sign Up</div>
            //     </div>
            // </div>
            // </div>`;
            mainView.insertAdjacentHTML('beforeend', htmlEdit);
            let element = mainView.querySelector(`#${elementId}`);
            if (element) {
                element.addEventListener("click", () => {
                    onWidgetClicked(elementId, "form");
                    active = true;
                });
                element.addEventListener("mouseenter", () => {
                    onWidgetMouseOver(elementId);
                });
                element.addEventListener("mouseleave", () => {
                    overBox.style = "display:none";
                });
            }
        }
        // function refresh(widgetId: string) {
        //     let widgetFound = mainView.querySelector(`#${widgetId}`) as HTMLElement;
        //     if (widgetFound) widgetFound.remove();
        //     mainView.insertAdjacentHTML('beforeend', htmlEdit);
        // }
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
function onWidgetClicked(widgetId, widgetType) {
    let widget = document.getElementById(widgetId);
    let positionX = widget.offsetLeft;
    let positionY = widget.offsetTop;
    let width = widget.offsetWidth;
    let height = widget.offsetHeight;
    clickedBox.style = `margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
    if (widgetType == "widget") {
        attributesPanel.style.display = "block";
        formAttributesPanel.style.display = "none";
        widgetIdOfAttributePanel = widgetId;
        setAttributePanel();
    }
    else {
        formAttributesPanel.style.display = "block";
        attributesPanel.style.display = "none";
        formIdOfAttributePanel = widgetId;
        setFormAttributePanel();
    }
    //console.log(widget.textContent);
}
function setAttributePanel() {
    if (widgetIdOfAttributePanel == undefined) {
        return;
    }
    const thisId = widgetIdOfAttributePanel;
    let widget = document.getElementById(widgetIdOfAttributePanel);
    attributesPanelTextInput.value = widget.textContent;
    attributesPanelFontSizeInput.value = String(widget.style.fontSize).replace("px", "");
    attrributesPanelFontWeightInput.value = widget.style.fontWeight;
    let colorValue = widget.style.color;
    // Ensure colorValue is a valid hex color, otherwise set to #000000
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(colorValue)) {
        // Try to convert rgb/rgba to hex
        const rgbMatch = colorValue.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
            const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
            const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
            colorValue = `#${r}${g}${b}`;
        }
        else {
            colorValue = "#000000";
        }
    }
    attributesPanelColorInput.value = colorValue;
    //algn
    switch (widget.style.textAlign) {
        case "left":
            attributesPanelAlgnLeftButton.classList.add("activeIconButton");
            attributesPanelAlgnCenterButton.classList.remove("activeIconButton");
            attributesPanelAlgnRightButton.classList.remove("activeIconButton");
            break;
        case "center":
            attributesPanelAlgnCenterButton.classList.add("activeIconButton");
            attributesPanelAlgnLeftButton.classList.remove("activeIconButton");
            attributesPanelAlgnRightButton.classList.remove("activeIconButton");
            break;
        case "right":
            attributesPanelAlgnRightButton.classList.add("activeIconButton");
            attributesPanelAlgnLeftButton.classList.remove("activeIconButton");
            attributesPanelAlgnCenterButton.classList.remove("activeIconButton");
            break;
        default:
            attributesPanelAlgnLeftButton.classList.add("activeIconButton");
            attributesPanelAlgnCenterButton.classList.remove("activeIconButton");
            attributesPanelAlgnRightButton.classList.remove("activeIconButton");
            break;
    }
    verifyCurrentFontFamily();
    attributesPanelAlgnCenterButton.addEventListener('click', () => {
        changeWidgetAlgn("center");
    });
    attributesPanelAlgnLeftButton.addEventListener('click', () => {
        changeWidgetAlgn("left");
    });
    attributesPanelAlgnRightButton.addEventListener('click', () => {
        changeWidgetAlgn("right");
    });
    console.log(widget.style.fontFamily);
    attributesPanelFontArialButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Arial";
        changeWidgetFontFamily("Arial, Helvetica, sans-serif");
    });
    attributesPanelFontVerdanaButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Verdana";
        changeWidgetFontFamily("Verdana, Geneva, Tahoma, sans-serif");
    });
    attributesPanelFontCambriaButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Cambria";
        changeWidgetFontFamily("Cambria, Cochin, Georgia, Times, 'Times New Roman', serif");
    });
    attributesPanelFontTimesNewRomanButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Times New Roman";
        changeWidgetFontFamily("'Times New Roman', Times, serif");
    });
    attributesPanelFontGeorgiaButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Georgia";
        changeWidgetFontFamily("Georgia, serif");
    });
    attributesPanelFontImpactButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Impact";
        changeWidgetFontFamily("Impact, Charcoal, sans-serif");
    });
    attributesPanelFontComicSansMSButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Comic Sans MS";
        changeWidgetFontFamily("'Comic Sans MS', cursive, sans-serif");
    });
    attributesPanelFontCourierButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Courier";
        changeWidgetFontFamily("'Courier New', Courier, monospace");
    });
    attributesPanelFontLucidaConsoleButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Lucida Console";
        changeWidgetFontFamily("'Lucida Console', Monaco, monospace");
    });
    attributesPanelFontBrushScriptMTButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Brush Script MT";
        changeWidgetFontFamily("'Brush Script MT', cursive");
    });
    attributesPanelFontLucidaHandwritingButton.addEventListener('click', () => {
        attributesPanelFontFamilyDropDownButton.textContent = "Lucida Handwriting";
        changeWidgetFontFamily("'Lucida Handwriting', cursive");
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            refresh();
        }
    });
    setInterval(() => {
        if (thisId == widgetIdOfAttributePanel) {
            refresh();
        }
    }, 200);
    function changeWidgetFontFamily(fontFamily) {
        if (thisId == widgetIdOfAttributePanel) {
            let widget = document.getElementById(widgetIdOfAttributePanel);
            if (widget)
                widget.style.fontFamily = fontFamily;
            verifyCurrentFontFamily();
            refresh();
        }
    }
    function verifyCurrentFontFamily() {
        if (thisId != widgetIdOfAttributePanel) {
            return;
        }
        let widget = document.getElementById(widgetIdOfAttributePanel);
        function removeClassOfAllElements() {
            attributesPanelFontArialButton.classList.remove("dropDownElementSelected");
            attributesPanelFontVerdanaButton.classList.remove("dropDownElementSelected");
            attributesPanelFontCambriaButton.classList.remove("dropDownElementSelected");
            attributesPanelFontTimesNewRomanButton.classList.remove("dropDownElementSelected");
            attributesPanelFontGeorgiaButton.classList.remove("dropDownElementSelected");
            attributesPanelFontImpactButton.classList.remove("dropDownElementSelected");
            attributesPanelFontComicSansMSButton.classList.remove("dropDownElementSelected");
            attributesPanelFontCourierButton.classList.remove("dropDownElementSelected");
            attributesPanelFontLucidaConsoleButton.classList.remove("dropDownElementSelected");
            attributesPanelFontBrushScriptMTButton.classList.remove("dropDownElementSelected");
            attributesPanelFontLucidaHandwritingButton.classList.remove("dropDownElementSelected");
        }
        // Remove selection from all font buttons
        removeClassOfAllElements();
        // Normalize fontFamily string for comparison
        const fontFamily = widget.style.fontFamily.replace(/\s+/g, '').toLowerCase();
        console.log(fontFamily);
        switch (true) {
            case fontFamily.includes("arial,helvetica,sans-serif"):
                attributesPanelFontFamilyDropDownButton.textContent = "Arial";
                attributesPanelFontArialButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("verdana,geneva,tahoma,sans-serif"):
                attributesPanelFontFamilyDropDownButton.textContent = "Verdana";
                attributesPanelFontVerdanaButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("cambria,cochin,georgia,times,\"timesnewroman\",serif"):
                attributesPanelFontFamilyDropDownButton.textContent = "Cambria";
                attributesPanelFontCambriaButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("\"timesnewroman\",times,serif"):
                attributesPanelFontFamilyDropDownButton.textContent = "Times New Roman";
                attributesPanelFontTimesNewRomanButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("georgia,serif"):
                attributesPanelFontFamilyDropDownButton.textContent = "Georgia";
                attributesPanelFontGeorgiaButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("impact,charcoal,sans-serif"):
                attributesPanelFontFamilyDropDownButton.textContent = "Impact";
                attributesPanelFontImpactButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("\"comicsansms\",cursive,sans-serif"):
                attributesPanelFontFamilyDropDownButton.textContent = "Comic Sans MS";
                attributesPanelFontComicSansMSButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("\"couriernew\",courier,monospace"):
                attributesPanelFontFamilyDropDownButton.textContent = "Courier";
                attributesPanelFontCourierButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("\"lucidaconsole\",monaco,monospace"):
                attributesPanelFontFamilyDropDownButton.textContent = "Lucida Console";
                attributesPanelFontLucidaConsoleButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("\"brushscriptmt\",cursive"):
                attributesPanelFontFamilyDropDownButton.textContent = "Brush Script MT";
                attributesPanelFontBrushScriptMTButton.classList.add("dropDownElementSelected");
                break;
            case fontFamily.includes("\"lucidahandwriting\",cursive"):
                attributesPanelFontFamilyDropDownButton.textContent = "Lucida Handwriting";
                attributesPanelFontLucidaHandwritingButton.classList.add("dropDownElementSelected");
                break;
            default:
                break;
        }
    }
    function changeWidgetAlgn(algn) {
        if (thisId == widgetIdOfAttributePanel) {
            let widget = document.getElementById(widgetIdOfAttributePanel);
            if (widget)
                widget.style.textAlign = algn;
            refresh();
            switch (widget.style.textAlign) {
                case "left":
                    attributesPanelAlgnLeftButton.classList.add("activeIconButton");
                    attributesPanelAlgnCenterButton.classList.remove("activeIconButton");
                    attributesPanelAlgnRightButton.classList.remove("activeIconButton");
                    break;
                case "center":
                    attributesPanelAlgnCenterButton.classList.add("activeIconButton");
                    attributesPanelAlgnLeftButton.classList.remove("activeIconButton");
                    attributesPanelAlgnRightButton.classList.remove("activeIconButton");
                    break;
                case "right":
                    attributesPanelAlgnRightButton.classList.add("activeIconButton");
                    attributesPanelAlgnLeftButton.classList.remove("activeIconButton");
                    attributesPanelAlgnCenterButton.classList.remove("activeIconButton");
                    break;
                default:
                    attributesPanelAlgnLeftButton.classList.add("activeIconButton");
                    attributesPanelAlgnCenterButton.classList.remove("activeIconButton");
                    attributesPanelAlgnRightButton.classList.remove("activeIconButton");
                    break;
            }
        }
    }
    function refresh() {
        if (widgetIdOfAttributePanel == undefined) {
            return;
        }
        let widget = document.getElementById(widgetIdOfAttributePanel);
        if (widget)
            widget.style.fontSize = attributesPanelFontSizeInput.value + "px";
        if (widget)
            widget.style.fontWeight = attrributesPanelFontWeightInput.value;
        if (widget)
            widget.style.color = attributesPanelColorInput.value;
        if (widget)
            widget.innerText = attributesPanelTextInput.value;
        //onWidgetClicked(widgetIdOfAttributePanel,"widget");
    }
}
function setFormAttributePanel() {
    if (formIdOfAttributePanel == undefined) {
        return;
    }
    let widget = document.getElementById(formIdOfAttributePanel);
    const formTitle = widget === null || widget === void 0 ? void 0 : widget.querySelector('#title');
    const formDescription = widget === null || widget === void 0 ? void 0 : widget.querySelector('#description');
    formAttributesPanelFormNameInput.value = formTitle.textContent || '';
    formAttributesPanelFormDescriptionInput.value = formDescription.textContent || '';
    document.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            refresh();
        }
    });
    function refresh() {
        if (formIdOfAttributePanel == undefined) {
            return;
        }
        let widget = document.getElementById(formIdOfAttributePanel);
        const formTitle = widget === null || widget === void 0 ? void 0 : widget.querySelector('#title');
        const formDescription = widget === null || widget === void 0 ? void 0 : widget.querySelector('#description');
        if (formDescription)
            formDescription.textContent = formAttributesPanelFormDescriptionInput.value;
        if (formTitle)
            formTitle.textContent = formAttributesPanelFormNameInput.value;
        onWidgetClicked(formIdOfAttributePanel, "form");
    }
}
//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{width}{height}{/!}
const mainTemplate = "{!}{text}{hello World}{30}{#00000}{100}{200}{100}{100}{/!}{!}{text}{hello World again}{30}{#00000}{100}{200}{100}{100}{/!}";
var widgets = (0, compiler_1.default)(mainTemplate);
new Widget("text", "Title", 52, "#00000", "center", 100, "normal", "Arial, Helvetica, sans-serif");
new Widget("text", "Subtitle", 52, "#00000", "left", 100, "normal", "Arial, Helvetica, sans-serif");
new Widget("text", "Description", 32, "#00000", "left", 100, "normal", "Arial, Helvetica, sans-serif");
new Widget("form", "id", "formName", "description", null, null, null, null);
new Widget("form", "id", "forName", "description", null, null, null, null);
console.log(widgets);
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
function getCode() {
    var code = "";
    if (elementsList == undefined) {
        return undefined;
    }
    for (let i = 0; i < elementsList.length; i++) {
        let thisElement = elementsList[i];
        let element = mainView.querySelector("#" + thisElement[1]);
        let thisCode = "{!}";
        switch (thisElement[0]) {
            case "text":
                thisCode += `{${thisElement[0]}}`;
                thisCode += `{${element.innerHTML}}`;
                thisCode += `{${element.style.fontSize}}`;
                thisCode += `{${element.style.color}}`;
                thisCode += `{${element.style.textAlign}}`;
                thisCode += `{${element.style.fontWeight}}`;
                thisCode += `{${element.style.fontStyle}}`;
                thisCode += `{${element.style.fontFamily}}`;
                thisCode += "{/!}";
                code += thisCode;
                break;
            case "form":
                thisCode += `{${thisElement[0]}}`;
                thisCode += `{${element.querySelector("#title").textContent}}`;
                thisCode += `{${element.querySelector("#description").textContent}}`;
                thisCode += "{/!}";
                code += thisCode;
                break;
        }
    }
    return code;
}
