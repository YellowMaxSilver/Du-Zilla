import React, { useRef, useEffect, useLayoutEffect, useState} from 'react'
import "../style.css"
import "../thunbnail.css"
import "../Notification/Notification.css"
import { CreateThunbNail, ThunbNail, ThunbNailProject, TopNavBar } from '../Widgets';
import { title } from 'process';
import { getAllPortfolios } from '../../Query/portfolioQuery';
import { PortfolioDocument } from '../../Query/interface/portfolioInterface';
import { JsxElement } from 'typescript';
import Notification from '../Notification/Notification';
console.log("hello");

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
  const { newNotification, newErrorNotification, newLoadingNotification, newSignNotification } = Notification();

  // const popUpPanel = useRef<React.FC|null>(null);

  const [portfolios, setPortfolios] = useState<PortfolioDocument[]>([])
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

  const templatePanel = useRef<HTMLDivElement | null>(null);
  const blackFilter = useRef<HTMLDivElement | null>(null);

  const {activeNewPortfolioPanel, hiddenNewPortfolioPanel , PopUpPanelNewPortfolios} = NewPortfolioPanel();
  const {activePortfolioPanel, hiddenPortfolioPanel, PopUpPortfolioPanel} = PortfolioPanel();


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
                    <div className="topTitle"><h2 className="normal_text">{"Create Portfolio"}</h2></div>
                    {/* <div className="topMenu">
                        <input className="inputSearch" type="text" placeholder={"search template"} style={{marginLeft:"20px"}}/>
                        <div className="searchButton" style={{marginLeft:"10px"}}></div>
                    </div> */}
        
                    <div className="panel">
                        <h3 className='normal_text panelTitle'>My Portfolios</h3>
                        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"20px 0px"}}>
                          <div className="createThunbBox" style={{width:240,height:165}} onClick={()=>{
                            hiddenTemplatePanel()
                            activeNewPortfolioPanel()
                          }}>
                              <div className="addIcon"></div>
                          </div>

                          <div className="thunbNailProject" onClick={()=>{
                            activePortfolioPanel()
                            hiddenTemplatePanel()
                            }}>
                              <div className="banner"></div>
                              <div className="titleBox">
                                  <h4 className="normal_text">My Project</h4>
                              </div>
                          </div>

                        </div>
                    </div>    
                </section>
                <div className="blackFilter hiddenBlackFilter" ref={blackFilter}></div>
            </div>
        );
    }

    function NewPortfolioPanel(){
      const newPortfolioPanel = useRef<HTMLDivElement | null>(null);
      const blackFilter = useRef<HTMLDivElement | null>(null);
      
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

      const createPortfolio = ()=>{
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
                      <div className="topTitle"><h2 className="normal_text">New Portfolio</h2></div>

                      <div className="panel">
                          <div className='attribute'>
                            <h3 className='normal_text text'>Title</h3> 
                            <input placeholder='Portfolio Title'/>
                          </div>

                          <div className='attribute'>
                            <h3 className='normal_text text'>Category</h3> 
                            <div className='spinnerButton'>
                              <div className='icon publicIcon'></div>
                              <h4 className='normal_text'>Category</h4>
                              <div className='arrowDownIcon'></div>
                            </div>
                          </div>

                          <div className='createPortfolioButton' onClick={createPortfolio}>
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
      const blackFilter = useRef<HTMLDivElement | null>(null);
      
      const hiddenPortfolioPanel = ()=>{
            portfolioPopUpPanel.current?.classList.add("hiddenPopUpPanel");
            blackFilter.current?.classList.add("hiddenBlackFilter");
      }
      
      const activePortfolioPanel = ()=>{
            const panelElement = portfolioPopUpPanel.current;
            const blackFilterElement = blackFilter.current;
            if(panelElement && blackFilterElement){
                panelElement.classList.remove("hiddenPopUpPanel");
                blackFilterElement.classList.remove("hiddenBlackFilter");
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
                            <div className='normalButton'>
                              <h4 className='normal_text'>
                                See Form and Rate
                              </h4>
                            </div>
                          </div>

                          <div className='attribute'>
                            <div className='createPortfolioButton'>
                              <h4 className='normal_text'>
                                Edit Portfolio
                              </h4>
                            </div>
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
                            <input placeholder='Portfolio Title'/>
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
    
  
  return (
    <div>
    <title>Du-Zilla</title>
    <TopNavBar />
    <div className='notificationSection' id='notificationSection'></div>
    <PopUpPanelElement />
    <PopUpPanelNewPortfolios />
    <PopUpPortfolioPanel />
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
        <ThunbNail
         width='380px' height='280px'
         title={portfolio.name} userUid={portfolio.creator} rateLevel={0} userTab={true}
        ></ThunbNail>
        </div>
      ))
    }
    </section>
    </div>
  )
}


export default Home;
