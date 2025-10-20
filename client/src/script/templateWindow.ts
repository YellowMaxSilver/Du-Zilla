import { notification } from "./notification";
console.log("hello");
const templatePanel = document.getElementById("choseTemplatePanel") as HTMLElement;
const closeTemplatePanel = document.getElementById("choseTemplatePanelCloseButton") as HTMLElement;
const blackFilter = document.getElementById("blackFilter") as HTMLElement;;
const createOwnButton = document.getElementById("createOwnButton") as HTMLElement;

var firstNotification:boolean = false;

closeTemplatePanel.addEventListener("click",()=>{
    templatePanel.classList.add("hiddenPopUpPanel");
    blackFilter.classList.add("hiddenBlackFilter");
})

createOwnButton.addEventListener("click",()=>{
    templatePanel.classList.remove("hiddenPopUpPanel");
    blackFilter.classList.remove("hiddenBlackFilter");
    if(!firstNotification){
        notification("dzIcon","you can chose a templete to start your portfolio")
        firstNotification = true;
    }
})

