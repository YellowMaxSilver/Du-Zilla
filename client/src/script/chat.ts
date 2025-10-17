import type { AccountDocument } from "../../../database/interface/accountInterface";
import type { MessageDocument, MessageInput } from "../../../database/interface/messageInterface";
import { getAccount, loading, stopLoading } from "./main";
import { notification, signNotification } from "./notification";
import { getAccountByNameId, getAccountByUid, searchUserByNameOrNameId } from "./querys/accountQuery";
import { getAllMessages, sendMessage } from "./querys/messageQuery";
import { contactAccountFromAddNewContactPanel, panelLoadingBox, panelNotFoundBox, selfMessageBox, userMessageBox } from "./widgets";


// let Account: AccountDocument | null = null;
// (async () => {
//     Account = await getAccount();
//     setAttributes();
// })();
function getQueryVariable() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id;
}
const Account = await getAccount();
const queryId:string|null = getQueryVariable();

const addNewContactPopUp = document.querySelector("#addNewContactPopUp") as HTMLElement;
const blackFilter = document.querySelector("#blackFilter") as HTMLElement;
const addNewContactCloseButton = document.querySelector("#addNewContactCloseButton") as HTMLElement;
const searchUserInput = document.querySelector("#searchUserInput") as HTMLInputElement;

const searchContactsBox = addNewContactPopUp.querySelector("#searchContactsBox") as HTMLElement;
// const searchContactLoadingBox = searchContactsBox.querySelector("#loadingBox") as HTMLElement;
// const noContactsFoundBox = searchContactsBox.querySelector("#noContactsFoundBox") as HTMLElement;

const addNewContactButton = document.querySelector("#addNewContactButton") as HTMLElement;

const contactUserName = document.querySelector("#contactUserName") as HTMLElement;
const contactUserId = document.querySelector("#contactUserNameId") as HTMLElement;

const chatInput = document.querySelector("#chatInput") as HTMLTextAreaElement;
const chatSendButton = document.querySelector("#chatSendButton") as HTMLElement; 

const messagesBox = document.querySelector("#messagesBox") as HTMLElement;

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
        return;
    }
    if(queryId){
        getAccountByNameId(queryId).then(account=>{
            setChatSection(account);
        }).catch(err=>{
            notification("error",`User @${queryId} not found`);
        });
    }
    searchUserInput.addEventListener("input",searchUser);
}


function searchUser(){
    searchContactsBox.innerHTML = "";
    const query:string = searchUserInput.value;
    if(!query || query == "" || query == " "){
        searchContactsBox.append(panelNotFoundBox("User not found"));
        return
    }

    searchContactsBox.append(panelLoadingBox());
    // console.log(query)
    setTimeout(async ()=>{
        if(searchUserInput.value == query){

            const accounts:AccountDocument[]|null = await searchUserByNameOrNameId(query);
            if(!accounts){
                searchContactsBox.innerHTML ="";
                searchContactsBox.append(panelNotFoundBox("User not found"));
                return;
            }
            searchContactsBox.innerHTML ="";
            for(let i = 0;i< accounts.length;i++){
                let account:AccountDocument = accounts[i];
                searchContactsBox.append(contactAccountFromAddNewContactPanel(account.name,account.nameId,()=>{
                    addNewContactPopUp.classList.add("hiddenPopUpSection");
                    blackFilter.classList.add("hiddenBlackFilter");
                    setChatSection(account);
                }));
            }
        }
    },1000);
}

var currentContactChat:AccountDocument;

async function setChatSection(contactAccount:AccountDocument){
    if(!contactAccount){
        return;
    }
    if(!Account){
        return;
    }

    currentContactChat = contactAccount;

    contactUserName.textContent = contactAccount.name;
    contactUserId.textContent = "@"+contactAccount.nameId;

    const messages:MessageDocument[] = await getAllMessages(contactAccount.uid,Account.uid);

    if(messages.length <= 0){
        notification("alert","no messages");
    }

    messagesBox.innerHTML =""
    for(let i = 0;i< messages.length;i++){
        let message:MessageDocument = messages[i];
        if(message.from == Account.uid){
            messagesBox.append(selfMessageBox(message.message,message.date));
        }else{
            messagesBox.append(userMessageBox(message.message,message.date));
        }
    }

    console.log(messages);

}

chatSendButton.addEventListener("click",()=>{
    if(!Account){
        return;
    }
    if(!currentContactChat){
        return;
    }
    const message:MessageInput = {
        message:chatInput.value,
        from:Account.uid,
        to:currentContactChat.uid,
        type:"message"
    }
    sendMessage(message).then(newMessage=>{
        console.log(newMessage)
        messagesBox.append(selfMessageBox(newMessage.message,newMessage.date));
    }).catch(err=>{
        console.error(err);
    });
    chatInput.value = "";
})