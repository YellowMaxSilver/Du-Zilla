import type { AccountDocument } from "../../../database/interface/accountInterface";
import { getAccount, loading, stopLoading } from "./main";
import { notification, signNotification } from "./notification";

const Account:AccountDocument|null = await getAccount();

setAttributes();

function setAttributes(){
    // const loadingId = loading();

    if(!Account){
        signNotification("Você precisa de uma conta para acessar o Menssager do DZ");
    }
}