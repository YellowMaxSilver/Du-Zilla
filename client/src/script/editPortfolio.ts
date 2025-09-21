import compilerToString from "./compiler";
import { elementRandomId } from "./idGenerete";


const mainView = document.getElementById("createPreviewContent") as HTMLElement;
var clickedBox = document.getElementById("clickedBox") as HTMLElement;
var overBox = document.getElementById("selectedBox") as HTMLElement;

const attributesPanel = document.querySelector('#attributesPanel') as HTMLElement;
const attributesPanelTextInput = attributesPanel.querySelector('#textInput') as HTMLInputElement;
const attributesPanelFontSizeInput = attributesPanel.querySelector('#fontSizeInput') as HTMLInputElement;
const attributesPanelColorInput = attributesPanel.querySelector('#colorInput') as HTMLInputElement;

const attributesPanelCloseButton = document.querySelector("#attributesPanelCloseButton") as HTMLElement;
var widgetIdOfAttributePanel:string|undefined = undefined;

attributesPanelCloseButton.addEventListener('click',()=>{
    attributesPanel.style.display = "none";
})

class Widget {
    constructor(
        widgetType: string,
        text: string,
        size: number,
        color: string,
        positionX: number,
        positionY: number,
        width: number,
        height: number
    ) {

        let elementId: string = elementRandomId();
        let active: boolean = false;

        let htmlEdit: string = `<${widgetNameToHtmlTag(widgetType)} id="${elementId}" 
        style="
        margin-left:${positionX}px;
        margin-top:${positionY}px;
        font-size:${size}px;
        color:${color};
        width:auto;
        height:auto;
        ">${text}</${widgetNameToHtmlTag(widgetType)}>`;

        mainView.insertAdjacentHTML('beforeend', htmlEdit);

        let element = mainView.querySelector(`#${elementId}`) as HTMLElement;

        if (element) {
            element.addEventListener("click", () => {
                onWidgetClicked(elementId);
                active = true;
            })

            element.addEventListener("mouseenter", () => {
                onWidgetMouseOver(elementId);
            })
        }

        function refresh(widgetId: string) {
            let widgetFound = mainView.querySelector(`#${widgetId}`) as HTMLElement;
            if (widgetFound) widgetFound.remove();
            mainView.insertAdjacentHTML('beforeend', htmlEdit);
        }
    }

}

function onWidgetMouseOver(widgetId:string) {
    let widget: HTMLElement | undefined = document.getElementById(widgetId) as HTMLElement;
    let positionX:number = widget.offsetLeft;
    let positionY:number = widget.offsetTop;
    let width:any = widget.offsetWidth;
    let height:any = widget.offsetHeight;
    overBox.style = `display:flex;margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
}

function onWidgetClicked(widgetId: string) {
    let widget: HTMLElement | undefined = document.getElementById(widgetId) as HTMLElement;
    let positionX:number = widget.offsetLeft;
    let positionY:number = widget.offsetTop;
    let width:any = widget.offsetWidth;
    let height:any = widget.offsetHeight;
    clickedBox.style = `margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
    attributesPanel.style.display = "block";
    widgetIdOfAttributePanel = widgetId;
    setAttributePanel();
    //console.log(widget.textContent);
}

function refresh(widgetId:string){
    let widget: HTMLElement | undefined = document.getElementById(widgetId) as HTMLElement;
    
}

function setAttributePanel(){
    if(widgetIdOfAttributePanel == undefined){
        return;
    }
    let widget: HTMLElement | undefined = document.getElementById(widgetIdOfAttributePanel) as HTMLElement;
    attributesPanelTextInput.value = widget.textContent;

    setInterval(()=>{
        if(widgetIdOfAttributePanel == undefined){
            return;
        }
        (document.getElementById(widgetIdOfAttributePanel) as HTMLElement)
        .innerHTML = attributesPanelTextInput.value;
    },1000)
}

//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{width}{height}{/!}

const mainTemplate: string = "{!}{text}{hello World}{30}{#00000}{100}{200}{100}{100}{/!}{!}{text}{hello World again}{30}{#00000}{100}{200}{100}{100}{/!}";

var widgets: string[][] = compilerToString(mainTemplate);

new Widget("text","Title", 52, "#00000", 40, 40, 100, 100);
new Widget("text","Subtitle", 52, "#00000", 40, 0, 100, 100);
new Widget("text","Description", 32, "#00000", 40, 0, 100, 100);
new Widget("form","form1", 32, "#00000", 40, 0, 100, 100);

console.log(widgets);

// .faca{color:red;
// position:absolute;
// top:0;
// left:0;margin-left:100px;margin-top:100px;width:100px;height:100px;}

function widgetNameToHtmlTag(widgetName: string): string {
    switch (widgetName) {
        case "text":
            return "h1";
            break;
        default:
            return "div";
            break;
    }
}
