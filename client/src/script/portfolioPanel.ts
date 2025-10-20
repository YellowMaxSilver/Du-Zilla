import { portfolioRandomId } from "./idGenerete";
import { getPortfolioById, updatePortfolio } from "./querys/portfolioQuery";
import type { PortfolioDocument, PortfolioDocumentUpdate } from "../../../database/interface/portfolioInterface";
import { notification } from "./notification";
import { getAccountAttributeByUid, getAccountByUid, verifyIfUserIsOwnerOfPortfolio } from "./querys/accountQuery";
import { getAccount, loading, stopLoading } from "./main";
import type { AccountDocument } from "../../../database/interface/accountInterface";
import { getFormDataByFormId, getformsbyportfolioid } from "./querys/formQuery";
import type { FormDataDocument, FormDocument } from "../../../database/interface/formInterface";
import { formsPanelFormBox, userProposalBox } from "./widgets";
import type { ObjectId } from "mongodb";

function getQueryVariable() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id;
}

const portfolioId:string|null = getQueryVariable();
var portfolioOwner:boolean = false; 

if(portfolioId == null){
    window.location.href = "/studio";
}

let Account: AccountDocument | null = null;
(async () => {
    Account = await getAccount();
    setAttributes();
})();

const projectName = document.querySelector("#projectName") as HTMLElement;

const visibilityDropDownButton = document.querySelector("#visibilityDropDownButton") as HTMLElement;
const visibilityDropDown = document.querySelector("#visibilityDropDown") as HTMLElement;

const Public = visibilityDropDown.querySelector("li:nth-child(1)") as HTMLElement;
const Private = visibilityDropDown.querySelector("li:nth-child(2)") as HTMLElement;
const JustMe = visibilityDropDown.querySelector("li:nth-child(3)") as HTMLElement;

Public.addEventListener("click",()=>{
    setVisibilityMode("Public");
    visibilityDropDown.style.display = "none";
});
Private.addEventListener("click",()=>{
    setVisibilityMode("Private");
    visibilityDropDown.style.display = "none";
});
JustMe.addEventListener("click",()=>{
    setVisibilityMode("Just me");
    visibilityDropDown.style.display = "none";
});

var visibilityMode:string = "Public";
var categoryMode:string = "Personal";

const categoryDropDownButton = document.querySelector("#categoryDropDownButton") as HTMLElement;
const categoryDropDown = document.querySelector("#categoryDropDown") as HTMLElement;

const buisness = categoryDropDown.querySelector("#buisness") as HTMLElement;
const personal = categoryDropDown.querySelector("#personal") as HTMLElement;
const hiring = categoryDropDown.querySelector("#hiring") as HTMLElement;
const store = categoryDropDown.querySelector("#store") as HTMLElement;
const other = categoryDropDown.querySelector("#other") as HTMLElement;

buisness.addEventListener("click",()=>{
    setCategoryMode("Buisness");
    categoryDropDown.style.display = "none";
});

personal.addEventListener("click",()=>{
    setCategoryMode("Personal");
    categoryDropDown.style.display = "none";
});
hiring.addEventListener("click",()=>{
    setCategoryMode("Hiring");
    categoryDropDown.style.display = "none";
}
);
store.addEventListener("click",()=>{
    setCategoryMode("Store");
    categoryDropDown.style.display = "none";
});
other.addEventListener("click",()=>{
    setCategoryMode("Other");
    categoryDropDown.style.display = "none";
});


categoryDropDownButton.addEventListener("click",(event)=>{
    event.stopPropagation();
    showDropDown(categoryDropDown);
});
visibilityDropDownButton.addEventListener("click",(event)=>{
    event.stopPropagation();
    showDropDown(visibilityDropDown);
});

const editPortfolioBox = document.querySelector("#editPortfolioBox") as HTMLElement;
editPortfolioBox.addEventListener("click",()=>{
    const testId = portfolioRandomId();
    window.location.href = `/studio/edit/?id=${portfolioId}`;
});

const formPopUpPanel = document.querySelector("#formPopUpPanel") as HTMLElement;
const blackFilter = document.querySelector("#blackFilter") as HTMLElement;
const formPopUpCloseButton = document.querySelector("#formPopUpCloseButton") as HTMLElement;
formPopUpCloseButton.addEventListener('click',()=>{
    formPopUpPanel.classList.add("hiddenPopUpPanel");
    blackFilter.classList.add("hiddenBlackFilter");
});

const formPanelUserProposalPanel = document.querySelector("#usersProposalPanel") as HTMLElement;

const portfolioNameBox = document.querySelector("#portfolioNameBox") as HTMLElement;
const portfolioDescriptionBox = document.querySelector("#portfolioDescriptionBox") as HTMLElement;
const tagsBox = document.querySelector("#tagsBox") as HTMLElement;

const portfolioNameInput = document.querySelector("#portfolioNameInput") as HTMLInputElement;
const portfolioDescriptionInput = document.querySelector("#portfolioDescriptionInput") as HTMLInputElement;
const tagsInput = document.querySelector("#tagsInput") as HTMLInputElement;

