import { notification } from "./notification";
console.log("hello");
const templatePanel = document.getElementById("choseTemplatePanel") as HTMLElement;
const closeTemplatePanel = document.getElementById("choseTemplatePanelCloseButton") as HTMLElement;

const createOwnButton = document.getElementById("createOwnButton") as HTMLElement;

closeTemplatePanel.addEventListener("click",()=>{
    templatePanel.style.display = "none";
})

createOwnButton.addEventListener("click",()=>{
    templatePanel.style.display = "block";
    notification("dzIcon","you can chose a templete to start your portfolio")
})

