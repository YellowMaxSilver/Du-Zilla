import compilerToString from "./compiler";

let mainView = document.getElementById("preview") as HTMLElement;

class Text{
    constructor(text:string,
        size:number,
        color:string,
        positionX:number,
        positionY:number,
        width:number,
        height:number){

        let htmlEdit:string = `<h1 id="123456" style="position:absolute;top:0;left:0;
        margin-left:${positionX}px;
        margin-top:${positionY}px;
        font-size:${size}px;">${text}</h1>`;
        mainView.innerHTML += htmlEdit;

        const element = document.getElementById("123456") as HTMLElement;

        element.addEventListener("mouseover",()=>{
            element.style = "border: 2px solid green";
        })
    }
}

//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{width}{height}{/!}

const mainTemplate:string = "{!}{text}{hello World}{30}{#00000}{100}{200}{100}{100}{/!}{!}{text}{hello World again}{30}{#00000}{100}{200}{100}{100}{/!}";

var widgets:string[][] = compilerToString(mainTemplate);

new Text("hello",52,"#ffff",100,120,120,120);
console.log(widgets)