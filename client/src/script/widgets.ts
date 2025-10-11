import type { AccountDocument } from "../../../database/interface/accountInterface";
import type { FormDataInput } from "../../../database/interface/formInterface";
import { elementRandomId } from "./idGenerete";
import { getAccount } from "./main";
import { notification } from "./notification";
import { sendDataToForm } from "./querys/formQuery";

export function portfolioThunbNail(portfolioId:string,name:string, userName:string,redirect:boolean):HTMLElement{
    const element = document.createElement("div");
    element.innerHTML = `<div class="thunbMainBox">
          <div class='thunbBanner' style="background-image: url('../images/image-icon.jpg')"></div>      
            <box class="thunbInfoBox">
                <box class="thunbTitleBox">
                  <div style="width:90%;margin-left: 20px;"><h4 class="normal_text">${name}</h4></div>  
                </box>
                <box class="thunbUserBox">
                  <img class="userImage" src="../images/user-icon.jpg" style="margin-right: 10px;margin-left: 10px;">
                  <h5 class="normal_text">${userName}</h5>
                  <div class="rateBox">
                    <div class="emptyStarRate"></div>
                    <div class="emptyStarRate"></div>
                    <div class="emptyStarRate"></div>
                    <div class="emptyStarRate"></div>
                    <div class="emptyStarRate"></div>
                  </div>
                </box>
            </box>   
        </div>`;

    if(redirect){
      element.addEventListener('click',()=>{
          window.location.href = `/portfolio?id=${portfolioId}`;
      })
    }

    return element;
}

export function loadingPortfolioThunbNailBox(id:string):HTMLElement{
  const element = document.createElement('div');
  element.innerHTML = `<div id="${id}" class="loadingThunbNailBox"></div>`
  return element;
}


export function projectBox(id:string,name:string,category:string,visibility:string,createdAt:Date,lastUpdate:Date,userName:string):HTMLElement{
    const element = document.createElement('div');
    element.innerHTML = `<a href="/studio/panel?id=${id}"><div class="projectBox">
            <div class="infoBox">
                <h2 class="normal_text attributeText">${name}</h2>
                <h4 class="normal_text attributeText">${category}</h4>
                <div class="attribute" style="border-color: ${visibility == "Public"? "green" : "red"}"><div class="${visibility == "Public" ? "publicIcon" : "publicOffIcon"}"></div><h4 class="normal_text">${visibility}</h4></div>
                <h5 class="normal_text attributeText">Created at: ${createdAt}</h5>
                <h5 class="normal_text attributeText">Last UpdateAt at: ${lastUpdate}</h5>
            </div>
                <div class="thunbMainBox">
              <div class='thunbBanner' style="background-image: url('../images/image-icon.jpg')"></div>      
                <box class="thunbInfoBox">
                    <box class="thunbTitleBox">
                      <div style="width:90%;margin-left: 20px;"><h4 class="normal_text">${name}</h4></div>  
                    </box>
                    <box class="thunbUserBox">
                      <img class="userImage" src="../images/user-icon.jpg" style="margin-right: 10px;margin-left: 10px;">
                      <h5 class="normal_text">${userName}</h5>
                      <div class="rateBox">
                        <div class="emptyStarRate"></div>
                        <div class="emptyStarRate"></div>
                        <div class="emptyStarRate"></div>
                        <div class="emptyStarRate"></div>
                        <div class="emptyStarRate"></div>
                      </div>
                    </box>
                </box>   
            </div>
        </div><a>`;
    return element;
}

export function loadingProjectBox(id:string):HTMLElement{
  const element = document.createElement('div');
  element.innerHTML = `<div id="${id}" class="loadingProjectBox"><div class="loadingIcon2"></div></div>`;
  return element;
}

export async function notLogedForm(): Promise<HTMLElement>{
    const element = document.createElement('div');
    element.innerHTML = `<div class="portfolioFormBox">
                <h2 class="normal_text" id="title">Form 1</h2>
                <h3 class="formDescription normal_text" id="description">This is my web dz form description</h3>
                <div class="formSignBox">
                    <div class="dzIcon"></div>
                    <h2 class="normal_text">Sign in Du-Zilla to snd your form</h2>
                    <div class="formSignButtons">
                        <a href="/login"><div class="signInButton normal_text">Sign In</div></a>
                        <a href="/register"><div class="signUpButton normal_text">Sign Up</div></a>
                    </div>
                </div>
                </div>`;
    return element;
} 

