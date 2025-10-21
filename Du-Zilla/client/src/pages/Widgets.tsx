import React, { ReactElement, useEffect, useRef } from "react";
import "./style.css";

interface PopUpPanelProps {
    title:string;
    Content:React.FC;
    searchPlaceholder?:string;
}

export function PopUpPanel(){

    const templatePanel = useRef<HTMLDivElement | null>(null);
    const blackFilter = useRef<HTMLDivElement | null>(null);

    const hiddenTemplatePanel = ()=>{
        templatePanel.current?.classList.add("hiddenPopUpPanel");
        blackFilter.current?.classList.add("hiddenBlackFilter");
    }

    const activePopUpPanel = ()=>{
        const templatePanelElement = templatePanel.current;
        const blackFilterElement = blackFilter.current;

        if(templatePanelElement && blackFilterElement){
            templatePanelElement.classList.remove("hiddenPopUpPanel");
            blackFilterElement.classList.remove("hiddenBlackFilter");
        }   
    }

    const PopUpPanelElement: React.FC<PopUpPanelProps> = ({ title, Content, searchPlaceholder }) =>{
        const closeIconStyle:React.CSSProperties = {
            width: 30,
            height: 30,
            position: "absolute",
            top: 20,
            right:20,
        }
        if(!searchPlaceholder){
            searchPlaceholder = "Search";
        }
        return(
            <div>
                <section className="popUpPanel hiddenPopUpPanel" ref={templatePanel}>
                    <div className="closeIcon" onClick={hiddenTemplatePanel} style={closeIconStyle}></div>
                    <div className="topTitle"><h2 className="normal_text">{title}</h2></div>
                    <div className="topMenu">
                        <input className="inputSearch" type="text" placeholder={searchPlaceholder} style={{marginLeft:"20px"}}/>
                        <div className="searchButton" style={{marginLeft:"10px"}} ></div>
                    </div>
        
                    <div className="panel">
                        <Content></Content>
                    </div>    
                </section>
                <div className="blackFilter hiddenBlackFilter" ref={blackFilter}></div>
            </div>
        );
    }

    return{
        activePopUpPanel,
        PopUpPanelElement
    }
}