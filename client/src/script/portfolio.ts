import { elementRandomId } from "./idGenerete";
import compilerToString from "./compiler";
import { getPortfolioById } from "./querys/portfolioQuery";
import { notification } from "./notification";
import { accountNotActvatedForm, alreadySentDataToForm, form, notLogedForm } from "./widgets";
import type { AccountDocument } from "../../../database/interface/accountInterface";
import { getAccount, loading, stopLoading } from "./main";
import { verifyIfAlreadySentADataToForm } from "./querys/formQuery";
const mainView = document.querySelector("#main") as HTMLElement;

loading()
function getQueryVariable() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id;
}

const portfolioId:string|null = getQueryVariable();
const Account = await getAccount();


const portfolioNameTitle = document.querySelector("#portfolioName") as HTMLElement;
const pageTitle = document.querySelector("#pageTitle") as HTMLElement;

class Widget {
    constructor(
        widgetType: string,
        argument1: any,
        argument2: any|null,
        argument3: any|null,
        argument4: any|null,
        argument5: any|null,
        argument6: any|null,
        argument7: any|null,
    ) {

        let elementId: string = elementRandomId();
        if(widgetType != 'form'){
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
            

            let htmlEdit: string = `<${widgetNameToHtmlTag(widgetType)} id="${elementId}" 
            style="
            font-size:${argument2.replace("px","")}px;
            color:${argument3};
            text-align:${argument4};
            font-weight:${argument5};
            font-style:${argument6};
            font-family:${argument7};
            width:auto;
            height:auto;
            ">${argument1}</${widgetNameToHtmlTag(widgetType)}>`;

            mainView.insertAdjacentHTML('beforeend', htmlEdit);
        }else{
            //form -->
            //argument1 = formId
            //argument2 = formName
            //argument3 = formDescription


            //=====> normal form
            //====> not verified account form

            //mainView.insertAdjacentHTML();
            (async () => {
                if(Account){
                    const alreadySent = await verifyIfAlreadySentADataToForm(Account.uid,argument1);
                    console.log(alreadySent);
                    if (!alreadySent) {
                        if(Account.activated){
                            mainView.insertAdjacentElement('beforeend', await form(argument1, argument2, argument3));
                        }else{
                            mainView.insertAdjacentElement('beforeend',await accountNotActvatedForm(argument2,argument3));
                        }
                    } else {
                        mainView.insertAdjacentElement('beforeend', alreadySentDataToForm(argument2, argument3));
                    }
                }else{
                    mainView.insertAdjacentElement('beforeend', await notLogedForm());
                }
            })();
        }
    }

}

function loadPage(code:string){
    let elements:string[][] = compilerToString(code);
    for(let i = 0;i < elements.length;i++){
        let thisElement = elements[i];
        new Widget(thisElement[0],thisElement[1],thisElement[2],thisElement[3],thisElement[4],thisElement[5],thisElement[6],thisElement[7]);
    }
}


function getPortfolio(){
    if(portfolioId == null){
        return;
    }
    getPortfolioById(portfolioId).then(portfolio=>{
        stopLoading();
        portfolioNameTitle.textContent = portfolio.name;
        pageTitle.textContent = portfolio.name+" - Dz";
        loadPage(portfolio.code);
    }).catch(error=>{
        console.error("Error: ",error)
        notification("error","error to get portfolio");
    })
}

getPortfolio();


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