import compilerToString from "./compiler";
import { elementRandomId } from "./idGenerete";


const mainView = document.getElementById("createPreviewContent") as HTMLElement;
var clickedBox = document.getElementById("clickedBox") as HTMLElement;
var overBox = document.getElementById("selectedBox") as HTMLElement;

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
        style="position:absolute;top:0;left:0;
        margin-left:${positionX}px;
        margin-top:${positionY}px;
        font-size:${size}px;
        width:${width}px;
        height:${height}px;
        color:${color};
        ">${text}</${widgetNameToHtmlTag(widgetType)}>`;

        mainView.insertAdjacentHTML('beforeend', htmlEdit);

        let element = mainView.querySelector(`#${elementId}`) as HTMLElement;

        if (element) {
            element.addEventListener("click", () => {
                onWidgetClicked(elementId, positionX, positionY, width, height);
                active = true;
            })

            element.addEventListener("mouseenter", () => {
                onWidgetMouseOver(positionX, positionY, width, height);
            })
        }

        function refresh(widgetId: string) {
            let widgetFound = mainView.querySelector(`#${widgetId}`) as HTMLElement;
            if (widgetFound) widgetFound.remove();
            mainView.insertAdjacentHTML('beforeend', htmlEdit);
        }
    }

}

function onWidgetMouseOver(positionX: number, positionY: number, width: number, height: number) {
    overBox.style = `display:flex;margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
}

function onWidgetClicked(widgetId: string, positionX: number, positionY: number, width: number, height: number) {
    let widget: HTMLElement | undefined = document.getElementById(widgetId) as HTMLElement;
    clickedBox.style = `margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
}

//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{width}{height}{/!}

const mainTemplate: string = "{!}{text}{hello World}{30}{#00000}{100}{200}{100}{100}{/!}{!}{text}{hello World again}{30}{#00000}{100}{200}{100}{100}{/!}";

var widgets: string[][] = compilerToString(mainTemplate);

new Widget("text","hello", 52, "#00000", 0, 0, 120, 120);
new Widget("text","hello again", 52, "#00000", 300, 120, 120, 120);
new Widget("text","hello again", 32, "#00000", 190, 160, 220, 120);
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