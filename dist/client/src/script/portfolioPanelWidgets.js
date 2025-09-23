"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const idGenerete_1 = require("./idGenerete");
const visibilityDropDownButton = document.querySelector("#visibilityDropDownButton");
const visibilityDropDown = document.querySelector("#visibilityDropDown");
const Public = visibilityDropDown.querySelector("li:nth-child(1)");
const Private = visibilityDropDown.querySelector("li:nth-child(2)");
const JustMe = visibilityDropDown.querySelector("li:nth-child(3)");
Public.addEventListener("click", () => {
    setVisibilityMode("Public");
    visibilityDropDown.style.display = "none";
});
Private.addEventListener("click", () => {
    setVisibilityMode("Private");
    visibilityDropDown.style.display = "none";
});
JustMe.addEventListener("click", () => {
    setVisibilityMode("Just me");
    visibilityDropDown.style.display = "none";
});
var visibilityMode = "Public";
var categoryMode = "Personal";
const categoryDropDownButton = document.querySelector("#categoryDropDownButton");
const categoryDropDown = document.querySelector("#categoryDropDown");
const buisness = categoryDropDown.querySelector("#buisness");
const personal = categoryDropDown.querySelector("#personal");
const hiring = categoryDropDown.querySelector("#hiring");
const store = categoryDropDown.querySelector("#store");
const other = categoryDropDown.querySelector("#other");
buisness.addEventListener("click", () => {
    setCategoryMode("Buisness");
    categoryDropDown.style.display = "none";
});
personal.addEventListener("click", () => {
    setCategoryMode("Personal");
    categoryDropDown.style.display = "none";
});
hiring.addEventListener("click", () => {
    setCategoryMode("Hiring");
    categoryDropDown.style.display = "none";
});
store.addEventListener("click", () => {
    setCategoryMode("Store");
    categoryDropDown.style.display = "none";
});
other.addEventListener("click", () => {
    setCategoryMode("Other");
    categoryDropDown.style.display = "none";
});
categoryDropDownButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showDropDown(categoryDropDown);
});
visibilityDropDownButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showDropDown(visibilityDropDown);
});
const editPortfolioBox = document.querySelector("#editPortfolioBox");
editPortfolioBox.addEventListener("click", () => {
    const testId = (0, idGenerete_1.portfolioRandomId)();
    window.location.href = `/studio/edit/?id=${testId}`;
});
function showDropDown(dropDown) {
    dropDown.style.display = "block";
    setTimeout(() => {
        document.addEventListener("click", function handler(event) {
            if (!dropDown.contains(event.target)) {
                dropDown.style.display = "none";
                document.removeEventListener("click", handler);
            }
        });
    }, 0);
}
function setVisibilityMode(mode) {
    visibilityMode = mode;
    let icon = visibilityDropDownButton.querySelector(".icon");
    let text = visibilityDropDownButton.querySelector("p");
    text.textContent = mode;
    //icon.className = "icon "+mode.toLowerCase();
}
function setCategoryMode(mode) {
    categoryMode = mode;
    let text = categoryDropDownButton.querySelector("p");
    text.innerText = mode;
}
//get portfolio id from url
let urlParams = new URLSearchParams(window.location.search);
let portfolioId = urlParams.get('id');
//verify if is logged in
//verify if user is owner of portfolio, if not redirect portfolio view page
