//

//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{width}{height}{/!}

const mainTemplate:string = "{!}{text}{hello World}{30}{#00000}{100}{200}{100}{100}{/!}{!}{text}{hello World again}{30}{#00000}{100}{200}{100}{100}{/!}";

//compiler

let startOfElement:number|null = null;
let endOfElement:number|null = null;


compiler(mainTemplate);

function compiler(template:string){
for(let i = 0;i < template.length;i++){
        let potion = template.charAt(i);

        if(potion == '{' && template.charAt(i+1) == '!' && template.charAt(i+2) == '}'){
            //is an new element
            startOfElement = i+3;
        }

        if(potion == '{' && template.charAt(i+1) == '/' && template.charAt(i+2) == '!' && template.charAt(i+3) == '}'){
            //is an new element
            endOfElement = i;
        }
        if(startOfElement != null && endOfElement != null){
            let element:string = ""
            for(let l = startOfElement;l< endOfElement;l++){
                element = element+template.charAt(l);
            }
            readElement(element)
            startOfElement = null;endOfElement = null;
        }
    }
}

function readElement(element:string){
    let tag:string|undefined = getTagOfElement(element);

    console.log(tag);
    
    switch(tag){
        case "text":
            //1 text
            //2 size
            //3 color
            //4 positionX
            //5 positionY
            //6 width
            //7 height
            getValuesOfElements(element,(attributes:string[])=>{
                console.log(attributes)
            });
            break;
        case "box":
            break;
    }
}


type ValuesOfElement = (attributes:string[]) => void;

function getTagOfElement(element:string){
    let startOfTag:number|null = null;
    let endOfTag:number|null = null;
    for(let i = 0;i < element.length ;i++){
        if(element.charAt(i) == '{'){
            startOfTag = i+1;
        }
        if(element.charAt(i) == '}'){
            endOfTag = i;
        }

        if(startOfTag != null && endOfTag != null){
            let value:string = "";
            for(let l = startOfTag;l < endOfTag;l++){
                value += element.charAt(l);
            }
            return value;
        }
    }
}

function getValuesOfElements(element:string,callback:ValuesOfElement){
    let startOfValue:number|null = null;
    let endOfValue:number|null = null;

    let field:string[] = [];

    let numberOfField:number = 1;

    for(let i = 0;i< element.length;i++){
        if(element.charAt(i) == '{'){
            startOfValue = i+1;
        }

        if(element.charAt(i) == '}'){
            endOfValue = i;
        }

        if(startOfValue != null && endOfValue != null){
            let thisValue:string = "";
            for(let l = startOfValue;l < endOfValue;l++){
                thisValue += element.charAt(l);
            }
            numberOfField ++;
            field.push(thisValue);
            startOfValue = null;endOfValue = null;
        }
    }

    callback(field)
}

function convertToTextHtml(){

}