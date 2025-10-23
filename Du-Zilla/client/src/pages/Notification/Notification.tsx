import React, { useEffect, useRef, useState } from "react";
import "../style.css"
import "./Notification.css"
import { JsxElement } from "typescript";
interface NotificationProps{
    icon?:string,
    text:string
}

 
export const useDefaultNotification = (section:React.RefObject<HTMLDivElement>)=>{
      
      const [notification, addNewNotification] = useState<JSX.Element[]>([]);
      const newNotification = () =>{
        const randomId = "notification"+Math.floor(Math.random() * (999 - 1 + 1)) + 1;
        const element = (
            <div className="notification_box hiddenNotificationBox" id={randomId} key={randomId}>
                    <div className="closeIcon"></div>
                    <div className="notification_icon"></div>
                    <div className="notification_text">
                      <h3 className="normal_text">
                        {/* {text} */}
                      </h3>
                    </div>
            </div>);

        addNewNotification((prevItens)=> [element, ...prevItens])
          
        setTimeout(()=>{
          const container = section.current;
          if(container){
              let element = container.querySelector("#"+randomId) as HTMLDivElement;
              if(element){
                element.classList.remove("hiddenNotificationBox");
                console.log("showsss")
              }
          }
          setTimeout(()=>{
            closeNotification(randomId);
          },3000);
        },100)
      }
      function closeNotification(elementId:string){
        const container = section.current;
        if(container){
          let element = container.querySelector("#"+elementId) as HTMLDivElement;
          if(element){
            element.classList.add("hiddenNotificationBox");
            console.log("hidden",element.classList)
          }
        }
      }

      return{
        notification,
        newNotification
      }
}

function Notification(){
    const section = useRef<HTMLDivElement>(null);
    const { notification, newNotification } = useDefaultNotification(section);

    return(
        (<div className="notificationSection" ref={section}>
          <button onClick={newNotification}>Hello?</button>
          {notification}
        </div>)
    )
}

export default Notification;