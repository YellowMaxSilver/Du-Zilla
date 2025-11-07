import React, { useEffect, useRef, useState } from "react";
import "../style.css"
import "./Notification.css"
import { JsxElement } from "typescript";
import ReactDOM  from "react-dom/client";
interface NotificationProps{
    icon?:string,
    text:string
}

 


function Notification(){
  const newNotification = (message:string)=>{
    const notificationSection = document.querySelector("#notificationSection") as HTMLDivElement;
    const id = "ntf"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
    if(notificationSection){
      notificationSection.insertAdjacentHTML("beforeend",`
                    <box class="notification_box hiddenNotificationBox" id="${id}">
                      <div id="closeButton" class="closeIcon"></div>
                      <div class="notificationIcon dzIcon"></div>
                      <div class="notification_text">
                        <h3 class="normal_text" >
                          ${message}
                        </h3>
                      </div>
                    </box>`);
    }
    setTimeout(()=>{
      const notificationElement = document.querySelector(`#${id}`) as HTMLDivElement;
      if(notificationElement){
        notificationElement.classList.remove("hiddenNotificationBox");
        const closeButton = notificationElement.querySelector(`#closeButton`);
        if(closeButton){
          closeButton.addEventListener("click",()=>{closeNotification(id)})
        }
      }
    },100)
    setTimeout(()=>{closeNotification(id)},5000)
  }

  const newSuccessNotification = (message:string)=>{
    const notificationSection = document.querySelector("#notificationSection") as HTMLDivElement;
    const id = "ntf"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
    if(notificationSection){
      notificationSection.insertAdjacentHTML("beforeend",`
                    <box class="notification_box hiddenNotificationBox" id="${id}">
                      <div id="closeButton" class="closeIcon"></div>
                      <div class="notificationIcon successIcon"></div>
                      <div class="notification_text">
                        <h3 class="normal_text" >
                          ${message}
                        </h3>
                      </div>
                    </box>`);
    }
    setTimeout(()=>{
      const notificationElement = document.querySelector(`#${id}`) as HTMLDivElement;
      if(notificationElement){
        notificationElement.classList.remove("hiddenNotificationBox");
        const closeButton = notificationElement.querySelector(`#closeButton`);
        if(closeButton){
          closeButton.addEventListener("click",()=>{closeNotification(id)})
        }
      }
    },100)
    setTimeout(()=>{closeNotification(id)},5000)
  }

  const newErrorNotification = (message:string)=>{
    const notificationSection = document.querySelector("#notificationSection") as HTMLDivElement;
    const id = "ntf"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
    if(notificationSection){
      notificationSection.insertAdjacentHTML("beforeend",`
                    <box class="notification_box hiddenNotificationBox" id="${id}">
                      <div id="closeButton" class="closeIcon"></div>
                      <div class="notificationIcon errorIcon"></div>
                      <div class="notification_text">
                        <h3 class="errorText normal_text" >
                          ${message}
                        </h3>
                      </div>
                    </box>`);
    }
    setTimeout(()=>{
      const notificationElement = document.querySelector(`#${id}`) as HTMLDivElement;
      
      if(notificationElement){
        notificationElement.classList.remove("hiddenNotificationBox");
        const closeButton = notificationElement.querySelector(`#closeButton`);
        if(closeButton){
          closeButton.addEventListener("click",()=>{closeNotification(id)})
        }
      }
    },100)
    setTimeout(()=>{closeNotification(id)},5000);
  }

  const newLoadingNotification = (message:string)=>{
    const notificationSection = document.querySelector("#notificationSection") as HTMLDivElement;
    const id = "ntf"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
    if(notificationSection){
      notificationSection.insertAdjacentHTML("beforeend",`
                    <box class="notification_box hiddenNotificationBox" id="${id}">
                      <div id="closeButton" class="closeIcon"></div>
                      <div class="notificationIcon loadingIcon3"></div>
                      <div class="notification_text">
                        <h3 class="normal_text" >
                          ${message}
                        </h3>
                      </div>
                    </box>`);
    }
    setTimeout(()=>{
      const notificationElement = document.querySelector(`#${id}`) as HTMLDivElement;
      
      if(notificationElement){
        notificationElement.classList.remove("hiddenNotificationBox");
        const closeButton = notificationElement.querySelector(`#closeButton`);
        if(closeButton){
          closeButton.addEventListener("click",()=>{closeNotification(id)})
        }
      }
    },100)
    return id;
  }

  const newSignNotification = (message?:string)=>{
    const notificationSection = document.querySelector("#notificationSection") as HTMLDivElement;
    const id = "ntf"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
    if(notificationSection){
      notificationSection.insertAdjacentHTML("beforeend",`
                    <box class="notification_box hiddenNotificationBox" id='${id}'>
                <div id="closeButton" class="closeIcon"></div>
                <div class="notificationIcon dzIcon"></div>
                <div class="notification_text" style="padding:10px">
                  <h4 class="normal_text">
                    ${message}
                  </h4>
                  <div class="notificationButtons">
                    <a href="login"><div class="signInButton"><h4 class="normal_text">Login</h4></div></a>
                    <a href="register"><div class="signUpButton"><h4 class="normal_text">Register</h4></div></a>
                  </div>
                </div>
              </box>`);
    }
    setTimeout(()=>{
      const notificationElement = document.querySelector(`#${id}`) as HTMLDivElement;
      
      if(notificationElement){
        notificationElement.classList.remove("hiddenNotificationBox");
        const closeButton = notificationElement.querySelector(`#closeButton`);
        if(closeButton){
          closeButton.addEventListener("click",()=>{closeNotification(id)})
        }
      }
    },100)
    return id;
  }

  const newSaveChangesNotification = (onSaveButtonClicked: ()=> void,onCancelButtonClicked: ()=> void)=>{
      const notificationSection = document.querySelector("#notificationSection") as HTMLDivElement;
      const id = "ntf"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
      if(notificationSection){
        notificationSection.insertAdjacentHTML("beforeend",`
                      <box class="notification_box hiddenNotificationBox" id='${id}'>
                  
                  <div class="notificationIcon dzIcon"></div>
                  <div class="notification_text" style="padding:10px">
                    <h3 class="normal_text">
                      Salvar mudanças?
                    </h3>
                    <div class="notificationButtons">
                      <div id="saveButton${id}" class="signUpButton"><h4 class="normal_text">Salvar</h4></div>
                      <div id="cancelButton${id}" class="signInButton"><h4 class="normal_text">Cancelar</h4></div>
                    </div>
                  </div>
                </box>`);
      }
      setTimeout(()=>{
        const notificationElement = document.querySelector(`#${id}`) as HTMLDivElement;
        
        if(notificationElement){
          notificationElement.classList.remove("hiddenNotificationBox");
          
          const saveButton = document.querySelector(`#saveButton${id}`) as HTMLDivElement;
          const cancelButton = document.querySelector(`#cancelButton${id}`) as HTMLDivElement;

          if(saveButton){
            saveButton.addEventListener("click",()=>{onSaveButtonClicked();closeNotification(id)})
          }

          if(cancelButton){
            cancelButton.addEventListener("click",()=>{onCancelButtonClicked();closeNotification(id)})
          }
        }
      },100)
      return id;
  }

  const closeNotification = (id:string)=>{
    const notificationElement = document.querySelector(`#${id}`) as HTMLDivElement;
    if(notificationElement){
      notificationElement.classList.add("hiddenNotificationBox");
      setTimeout(()=>{notificationElement.style.display = "none"},500);
    }
  }
  return{
    newNotification,
    newSuccessNotification,
    newErrorNotification,
    newSignNotification,
    newSaveChangesNotification,
    newLoadingNotification,
    closeNotification
  }
}

export default Notification;