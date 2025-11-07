import React, { useRef, useEffect, useLayoutEffect, useState} from 'react'
import "../style.css"
import "../thunbnail.css"
import "../Notification/Notification.css"
import { CreateThunbNail, FormTabBox, Spinner, ThunbNail, ThunbNailProject, TopNavBar } from '../Widgets';
import { title } from 'process';
import { createNewPortfolio, getAllPortfolios, getAllPortfoliosProjectsByUid } from '../../Query/portfolioQuery';
import { PortfolioDocument, PortfolioInput } from '../../Query/interface/portfolioInterface';
import { JsxElement } from 'typescript';
import Notification from '../Notification/Notification';
import { getCurrentSession, getAccountByUid } from '../../Query/accountQuery';
import { AccountDocument } from '../../Query/interface/accountInterface';

const TemplatePanel:React.FC = ()=>{
  return(
    <div className='thunbsLayoutInPanel'>
      
      <ThunbNail width='280px' height='150px' title='portfolio teste' description='' rateLevel={0} userTab={false}></ThunbNail>
    </div>
  )
}

const getPortfolios = async ():Promise<PortfolioDocument[]> =>{
  try{
    const Portfolios:PortfolioDocument[] = await getAllPortfolios();
    
    if(!Portfolios){
      throw new Error("thers no portfolios");
    }

    return Portfolios;
  }catch(err){
    throw new Error("Error: "+err);
  }
}

interface NotificationProps{
  icon:string,
  message:string
}

