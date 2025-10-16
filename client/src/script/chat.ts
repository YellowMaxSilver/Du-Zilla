import type { AccountDocument } from "../../../database/interface/accountInterface";
import { getAccount, loading, stopLoading } from "./main";
import { notification, signNotification } from "./notification";
import { searchUserByNameOrNameId } from "./querys/accountQuery";
import { contactAccountFromAddNewContactPanel } from "./widgets";


// let Account: AccountDocument | null = null;
// (async () => {
//     Account = await getAccount();
//     setAttributes();
// })();
const Account = await getAccount();

const addNewContactPopUp = document.querySelector("#addNewContactPopUp") as HTMLElement;
const blackFilter = document.querySelector("#blackFilter") as HTMLElement;
const addNewContactCloseButton = document.querySelector("#addNewContactCloseButton") as HTMLElement;
const searchUserInput = document.querySelector("#searchUserInput") as HTMLInputElement;

const searchContactsBox = addNewContactPopUp.querySelector("#searchContactsBox") as HTMLElement;
const searchContactLoadingBox = searchContactsBox.querySelector("#loadingBox") as HTMLElement;
const noContactsFoundBox = searchContactsBox.querySelector("#noContactsFoundBox") as HTMLElement;

const addNewContactButton = document.querySelector("#addNewContactButton") as HTMLElement;

addNewContactButton.addEventListener("click",()=>{
    addNewContactPopUp.classList.remove("hiddenPopUpSection");
    blackFilter.classList.remove("hiddenBlackFilter");
})

addNewContactCloseButton.addEventListener("click",()=>{
    addNewContactPopUp.classList.add("hiddenPopUpSection");
    blackFilter.classList.add("hiddenBlackFilter");
})

setAttributes();

function setAttributes(){
    // const loadingId = loading();

    if(!Account){
        signNotification("Você precisa de uma conta para acessar o Menssager do DZ");
    }
    searchUserInput.addEventListener("input",searchUser);
}


function searchUser(){
    const query:string = searchUserInput.value;
    if(!query || query == "" || query == " "){
        noContactsFoundBox.style.display = "block";
        searchContactLoadingBox.classList.add("hiddenLoadingBox");
        return
    }

    noContactsFoundBox.style.display = "none";
    searchContactLoadingBox.classList.remove("hiddenLoadingBox");
    // console.log(query)
    setTimeout(async ()=>{
        if(searchUserInput.value == query){

            const accounts:AccountDocument[]|null = await searchUserByNameOrNameId(query);
            if(!accounts){
                searchContactLoadingBox.classList.add("hiddenLoadingBox");
                noContactsFoundBox.style.display = "block";
                return;
            }
            for(let i = 0;i< accounts.length;i++){
                let account:AccountDocument = accounts[i];
                searchContactsBox.append(contactAccountFromAddNewContactPanel(account.name,account.nameId));
            }
            searchContactLoadingBox.classList.add("hiddenLoadingBox");
            noContactsFoundBox.style.display = "none"

        }
    },1000);
}