import { elementRandomId } from "./idGenerete";

export function notification(icon:string,message:string){
    //icons avaliables: comment, save/blue
    if(document.getElementById('notification_section') == undefined){
      const mainSection = document.createElement("div") as HTMLElement;
      mainSection.classList.add("notification_section");
      mainSection.id = "notification_section";

      document.body.appendChild(mainSection);
    }

  let section = document.getElementById('notification_section') as HTMLElement;

  let number = String(Math.random());
  let linkIcon;
  let textColor;

  switch(icon){
    case "success":
      linkIcon = "/images/check_icon.png";
      textColor = "var(--whiteTextColor)"
    break;
    case "error":
      linkIcon = "/images/red_alert_icon.png";
      textColor = "var(--alertColor)"
    break;
    case "dzIcon":
      linkIcon = "/images/Du-Zilla-icon.png";
      textColor = "var(--whiteTextColor)"
      break;
    default:
      linkIcon = "/images/Du-Zilla-icon.png";
      textColor = "var(--whiteTextColor)"
      break;
  }



  let box = `<box class="notification_box" id='`+number+`'>
                <div class="close_notification_box" onclick="close_notification_box('`+number+`')"></div>
                <div class="notification_icon" style="background-image:url('`+linkIcon+`')"></div>
                <div class="notification_text">
                  <h3 class="normal_text" style="color:${textColor}">
                    `+message+`
                  </h3>
                </div>
              </box>`;

  let elemento = document.createElement("div");
  elemento.innerHTML = box;

  section.append(elemento);
  setTimeout(function(){closeNotification(number)}, 5000)
}



export function closeNotification(self:string){
  let box = document.getElementById(self) as HTMLElement;
  box.style = `animation-name: hidden_box_notification;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;`;
}

export function loadingNotification(message:string):string{
    if(document.getElementById('notification_section') == undefined){
      const mainSection = document.createElement("div") as HTMLElement;
      mainSection.classList.add("notification_section");
      mainSection.id = "notification_section";

      document.body.appendChild(mainSection);
    }

  let section = document.getElementById('notification_section') as HTMLElement;

  let number = elementRandomId();
  let linkIcon = "./images/loading3.svg";

  let box = `<box class="notification_box" id='${number}'>
                <div class="notification_icon" style="background-image:url('`+linkIcon+`');width:50px;height;50px"></div>
                <div class="notification_text">
                  <div style="display:flex">
                    <h3 class="normal_text">
                      ${message}
                    </h3>
                    <h3 id="loadingText${number}" class="normal_text">...</h3>
                  </div>
                </div>
              </box>`;

  const elemento = document.createElement("div");
  elemento.innerHTML = box;

  const loadingText = elemento.querySelector(`#loadingText${number}`) as HTMLElement;
  setInterval(()=>{
    if(loadingText.textContent == "..."){
      loadingText.textContent = '';
    }else{
      loadingText.textContent += ".";
    }
  },500);
  section.append(elemento);
  return number;
}