function Home() {
  const { newNotification, newSuccessNotification, newErrorNotification, newLoadingNotification, newSignNotification, closeNotification } = Notification();
  const [Account,setAccount] = useState<AccountDocument|null>(null);
  const [portfolios, setPortfolios] = useState<PortfolioDocument[]>([])
  const [ ownPortfolios, setOwnPortfolios] = useState<PortfolioDocument[]>([]);
  useEffect(()=>{
    const loadData = async ()=>{
      try{
        const tryingPortfolios = await getPortfolios();
        setPortfolios(tryingPortfolios);
      }catch(err){
        console.log("haha: "+err);
      }finally{

      }
    }

    loadData()
  },[]);
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
    const loadData =  async () => {
      try{
        if(!Account){
          return;
        }
        const portfolios:PortfolioDocument[] = await getAllPortfoliosProjectsByUid(Account.uid);

        setOwnPortfolios(portfolios);
      }catch(error){

      }finally{

      }
    }

    if(Account){
      loadData();
    }
  },[Account])

  const templatePanel = useRef<HTMLDivElement | null>(null);
  const blackFilter = useRef<HTMLDivElement | null>(null);
  const categoryDropDown = useRef<HTMLDivElement | null>(null);

  const {activeNewPortfolioPanel, hiddenNewPortfolioPanel , PopUpPanelNewPortfolios} = NewPortfolioPanel();
  const {activePortfolioPanel, hiddenPortfolioPanel, PopUpPortfolioPanel} = PortfolioPanel();
  const {activeFormPanel, hiddenFormPanel, FormPanelElment} = FormPanel();

    const hiddenTemplatePanel = ()=>{
        templatePanel.current?.classList.add("hiddenPopUpPanel");
        hiddenBlackFilter();
    }
  
    const activePopUpPanel = ()=>{
        const templatePanelElement = templatePanel.current;
        if(templatePanelElement){
            templatePanelElement.classList.remove("hiddenPopUpPanel");
            activeBlackFilter();
        }   
    }
      
    const PopUpPanelElement: React.FC = () =>{
        const closeIconStyle:React.CSSProperties = {
            width: 30,
            height: 30,
            position: "absolute",
            top: 20,
            right:20,
        }
        return(
            <div>
                <section className="popUpPanel hiddenPopUpPanel" ref={templatePanel}>
                    <div className="closeIcon" onClick={hiddenTemplatePanel} style={closeIconStyle}></div>
                    <div className="topTitle"><h2 className="normal_text">{"Portfolios"}</h2></div>
                    {/* <div className="topMenu">
                        <input className="inputSearch" type="text" placeholder={"search template"} style={{marginLeft:"20px"}}/>
                        <div className="searchButton" style={{marginLeft:"10px"}}></div>
                    </div> */}
        
                    <div className="panel">
                        <h3 className='normal_text panelTitle'>Meus Portfolios</h3>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"20px 0px"}}>
                          <div className="createThunbBox" style={{width:240,height:165}} onClick={()=>{
                            activeNewPortfolioPanel()
                          }}>
                              <div className="addIcon"></div>
                          </div>

                          <div className="thunbNailProject" onClick={()=>{
                            activePortfolioPanel()
                            }}>
                              <div className="banner"></div>
                              <div className="titleBox">
                                  <h4 className="normal_text">My Project</h4>
                              </div>
                          </div>

                          {
                            ownPortfolios.map((portfolio:PortfolioDocument)=>(
                                <div className="thunbNailProject" onClick={()=>{
                                  activePortfolioPanel()
                                  }}>
                                    <div className="banner"></div>
                                    <div className="titleBox">
                                        <h4 className="normal_text">{portfolio.name}</h4>
                                    </div>
                                </div>
                            ))
                          }

                        </div>
                    </div>    
                </section>
                <div className="blackFilter hiddenBlackFilter" ref={blackFilter}></div>
            </div>
        );
    }


    function NewPortfolioPanel(){
      var category:string = "Personal";
      const newPortfolioPanel = useRef<HTMLDivElement | null>(null);
      const blackFilter = useRef<HTMLDivElement | null>(null);
      const categoryText = useRef<any | null>(null);
      const newPortfolioTitleInput = useRef<HTMLInputElement | null>(null);
      const newPortfolioCreatePortfolioButton = useRef<HTMLDivElement | null>(null); 
      const termsOfUseCheckBox = useRef<HTMLInputElement | null>(null); 
      
      const hiddenNewPortfolioPanel = ()=>{
            newPortfolioPanel.current?.classList.add("hiddenPopUpPanel");
            blackFilter.current?.classList.add("hiddenBlackFilter");
      }
      
      const activeNewPortfolioPanel = ()=>{
            const panelElement = newPortfolioPanel.current;
            const blackFilterElement = blackFilter.current;
            if(panelElement && blackFilterElement){
                panelElement.classList.remove("hiddenPopUpPanel");
                blackFilterElement.classList.remove("hiddenBlackFilter");
            }   
      }

      const CreatePortfolio = ()=>{
        if(!Account){
          newSignNotification("Você precisa de uma conta para criar um portfólios. Crie ou entre na sua conta aqui.")
          return;
        }
        if(!newPortfolioTitleInput.current?.value){
          newErrorNotification("Titulo inválido")
          return;
        }
        if(!termsOfUseCheckBox.current?.checked){
          newErrorNotification("Para criar o portfólio você precisa cocordar com os nossos termos de uso.")
          return;
        }
        const loading = newLoadingNotification("Creating Portfolio");

        const portfolio:PortfolioInput = {
          name:newPortfolioTitleInput.current.value,
          creator:Account.uid,
          type:category,
          visibility:"just-me",
          code: "{!}{/!}",
          views: 0
        }

       
        const loadData = async () => {
          try{
            const newPortfolio:PortfolioDocument = await createNewPortfolio(portfolio);
            newSuccessNotification("Portfolio criado. Redirecionado");
          }catch(error){
            newErrorNotification("Erro para criar o portfólio. Tente novamente mais tarde.")
          }finally{
            closeNotification(loading)
          }
        }
        //loadData()
        console.log(portfolio);
        
      }



      const verifyAttributes = () => {
        if(!newPortfolioTitleInput.current?.value || !termsOfUseCheckBox.current?.checked){
          newPortfolioCreatePortfolioButton.current?.classList.add("inactiveCreatePortfolioButton")
        }else{
          newPortfolioCreatePortfolioButton.current?.classList.remove("inactiveCreatePortfolioButton");
        }
      }

      const PopUpPanelNewPortfolios: React.FC = () =>{
          const closeIconStyle:React.CSSProperties = {
              width: 30,
              height: 30,
              position: "absolute",
              top: 20,
              right:20,
          }
          return(
              <div>
                  <section className="popUpPanel hiddenPopUpPanel" ref={newPortfolioPanel}>
                      <div className="closeIcon" onClick={hiddenNewPortfolioPanel} style={closeIconStyle}></div>
                      <div className="topTitle"><h2 className="normal_text">Novo Portfolio</h2></div>

                      <div className="panel">
                          <div className='attribute'>
                            <h3 className='normal_text text'>Title</h3> 
                            <input className='attributeInputText' placeholder='Portfolio Title' ref={newPortfolioTitleInput} onChange={verifyAttributes}/>
                          </div>

                          <div className='attribute'>
                            <h3 className='normal_text text'>Category</h3> 
                            {Spinner(["Personal","Professional","Store","Other"],(selected)=>{
                                category = selected;
                            })}
                          </div>

                          <div className='attribute'>
                            <div style={{display:"flex",alignItems:"center"}}>
                              <input type='checkbox' ref={termsOfUseCheckBox} onChange={verifyAttributes}/>
                              <h5 className='normal_text'>Eu li e concordo com os termos de uso da plataforma para criar meu portfólio.</h5>
                            </div>
                          </div>

                          <div className='createPortfolioButton inactiveCreatePortfolioButton' onClick={CreatePortfolio} ref={newPortfolioCreatePortfolioButton}>
                            <h4 className='normal_text'>
                              Create and Edit Portfolio
                            </h4>
                          </div>
                      </div>    
                  </section>
                  <div className="blackFilter hiddenBlackFilter" ref={blackFilter}></div>
              </div>
          );
      }

      return{
        activeNewPortfolioPanel,
        hiddenNewPortfolioPanel,
        PopUpPanelNewPortfolios
      }
    }  

    function PortfolioPanel(){
        const portfolioPopUpPanel = useRef<HTMLDivElement | null>(null);
        
        const hiddenPortfolioPanel = ()=>{
              portfolioPopUpPanel.current?.classList.add("hiddenPopUpPanel");
              hiddenBlackFilter();
        }
        
        const activePortfolioPanel = ()=>{
              const panelElement = portfolioPopUpPanel.current;
              activeBlackFilter();
              if(panelElement){
                  panelElement.classList.remove("hiddenPopUpPanel");
              }   
          }

        const PopUpPortfolioPanel: React.FC = () =>{
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
                        <div className="closeIcon" onClick={hiddenPortfolioPanel} style={closeIconStyle}></div>
                        <div className="topTitle"><h2 className="normal_text">Portfolio Name</h2></div>

                        <div className='attribute'>
                              <div className='createPortfolioButton inactiveCreatePortfolioButton'>
                                <h4 className='normal_text'>
                                  Save Changes
                                </h4>
                              </div>
                        </div>
                        <div className="panel">
                      
                            <div className='attribute'>
                              <div className='portfolioPreview'></div>
                            </div>
                            
                            <div className='attribute'>
                              <div className='createPortfolioButton' onClick={()=>{window.location.href = "./studio/portfolio/editor?id=faca12345"}}>
                                <h4 className='normal_text'>
                                  Edit Portfolio
                                </h4>
                              </div>
                            </div>

                            <div className='attribute'>
                              {FormTabBox("form name",0,()=>{activeFormPanel()})}
                            </div>


                            <div className='attribute'>
                              <h3 className='normal_text text'>Visibility</h3> 
                              <div className='spinnerButton'>
                                <div className='icon publicIcon'></div>
                                <h4 className='normal_text'>Public</h4>
                                <div className='arrowDownIcon'></div>
                              </div>
                            </div>

                            <div className='attribute'>
                              <h3 className='normal_text text'>Title</h3> 
                              <input className='attributeInputText' placeholder='Portfolio Title'/>
                            </div>

                            <div className='attribute'>
                              <h3 className='normal_text text'>Description</h3> 
                              <textarea className='normal_text'  placeholder='Portfolio Description'/>
                            </div>

                            <div className='attribute'>
                              <h3 className='normal_text text'>Category</h3> 
                              <div className='spinnerButton'>
                                <div className='icon publicIcon'></div>
                                <h4 className='normal_text'>Category</h4>
                                <div className='arrowDownIcon'></div>
                              </div>
                            </div>

                            <div className='deletePortfolioButton'>
                              <h4 className='normal_text'>
                                Delete Portfolio
                              </h4>
                            </div>
                        </div>    
                    </section>
                    <div className="blackFilter hiddenBlackFilter" ref={blackFilter}></div>
                </div>
            );
        }
        return{
          activePortfolioPanel,
          hiddenPortfolioPanel,
          PopUpPortfolioPanel
        }
    }
    
    function FormPanel(){
        const portfolioPopUpPanel = useRef<HTMLDivElement | null>(null);
        
        const hiddenFormPanel = ()=>{
          hiddenBlackFilter();
          portfolioPopUpPanel.current?.classList.add("hiddenPopUpPanel");
        }
        
        const activeFormPanel = ()=>{
              const panelElement = portfolioPopUpPanel.current;
              if(panelElement){
                  activeBlackFilter();
                  panelElement.classList.remove("hiddenPopUpPanel");
              }   
          }

        const FormPanelElment: React.FC = () =>{
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
                        <div className="closeIcon" onClick={hiddenFormPanel} style={closeIconStyle}></div>
                        <div className="topTitle"><h2 className="normal_text">Form Name</h2></div>

                        <div className='attribute'>
                              {FormTabBox("form name",2,()=>{})}
                        </div>

                        <div className='attribute'>
                          <h4 className='normal_text text'>Título: </h4> 
                          <input className='attributeInputText' placeholder='Título'/>
                        </div>
                        <div className='attribute'>
                          <h4 className='normal_text text'>Descrição: </h4> 
                          <textarea className='attributeInputText' placeholder='Descrição'/>
                        </div>    
                        <div className="panel" style={{height:"calc(50%)"}}>
                          {/* <div className='attribute'>
                            <div className='notFoundIcon'></div>
                            <h4 className='normal_text'>Ainda não há nenhuma resposta</h4>
                          </div> */}

                          <div className='formResponseBox'>
                              <div className='userTab'>
                                <div className='userIcon'></div>
                                <h4 className='normal_text'>User Name</h4>
                                <h5 className='normal_text'>@userNameId</h5>
                                <div className='seeProfileButton'>See Profile</div>
                              </div>
                              <div className='subAttribute'>
                                <h4 className='normal_text'>Contato: </h4>
                                <input className='normal_text' value={"hello@gmail.com"} readOnly></input>
                              </div>
                              <div className='subAttribute'>
                                <h4 className='normal_text'>Descrição: </h4>
                                <textarea className='normal_text' value={"what about this one?"} readOnly/>
                              </div>
                              <div className='subAttribute'>
                                <div className='createPortfolioButton'><h4 className='normal_text'>Conversar</h4></div>
                              </div>
                          </div>

                        </div>    
                    </section>
                </div>
            );
        }
        return{
          activeFormPanel,
          hiddenFormPanel,
          FormPanelElment
        }
    }
  
    const activeBlackFilter = ()=>{
      const blackFilterElement = blackFilter.current;
      if(blackFilterElement){
        blackFilterElement.classList.remove("hiddenBlackFilter");
        console.log("Ok")
      }else{
        console.log("something wrong")
      }
    }

    const hiddenBlackFilter = ()=>{
      blackFilter.current?.classList.add("hiddenBlackFilter");
    }

  return (
    <div>
    <title>Du-Zilla</title>
    <TopNavBar />
    <div className='notificationSection' id='notificationSection'></div>
    <PopUpPanelElement />
    <PopUpPanelNewPortfolios />
    <PopUpPortfolioPanel />
    <FormPanelElment/>
    <div className="blackFilter hiddenBlackFilter" ref={blackFilter}></div>

    <section className="globalBox searchSection">
        <div>
            <div style={{display: "flex",justifyContent: "center",alignItems: "center",height: "50px",marginTop: "40px",marginBottom: "40px"}}><h1 className="title">Du-Zilla</h1></div>
            <div style={{display: "flex"}}>
              <input id="search" className="inputSearch" type="text" placeholder="Pesquisar"/>
              <div id="searchButton" className="searchButton" style={{marginLeft: "10px"}} onClick={()=>{newSignNotification("Welcome back, hello")}}></div>
            </div>

            <div style={{display: "flex",justifyContent: "center",alignItems: "center",width: "100%",marginTop: "5%"}}>
              <div className="createOwnButton" id="createOwnButton" onClick={activePopUpPanel}><h3 className="normal_text">Criar Novo Portfolio</h3></div>
            </div>

          <div className="signButtonsBox">
            <a href="login"><div className="signInButton"><h4 className="normal_text">Sign in</h4></div></a>
            <a href="signUp"><div className="signUpButton"><h4 className="normal_text">Sign Up</h4></div></a>
          </div>
        </div>
        <h6 className='normal_text' style={{position:"absolute",bottom:20,right:20,color:"gray"}}>Du-Zilla V Alpha</h6>
    </section>

    <section className="thunbsSection" id="portfoliosThunbNails" style={{marginTop: "40px"}}>
    {
      portfolios.map( (portfolio:PortfolioDocument) =>(
        <div key={String(portfolio._id)}>
        { }
        <a href={"/portfolio?id="+portfolio._id}>
        <ThunbNail
         width='380px' height='280px'
         title={portfolio.name} userUid={portfolio.creator} rateLevel={0} userTab={true}
        />
        </a>
        </div>
      ))
    }
    </section>
    </div>
  )
}


export default Home;