//const saveButton = document.querySelector("#saveButton") as HTMLElement;
const publishButton = document.querySelector("#publishButton") as HTMLElement;


const formsPanel = document.querySelector("#formsPanel") as HTMLElement;
setInterval(verifyInputs,500);

setAttributes();

publishButton.addEventListener("click",()=>{
    if(publishButton.classList.contains("disabled")) return;
    publishPortfolio();
    //save portfolio
});

function publishPortfolio(){
    //const portfolioId = urlParams.get('id');
    if(portfolioId == null){
        return;
    }
    if(portfolioOwner == false){
        return;
    }
     
    const name = portfolioNameInput.value;
    const description = portfolioDescriptionInput.value;
    const tags:string[] = [];
    const visibility = visibilityMode;
    const category = categoryMode;

    const newPortfolio: PortfolioDocumentUpdate = {
        name:name,
        description:description,
        tag:tags,
        visibility:visibility,
        type:categoryMode,
    }

    updatePortfolio(portfolioId, newPortfolio).then(newPortfolioUpdated=>{
        notification("success","The portfolio has been publishied with success");
    }).catch(error=>{
        console.error(error);
        notification("error","Error to publishied your portfolio. try again later");
    })
}

function verifyInputs(){
    if(portfolioNameInput.value == " " || portfolioNameInput.value == undefined){
        //saveButton.classList.add("disabled");
        publishButton.classList.add("disabled");
        portfolioNameBox.classList.add("unavailable");
        return false;
    }
    
    portfolioNameBox.classList.remove("unavailable");
    // saveButton.classList.remove("disabled");
    publishButton.classList.remove("disabled");
    return true;
}

function showDropDown(dropDown: HTMLElement) {
    dropDown.style.display = "block";

    setTimeout(() => {
        document.addEventListener("click", function handler(event) {
            if (!dropDown.contains(event.target as Node)) {
                dropDown.style.display = "none";
                document.removeEventListener("click", handler);
            }
        });
    }, 0);
}

function setVisibilityMode(mode:string){
    visibilityMode = mode;
    let icon = visibilityDropDownButton.querySelector(".icon") as HTMLElement;
    let text = visibilityDropDownButton.querySelector("p") as HTMLElement;
    text.textContent = mode;
    //icon.className = "icon "+mode.toLowerCase();
}

function setCategoryMode(mode:string){
    categoryMode = mode;
    let text = categoryDropDownButton.querySelector("p") as HTMLElement;
    text.innerText = mode;
}

function setAttributes(){
    loading();
    if(portfolioId == null){
        return;
    }
    verifyIfUserIsOwnerOfPortfolio(portfolioId,(isOwner)=>{
        if(isOwner){
            portfolioOwner = isOwner;
            getPortfolioById(portfolioId).then(portfolio=>{
                console.log(portfolio)
                projectName.textContent = portfolio.name;
                portfolioNameInput.value = portfolio.name;
                portfolioDescriptionInput.value = portfolio.description != null ? portfolio.description : "";
                setCategoryMode(portfolio.type)
                setVisibilityMode(portfolio.visibility)
                loadForms();
                stopLoading();
            }).catch(error=>{
                console.error(error)
            });
        }else{
            notification("error","you are not the owner");
        }
    })
        
}

function loadForms(){
    if(!portfolioOwner){
        return;
    }

    if(!portfolioId){
        return;
    }

    if(!Account){
        return;
    }

    getformsbyportfolioid(portfolioId).then((forms:FormDocument[])=>{
        for(let i = 0;i< forms.length;i++){
            let form:FormDocument = forms[i];
            formsPanel.append(formsPanelFormBox(form.name,0,()=>{openFormPopupPanel(form._id)}));
        }
    }).catch(err=>{
        console.error(err);
        notification("error","Error to load forms");
    })
}

async function openFormPopupPanel(formId:ObjectId){
    const userProposalBoxLoadingIcon = document.querySelector("#userProposalBoxLoadingIcon") as HTMLElement;
    userProposalBoxLoadingIcon.style.display = "flex";

    formPopUpPanel.classList.remove("hiddenPopUpPanel");
    blackFilter.classList.remove("hiddenBlackFilter");
    formPanelUserProposalPanel.innerHTML = "";
    
    getFormDataByFormId(String(formId)).then(async (formData:FormDataDocument[])=>{
        console.log("got: ",formData);
        for(let i = 0;i< formData.length;i++){
            let data = formData[i];
            console.log(data)
            let thisAccount:AccountDocument = await getAccountByUid(data.userUid);
            formPanelUserProposalPanel.append(userProposalBox(thisAccount.nameId,thisAccount.name,data.contact,data.description ? data.description : "No Description"))
        }
        userProposalBoxLoadingIcon.style.display = "none";
    }).catch(err=>{
        console.error(err)
        notification("error","Error to get form data.");
    })
}


//get portfolio id from url
//verify if is logged in
//verify if user is owner of portfolio, if not redirect portfolio view page