export async function form(id:string,name:string,description:string): Promise<HTMLElement>{
    const element = document.createElement('div');
    const elementId = elementRandomId();
    element.append(loadingForm(name,description));
    const Account:AccountDocument|null = await getAccount();

    element.innerHTML = `<div id="${elementId}" class="portfolioFormBox">
            <h2 class="normal_text" id="title">${name}</h2>
            <h3 class="formDescription normal_text" id="description">${description}</h3>
            <div class="accountFormBox">
                <div class="icon"></div>
                <h4 class="accountName normal_text">${Account?.name}</h4>
                <h5 class="accountId normal_text">@${Account?.nameId}</h5>
            </div>
            <div class="attribute"> 
                <h3 class="normal_text">Contact:</h3>
                <input id="${"contact"+elementId}" type="text" autocomplete="off" placeholder="Email or phone number">
            </div>
            <div class="attributeDescription"><h3 class="normal_text">Description:</h3><textarea id="${"description"+elementId}" class="normal_text" type="text" autocomplete="off" placeholder="Description"></textarea></div>
            <buttom id="${"submitButton"+elementId}" class="submitButton normal_text">Submit</buttom>
            <div class="dzIcon"></div>
            </div>`;

    (element.querySelector(`#${"submitButton"+elementId}`) as HTMLElement).addEventListener(('click'),()=>{
        const contact = (document.querySelector(`#${"contact"+elementId}`) as HTMLInputElement).value;
        const userDescription = (document.querySelector(`#${"description"+elementId}`) as HTMLTextAreaElement).value;
        element.innerHTML = "";
        element.append(loadingForm(name,description));
        if(!contact){
          notification("alert","Contact Fiels is empty");
          return;
        }
        if(!userDescription){
          notification("alert","Description Fiels is empty");
          return;
        }

        if(!Account){
          return;
        }
        const data:FormDataInput = {
          contact:contact,
          description:userDescription,
          formId:id,
          userUid:Account?.uid
        }

        sendDataToForm(data).then(newData=>{
          notification("success","success to send form");
          element.innerHTML = "";
          element.append(alreadySentDataToForm(name,description));
        }).catch(err=>{
          console.error(err)
          notification("error","error to send form");
        })
    })

    return element;
}

export function loadingForm(name:string,description:string):HTMLElement{
  const element = document.createElement('div');
  element.innerHTML = `<div class="portfolioFormBox">
            <h2 class="normal_text" id="title">${name}</h2>
            <h3 class="formDescription normal_text" id="description">${description}</h3>
            <div style="display:flex;justify-content: center;align-items: center;">
              <div class="loadingIcon2"></div>
            </div>
            </div>`;
  return element;
}

export function alreadySentDataToForm(name:string,description:string):HTMLElement{
  const element = document.createElement('div');
  element.innerHTML = `<div class="portfolioFormBox">
            <h2 class="normal_text" id="title">${name}</h2>
            <h3 class="formDescription normal_text" id="description">${description}</h3>
            <div style="display:flex;justify-content: center;align-items: center;">
              <div class="successIcon"></div>
              <h4 class="normal_text">You already sent a form</h4>
            </div>
            </div>`;
  return element;
}

export async function accountNotActvatedForm(name:string,description:string): Promise<HTMLElement>{
  const Account:AccountDocument|null = await getAccount();
  const element = document.createElement('div');
  element.innerHTML = `<div class="portfolioFormBox">
              <h2 class="normal_text" id="title">${name}</h2>
              <h3 class="formDescription normal_text" id="description">${description}</h3>
              <div class="notVerifiedAccount">
                  <div class="warningIcon"></div>
                  <h3 class="normal_text">Your account is not verified. Please verify your account to receive form submissions. <a>Verify Now</a></h3>
              </div>
              <div class="accountFormBox">;
                  <div class="icon"></div>
                  <h4 class="accountName normal_text">${Account?.name}</h4>
                  <h5 class="accountId normal_text">@${Account?.nameId}</h5>
              </div>
              <div class="attribute"> 
                  <h3 class="normal_text">Contact:</h3>
                  <input type="text" autocomplete="off" placeholder="Email or phone number" readonly>
              </div>
              <div class="attributeDescription"><h3 class="normal_text">Description:</h3><textarea class="normal_text" type="text" autocomplete="off" placeholder="Description" readonly></textarea></div>
              <div class="normal_text inactiveSubmitButton">Submit</div>
              <div class="dzIcon"></div>
              </div>`;
  return element;
}
