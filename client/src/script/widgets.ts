

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