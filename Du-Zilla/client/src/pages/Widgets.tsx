import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./style.css";
import "./thunbnail.css"
import { AccountDocument } from "../Query/interface/accountInterface";
import { getAccountByUid, getCurrentSession } from "../Query/accountQuery";

import Notification from "./Notification/Notification";
interface PopUpPanelProps {
    title:string;
    Content:React.FC;
    searchPlaceholder?:string;
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
        <div className="createThunbBox">
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

interface ThunbNailProjectProps{
    title:string,
    id:string
}
export const ThunbNailProject:React.FC<ThunbNailProjectProps> = ({ title, id })=>{
    return(
        <div className="thunbNailProject">
            <div className="banner"></div>
            <div className="titleBox">
                <h4 className="normal_text">{title}</h4>
            </div>
        </div>
    )
}


export const TopNavBar:React.FC = ()=>{
    const [Account,setAccount] = useState<AccountDocument|null>(null);
    const dropDownButton = useRef<HTMLDivElement|null>(null);
    const dropDown = useRef<HTMLUListElement|null>(null);

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
                <div className="arrowDownIcon" ref={dropDownButton} onClick={showDropDown}></div>
                <ul className="accountDropDown" ref={dropDown}>
                  <li><a href="/account"><div className="dropDownIcon accountIcon"></div><h4 className="normal_text">My Account</h4></a></li>
                  <li><a href="/studio/my-projects"><div className="dropDownIcon projectsIcon"></div><h4 className="normal_text">My Projects</h4></a></li>
                  <li><a href="/notification"><div className="dropDownIcon"></div><h4 className="normal_text">Notification</h4></a></li>
                  <li><a href="/messager"><div className="dropDownIcon messagerIcon"></div><h4 className="normal_text">Messager</h4></a></li>
                  <li><a href="/settings"><div className="dropDownIcon settingsIcon"></div><h4 className="normal_text">Settings</h4></a></li>
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

    function showDropDown(){
        if(dropDown.current?.style.display == "block"){
            dropDown.current.style.display = "none";
            dropDownButton.current?.classList.remove("arrowUpIcon");
        }else{
            if(dropDown.current){
                dropDown.current.style.display = "block";
            }
            dropDownButton.current?.classList.add("arrowUpIcon");
        }
    }

    return(
        <nav className="topNav">
              <h2 className="titleIcon">Du-Zilla</h2>
              {AccountBox}
        </nav>
    )
}

export function form(){

    const formWidget = (elementId:string, formName:string,formDescription:string,userName:string|null,userNameId:string|null) => {
        return(
            <div id={elementId} className="portfolioFormBox">
                <h2 className="normal_text" id="title">{formName}</h2>
                <h3 className="formDescription normal_text" id="description">{formDescription}</h3>
                <div className="accountFormBox">
                    <div className="icon"></div>
                    <h4 className="accountName normal_text">{userName}</h4>
                    <h5 className="accountId normal_text">{userNameId}</h5>
                </div>
                <div className="attribute"> 
                    <h3 className="normal_text">Contact:</h3>
                    <input type="text" placeholder="Email or phone number"/>
                </div>
                <div className="attributeDescription">
                    <h3 className="normal_text">Description:</h3>
                    <textarea className="normal_text" placeholder="Description"></textarea>
                </div>
                <button className="submitButton normal_text">Submit</button>
                <div className="dzIcon"></div>
            </div>
        )
    }

    const notActivetedAccountFrom = (formName:string,formDescription:string,userName:string|null,userNameId:string|null) => {
        return(
            <div className="portfolioFormBox">
              <h2 className="normal_text" id="title">{formName}</h2>
              <h3 className="formDescription normal_text" id="description">{formDescription}</h3>
              <div className="notVerifiedAccount">
                  <div className="warningIcon"></div>
                  <h3 className="normal_text">Your account is not verified. Please verify your account to receive form submissions. <a>Verify Now</a></h3>
              </div>
              <div className="accountFormBox">;
                  <div className="icon"></div>
                  <h4 className="accountName normal_text">{userName}</h4>
                  <h5 className="accountId normal_text">{userNameId}</h5>
              </div>
              <div className="attribute"> 
                  <h3 className="normal_text">Contact:</h3>
                  <input type="text" placeholder="Email or phone number"/>
              </div>
              <div className="attributeDescription"><h3 className="normal_text">Description:</h3>
                <textarea className="normal_text" placeholder="Description"></textarea>
              </div>
              <div className="normal_text inactiveSubmitButton">Submit</div>
              <div className="dzIcon"></div>
              </div>
        )
    }

    const notLoggedAccountForm = (formName:string,formDescription:string) => {
        return(
            <div className="portfolioFormBox">
                <h2 className="normal_text" id="title">{formName}</h2>
                <h3 className="formDescription normal_text" id="description">{formDescription}</h3>
                <div className="formSignBox">
                    <div className="dzIcon"></div>
                    <h2 className="normal_text">Sign in Du-Zilla to snd your form</h2>
                    <div className="formSignButtons">
                        <a href="/login"><div className="signInButton normal_text">Sign In</div></a>
                        <a href="/register"><div className="signUpButton normal_text">Sign Up</div></a>
                    </div>
                </div>
            </div>
        )
    }

    const alreadySentForm = (formName:string,formDescription:string,userName:string|null,userNameId:string|null) =>{
        return(
            <div className="portfolioFormBox">
                <h2 className="normal_text" id="title">{formName}</h2>
                <h3 className="formDescription normal_text" id="description">{formDescription}</h3>
                <div style={{display:"flex",justifyContent: "center",alignItems: "center"}}>
                    <div className="successIcon"></div>
                    <h4 className="normal_text">You already sent a form</h4>
                </div>
            </div>
        )
    }

    return{
        formWidget,
        notActivetedAccountFrom,
        notLoggedAccountForm,
        alreadySentForm
    }
}


export function Spinner(attributes:string[], callback: (selected:string) => void){
    const spinnerId: string = "spn"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
    const dropDownId: string = "drd"+String(Math.floor(Math.random() * (999999999 - 10 + 1)) + 10);
    
    const showDropDown = () => {
        const dropDown = document.querySelector("#"+dropDownId) as HTMLElement;
        const button = document.querySelector("#"+spinnerId) as HTMLElement;
        
        if(dropDown && button){
            if(dropDown.style.display == "block"){
            dropDown.style.display = "none";
            }else{
            dropDown.style.display = "block";
            }
            

            document.addEventListener('click',(event)=>{
            if(!dropDown.contains(event.target as Node) && event.target !== button){
                    dropDown.style.display = "none";
                }      
            });
        }
    }
    
    const hiddenDropDown = ()=>{
        const dropDown = document.querySelector("#"+dropDownId) as HTMLElement;
        if(dropDown){
            dropDown.style.display = "none"
        }
    }
    

    const attributeSelected = (attribute:string)=>{
        hiddenDropDown();
        const currentSelectedText = document.querySelector("#curretSelectedBox"+spinnerId) as HTMLElement;
        currentSelectedText.textContent = attribute;
        callback(attribute);
    }
    return(
        <div style={{width:"50%",position:"relative"}}>
            <div className='spinnerButton'>
                <div className='icon publicIcon'></div>
                <h4 className='normal_text' id={"curretSelectedBox"+spinnerId}>{attributes[0]}</h4>
                <div className='arrowDownIcon'  id={spinnerId} onClick={showDropDown}></div>
            </div>
            <ul className='spinnerDropDown' id={dropDownId}>
                {attributes.map((attribute)=>(
                   <li onClick={()=>{attributeSelected(attribute)}}><h4 className='normal_text'>{attribute}</h4></li> 
                ))}
                {/* <li onClick={()=>{setBackgroundType("Personal")}}><h4 className='normal_text'>Personal</h4></li> */}
            </ul>
        </div>
    )
}

export function FormTabBox(formName:string,numberOfResponses:number,callback:()=> void){
    return(
        <div className='formTabBox' onClick={callback}>
            <div className='icon'></div>
            <h4 className='normal_text'>{formName}</h4>
            <div className='numberOfUsers'>
            <div className='numberOfUsersIcon'></div>
                <h4 className="normal_text">{numberOfResponses}</h4>
            </div>
        </div>  
    )
}