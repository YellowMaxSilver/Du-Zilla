import { notification } from "./notification";

var search:string;


function getQuery(){
    const queryString:string = window.location.search;

    const params = new URLSearchParams(queryString);

    const query:string | null = params.get("q");

    //console.log(params+"<- "+query+" ->"+queryString)
    
    if(query != '' && query != null){
        search = query;
        setAttributes();
    }else{
       notification("","not found query");
    }
}

function setAttributes(){
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    const resultText = document.getElementById("resultText") as HTMLElement;

    //setting
    resultText.innerText = `Results Of "${search}":`;
    searchInput.value = search;
}

getQuery()