import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./style.css";
import "./thunbnail.css"
import { AccountDocument } from "../Query/interface/accountInterface";
import { getAccountByUid, getCurrentSession } from "../Query/accountQuery";

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

interface ThunbNailProps {
    width:string,
    height:string
    title:string,
    description?:string,
    userUid?:string
    rateLevel:number,
    userTab:boolean
}

interface CreateThunbNailProps{
    width:string,
    height:string
}
export const CreateThunbNail:React.FC<CreateThunbNailProps> = ({ width, height })=>{
    return(
        <div className="createThunbBox" style={{width:width,height:height}}>
            <div className="addIcon"></div>
        </div>
    );
}

export const ThunbNail:React.FC<ThunbNailProps> = ({width,height, title, description, userUid, rateLevel, userTab})=>{
    const [userName,setName] = useState<string|null>(null);
    const [userNameId, setNameId] = useState<string|null>(null);

    const mainBoxStyle:React.CSSProperties = {
        width:width,
        height:height
    }   
    useEffect(()=>{
        const loadData = async ()=>{
            try{
                if(!userUid){
                    console.log("null user uid")
                    return;
                }
                const account:AccountDocument = await getAccountByUid(userUid);
                setName(account.name) 
                setNameId(account.nameId)
            }catch(error){
                console.error("load account: "+error);
            }finally{

            }
        }
        loadData();
    },[])

    let userTabElement;
    if(userTab){
        userTabElement = (
            <div className="thunbUserBox">
                    <div className="userIcon" style={{width:30,height:30,borderRadius:30}}></div>
                    <h5 className="normal_text">{userName}</h5>
                    <div className="rateBox">
                        <div className="emptyStarRate"></div>
                        <div className="emptyStarRate"></div>
                        <div className="emptyStarRate"></div>
                        <div className="emptyStarRate"></div>
                        <div className="emptyStarRate"></div>
                    </div>
                    </div>
        );
    }else{
        userTabElement = ""
    }

    return(
        <div className="thunbMainBox" style={mainBoxStyle}>
          <div className='thunbBanner' style={{backgroundImage: "url('../images/image-icon.jpg')"}}></div>      
            <div className="thunbInfoBox">
                <div className="thunbTitleBox">
                  <div style={{width:"90%",marginLeft: 20}}><h4 className="normal_text">{title}</h4></div>  
                </div>
                {userTabElement}
            </div>   
        </div>
    );
}


export const TopNavBar:React.FC = ()=>{
    const [Account,setAccount] = useState<AccountDocument|null>();

    useEffect(()=>{
        const loadData = async () =>{
            try{
                const uid:string|null = await getCurrentSession();
                if(!uid){
                    setAccount(null);
                    return;
                }
                const account:AccountDocument = await getAccountByUid(uid);
                setAccount(account);
            }catch(error){
                setAccount(null);
            }finally{

            }
        }
        loadData();
    },[])


    useEffect(()=>{
        if(!Account){
            setAccountBox(
              <div className="signButtonsBox" id="notLogedBox">  
                  <a href="login"><div className="signInButton"><h4 className="normal_text">Sign in</h4></div></a>
                  <a href="register"><div className="signUpButton"><h4 className="normal_text">Sign Up</h4></div></a>
              </div>
            )
        }else{
            setAccountBox(
            <div className="accountBox">        
                <div className="icon"></div>
                <p className="normal_text" id="accountName">{Account?.name}</p>
                <div className="arrowDownIcon" id="accountDropDownButton"></div>
                <ul className="accountDropDown" id="accountDropDown">
                  <li><a href="/account"><div className="dropDownIcon accountIcon"></div><h4 className="normal_text">My Account</h4></a></li>
                  <li><a href="/studio/my-projects"><div className="dropDownIcon projectsIcon"></div><h4 className="normal_text">My Projects</h4></a></li>
                  <li><a href="/notification"><div className="dropDownIcon notificationIcon"></div><h4 className="normal_text">Notification</h4></a></li>
                  <li><a href="/messager"><div className="dropDownIcon messagerIcon"></div><h4 className="normal_text">Messager</h4></a></li>
                  <li><a href="/account/settings"><div className="dropDownIcon settingsIcon"></div><h4 className="normal_text">Settings</h4></a></li>
                  <li><a href="/help"><div className="dropDownIcon helpIcon"></div><h4 className="normal_text">Help</h4></a></li>
                  <li><a href="/logout"><div className="dropDownIcon helpIcon"></div><h4 className="normal_text">Log out</h4></a></li>
                </ul>
             </div>
            )
        }
        console.log("Thats Account: ",Account);
    },[Account])

    const [AccountBox,setAccountBox] = useState(
        <div className="loadingBox" id="loadingBox"><div className="loadingIcon3"></div></div>
    );

    return(
        <nav className="topNav">
              <h2 className="titleIcon">Du-Zilla</h2>
              {AccountBox}
        </nav>
    )
}