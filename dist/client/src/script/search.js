"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("./notification");
var search;
function getQuery() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const query = params.get("q");
    //console.log(params+"<- "+query+" ->"+queryString)
    if (query != '' && query != null) {
        search = query;
        setAttributes();
    }
    else {
        (0, notification_1.notification)("", "not found query");
    }
}
function setAttributes() {
    const searchInput = document.getElementById("searchInput");
    const resultText = document.getElementById("resultText");
    //setting
    resultText.innerText = `Results Of "${search}":`;
    searchInput.value = search;
}
getQuery();
