import React, {useRef, useState, useEffect} from "react";
import "../style.css"
import "./AccountSettings.css"
import { TopNavBar } from "../Widgets";
import { AccountDocument, AccountUpdate } from "../../Query/interface/accountInterface";
import { getAccountByUid, getCurrentSession, updateAccount } from "../../Query/accountQuery";
import Notification from "../Notification/Notification";


function AccountSettings(){
    const [Account,setAccount] = useState<AccountDocument|null>(null);
    const {newLoadingNotification,closeNotification, newNotification ,newSuccessNotification ,newErrorNotification, newSignNotification, newSaveChangesNotification} = Notification();

    const name = useRef<HTMLInputElement|null>(null);
    const nameId = useRef<HTMLInputElement|null>(null);
    const description = useRef<HTMLInputElement|null>(null);
    const email = useRef<HTMLInputElement|null>(null);
    
    const [itHasChanges,setChanges] = useState<boolean>(false);
    const [currentSaveChangesNotification, setSaveChangesNotification] = useState<string>("a");
    useEffect(()=>{
              const loadData = async () =>{
                  try{
                      const uid:string|null = await getCurrentSession();
                      if(!uid){
                          setAccount(null);
                          return;
                      }
                      const account:AccountDocument|null = await getAccountByUid(uid);                   
                      setAccount(account);
                  }catch(error){
                      setAccount(null);
                  }finally{
      
                  }
              }
              loadData();
    },[])
    useEffect(()=>{
      if(Account){
        if(name.current){
          name.current.value = Account.name;
        }

        if(nameId.current){
          nameId.current.value = "@"+Account.nameId;
        }

        if(description.current){
          description.current.value = Account.description ? Account.description : "";
        }

        if(email.current){
          email.current.value = Account.email;
        }
      }
    },[Account])

    useEffect(()=>{
      if(itHasChanges){
        newSaveChangesNotification(()=>{

          const loading = newLoadingNotification("Salvando mudanças");
          const reset:AccountUpdate = {
            name:name.current?.value,
            description:description.current?.value
          }

          const update = async ()=>{
            if(Account){
              try{
                const newAccount = await updateAccount(Account.uid,reset);
                console.log(newAccount);
                newSuccessNotification("Alterações salvas com sucesso ");
              }catch(error){
                console.error("Save changes: "+error);
                newErrorNotification("Error para salvar as novas informaçoes. Tente Novamente mais tarde")
              }finally{
                closeNotification(loading);
                setChanges(false)
              }
            }
          }

          update();
        
        },()=>{setChanges(false)})
      }
    },[itHasChanges])

    function readAttributesChages(){
      if(name.current?.value !== Account?.name){
        let nameValue = name.current?.value;
        setChanges(true);
        // if(nameValue == ""){
          
        // }else{
         
        // }
      }

      if(email.current?.value !== Account?.email){
        setChanges(true);
      }

      if(description.current?.value !== Account?.description){
        setChanges(true);  
      }
      
    }

    function ChangePasswordPanel(){
            const portfolioPopUpPanel = useRef<HTMLDivElement | null>(null);
            const blackFilter = useRef<HTMLDivElement | null>(null);
            
            const hiddenChangePasswordPanel = ()=>{
                  portfolioPopUpPanel.current?.classList.add("hiddenPopUpPanel");
                  blackFilter.current?.classList.add("hiddenBlackFilter");
            }
            
            const activeChangePasswordPanel = ()=>{
                  const panelElement = portfolioPopUpPanel.current;
                  const blackFilterElement = blackFilter.current;
                  if(panelElement && blackFilterElement){
                      panelElement.classList.remove("hiddenPopUpPanel");
                      blackFilterElement.classList.remove("hiddenBlackFilter");
                  }   
              }
    
            const ChangePasswordPanelElement: React.FC = () =>{
                const closeIconStyle:React.CSSProperties = {
                    width: 30,
                    height: 30,
                    position: "absolute",
                    top: 20,
                    right:20,
                }
                return(
                    <div>
                        <section className="popUpPanel hiddenPopUpPanel" ref={portfolioPopUpPanel}>
                            <div className="closeIcon" onClick={hiddenChangePasswordPanel} style={closeIconStyle}></div>
                            <div className="topTitle"><h2 className="normal_text">Change Password</h2></div>
  
                            <div className="panel">
                          
                                <div className='attribute'>
                                  <h4 className='normal_text text'>Current Password: </h4> 
                                  <input className='attributeInputText' placeholder='Current Password' type="password"/>
                                </div>

                                <div className='attribute'>
                                  <h4 className='normal_text text'>New Password:</h4> 
                                  <input className='attributeInputText' placeholder='New Password' type="password"/>
                                </div>

                                <div className='attribute'>
                                  <h4 className='normal_text text'>Verify New Password:</h4> 
                                  <input className='attributeInputText' placeholder='New Password' type="password"/>
                                </div>

                                <div className='attribute'>
                                  <div className="createPortfolioButton"><h4 className="normal_text">Update Passowrd</h4></div>
                                </div>
                            </div>    
                        </section>
                        <div className="blackFilter hiddenBlackFilter" ref={blackFilter}></div>
                    </div>
                );
            }
            return{
              activeChangePasswordPanel,
              hiddenChangePasswordPanel,
              ChangePasswordPanelElement
            }
    }

    

    const {activeChangePasswordPanel, hiddenChangePasswordPanel, ChangePasswordPanelElement} = ChangePasswordPanel();

    return(
        <div>
            <TopNavBar />
            <ChangePasswordPanelElement />
            <div className="backgroundWallpeaper"></div>
            <section className="bodyPanelStyle"></section>
            
            <div className="notificationSection" id="notificationSection"></div>

            <h1 className="sectionTitle normal_text">Informações da conta</h1>

            <section className="accountInfoSection">
                <section className="attributesSection">
                    <div className="statusBox activated">
                        <div className="icon"></div>
                        <h5 className="normal_text">Ativada</h5>
                    </div>


                    <div className="textEditBox">
                        <h4 className="normal_text">Name:</h4>
                        <input placeholder="Name" ref={name} onChange={readAttributesChages}></input>
                        <div className="icon"></div>
                    </div>

                    <div className="textEditBox inactiveTextEditBox">
                        <h4 className="normal_text">Name id:</h4>
                        <input placeholder="Name" ref={nameId} onChange={readAttributesChages} readOnly></input>
                        <div className="icon"></div>
                    </div>

                    <div className="textEditBox inactiveTextEditBox">
                        <h4 className="normal_text">Description</h4>
                        <input placeholder="Name" ref={description} onChange={readAttributesChages}></input>
                        <div className="icon"></div>
                    </div>

                    <div className="textEditBox inactiveTextEditBox">
                        <h4 className="normal_text">Email:</h4>
                        <input placeholder="Name" value={Account?.email} onChange={readAttributesChages} readOnly></input>
                        <div className="icon"></div>
                    </div>

                    <div className="textEditBox inactiveTextEditBox">
                        <h4 className="normal_text">Password:</h4>
                        <input type="password" placeholder="Name" onChange={readAttributesChages} value={"**********"} readOnly></input>
                        <div className="icon" onClick={activeChangePasswordPanel}></div>
                    </div>

                    <div className="textEditBox inactiveTextEditBox">
                        <h4 className="normal_text">CPF: </h4>
                        <input placeholder="Name" value={Account?.cpf_cnpj} readOnly></input>
                    </div>
                </section>

                <div className="accountPhotoSection">
                    <div className="photoSectionTexture"></div>
                    <div className="accountPhoto"></div>
                </div>
            
            </section>

            {/* <h1 className="sectionTitle normal_text">Preferências</h1> */}

        </div>
    )
}

export default AccountSettings