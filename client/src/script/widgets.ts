

export function portfolioThunbNail(portfolioId:string,name:string, userName:string):HTMLElement{
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

    element.addEventListener('click',()=>{
        window.location.href = `/portfolio?id=${portfolioId}`;
    })

    return element;
}