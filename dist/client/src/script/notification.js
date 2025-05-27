"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification = notification;
function notification(icon, message) {
    //icons avaliables: comment, save/blue
    let section = document.getElementById('notification_section');
    let number = String(Math.random());
    let linkIcon;
    if (icon == "comment") {
        linkIcon = "./images/icons/comment_icon.png";
    }
    else if (icon == "save/blue") {
        linkIcon = "./images/icons/see_later_icon.png";
    }
    else {
        linkIcon = "./images/icons/user_icon.png";
    }
    let box = `<box class="notification_box" id='` + number + `'>
                <div class="close_notification_box" onclick="close_notification_box('` + number + `')"></div>
                <div class="notification_icon" style="background-image:url('` + linkIcon + `')"></div>
                <div class="notification_text">
                  <h4 class="normal_text">
                    ` + message + `
                  </h4>
                </div>
              </box>`;
    let elemento = document.createElement("div");
    elemento.innerHTML = box;
    section.append(elemento);
    setTimeout(function () { close_notification_box(number); }, 5000);
}
function close_notification_box(self) {
    let box = document.getElementById(self);
    box.style = `animation-name: hidden_box_notification;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;`;
}
