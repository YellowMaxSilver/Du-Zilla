import { elementRandomId } from "./idGenerete";
import compilerToString from "./compiler";
import { getPortfolioById } from "./querys/portfolioQuery";
import { notification } from "./notification";
const mainView = document.querySelector("#main") as HTMLElement;

function getQueryVariable() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id;
}

const portfolioId:string|null = getQueryVariable();


const portfolioNameTitle = document.querySelector("#portfolioName") as HTMLElement;

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
            let htmlEdit: string = `<div id="${elementId}" class="portfolioFormBox">
            <h2 class="normal_text" id="title">${argument1}</h2>
            <h3 class="formDescription normal_text" id="description">${argument2}</h3>
            <div class="accountFormBox">
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
        portfolioNameTitle.textContent = portfolio.name;
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