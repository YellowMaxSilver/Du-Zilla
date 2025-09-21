



export function elementRandomId(){
    return randomCharacter()+getRandomNumber(1,9999)+randomCharacter()+randomCharacter()+randomCharacter()+getRandomNumber(1,999999)+randomCharacter();
}


function randomCharacter(){
    const number:number = getRandomNumber(1,16);

    switch(number){
        case 1:
            return "a";
            break;
        case 2:
            return "b";
            break;
        case 3:
            return "c";
            break;
        case 4:
            return "d";
            break;
        case 5:
            return "e";
            break;
        case 6:
            return "f";
            break;
        case 7:
            return "g";
            break;
        case 8:
            return "h";
            break;
        case 9:
            return "i";
            break;
        case 10:
            return "j";
            break;
        case 12:
            return "k";
            break;
        case 12:
            return "l";
            break;
        case 13:
            return "m";
            break;
        case 14:
            return "n";
            break;
        case 15:
            return "o";
            break;
        case 16:
            return "p";
            break;
        case 17:
            return "q";
            break;
        case 18:
            return "r";
            break;
        case 19:
            return "s";
            break;
        case 20:
            return "t";
            break;
        case 21:
            return "u";
            break;
        case 22:
            return "v";
            break;
        case 23:
            return "w";
            break;
        case 24:
            return "x";
            break;
        case 25:
            return "y";
            break;
        case 26:
            return "z";
            break;
        default:
            return "d";
            break;
    }
}

function getRandomNumber(minNumber:number,maxNumber:number){
    const randomNumber:number = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    return randomNumber;
}