import React, { useRef, useEffect, useLayoutEffect, useState} from 'react'
import "../style.css"
import "../thunbnail.css"
import "../Notification/Notification.css"
import { CreateThunbNail, FormTabBox, Spinner, ThunbNail, ThunbNailProject, TopNavBar } from '../Widgets';
import { title } from 'process';
import { createNewPortfolio, getAllPortfolios, getAllPortfoliosProjectsByUid, updatePortfolio } from '../../Query/portfolioQuery';
import { PortfolioDocument, PortfolioDocumentUpdate, PortfolioInput } from '../../Query/interface/portfolioInterface';
import { JsxElement } from 'typescript';
import Notification from '../Notification/Notification';
import { getCurrentSession, getAccountByUid } from '../../Query/accountQuery';
import { AccountDocument } from '../../Query/interface/accountInterface';
import { ObjectId } from 'mongodb';
import PortfolioEditor from '../PortfolioEditor/PortfolioEditor';
import { FormDataDocument, FormDocument, FormUpdate } from '../../Query/interface/formInterface';
import { getFormDataByFormId, getformsbyportfolioid, updateForm } from '../../Query/formQuery';

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
  const { newSaveChangesNotification,newNotification, newSuccessNotification, newErrorNotification, newLoadingNotification, newSignNotification, closeNotification } = Notification();
  const [Account,setAccount] = useState<AccountDocument|null>(null);
  const [portfolios, setPortfolios] = useState<PortfolioDocument[]>([])
  const [ ownPortfolios, setOwnPortfolios] = useState<PortfolioDocument[]>([]);

  const loadingPopUp = useRef<HTMLDivElement|null>(null);
  const renderedErrorPopUp = useRef<HTMLDivElement|null>(null);
  const portfolioPopUpPanel = useRef<HTMLDivElement | null>(null);
  const formPanel = useRef<HTMLDivElement | null>(null);
  const projectsPanel = useRef<HTMLDivElement | null>(null);

  const [PortfolioPanelVisibility, setPortfolioPanelVisibility] = useState<boolean>(false);
  const [formPanelVisibility, setFormPanelVisibility] = useState<boolean>(false);
  const [ProjectsPanelVisibility, setProjectsPanelVisibility] = useState<boolean>(false);

  const [portfolioOfPortfolioPanel, setPortfolioOfPortfolioPanel] = useState<PortfolioDocument>();
  const [currentFormOfFormPanel, setCurrentFormOfFormPanel] = useState<FormDocument>();

  useEffect(()=>{
    const loadData = async ()=>{
      try{
        const tryingPortfolios = await getPortfolios();
        setPortfolios(tryingPortfolios);
      }catch(err){
        newErrorNotification("Erro no servidor. Tente novamente mais tarde.")
        if (renderedErrorPopUp.current) renderedErrorPopUp.current.style.display = "flex";
      }finally{
        if (loadingPopUp.current) loadingPopUp.current.style.display = "none";
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

  useEffect(()=>{
    if(PortfolioPanelVisibility){
      if(portfolioPopUpPanel.current) portfolioPopUpPanel.current.style.left = "0";
      activeBlackFilter();
    }else{
      if(portfolioPopUpPanel.current) portfolioPopUpPanel.current.style.left = "-50vw";
      hiddenBlackFilter();
    }
  },[PortfolioPanelVisibility])

  useEffect(()=>{
    if(formPanelVisibility){
      if(formPanel.current) formPanel.current.style.left = "0";
      activeBlackFilter();
    }else{
      if(formPanel.current) formPanel.current.style.left = "-50vw";
      hiddenBlackFilter();
    }
  },[formPanelVisibility])

  useEffect(()=>{
    if(ProjectsPanelVisibility){
      if(projectsPanel.current) projectsPanel.current.style.left = "0";
      activeBlackFilter();
    }else{
      if(projectsPanel.current) projectsPanel.current.style.left = "-50vw";
      hiddenBlackFilter();
    }
  },[ProjectsPanelVisibility])

  const templatePanel = useRef<HTMLDivElement | null>(null);
  const blackFilter = useRef<HTMLDivElement | null>(null);
  const categoryDropDown = useRef<HTMLDivElement | null>(null);

    const {activeNewPortfolioPanel, hiddenNewPortfolioPanel , PopUpPanelNewPortfolios} = NewPortfolioPanel();


    const ProjectsPanel: React.FC = () =>{
        const visibility = ProjectsPanelVisibility ? showStyle : hiddenStyle;
        return(
            <div>
                <section className="popUpPanel hiddenPopUpPanel" style={visibility} ref={projectsPanel}>
                    <div className="closeIcon panelCloseButton" onClick={()=>{setProjectsPanelVisibility(false)}}></div>
                    <div className="topTitle"><h2 className="normal_text">{"Portfolios"}</h2></div>
        
                    <div className="panel">
                        <h3 className='normal_text panelTitle'>Meus Portfolios</h3>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"20px 0px"}}>
                          <div className="createThunbBox" style={{width:240,height:165}} onClick={()=>{
                            activeNewPortfolioPanel()
                          }}>
                              <div className="addIcon"></div>
                          </div>

                          <div className="thunbNailProject" onClick={()=>{
                            setPortfolioPanelVisibility(true)
                            }}>
                              <div className="banner"></div>
                              <div className="titleBox">
                                  <h4 className="normal_text">My Project</h4>
                              </div>
                          </div>

                          {
                            ownPortfolios.map((portfolio:PortfolioDocument)=>(
                                <div className="thunbNailProject" onClick={()=>{
                                  setPortfolioOfPortfolioPanel(portfolio)
                                  setPortfolioPanelVisibility(true)
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
                            {Spinner(["Personal","Professional","Store","Other"],0,(selected)=>{
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

    const showStyle = {
      left: 0
    }

    const hiddenStyle = {
      left: "-50vw",
      transition: "0.5s"
    }    

    const PortfolioPanel: React.FC = () =>{
        const title = useRef<HTMLInputElement|null>(null);
        const description =  useRef<HTMLTextAreaElement|null>(null);
        const saveChangesButton = useRef<HTMLDivElement|null>(null);

        const [numberOfVisibility, setNumberOfVisibility] = useState<number>(0)
        const [formElement, setFormElement] = useState<any>(<div className='attribute'>
                <div className='notFoundIcon'></div>
                <h4 className='normal_text'>Você ainda não criou nenhum Formulário neste Portfolio</h4>
              </div>);

        useEffect(()=>{
        
          if(portfolioOfPortfolioPanel){
          
            const loadForms = async () => {
                try{
                  const portfolioForms:FormDocument[]|null = await getformsbyportfolioid(String(portfolioOfPortfolioPanel._id));
                  console.log("forms: ",portfolioForms);
                  if(portfolioForms){
                    convertFormsToElement(portfolioForms)
                  }else{
                    
                  }
                }catch(error){
                  
                }
            }
            loadForms();

            if(portfolioOfPortfolioPanel.visibility === "Public"){
              setNumberOfVisibility(0)
            }else if(portfolioOfPortfolioPanel.visibility === "Private"){
              setNumberOfVisibility(1)
            }else{
              setNumberOfVisibility(2)
            }
          }
          
        },[portfolioOfPortfolioPanel,PortfolioPanelVisibility])

        const convertFormsToElement = (forms:FormDocument[])=>{
          if(forms && forms.length > 0){
            setFormElement(forms.map((form)=>(
              <div className='attribute' key={"form"+form._id}>
                {FormTabBox(form.name,0,()=>{
                  setFormPanelVisibility(true)
                  setCurrentFormOfFormPanel(form);
                  })}
              </div>
            )))
          }else{
            setFormElement(
              <div className='attribute'>
                <div className='notFoundIcon'></div>
                <h4 className='normal_text'>Você ainda não criou nenhum Formulário neste Portfolio</h4>
              </div>
            )
          }
          console.log("last form: ",forms)
        }

        const closeIconStyle:React.CSSProperties = {
            width: 30,
            height: 30,
            position: "absolute",
            top: 20,
            right:20,
        }
        

        const verifyAttributesChanges = () =>{
            if(title.current?.value != portfolioOfPortfolioPanel?.name
              || description.current?.value != portfolioOfPortfolioPanel?.description
            ){
              saveChangesButton.current?.classList.remove("inactiveCreatePortfolioButton");
            }else{
              saveChangesButton.current?.classList.add("inactiveCreatePortfolioButton");
            }
        }

        const saveChanges = () =>{
            if(title.current?.value === portfolioOfPortfolioPanel?.name
              && description.current?.value === portfolioOfPortfolioPanel?.description
            ){
              newErrorNotification("Você ainda não alterou nada");
              return;
            }

            const newPortfolio:PortfolioDocumentUpdate = {
              name: title.current?.value,
              description: description.current?.value,
            }

            newSaveChangesNotification(async ()=>{
              const loading = newLoadingNotification("Salvando mundanças");
              try{
                const portfolioUpdated = await updatePortfolio(String(portfolioOfPortfolioPanel?._id),newPortfolio);
                console.log("update: ",portfolioUpdated)
                newSuccessNotification("Alterações salvas com sucesso");
              }catch(error){
                newErrorNotification("Erro para salvar mudanças: "+error);
              }finally{
                closeNotification(loading);
              }
            },()=>{})
            

        }

        const visibility = PortfolioPanelVisibility ? showStyle : hiddenStyle;

        return(
            <div>
                <section className="popUpPanel" style={visibility} ref={portfolioPopUpPanel}>
                    <div className="closeIcon" onClick={()=>{setPortfolioPanelVisibility(false)}} style={closeIconStyle}></div>
                    <div className="topTitle"><h2 className="normal_text">{portfolioOfPortfolioPanel?.name}</h2></div>

                    <div className='attribute'>
                          <div className='createPortfolioButton inactiveCreatePortfolioButton' ref={saveChangesButton} onClick={saveChanges}>
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
                          <div className='createPortfolioButton' onClick={()=>{window.location.href=`./studio/portfolio/editor?id=${portfolioOfPortfolioPanel?._id}`}}>
                            <h4 className='normal_text'>
                              Edit Portfolio
                            </h4>
                          </div>
                        </div>

                        {formElement}
                        {/* <div className='attribute'>
                          <div className='notFoundIcon'></div>
                          <h4 className='normal_text'>Você ainda não criou nenhum Formulário neste Portfolio</h4>
                        </div>*/}

                        {/* <div className='attribute'>
                          {FormTabBox("form name",0,()=>{activeFormPanel()})}
                        </div> */}


                        <div className='attribute'>
                          <h4 className='normal_text text'>Visibility</h4> 
                          {Spinner(["Publico","Privado","Somente eu"],numberOfVisibility,(selected)=>{

                          })}
                        </div>

                        <div className='attribute'>
                          <h4 className='normal_text text'>Title</h4> 
                          <input className='attributeInputText' ref={title} defaultValue={portfolioOfPortfolioPanel?.name} placeholder='Portfolio Title' onChange={verifyAttributesChanges}/>
                        </div>

                        <div className='attribute'>
                          <h4 className='normal_text text' >Description</h4> 
                          <textarea className='normal_text' ref={description}  defaultValue={portfolioOfPortfolioPanel?.description}  placeholder='Portfolio Description' onChange={verifyAttributesChanges}/>
                        </div>

                        <div className='attribute'>
                          <h4 className='normal_text text'>Category</h4> 
                          {Spinner(["Pessoal","Profissional","Loja","Outro"],0,(selected)=>{

                          })}
                        </div>

                        <div className='deletePortfolioButton'>
                          <h4 className='normal_text'>
                            Delete Portfolio
                          </h4>
                        </div>
                    </div>    
                </section>
            </div>
        );
    }

    const FormPanel: React.FC = ()=>{
        const title = useRef<HTMLInputElement|null>(null);
        const description = useRef<HTMLTextAreaElement|null>(null);
        const [formResponses, setFormResponses] = useState<FormDataDocument[]|null>(null);
        const [formResponsesElement, setFormResponsesElement] = useState<any>();

        useEffect(()=>{
          const loadFormData = async ()=>{
            if(!currentFormOfFormPanel){return;}
            const responses:FormDataDocument[] = await getFormDataByFormId(String(currentFormOfFormPanel._id));
            if(responses){
              setFormResponses(responses)
            }else{
              setFormResponses(null);
            }
          }
          try{
            loadFormData()
          }catch(error){
            newErrorNotification("Erro para carregar respostas do formulário");
          }
        },[currentFormOfFormPanel]);

        useEffect(()=>{
          console.log(formResponses);
          if(formResponses && formResponses.length >0){
            setFormResponsesElement(formResponses.map((response:FormDataDocument)=>(
                <div className='formResponseBox'>
                    <div className='userTab'>
                      <div className='userIcon'></div>
                      <h4 className='normal_text'>User Name</h4>
                      <h5 className='normal_text'>@userNameId</h5>
                      <div className='seeProfileButton'>Perfil</div>
                    </div>
                    <div className='subAttribute'>
                      <h4 className='normal_text'>Contato: </h4>
                      <input className='normal_text' value={response.contact} readOnly></input>
                    </div>
                    <div className='subAttribute'>
                      <h4 className='normal_text'>Descrição: </h4>
                      <textarea className='normal_text' value={response.description} readOnly/>
                    </div>
                    <div className='subAttribute'>
                      <div className='createPortfolioButton'><h4 className='normal_text'>Conversar</h4></div>
                    </div>
                </div>
            )))
          }else{
            setFormResponsesElement(
                    <div className='attribute'>
                      <div className='notFoundIcon'></div>
                      <h4 className='normal_text'>Ainda não há nenhuma resposta</h4>
                    </div>)
          }
        },[formResponses])

        const [changes, setChanges] = useState<boolean>(false);

        const verifyChanges = ()=>{
          if(!title.current || !description.current || !currentFormOfFormPanel){return;}
          if(title.current.value !== currentFormOfFormPanel.name || 
            description.current.value !== currentFormOfFormPanel.description
          ){
            if(!changes){
              newSaveChangesNotification(()=>{
                saveChanges();
              },()=>{setChanges(false)});
              setChanges(true);
            }
          }
        }

        const saveChanges = async ()=>{
            if(!currentFormOfFormPanel){
              return;
            }
            if(changes){
              newErrorNotification("Não há nenhuma alteração no formulários");
              return;
            }
            if(!title.current || !description.current){
              newErrorNotification("Field error");
              return;
            }

            const loading = newLoadingNotification("Salvando alterações");

            const formUpdate:FormUpdate = {
              name:title.current?.value,
              description:description.current?.value  
            }

            try{
              const formUpdated:FormDocument = await updateForm(String(currentFormOfFormPanel._id),formUpdate) 
              newSuccessNotification("Alterações salvas com sucesso");
            }catch(error){
              newErrorNotification("Error para salvar alterações do formulário.");
            }finally{
              setTimeout(()=>{closeNotification(loading)},500);
            }

        }

        const visibility = formPanelVisibility ? showStyle : hiddenStyle;
        return(
          <div>
              <section className="popUpPanel hiddenPopUpPanel" style={visibility} ref={formPanel}>
                  <div className="closeIcon panelCloseButton" onClick={()=>{setFormPanelVisibility(false)}}></div>
                  <div className="topTitle"><h2 className="normal_text">{currentFormOfFormPanel?.name}</h2></div>

                  <div className='attribute'>
                        {FormTabBox(currentFormOfFormPanel?.name?currentFormOfFormPanel?.name:"not found",2,()=>{})}
                  </div>

                  <div className='attribute'>
                    <h4 className='normal_text text'>Título: </h4> 
                    <input className='attributeInputText' ref={title} defaultValue={currentFormOfFormPanel?.name} placeholder='Título' onChange={verifyChanges}/>
                  </div>
                  <div className='attribute'>
                    <h4 className='normal_text text'>Descrição: </h4> 
                    <textarea className='attributeInputText' ref={description} defaultValue={currentFormOfFormPanel?.description} placeholder='Descrição' onChange={verifyChanges}/>
                  </div>    
                  <div className="panel" style={{height:"calc(50%)"}}>
                    {formResponsesElement}
                    {/* <div className='attribute'>
                      <div className='notFoundIcon'></div>
                      <h4 className='normal_text'>Ainda não há nenhuma resposta</h4>
                    </div> */}

                    {/* <div className='formResponseBox'>
                        <div className='userTab'>
                          <div className='userIcon'></div>
                          <h4 className='normal_text'>User Name</h4>
                          <h5 className='normal_text'>@userNameId</h5>
                          <div className='seeProfileButton'>Perfil</div>
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
                    </div> */}

                  </div>    
              </section>
          </div>
        )
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
    <ProjectsPanel />
    <PopUpPanelNewPortfolios />
    <PortfolioPanel />
    <FormPanel/>
    <div className='loadingPopUp' style={{display:"flex"}} ref={loadingPopUp}><div className='loadingIcon3'></div></div>
    <div className='loadingPopUp' style={{display:"none"}} ref={renderedErrorPopUp}><div className='notFoundIcon'></div></div>
    <div className="blackFilter hiddenBlackFilter" ref={blackFilter}></div>

    <section className="globalBox searchSection">
        <div>
            <div style={{display: "flex",justifyContent: "center",alignItems: "center",height: "50px",marginTop: "40px",marginBottom: "40px"}}><h1 className="title">Du-Zilla</h1></div>
            <div style={{display: "flex"}}>
              <input id="search" className="inputSearch" type="text" placeholder="Pesquisar"/>
              <div id="searchButton" className="searchButton" style={{marginLeft: "10px"}} onClick={()=>{newSignNotification("Welcome back, hello")}}></div>
            </div>

            <div style={{display: "flex",justifyContent: "center",alignItems: "center",width: "100%",marginTop: "5%"}}>
              <div className="createOwnButton" id="createOwnButton" onClick={()=>{setProjectsPanelVisibility(true)}}><h3 className="normal_text">Criar Novo Portfolio</h3></div>
            </div>

          <div className="signButtonsBox">
            <a href="login"><div className="signInButton"><h4 className="normal_text">Sign in</h4></div></a>
            <a href="signUp"><div className="signUpButton"><h4 className="normal_text">Sign Up</h4></div></a>
          </div>
        </div>
        <h6 className='normal_text' style={{position:"absolute",bottom:20,right:20,color:"gray"}}>Du-Zilla Alpha v1.0</h6>
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
