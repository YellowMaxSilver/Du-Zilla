import compilerToString from "./compiler";
import { elementRandomId } from "./idGenerete";


const mainView = document.getElementById("createPreviewContent") as HTMLElement;
var clickedBox = document.getElementById("clickedBox") as HTMLElement;
var overBox = document.getElementById("selectedBox") as HTMLElement;

const attributesPanel = document.querySelector('#attributesPanel') as HTMLElement;
const attributesPanelTextInput = attributesPanel.querySelector('#textInput') as HTMLInputElement;
const attributesPanelFontSizeInput = attributesPanel.querySelector('#fontSizeInput') as HTMLInputElement;
const attributesPanelColorInput = attributesPanel.querySelector('#colorInput') as HTMLInputElement;

const formAttributesPanel = document.querySelector('#formAttributesPanel') as HTMLElement;
const formAttributesPanelFormNameInput = formAttributesPanel.querySelector('#formNameInput') as HTMLInputElement;
const formAttributesPanelFormDescriptionInput = formAttributesPanel.querySelector('#formDescriptionInput') as HTMLInputElement;

const attributesPanelCloseButton = document.querySelector("#attributesPanelCloseButton") as HTMLElement;
const formAttributesPanelCloseButton = document.querySelector("#formAttributesPanelCloseButton") as HTMLElement;
var widgetIdOfAttributePanel:string|undefined = undefined;

attributesPanelCloseButton.addEventListener('click',()=>{
    attributesPanel.style.display = "none";
})
formAttributesPanelCloseButton.addEventListener('click',()=>{
    formAttributesPanel.style.display = "none";
});

const elementsList:string[][]|undefined = undefined;
//form =>  {!}{form}{formId}{formName}{formDescription}

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

        if(widgetType != 'form'){
            elementsList?.push([widgetType,elementId]);
            //text, image, video, audio, button, divider, spacer, social media icons
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
                    onWidgetClicked(elementId,"widget");
                    active = true;
                })

                element.addEventListener("mouseenter", () => {
                    onWidgetMouseOver(elementId);
                })
                element.addEventListener("mouseout",()=>{
                    overBox.style = "display:none";
                })  
            }
        }else{
            //form -->
            //=====> normal form
            // let htmlEdit: string = `<div id="${elementId}" class="portfolioFormBox">
            // <h2 class="normal_text" id="title">Form 1</h2>
            // <h3 class="formDescription normal_text" id="description">This is my web dz form description</h3>
            // <div class="accountBox">
            //     <div class="icon"></div>
            //     <h4 class="accountName normal_text">Account Name</h4>
            //     <h5 class="accountId normal_text">AccountId</h5>
            // </div>
            // <div class="attribute"> 
            //     <h3 class="normal_text">Contact:</h3>
            //     <input type="text" autocomplete="off" placeholder="Email or phone number">
            // </div>
            // <div class="attributeDescription"><h3 class="normal_text">Description:</h3><textarea class="normal_text" type="text" autocomplete="off" placeholder="Description"></textarea></div>
            // <buttom class="submitButton normal_text">Submit</buttom>
            // <div class="dzIcon"></div>
            // </div>
            // `;

            //====> not verified account form
            let htmlEdit: string = `<div id="${elementId}" class="portfolioFormBox">
            <h2 class="normal_text" id="title">Form 1</h2>
            <h3 class="formDescription normal_text" id="description">This is my web dz form description</h3>
            <div class="notVerifiedAccount">
                <div class="warningIcon"></div>
                <h3 class="normal_text">Your account is not verified. Please verify your account to receive form submissions. <a>Verify Now</a></h3>
            </div>
            <div class="accountBox">;
                <div class="icon"></div>
                <h4 class="accountName normal_text">Account Name</h4>
                <h5 class="accountId normal_text">AccountId</h5>
            </div>
            <div class="attribute"> 
                <h3 class="normal_text">Contact:</h3>
                <input type="text" autocomplete="off" placeholder="Email or phone number" readonly>
            </div>
            <div class="attributeDescription"><h3 class="normal_text">Description:</h3><textarea class="normal_text" type="text" autocomplete="off" placeholder="Description" readonly></textarea></div>
            <div class="normal_text inactiveSubmitButton">Submit</div>
            <div class="dzIcon"></div>
            </div>
            `;

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
            let element = mainView.querySelector(`#${elementId}`) as HTMLElement;

            if (element) {
                element.addEventListener("click", () => {
                    onWidgetClicked(elementId,"form");
                    active = true;
                })
                element.addEventListener("mouseenter", () => {
                    onWidgetMouseOver(elementId);
                })
                element.addEventListener("mouseleave",()=>{
                    overBox.style = "display:none";
                })  
            }

       
        }

        // function refresh(widgetId: string) {
        //     let widgetFound = mainView.querySelector(`#${widgetId}`) as HTMLElement;
        //     if (widgetFound) widgetFound.remove();
        //     mainView.insertAdjacentHTML('beforeend', htmlEdit);
        // }
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

