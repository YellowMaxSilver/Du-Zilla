
const visibilityDropDownButton = document.querySelector("#visibilityDropDownButton") as HTMLElement;
const visibilityDropDown = document.querySelector("#visibilityDropDown") as HTMLElement;

const Public = visibilityDropDown.querySelector("li:nth-child(1)") as HTMLElement;
const Private = visibilityDropDown.querySelector("li:nth-child(2)") as HTMLElement;
const JustMe = visibilityDropDown.querySelector("li:nth-child(3)") as HTMLElement;

Public.addEventListener("click",()=>{
    setVisibilityMode("Public");
    visibilityDropDown.style.display = "none";
});
Private.addEventListener("click",()=>{
    setVisibilityMode("Private");
    visibilityDropDown.style.display = "none";
});
JustMe.addEventListener("click",()=>{
    setVisibilityMode("Just me");
    visibilityDropDown.style.display = "none";
});

var visibilityMode:string = "Public";
var categoryMode:string = "Personal";

const categoryDropDownButton = document.querySelector("#categoryDropDownButton") as HTMLElement;
const categoryDropDown = document.querySelector("#categoryDropDown") as HTMLElement;

const buisness = categoryDropDown.querySelector("#buisness") as HTMLElement;
const personal = categoryDropDown.querySelector("#personal") as HTMLElement;
const hiring = categoryDropDown.querySelector("#hiring") as HTMLElement;
const store = categoryDropDown.querySelector("#store") as HTMLElement;
const other = categoryDropDown.querySelector("#other") as HTMLElement;

buisness.addEventListener("click",()=>{
    setCategoryMode("Buisness");
    categoryDropDown.style.display = "none";
});

personal.addEventListener("click",()=>{
    setCategoryMode("Personal");
    categoryDropDown.style.display = "none";
});
hiring.addEventListener("click",()=>{
    setCategoryMode("Hiring");
    categoryDropDown.style.display = "none";
}
);
store.addEventListener("click",()=>{
    setCategoryMode("Store");
    categoryDropDown.style.display = "none";
});
other.addEventListener("click",()=>{
    setCategoryMode("Other");
    categoryDropDown.style.display = "none";
});


categoryDropDownButton.addEventListener("click",(event)=>{
    event.stopPropagation();
    showDropDown(categoryDropDown);
});
visibilityDropDownButton.addEventListener("click",(event)=>{
    event.stopPropagation();
    showDropDown(visibilityDropDown);
});

const editPortfolioBox = document.querySelector("#editPortfolioBox") as HTMLElement;
editPortfolioBox.addEventListener("click",()=>{
    window.location.href = "/editPortfolio/?id=portfolioId";
});


function showDropDown(dropDown: HTMLElement) {
    dropDown.style.display = "block";

    setTimeout(() => {
        document.addEventListener("click", function handler(event) {
            if (!dropDown.contains(event.target as Node)) {
                dropDown.style.display = "none";
                document.removeEventListener("click", handler);
            }
        });
    }, 0);
}

function setVisibilityMode(mode:string){
    visibilityMode = mode;
    let icon = visibilityDropDownButton.querySelector(".icon") as HTMLElement;
    let text = visibilityDropDownButton.querySelector("p") as HTMLElement;
    text.textContent = mode;
    //icon.className = "icon "+mode.toLowerCase();
}

function setCategoryMode(mode:string){
    categoryMode = mode;
    let text = categoryDropDownButton.querySelector("p") as HTMLElement;
    text.innerText = mode;
}

//get portfolio id from url
let urlParams = new URLSearchParams(window.location.search);
let portfolioId = urlParams.get('id');

//verify if is logged in
//verify if user is owner of portfolio, if not redirect portfolio view page