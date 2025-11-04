import React, { useEffect, useState } from "react";
import { TopNavBar } from "../Widgets";
import "./PortfolioView.css"
import { JsxElement } from "typescript";
import { verifyIfAlreadySentADataToForm } from "../../Query/formQuery";
import { PortfolioDocument } from "../../Query/interface/portfolioInterface";
import { getPortfolioById } from "../../Query/portfolioQuery";
import Notification from "../Notification/Notification";
import { compilerToString } from "../compiler";


function PortfolioView(){
    const {newNotification, newSuccessNotification, newErrorNotification, newLoadingNotification} = Notification();
    const [Main, setMain] = useState<JSX.Element[]>([]);

    class Widget {
        constructor(
            widgetType: string,
            argument1: any,
            argument2: any|null,
            argument3: any|null,
            argument4: any|null,
            argument5: any|null,
            argument6: any|null,
            argument7: any|null,
        ) {

            let elementId: string = "Wdg"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
            
            //text, image, video, audio, button, divider, spacer, social media icons
            switch(widgetType){
                case "text":
                    //text -->
                    //argument1 = text
                    //argument2 = font size
                    //argument3 = color
                    //argument4 = alignment
                    //argument5 = weight
                    //argument6 = font style
                    //argument7 = font family
                    //argument8 = width
                    //argument9 = height

                    const text = argument1;
                    const fontSize = argument2;
                    const color = argument3;
                    const algn = argument4;
                    const weight = argument5;
                    const fontStyle = argument6;
                    const fontFamily = argument7;

                    const widgetStyle:React.CSSProperties = {
                        fontSize:fontSize,
                        color:color,
                        textAlign:algn,
                        fontWeight:weight,
                        fontStyle:fontStyle,
                        fontFamily:fontFamily,
                        width:"auto",
                        height:"auto",
                    }

                    const widgetElement:JSX.Element = (
                        <h1 style={widgetStyle} id={elementId} key={elementId}>
                            {text}
                        </h1>
                    )

                    setMain((prevItens)=>[...prevItens,widgetElement]);
                break;
                case "form":
                    //form -->
                    //argument1 = formId
                    //argument2 = formName
                    //argument3 = formDescription


                    //=====> normal form
                    //====> not verified account form

                    //mainView.insertAdjacentHTML();
                    (async () => {
                        // if(Account){
                        //     const alreadySent = await verifyIfAlreadySentADataToForm(Account.uid,argument1);
                        //     console.log(alreadySent);
                        //     if (!alreadySent) {
                        //         if(Account.activated){
                        //             mainView.insertAdjacentElement('beforeend', await form(argument1, argument2, argument3));
                        //         }else{
                        //             mainView.insertAdjacentElement('beforeend',await accountNotActvatedForm(argument2,argument3));
                        //         }
                        //     } else {
                        //         mainView.insertAdjacentElement('beforeend', alreadySentDataToForm(argument2, argument3));
                        //     }
                        // }else{
                        //     mainView.insertAdjacentElement('beforeend', await notLogedForm());
                        // }
                    })();
                break;
            }   
        }
    }

    const [Portfolio, setPortfolio] = useState<PortfolioDocument|null>();
    const params = new URLSearchParams(window.location.search);
    const portfolioId = params.get('id');

    useEffect(()=>{
        setMain([])
        const code = Portfolio?.code;
        if(!code){
            return;
        }

        let elements:string[][] = compilerToString(code);
        for(let i = 0;i < elements.length;i++){
            let thisElement = elements[i];
            new Widget(thisElement[0],thisElement[1],thisElement[2],thisElement[3],thisElement[4],thisElement[5],thisElement[6],thisElement[7]);
        }
    },[Portfolio])

    useEffect(()=>{
        console.log("portfolioId",portfolioId);
        const loadPortfolio = async ()=>{
            try{
                if(!portfolioId){
                    return;
                }
                const wPortfolio:PortfolioDocument = await getPortfolioById(portfolioId);

                setPortfolio(wPortfolio)
            }catch(err){
                console.error(err)
                newErrorNotification("Error to load portfolio. try again later.")
            }finally{

            }
        }
        
        loadPortfolio();
        
    },[])

    

    return (
    <div>
        <TopNavBar/>  
        <div className="notificationSection" id="notificationSection"></div>  
        <div className="infoAboutBox">
            <div className="userIcon"></div>
            <h4 className="normal_text">Account Name</h4>
            <div className="dropDownButton"></div>
        </div>

        <div id="main" className="main">
            {Main}
        </div>
    </div>);
}

export default PortfolioView;