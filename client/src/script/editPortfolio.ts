//

//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{/!}

const mainTemplate:string = "{!}{text}{hello World}{30}{#00000}{100}{200}{/!}{!}{text}{hello World again}{30}{#00000}{100}{200}{/!}";

//compiler

let startOfElement:number|null = null;
let endOfElement:number|null = null;


compiler(mainTemplate);

export default function compiler(template:string){
for(let i = 0;i < template.length;i++){
        let potion = template.charAt(i);
        let secondPotion = template.charAt(i);

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
            getValuesOfElements(element, (firstField,secondField,thirdField,forthField,fivthField)=>{})
            break;
        case "box":
            break;
    }
}


type ValuesOfElement = (firstField:string|null,secondField:string|null,
    thirdField:string|null,forthFiled:string|null,fivthField:string|null) => void;

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

function getValuesOfElements(element:string, callback: ValuesOfElement){
    let startOfValue:number|null = null;
    let endOfValue:number|null = null;

    let firstField:string|null = null;
    let secondField:string|null = null;
    let thirdField:string|null = null;
    let forthField:string|null = null;
    let fivthField:string|null = null;

    let numberOfField:number = 1;

    for(let i = 0;i< element.length;i++){
        if(element.charAt(i) == '{'){
            startOfValue = i;
        }

        if(element.charAt(i) == '}'){
            endOfValue = i;
        }

        if(startOfValue != null && endOfValue != null){
            let thisValue:string = "";
            for(let l = startOfValue;l < endOfValue;i++){
                thisValue += element.charAt(l);
            }
            switch (numberOfField){
                case 1:
                    firstField = thisValue
                    break;
                case 2:
                    secondField = thisValue
                    break;
                case 3:
                    thirdField = thisValue
                    break;
                case 4:
                    forthField = thisValue
                    break;
                case 5:
                    fivthField = thisValue
                    break;
            }
            numberOfField ++;
            startOfValue = null;endOfElement = null;
        }
    }

    callback(firstField,secondField,thirdField,forthField,fivthField);
}