function onWidgetClicked(widgetId: string,widgetType:string) {
    let widget: HTMLElement | undefined = document.getElementById(widgetId) as HTMLElement;
    let positionX:number = widget.offsetLeft;
    let positionY:number = widget.offsetTop;
    let width:any = widget.offsetWidth;
    let height:any = widget.offsetHeight;
    clickedBox.style = `margin-left:${positionX}px;margin-top:${positionY}px;width:${width}px;height:${height}px;`;
    if(widgetType == "widget"){
        attributesPanel.style.display = "block";
        formAttributesPanel.style.display = "none";
        widgetIdOfAttributePanel = widgetId;
        setAttributePanel();
    }else{
        formAttributesPanel.style.display = "block";
        attributesPanel.style.display = "none";
        widgetIdOfAttributePanel = widgetId;
        setFormAttributePanel();
    }
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
    attributesPanelFontSizeInput.value = String(widget.style.fontSize).replace("px","");
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
        } else {
            colorValue = "#000000";
        }
    }
    attributesPanelColorInput.value = colorValue;


    document.addEventListener('keydown',(event)=>{
        if(event.key === "Enter"){
            refresh();
        }
    });

    function refresh(){
        if(widgetIdOfAttributePanel == undefined){
            return;
        }
        let widget: HTMLElement | undefined = document.getElementById(widgetIdOfAttributePanel) as HTMLElement;
        if (widget) widget.style.fontSize = attributesPanelFontSizeInput.value+"px";
        if (widget) widget.style.color = attributesPanelColorInput.value;
        if (widget) widget.innerText = attributesPanelTextInput.value;
        onWidgetClicked(widgetIdOfAttributePanel,"widget");
    }
}

function setFormAttributePanel(){
    if(widgetIdOfAttributePanel == undefined){
        return;
    }
    let widget: HTMLElement | undefined = document.getElementById(widgetIdOfAttributePanel) as HTMLElement;
    const formTitle = widget?.querySelector('#title') as HTMLElement;
    const formDescription = widget?.querySelector('#description') as HTMLElement;
    formAttributesPanelFormNameInput.value = formTitle.textContent || '';
    formAttributesPanelFormDescriptionInput.value = formDescription.textContent || '';

    document.addEventListener('keydown',(event)=>{
        if(event.key === "Enter"){
            refresh();
        }
    });


    function refresh(){
        if(widgetIdOfAttributePanel == undefined){
            return;
        }
        let widget: HTMLElement | undefined = document.getElementById(widgetIdOfAttributePanel) as HTMLElement;
        const formTitle = widget?.querySelector('#title') as HTMLElement;
        const formDescription = widget?.querySelector('#description') as HTMLElement;
        if (formDescription) formDescription.textContent = formAttributesPanelFormDescriptionInput.value;
        if (formTitle) formTitle.textContent = formAttributesPanelFormNameInput.value;
        onWidgetClicked(widgetIdOfAttributePanel,"form");
    }
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

//get portfolio id
//verify if user is owner of portfolio, if not redirect portfolio view page
//load portfolio data
//show data in panel
//save changes to server