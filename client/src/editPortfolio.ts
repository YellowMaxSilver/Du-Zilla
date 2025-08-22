//

//{!}{text(element)}{text}{size}{color}{positionX}{positionY}{/!}

const template:string = "{!}{text}{hello World}{30}{#00000}{100}{200}{/!}";

//compiler

let startOfElement = 0;
let endOfElement = 0;

let fondStartOfElement:boolean;

for(let i = 0;i < template.length;i++){
    let potion = template.charAt(i);
    let secondPotion = template.charAt(i);

    if(potion == '{' && template.charAt(i+1) == '!' && template.charAt(i+2) == '}'){
        //is an new element
        startOfElement = i+3;
    }

    if(potion == '{' && template.charAt(i+1) == '/' && template.charAt(i+2) == '!' && template.charAt(i+3) == '}'){
        //is an new element
        endOfElement = i+4;
    }
}